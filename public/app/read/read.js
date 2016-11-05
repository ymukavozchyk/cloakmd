(function() {
    'use strict';

    angular
        .module('app.read')
        .controller('ReadController', ReadController);

    ReadController.$inject = ['$stateParams', '$mdToast', '$mdDialog', '$state', 'ApiService'];
    function ReadController($stateParams, $mdToast, $mdDialog, $state, ApiService) {
        var vm = this;

        vm.note = null;

        vm.hideLoader = false;
        vm.showError = false;
        vm.hideContent = true;

        vm.errorMessage = '';

        activate();

        function activate() {
            getNote();
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

        function displayError(message) {
            vm.hideLoader = true;
            vm.errorMessage = message;
            vm.showError = true;
        }

        function getNote() {
            ApiService.retrieve($stateParams.id)
                .then(function(res) {
                    vm.hideLoader = true;
                    openDecryptDialog(res.data);
                },
                function(e) {
                    displayError(e.data.Message);
                });
        }

        function openDecryptDialog(encryptedNote) {
            $mdDialog.show({
                templateUrl: 'app/read/decrypt/decrypt.html',
                controller: 'DecryptController as vm',
                locals: {
                    noteToDecrypt: encryptedNote
                }
            })
                .then(function(decryptedNote) {
                    vm.note = decryptedNote;
                    vm.hideContent = false;
                    if (encryptedNote.DestroyAfterReading) {
                        ApiService.destroy($stateParams.id)
                            .catch(function(e) {
                                showToast(e.data.Message, 'error');
                            });
                    }
                },
                function() {
                    displayError('Was not able to decrypt the note');
                });
        }
    }
})();