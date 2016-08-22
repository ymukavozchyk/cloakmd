(function() {
    'use strict';

    angular
        .module('app.config', [])
        .constant('API_URL', 'https://cloakmd.azurewebsites.net/api')
        .constant('LS_NOTEPAD_COLLECTION', 'notepad');
})();