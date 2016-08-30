(function () {
    'use strict';

    angular
        .module('app.share')
        .controller('ShareController', ShareController);

    ShareController.$inject = ['ShareService', 'SharingService'];
    function ShareController(ShareService, SharingService) {
        var vm = this;
        vm.note = SharingService.getNoteForSharing();
        activate();

        function activate() {
        }
    }
})();