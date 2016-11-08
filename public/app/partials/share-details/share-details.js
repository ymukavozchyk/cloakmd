(function () {
    'use strict';

    angular
        .module('app.partials.share-details')
        .controller('ShareDetailsController', ShareDetailsController);

    //controller for dialog with details of shared note
    ShareDetailsController.$inject = ['ApiService', 'SharedStorageService', '$mdDialog', '$mdToast', 'sharedNoteId'];
    function ShareDetailsController(ApiService, SharedStorageService, $mdDialog, $mdToast, sharedNoteId) {
        var vm = this;

        //link to the shared note
        vm.sharedNoteLink = window.location.protocol +
            '//' + window.location.hostname + ':' + window.location.port +
            '#/read/' + sharedNoteId;

        //UI flags
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

        vm.closeDialog = function () {
            $mdDialog.cancel();
        };

        //destroy shared note
        vm.destroyNote = function () {
            vm.hideProgressBar = false;
            vm.controlsDisabled = true;

            ApiService.destroy(sharedNoteId)
                .then(function () {
                    SharedStorageService.removeNote(sharedNoteId);
                    $mdDialog.hide();
                },
                function (e) {
                    vm.hideProgressBar = true;
                    vm.controlsDisabled = false;
                    showToast(e.data.Message, 'error');
                });
        };
    }
})();