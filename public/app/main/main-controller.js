angular.module('main')
  .controller('MainPageController', ['$scope', 'localStorageService', 'MainPageService', function ($scope, localStorageService, MainPageService) {
    console.info('Main Page Controller is online');

    var vm = this;

    var sampleData =
      '# CloakMD\n' +
      'GitHub flavored markdown notes with a &&twist&&\n';

    var sampleNotes = [{
      title: 'Untitled',
      data: sampleData
    }];

    this.notes = localStorageService.get('notes') || sampleNotes;
    this.index = 0;
    this.note = this.notes[0];

    this.aceLoaded = function (editor) {

      var session = editor.getSession();
      var renderer = editor.renderer;

      editor.setTheme('ace/theme/github');
      editor.setHighlightActiveLine(true);
      editor.setShowPrintMargin(false);
      editor.setOption("scrollPastEnd", false);

      session.setMode('ace/mode/markdown');
      session.setFoldStyle('markbegin');
      session.setTabSize(4);
      session.setUseSoftTabs(true);
      session.setUseWrapMode(true);

      editor.focus();
    };

    this.aceChanged = function () {
      vm.notes[vm.index] = vm.note;
      localStorageService.set('notes', vm.notes);
    };

    this.titleChanged = function () {
      if(vm.note.title == ''){
        vm.note.title = 'Untitled';
      }
      vm.notes[vm.index] = vm.note;
      localStorageService.set('notes', vm.notes);
    };

    this.addNewNote = function () {
      var newNote = {
        title: 'Untitled',
        data: ''
      };
      vm.notes.push(newNote);

      vm.index = vm.notes.indexOf(newNote);
      vm.note = newNote;
    };

    this.removeCurrentNote = function () {
      vm.notes.splice(vm.index, 1);
      if (vm.notes.length > 0) {
        vm.selectNote(vm.notes[vm.notes.length - 1]);
      }
      else {
        vm.addNewNote();
      }
      localStorageService.set('notes', vm.notes);
    }

    this.selectNote = function (note) {
      vm.index = vm.notes.indexOf(note);
      vm.note = note;
    }
  }
  ]);