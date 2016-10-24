(function () {
    'use strict';

    angular
        .module('app.partials.share-details')
        .controller('ShareDetailsController', ShareDetailsController);

    ShareDetailsController.$inject = ['ApiService', 'SharedStorageService', '$mdDialog', '$mdToast', 'sharedNoteId'];
    function ShareDetailsController(ApiService, SharedStorageService, $mdDialog, $mdToast, sharedNoteId) {
        var vm = this;

        vm.sharedNoteLink = window.location.protocol + '//' + window.location.hostname + '#/shared/' + sharedNoteId;

        function showToast(text, type) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position('top right')
                    .hideDelay(6000)
                    .toastClass(type)
            );
        };

        vm.closeDialog = function () {
            $mdDialog.cancel();
        };

        vm.destroyNote = function () {
            ApiService.destroy(sharedNoteId)
                .success(function () {
                    SharedStorageService.removeNote(sharedNoteId);
                    $mdDialog.hide();
                })
                .error(function (e) {
                    showToast(e.Message, 'error');
                });
        };
    }
})();