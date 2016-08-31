(function () {
    'use strict';

    angular
        .module('app',
        [
            'ngMaterial',
            'app.core',
            'app.config',
            'app.shared',
            'app.notepad',
            'app.setup',
            'app.share'
        ])
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$state', '$rootScope', 'CredentialService', 'SharingService'];
    function ApplicationController($state, $rootScope, CredentialService, SharingService) {
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
                if (!SharingService.isNoteSelectedForSharing()) {
                    event.preventDefault();
                    $state.go('notepad');
                }
            }
        });
    };
})();