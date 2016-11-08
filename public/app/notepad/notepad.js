(function () {
    'use strict';

    angular
        .module('app.notepad')
        .controller('NotepadController', NotepadController);

    //controller for notepad view
    NotepadController.$inject = ['$scope', '$mdDialog', '$mdMedia', '$mdSidenav',
        '$mdToast', '$state', 'NotepadStorageService', 'InternalService'];
    function NotepadController($scope, $mdDialog, $mdMedia, $mdSidenav,
        $mdToast, $state, NotepadStorageService, InternalService) {

        var vm = this;

        //workaround to use mdMedia in the view
        $scope.$mdMedia = $mdMedia;

        //notes array
        vm.notes = null;

        //active note's index relative to the vm.notes
        vm.index = 0;

        //active note object
        vm.note = null;

        //flags
        vm.noteIsEmpty = true;
        vm.hideLoader = false;

        activate();

        /* loads notes from the service and if there are none,
        fetches default note as the first and the only note */
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

        //resolving a promise of fetching default note
        function setDefaultNotes(res) {
            vm.notes = [{
                title: 'About CloakMD',
                data: res.data
            }];
        }

        //making first note in the notepad active
        function selectFirstNote() {
            vm.note = vm.notes[0];
            checkNoteIsEmpty();
            vm.hideLoader = true;
        }

        //wrapper for showing mdToast
        function showToast(text, type) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position('top right')
                    .hideDelay(6000)
                    .toastClass(type)
            );
        }

        //checks if content of active note is empty and sets the flag
        function checkNoteIsEmpty() {
            if (vm.note.data === '') {
                vm.noteIsEmpty = true;
            }
            else {
                vm.noteIsEmpty = false;
            }
        }

        //stores notes to the local storage
        function storeNotes() {
            var storeResult = NotepadStorageService.setNotes(vm.notes);
            if (storeResult === false) {
                showToast('Was not able to save notes', 'error');
            }
        }

        //implements auto-save
        function saveNotes() {
            checkNoteIsEmpty();
            vm.notes[vm.index] = vm.note;
            storeNotes();
        }

        //opens sidenav (applicable only to the mobile version)
        vm.toggleList = function () {
            $mdSidenav('left').toggle();
        };

        //opens up the dialog for sharing note
        vm.openSharingDialog = function (ev) {
            $mdDialog.show({
                templateUrl: 'app/notepad/share/share.html',
                targetEvent: ev,
                controller: 'ShareController as vm',
                locals: {
                    //passing selected for sharing note along with the parent event
                    noteToShare: vm.note,
                    event: ev
                },
                clickOutsideToClose: false,
                escapeToClose: false
            });
        };

        //configuration of Ace editor
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

        //auto-save notes on editor changed event
        vm.aceChanged = function () {
            saveNotes();
        };

        //auto-save notes on title changed event
        vm.titleChanged = function () {
            saveNotes();
        };

        //prevents from having a note with blank title
        vm.titleBlur = function () {
            if (vm.note.title === '') {
                vm.note.title = 'Untitled';
                saveNotes();
            }
        };

        //adds new note and makes it active
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

        //removes active note and saves changes in the local storage
        vm.removeCurrentNote = function () {
            vm.notes.splice(vm.index, 1);
            if (vm.notes.length > 0) {
                vm.selectNote(vm.notes[vm.notes.length - 1]);
            }
            //if it was a last note, creates a blank one
            else {
                vm.addNewNote();
            }
            saveNotes();
        };

        //changes active note
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