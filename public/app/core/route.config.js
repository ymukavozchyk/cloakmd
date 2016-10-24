(function () {
    'use strict';

    angular
        .module('app.core')
        .config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
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
            .state('shared', {
                url: '/shared',
                templateUrl: 'app/shared/shared.html',
                controller: 'SharedController',
                controllerAs: 'vm'
            });
    };
})();