(function () {
    'use strict';

    angular
        .module('app.read.decrypt')
        .controller('DecryptController', DecryptController);

    //controller for shared note decryption dialog
    DecryptController.$inject = ['SjclService', '$mdDialog', '$mdToast', 'noteToDecrypt'];
    function DecryptController(SjclService, $mdDialog, $mdToast, noteToDecrypt) {
        var vm = this;

        vm.password = '';

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

        vm.closeDialog = function () {
            $mdDialog.cancel();
        };

        vm.decryptNote = function () {
            try {
                //try to decrypt and pass decrypted note for promise resolve
                var decrypted = SjclService.decrypt(vm.password, noteToDecrypt.Data);
                $mdDialog.hide(angular.fromJson(decrypted));
            }
            catch (e) {
                showToast('Was not able to decrypt note with given password', 'error');
            }
        };
    }
})();