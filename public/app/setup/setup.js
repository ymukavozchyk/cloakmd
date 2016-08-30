(function () {
    'use strict';

    angular
        .module('app.setup')
        .controller('SetupController', SetupController);

    SetupController.$inject = ['StorageService', 'CredentialService', 'SharingService', '$state', '$mdToast'];
    function SetupController(StorageService, CredentialService, SharingService, $state, $mdToast) {
        var vm = this;
        vm.title = 'Unlock Notepad';
        vm.areNotesPresent = false;
        vm.password = null;
        vm.isResetNotepad = false;

        activate();

        function activate() {
            CredentialService.reset();
            StorageService.reset();
            SharingService.reset();
            vm.areNotesPresent = StorageService.areNotesPresent();
            if (!vm.areNotesPresent) {
                vm.title = 'Setup Notepad';
            }
        };

        vm.proceed = function () {
            CredentialService.setPassword(vm.password);
            if (vm.areNotesPresent) {
                if (vm.isResetNotepad) {
                    StorageService.resetNotes();
                    $state.go('notepad');
                }
                else {
                    var decryptResult = StorageService.decryptNotes();
                    if (decryptResult) {
                        $state.go('notepad');
                    }
                    else {
                        $mdToast.showSimple('Was not able to decrypt notes with given master password');
                    }
                }
            }
            else{
                $state.go('notepad');
            }
        };
    };
})();