(function () {
    'use strict';

    angular
        .module('app.notepad')
        .controller('NotepadController', NotepadController);

    NotepadController.$inject = ['$mdDialog', '$mdMedia', '$mdSidenav', '$state', 'StorageService', 'ApiService', 'CredentialService', 'SharingService'];
    function NotepadController($mdDialog, $mdMedia, $mdSidenav, $state, StorageService, ApiService, CredentialService, SharingService) {
        var vm = this;

        vm.notes = null;
        vm.index = 0;
        vm.note = null;
        vm.isScreenXs = $mdMedia('xs');
        vm.isScreenSm = $mdMedia('sm');

        activate();

        function activate() {
            vm.notes = StorageService.getNotes();
            vm.note = vm.notes[0];
            SharingService.reset();
        };

        function saveNotes() {
            var saveResult = StorageService.setNotes(vm.notes);
            if (!saveResult) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Was not able to save notes')
                        .position('top right')
                        .hideDelay(1500)
                );
            }
        };

        vm.toggleList = function () {
            $mdSidenav('left').toggle();
        };

        vm.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        vm.openSharingDialog = function (ev) {
            $mdDialog.show({
                templateUrl: 'app/share/share.html',
                targetEvent: ev,
                controller: 'ShareController as vm'
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
            vm.notes[vm.index] = vm.note;
            saveNotes();
        };

        vm.titleChanged = function () {
            vm.notes[vm.index] = vm.note;
            saveNotes();
        };

        vm.titleBlur = function () {
            if (vm.note.title == '') {
                vm.note.title = 'Untitled';
                vm.notes[vm.index] = vm.note;
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
            StorageService.reset();
            CredentialService.reset();
            $state.go('setup');
        }
    }
})();