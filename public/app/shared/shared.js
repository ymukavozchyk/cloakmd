(function () {
    'use strict';

    angular
        .module('app.shared')
        .controller('SharedController', SharedController);

    //controller for shared notes view
    SharedController.$inject = ['$scope', '$mdDialog', '$mdMedia', '$mdSidenav',
        '$mdToast', '$state', 'SharedStorageService'];
    function SharedController($scope, $mdDialog, $mdMedia, $mdSidenav,
        $mdToast, $state, SharedStorageService) {
        var vm = this;

        //workaround to use mdMedia in the view
        $scope.$mdMedia = $mdMedia;

        //shared notes array
        vm.notes = null;

        //active note's index relative to the vm.notes
        vm.index = 0;

        //active note object
        vm.note = null;

        //flag
        vm.hideControls = false;

        activate();

        /* fetches shared notes from the service
        if there are none, sets the flag to show a message */
        function activate() {
            vm.notes = SharedStorageService.getNotes();
            vm.note = vm.notes[0];

            if (vm.note === undefined) {
                vm.hideControls = true;
            }
        }

        //opens sidenav (applicable only to the mobile version)
        vm.toggleList = function () {
            $mdSidenav('left').toggle();
        };

        //makes selected note active
        vm.selectNote = function (note) {
            vm.index = vm.notes.indexOf(note);
            vm.note = note;
        };

        //opens up a dialog with shared note's details
        vm.openDetailsDialog = function (event) {
            $mdDialog.show({
                templateUrl: 'app/partials/share-details/share-details.html',
                targetEvent: event,
                controller: 'ShareDetailsController as vm',
                locals: {
                    sharedNoteId: vm.note.id
                },
                clickOutsideToClose: false,
                escapeToClose: false
            })
                .then(function () {
                    /* if shared note was deleted, remove it
                    from the list and select previous one */
                    vm.notes.splice(vm.index, 1);
                    if (vm.notes.length > 0) {
                        vm.selectNote(vm.notes[vm.notes.length - 1]);
                    }
                    else {
                        //show a message if there are no notes
                        vm.hideControls = true;
                    }
                });
        };

        vm.exit = function () {
            $state.go('setup');
        };
    }
})();