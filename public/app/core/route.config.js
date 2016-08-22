(function () {
    'use strict';

    angular
        .module('app.core')
        .config(Config);

    Config.$inject = ['$stateProvider'];

    function Config($stateProvider) {
        $stateProvider
            .state('setup', {
                url: '/',
                templateUrl: 'app/setup/setup.html',
                controller: 'SetupController',
                controllerAs: 'vm'
            })
            .state('notepad', {
                url: '/notepad',
                templateUrl: 'app/notepad/notepad.html',
                controller: 'NotepadController',
                controllerAs: 'vm'
            })
            .state('share', {
                url: '/share',
                templateUrl: 'app/share/share.html',
                controller: 'ShareController',
                controllerAs: 'vm'
            });
    };
})();