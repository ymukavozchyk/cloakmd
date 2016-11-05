(function () {
    'use strict';

    angular
        .module('app.core')
        .service('CredentialService', CredentialService);

    function CredentialService() {
        var password = null;

        var service = {
            reset: reset,
            isPasswordPresent: isPasswordPresent,
            setPassword: setPassword,
            getPassword: getPassword
        };

        return service;

        function reset(){
            password = null;
        }

        function isPasswordPresent() {
            if (password !== null) {
                return true;
            }
            return false;
        }

        function setPassword(value) {
            password = value;
        }

        function getPassword() {
            return password;
        }
    }
})();