(function() {
    'use strict';

    angular
        .module('app.partials.share-details')
        .controller('ShareDetailsController', ShareDetailsController);

    ShareDetailsController.$inject = ['ApiService', 'SharedStorageService', '$mdDialog', '$mdToast', 'sharedNoteId'];
    function ShareDetailsController(ApiService, SharedStorageService, $mdDialog, $mdToast, sharedNoteId) {
        var vm = this;

        vm.sharedNoteLink = window.location.protocol +
            '//' + window.location.hostname + ':' + window.location.port +
            '#/read/' + sharedNoteId;

        function showToast(text, type) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position('top right')
                    .hideDelay(6000)
                    .toastClass(type)
            );
        }

        vm.closeDialog = function() {
            $mdDialog.cancel();
        };

        vm.destroyNote = function() {
            ApiService.destroy(sharedNoteId)
                .then(function() {
                    SharedStorageService.removeNote(sharedNoteId);
                    $mdDialog.hide();
                },
                function(e) {
                    showToast(e.data.Message, 'error');
                });
        };
    }
})();