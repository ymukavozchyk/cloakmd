(function () {
    'use strict';

    angular
        .module('app.notepad.share')
        .controller('ShareController', ShareController);

    ShareController.$inject = ['ApiService', 'SharedStorageService', 'SjclService',
        '$mdDialog', '$mdToast', 'noteToShare', 'event'];
    function ShareController(ApiService, SharedStorageService, SjclService,
        $mdDialog, $mdToast, noteToShare, event) {
        var vm = this;

        vm.password = '';
        vm.destroyAfterReading = false;

        vm.hideProgressBar = true;
        vm.controlsDisabled = false;

        function showToast(text, type) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position('top right')
                    .hideDelay(6000)
                    .toastClass(type)
            );
        }

        function openDetailsDialog(sharedNoteId) {
            $mdDialog.show({
                templateUrl: 'app/partials/share-details/share-details.html',
                targetEvent: event,
                controller: 'ShareDetailsController as vm',
                locals: {
                    sharedNoteId: sharedNoteId
                },
                clickOutsideToClose: true
            });
        }

        vm.closeDialog = function () {
            $mdDialog.cancel();
        };

        vm.shareNote = function () {
            vm.hideProgressBar = false;
            vm.controlsDisabled = true;
            try {
                var jsonData = angular.toJson(noteToShare);
                var encryptedData = SjclService.encrypt(vm.password, jsonData);
                var shareData = {
                    Data: encryptedData,
                    DestroyAfterReading: vm.destroyAfterReading
                };

                ApiService.share(shareData)
                    .then(function (res) {
                        SharedStorageService.addNote({
                            data: noteToShare.data,
                            title: noteToShare.title,
                            id: res.data
                        });
                        openDetailsDialog(res.data);
                        $mdDialog.cancel();
                    },
                    function (e) {
                        showToast(e.data.Message, 'error');
                    });
            }
            catch (e) {
                vm.hideProgressBar = true;
                vm.controlsDisabled = false;
                showToast('Was not able to encrypt note with given password', 'error');
            }
        };
    }
})();