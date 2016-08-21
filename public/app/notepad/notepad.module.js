(function () {
    'use strict';

    angular.module('app.notepad', [
        'LocalStorageModule',
        'ui.ace',
        'ngSanitize',
        'ng-showdown',
        'ngAnimate',
        'toaster'
    ]);
})();