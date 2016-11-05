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
                controllerAs: 'vm',
                data: {
                    title: 'Setup'
                }
            })
            .state('notepad', {
                url: '/notepad',
                templateUrl: 'app/notepad/notepad.html',
                controller: 'NotepadController',
                controllerAs: 'vm',
                data: {
                    title: 'Notepad'
                }
            })
            .state('shared', {
                url: '/shared',
                templateUrl: 'app/shared/shared.html',
                controller: 'SharedController',
                controllerAs: 'vm',
                data: {
                    title: 'Shared Notes'
                }
            })
            .state('read', {
                url: '/read/:id',
                templateUrl: 'app/read/read.html',
                controller: 'ReadController',
                controllerAs: 'vm',
                data: {
                    title: 'Read Note'
                }
            })
            .state('about', {
                url: '/about',
                templateUrl: 'app/about/about.html',
                controller: 'AboutController',
                controllerAs: 'vm',
                data: {
                    title: 'About'
                }
            });
    }
})();