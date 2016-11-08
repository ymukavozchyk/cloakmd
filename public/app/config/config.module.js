(function() {
    'use strict';

    angular
        .module('app.config', [])
        .constant('API_URL', 'https://cloakmd.azurewebsites.net/api')
        
        //key names for local storage
        .constant('LS_NOTEPAD_COLLECTION', 'notepad')
        .constant('LS_SHARED_COLLECTION', 'shared');
})();