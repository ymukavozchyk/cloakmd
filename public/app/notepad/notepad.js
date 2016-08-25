(function () {
    'use strict';

    angular
        .module('app.notepad')
        .controller('NotepadController', NotepadController);

    NotepadController.$inject = ['$state', 'StorageService', 'ApiService', 'CredentialService', 'toaster'];
    function NotepadController($state, StorageService, ApiService, CredentialService, toaster) {
        var vm = this;

        vm.notes = null;
        vm.index = 0;
        vm.note = null;

        activate();

        function activate() {
            vm.notes = StorageService.getNotes();
            vm.note = vm.notes[0];
            StorageService.resetNoteForSharing();
        };

        function saveNotes() {
            var saveResult = StorageService.setNotes(vm.notes);
            if (!saveResult) {
                toaster.pop('error', 'Was not able to save notes');
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

        vm.shareNote = function () {
            StorageService.setNoteForSharing(vm.note);
            $state.go('share');
        };

        vm.exit = function(){
            StorageService.reset();
            CredentialService.reset();
            $state.go('setup');
        }
    }
})();