(function () {
    'use strict';

    angular
        .module('app')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$state', '$rootScope', 'CredentialService'];
    function ApplicationController($state, $rootScope, CredentialService) {
        var vm = this;

        activate();

        function activate() {
            $state.go('setup');
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toState.name === 'notepad' || toState.name === 'shared') {
                if (!CredentialService.isPasswordPresent()) {
                    event.preventDefault();
                    $state.go('setup');
                }
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.pageTitle = toState.data.title;
        });
    }
})();