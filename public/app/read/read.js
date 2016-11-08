(function () {
    'use strict';

    angular
        .module('app.read')
        .controller('ReadController', ReadController);

    //controller for accessing shared note view
    ReadController.$inject = ['$stateParams', '$mdToast', '$mdDialog', '$state', 'ApiService'];
    function ReadController($stateParams, $mdToast, $mdDialog, $state, ApiService) {
        var vm = this;

        //fetched note
        vm.note = null;

        //UI flags
        vm.hideLoader = false;
        vm.showError = false;
        vm.hideContent = true;

        vm.errorMessage = '';

        activate();

        function activate() {
            getNote();
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

        //shows error on the view
        function displayError(message) {
            vm.hideLoader = true;
            vm.errorMessage = message;
            vm.showError = true;
        }

        //fetches shared note by id
        function getNote() {
            ApiService.retrieve($stateParams.id)
                .then(function (res) {
                    vm.hideLoader = true;
                    openDecryptDialog(res.data);
                },
                function (e) {
                    displayError(e.data.Message);
                });
        }

        //opens up a dialog for note decryption
        function openDecryptDialog(encryptedNote) {
            $mdDialog.show({
                templateUrl: 'app/read/decrypt/decrypt.html',
                controller: 'DecryptController as vm',
                locals: {
                    //decrypted note
                    noteToDecrypt: encryptedNote
                },
                clickOutsideToClose: false,
                escapeToClose: false
            })
                .then(function (decryptedNote) {
                    //set decrypted note to local var
                    vm.note = decryptedNote;
                    vm.hideContent = false;
                    //destroy note if it has a flag
                    if (encryptedNote.DestroyAfterReading) {
                        ApiService.destroy($stateParams.id)
                            .catch(function (e) {
                                showToast(e.data.Message, 'error');
                            });
                    }
                },
                function () {
                    displayError('Was not able to decrypt the note');
                });
        }
    }
})();