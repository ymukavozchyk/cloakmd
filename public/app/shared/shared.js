(function () {
    'use strict';

    angular
        .module('app.shared')
        .controller('SharedController', SharedController);

    SharedController.$inject = ['$scope', '$mdDialog', '$mdMedia', '$mdSidenav', '$mdToast', '$state', 'SharedStorageService'];
    function SharedController($scope, $mdDialog, $mdMedia, $mdSidenav, $mdToast, $state, SharedStorageService) {
        var vm = this;

        $scope.$mdMedia = $mdMedia;

        vm.notes = null;
        vm.index = 0;
        vm.note = null;
        vm.hideControls = false;

        activate();

        function activate() {
            vm.notes = SharedStorageService.getNotes();
            vm.note = vm.notes[0];

            if (vm.note === undefined) {
                vm.hideControls = true;
            }
        }

        vm.toggleList = function () {
            $mdSidenav('left').toggle();
        };

        vm.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        vm.selectNote = function (note) {
            vm.index = vm.notes.indexOf(note);
            vm.note = note;
        };

        vm.openDetailsDialog = function (event) {
            $mdDialog.show({
                templateUrl: 'app/partials/share-details/share-details.html',
                targetEvent: event,
                controller: 'ShareDetailsController as vm',
                locals: {
                    sharedNoteId: vm.note.id
                },
                clickOutsideToClose: true
            })
                .then(function () {
                    vm.notes.splice(vm.index, 1);
                    if (vm.notes.length > 0) {
                        vm.selectNote(vm.notes[vm.notes.length - 1]);
                    }
                    else {
                        vm.hideControls = true;
                    }
                });
        };

        vm.exit = function () {
            $state.go('setup');
        };
    }
})();