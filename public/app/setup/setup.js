(function () {
    'use strict';

    angular
        .module('app.setup')
        .controller('SetupController', SetupController);

    SetupController.$inject = ['NotepadStorageService', 'SharedStorageService',
        'CredentialService', '$state', '$mdToast'];
    function SetupController(NotepadStorageService, SharedStorageService,
        CredentialService, $state, $mdToast) {
        var vm = this;

        vm.title = 'Unlock Notepad';
        vm.password = null;
        vm.isResetNotepad = false;
        vm.areNotesPresent = false;

        activate();

        function activate() {
            CredentialService.reset();
            NotepadStorageService.reset();
            SharedStorageService.reset();
            vm.areNotesPresent = NotepadStorageService.areNotesPresent();
            if (!vm.areNotesPresent) {
                vm.title = 'Setup Notepad';
            }
        }

        function showToast(text, type) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position('top right')
                    .hideDelay(6000)
                    .toastClass(type)
            );
        }

        function setupNotepad() {
            if (vm.areNotesPresent) {
                if (vm.isResetNotepad) {
                    NotepadStorageService.resetStorage();
                    return true;
                }
                else {
                    var decryptResult = NotepadStorageService.decryptNotes();
                    if (decryptResult) {
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

        function setupSharedNotes() {
            if (SharedStorageService.areNotesPresent()) {
                if (vm.isResetNotepad) {
                    SharedStorageService.resetStorage();
                }
                else {
                    var decryptResult = SharedStorageService.decryptNotes();
                    if (!decryptResult) {
                        SharedStorageService.reset();
                        SharedStorageService.resetStorage();
                    }
                }
            }
        }

        vm.proceed = function () {
            CredentialService.setPassword(vm.password);
            var setupNotepadResult = setupNotepad();
            if (setupNotepadResult) {
                setupSharedNotes();
                $state.go('notepad');
            }
        };
    }
})();