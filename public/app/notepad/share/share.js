(function () {
    'use strict';

    angular
        .module('app.share')
        .controller('ShareController', ShareController);

    ShareController.$inject = ['SharingService', '$mdDialog'];
    function ShareController(SharingService, $mdDialog) {
        var vm = this;
        var today = new Date();

        vm.note = SharingService.getNoteForSharing();
        vm.password = {};

        vm.isExpirable = false;
        vm.minDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
        );
        vm.expirationDate = vm.minDate;

        vm.destroyAfterReading = false;

        activate();

        function activate() {
        };

        vm.closeDialog = function(){
            $mdDialog.cancel();
        };

        vm.shareNote = function(){
            console.log(vm.expirationDate);
        };
    }
})();