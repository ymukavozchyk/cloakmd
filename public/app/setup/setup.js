(function () {
    'use strict';

    angular
        .module('app.setup')
        .controller('SetupController', SetupController);

    //controller for setting up / unlocking notepad view
    SetupController.$inject = ['NotepadStorageService', 'SharedStorageService',
        'CredentialService', '$state', '$mdToast'];
    function SetupController(NotepadStorageService, SharedStorageService,
        CredentialService, $state, $mdToast) {
        var vm = this;

        //dynamic block title
        vm.title = 'Unlock Notepad';

        //master password
        vm.password = null;

        //flags
        vm.isResetNotepad = false;
        vm.areNotesPresent = false;

        activate();

        function activate() {
            //resets temporary data
            CredentialService.reset();
            NotepadStorageService.reset();
            SharedStorageService.reset();

            /* checks if notes are in the local storage
            and adjust the title if needed */
            vm.areNotesPresent = NotepadStorageService.areNotesPresent();
            if (vm.areNotesPresent === false) {
                vm.title = 'Setup Notepad';
            }
        }

        //wrapper for mdToast
        function showToast(text, type) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position('top right')
                    .hideDelay(6000)
                    .toastClass(type)
            );
        }

        //notepad setup / unlock procedure
        function setupNotepad() {
            if (vm.areNotesPresent === true) {
                //if reset notepad flag is active
                if (vm.isResetNotepad === true) {
                    //wipe local storage with active notes
                    NotepadStorageService.resetStorage();
                    return true;
                }
                else {
                    //try to decrypt active notes from the local storage
                    var decryptResult = NotepadStorageService.decryptNotes();
                    if (decryptResult === true) {
                        return true;
                    }
                    else {
                        showToast('Was not able to decrypt notes with given master password', 'error');
                        return false;
                    }
                }
            }
            else {
                return true;
            }
        }

        //shared notes setup procedure
        function setupSharedNotes() {
            if (SharedStorageService.areNotesPresent() === true) {
                //if reset notepad flag is active
                if (vm.isResetNotepad === true) {
                    //wipe local storage with shared notes
                    SharedStorageService.resetStorage();
                }
                else {
                    //try to decrypt shared notes from the local storage
                    var decryptResult = SharedStorageService.decryptNotes();
                    //if decryption is failed, reset shared notes local storage
                    if (decryptResult === false) {
                        SharedStorageService.reset();
                        SharedStorageService.resetStorage();
                    }
                }
            }
        }

        //sets master password and perform setup procedures
        vm.proceed = function () {
            CredentialService.setPassword(vm.password);
            if (setupNotepad() === true) {
                setupSharedNotes();
                $state.go('notepad');
            }
        };
    }
})();