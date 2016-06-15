angular.module('main')
  .controller('MainPageController', ['$scope', 'localStorageService', 'MainPageService', function ($scope, localStorageService, MainPageService) {
      console.info('Main Page Controller is online');

      var vm = this;

      var sample =
      '# CloakMD\n' +
      'GitHub flavored markdown notes with a &&twist&&\n';

      this.source = localStorageService.get('source') || sample;

      this.aceLoaded = function(editor){

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

      this.aceChanged = function(){
        localStorageService.set('source', vm.source);
      };
    }
  ]);