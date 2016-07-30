angular.module('main')
  .controller('MainPageController', ['$scope', 'localStorageService', 'toaster', 'MainPageService', function ($scope, localStorageService, toaster, MainPageService) {
    console.info('Main Page Controller is online');

    var vm = this;

    var sampleData =
      '# CloakMD\n' +
      'GitHub flavored markdown notes with a &&twist&&\n';

    var sampleNotes = [{
      title: 'Untitled',
      data: sampleData,
      publicKey: null,
      privateKey: null,
      expirationDate: null
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
      editor.setOption('scrollPastEnd', false);
      editor.setOption('maxLines', 'Infinity');

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
      vm.notes[vm.index] = vm.note;
      localStorageService.set('notes', vm.notes);
    };

    this.titleBlur = function () {
      if (vm.note.title == '') {
        vm.note.title = 'Untitled';
        vm.notes[vm.index] = vm.note;
        localStorageService.set('notes', vm.notes);
      }
    }

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

    this.publishNote = function () {
      vm.note.publicKey = "sample_public_key";
      vm.note.privateKey = "sample_private_key";
      vm.note.expirationDate = new Date();
      localStorageService.set('notes', vm.notes);
    }

    this.sayHelloToApi = function () {
      MainPageService.helloApi()
      .then(
        function success(res) {
          toaster.pop('success', 'Hello from API', res.Message);
        },
        function error(err){
          toaster.pop('success', 'Hello from API', err || 'Was not able to say hello to API');
        }
      );
    }
  }
  ]);