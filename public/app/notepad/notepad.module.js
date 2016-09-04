(function () {
    'use strict';

    angular
        .module('app.notepad', [
            'LocalStorageModule',
            'ui.ace',
            'ng-showdown'
        ]);
})();