(function () {
    'use strict';

    angular
        .module('app.notepad.share')
        .controller('ShareController', ShareController);

    //controller for note sharing dialog
    ShareController.$inject = ['ApiService', 'SharedStorageService', 'SjclService',
        '$mdDialog', '$mdToast', 'noteToShare', 'event'];
    function ShareController(ApiService, SharedStorageService, SjclService,
        $mdDialog, $mdToast, noteToShare, event) {

        var vm = this;

        //sharing options
        vm.password = '';
        vm.destroyAfterReading = false;

        //flags
        vm.hideProgressBar = true;
        vm.controlsDisabled = false;

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

        //opens up a dialog with details after note is shared
        function openDetailsDialog(sharedNoteId) {
            $mdDialog.show({
                templateUrl: 'app/partials/share-details/share-details.html',
                targetEvent: event,
                controller: 'ShareDetailsController as vm',
                locals: {
                    //shared note id returned by API
                    sharedNoteId: sharedNoteId
                },
                clickOutsideToClose: false,
                escapeToClose: false
            });
        }

        vm.closeDialog = function () {
            $mdDialog.cancel();
        };

        //sharing selected note
        vm.shareNote = function () {
            vm.hideProgressBar = false;
            vm.controlsDisabled = true;
            try {
                //converting selected note to JSON
                var jsonData = angular.toJson(noteToShare);
                //encrypting JSON with given password
                var encryptedData = SjclService.encrypt(vm.password, jsonData);
                //forming an object for API request
                var shareData = {
                    Data: encryptedData,
                    DestroyAfterReading: vm.destroyAfterReading
                };

                //API request
                ApiService.share(shareData)
                    .then(function (res) {
                        /* adding successfully shared note to the shared
                        notes collection */
                        SharedStorageService.addNote({
                            data: noteToShare.data,
                            title: noteToShare.title,
                            id: res.data
                        });
                        //opens up a dialog with information regarding shared note
                        //res.data = shared note id
                        openDetailsDialog(res.data);
                        $mdDialog.cancel();
                    },
                    function (e) {
                        //shows error if note was not shared
                        showToast(e.data.Message, 'error');
                    });
            }
            catch (e) {
                showToast('Was not able to encrypt note with given password', 'error');
            }

            //UI flags reset
            vm.hideProgressBar = true;
            vm.controlsDisabled = false;
        };
    }
})();