(function () {
    'use strict';

    angular
        .module('app.notepad')
        .controller('NotepadController', NotepadController);

    NotepadController.$inject = ['$mdDialog', '$mdMedia', '$mdSidenav', '$mdToast', '$state', 'NotepadStorageService'];
    function NotepadController($mdDialog, $mdMedia, $mdSidenav, $mdToast, $state, NotepadStorageService) {
        var vm = this;

        vm.notes = null;
        vm.index = 0;
        vm.note = null;
        vm.isScreenXs = $mdMedia('xs');
        vm.isScreenSm = $mdMedia('sm');

        activate();

        function activate() {
            vm.notes = NotepadStorageService.getNotes();
            vm.note = vm.notes[0];
        };

        function toastWrap(text) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position('top right')
                    .hideDelay(4000)
            );
        };

        function storeNotes() {
            var storeResult = NotepadStorageService.setNotes(vm.notes);
            if (!storeResult) {
                toastWrap('Was not able to save notes');
            }
        };

        function saveNotes() {
            vm.notes[vm.index] = vm.note;
            storeNotes();
        };

        vm.toggleList = function () {
            $mdSidenav('left').toggle();
        };

        vm.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        vm.openSharingDialog = function (ev) {
            if (vm.note.data !== '') {
                $mdDialog.show({
                    templateUrl: 'app/notepad/share/share.html',
                    targetEvent: ev,
                    controller: 'ShareController as vm',
                    locals: {
                        noteToShare: vm.note,
                        event: ev
                    }
                });
            }
            else {
                toastWrap('You could not share an empty note');
            }
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
        };

        vm.exit = function () {
            $state.go('setup');
        }
    }
})();