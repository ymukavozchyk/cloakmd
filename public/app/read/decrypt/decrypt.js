(function () {
    'use strict';

    angular
        .module('app.read.decrypt')
        .controller('DecryptController', DecryptController);

    DecryptController.$inject = ['SjclService', '$mdDialog', '$mdToast', 'noteToDecrypt'];
    function DecryptController(SjclService, $mdDialog, $mdToast, noteToDecrypt) {
        var vm = this;

        vm.password = '';

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
                var decrypted = SjclService.decrypt(vm.password, noteToDecrypt.Data);
                $mdDialog.hide(angular.fromJson(decrypted));
            }
            catch (e) {
                showToast('Was not able to decrypt note with given password', 'error');
            }
        };
    }
})();