(function () {
    'use strict';

    angular
        .module('app')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$state', '$rootScope', 'CredentialService', 'StorageService'];
    function ApplicationController($state, $rootScope, CredentialService, StorageService) {
        var vm = this;

        activate();

        function activate() {
            $state.go('setup');
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toState.name == 'notepad') {
                if (!CredentialService.isPasswordPresent()) {
                    event.preventDefault();
                    $state.go('setup');
                }
            }
            else if (toState.name == 'share') {
                if (!StorageService.isNoteSelectedForSharing()) {
                    event.preventDefault();
                    $state.go('notepad');
                }
            }
        });
    };
})();