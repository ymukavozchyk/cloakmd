(function () {
    'use strict';

    angular
        .module('app.core')
        .config(Config);

    Config.$inject = ['$stateProvider'];

    function Config($stateProvider) {
        $stateProvider
            .state('notepad', {
                url: '/notepad',
                templateUrl: 'app/notepad/notepad.html',
                controller: 'NotepadController',
                controllerAs: 'vm'
            })
            .state('setup', {
                url: '/',
                templateUrl: 'app/setup/setup.html',
                controller: 'SetupController',
                controllerAs: 'vm'
            });
    };
})();