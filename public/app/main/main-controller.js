angular.module('main')
  .controller('MainPageController', ['$scope', 'MainPageService', function ($scope, MainPageService) {
      console.info('Main Page Controller is online');

      var vm = this;

      this.source =
      '# CloakMD\n' +
      'GitHub flavored markdown notes with a &&twist&&\n';

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
    }
  ]);