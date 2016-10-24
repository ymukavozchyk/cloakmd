(function () {
    'use strict';

    angular
        .module('app.share')
        .controller('ShareController', ShareController);

    ShareController.$inject = ['ApiService', 'SharedStorageService', '$mdDialog', '$mdToast', 'noteToShare'];
    function ShareController(ApiService, SharedStorageService, $mdDialog, $mdToast, noteToShare, event) {
        var vm = this;

        vm.password = '';
        vm.destroyAfterReading = false;

        vm.hideProgressBar = true;
        vm.controlsDisabled = false;

        function toastWrap(text) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position('top right')
                    .hideDelay(4000)
            );
        };

        function openDetailsDialog(sharedNoteId){
            $mdDialog.show({
                templateUrl: 'app/partials/share-details/share-details.html',
                targetEvent: event,
                controller: 'ShareDetailsController as vm',
                locals: {
                    sharedNoteId: sharedNoteId
                }
            });
        };

        vm.closeDialog = function () {
            $mdDialog.cancel();
        };

        vm.shareNote = function () {
            vm.hideProgressBar = false;
            vm.controlsDisabled = true;
            try {
                var jsonData = angular.toJson(noteToShare);
                var encryptedData = sjcl.encrypt(vm.password, jsonData);
                var shareData = {
                    Data: encryptedData,
                    DestroyAfterReading: vm.destroyAfterReading
                };

                ApiService.share(shareData)
                    .success(function (sharedId) {
                        SharedStorageService.addNote({
                            data: noteToShare.data,
                            title: noteToShare.title,
                            id: sharedId
                        });
                        openDetailsDialog(sharedId);
                        $mdDialog.cancel();
                    })
                    .error(function (e) {
                        toastWrap(e);
                    });
            }
            catch (e) {
                vm.hideProgressBar = true;
                vm.controlsDisabled = false;
                toastWrap('Was not able to encrypt note with given password');
            }
        };
    }
})();