(function () {
    'use strict';

    angular
        .module('app')
        .controller('ApplicationController', ApplicationController);

    //main controller
    ApplicationController.$inject = ['$state', '$rootScope', 'CredentialService'];
    function ApplicationController($state, $rootScope, CredentialService) {
        var vm = this;

        activate();

        //redirect to setup page by default
        function activate() {
            $state.go('setup');
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //check if master password is present when accessing protected state
            if (toState.data.protected === true) {
                if (!CredentialService.isPasswordPresent() === true) {
                    event.preventDefault();
                    $state.go('setup');
                }
            }
        });

        //dynamic page title
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.pageTitle = toState.data.title;
        });
    }
})();