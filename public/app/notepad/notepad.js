(function () {
    'use strict';

    angular
        .module('app.notepad')
        .controller('NotepadController', NotepadController);

    NotepadController.$inject = ['$scope', '$mdDialog', '$mdMedia', '$mdSidenav',
        '$mdToast', '$state', 'NotepadStorageService', 'InternalService'];
    function NotepadController($scope, $mdDialog, $mdMedia, $mdSidenav,
        $mdToast, $state, NotepadStorageService, InternalService) {
        var vm = this;

        $scope.$mdMedia = $mdMedia;

        vm.notes = null;
        vm.index = 0;
        vm.note = null;

        vm.noteIsEmpty = true;

        activate();

        function activate() {
            vm.notes = NotepadStorageService.getNotes();
            if (vm.notes === null) {
                InternalService.getAbout()
                    .then(setDefaultNotes, setDefaultNotes)
                    .then(function () {
                        selectFirstNote();
                    });
            }
            else {
                selectFirstNote();
            }
        }

        function setDefaultNotes(res) {
            vm.notes = [{
                title: 'About CloakMD',
                data: res.data
            }];
        }

        function selectFirstNote() {
            vm.note = vm.notes[0];
            checkNoteIsEmpty();
        }

        function showToast(text, type) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position('top right')
                    .hideDelay(6000)
                    .toastClass(type)
            );
        }

        function checkNoteIsEmpty() {
            if (vm.note.data === '') {
                vm.noteIsEmpty = true;
            }
            else {
                vm.noteIsEmpty = false;
            }
        }

        function storeNotes() {
            var storeResult = NotepadStorageService.setNotes(vm.notes);
            if (!storeResult) {
                showToast('Was not able to save notes', 'error');
            }
        }

        function saveNotes() {
            checkNoteIsEmpty();
            vm.notes[vm.index] = vm.note;
            storeNotes();
        }

        vm.toggleList = function () {
            $mdSidenav('left').toggle();
        };

        vm.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        vm.openSharingDialog = function (ev) {
            $mdDialog.show({
                templateUrl: 'app/notepad/share/share.html',
                targetEvent: ev,
                controller: 'ShareController as vm',
                locals: {
                    noteToShare: vm.note,
                    event: ev
                },
                clickOutsideToClose: true
            });
        };

        vm.aceLoaded = function (editor) {
            var session = editor.getSession();
            var renderer = editor.renderer;

            editor.setTheme('ace/theme/github');
            editor.setHighlightActiveLine(true);
            editor.setShowPrintMargin(false);
            editor.setOption('scrollPastEnd', false);
            editor.setOption('maxLines', 'Infinity');
            editor.$blockScrolling = 'Infinity';

            session.setMode('ace/mode/markdown');
            session.setFoldStyle('markbegin');
            session.setTabSize(4);
            session.setUseSoftTabs(true);
            session.setUseWrapMode(true);

            editor.focus();
        };

        vm.aceChanged = function () {
            saveNotes();
        };

        vm.titleChanged = function () {
            saveNotes();
        };

        vm.titleBlur = function () {
            if (vm.note.title === '') {
                vm.note.title = 'Untitled';
                saveNotes();
            }
        };

        vm.addNewNote = function () {
            var newNote = {
                title: 'Untitled',
                data: ''
            };
            vm.notes.push(newNote);

            vm.index = vm.notes.indexOf(newNote);
            vm.note = newNote;
            checkNoteIsEmpty();
        };

        vm.removeCurrentNote = function () {
            vm.notes.splice(vm.index, 1);
            if (vm.notes.length > 0) {
                vm.selectNote(vm.notes[vm.notes.length - 1]);
            }
            else {
                vm.addNewNote();
            }
            saveNotes();
        };

        vm.selectNote = function (note) {
            vm.index = vm.notes.indexOf(note);
            vm.note = note;
            checkNoteIsEmpty();
        };

        vm.exit = function () {
            $state.go('setup');
        };
    }
})();