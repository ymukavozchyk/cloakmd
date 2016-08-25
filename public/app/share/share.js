(function () {
    'use strict';

    angular
        .module('app.share')
        .controller('ShareController', ShareController);

    ShareController.$inject = ['ShareService', 'toaster', 'SharingService'];
    function ShareController(ShareService, toaster, SharingService) {
        var vm = this;
        vm.note = SharingService.getNoteForSharing();
        activate();

        function activate() {
        }
    }
})();