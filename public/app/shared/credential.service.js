(function () {
    'use strict';

    angular
        .module('app.shared')
        .service('CredentialService', CredentialService);

    function CredentialService() {
        var password = null;

        var service = {
            isPasswordPresent: isPasswordPresent,
            setPassword: setPassword,
            getPassword: getPassword
        };

        return service;

        function isPasswordPresent() {
            if (password != null) {
                return true;
            }
            else {
                return false;
            }
        };

        function setPassword(value) {
            password = value;
        };

        function getPassword() {
            return password;
        };
    };
})();