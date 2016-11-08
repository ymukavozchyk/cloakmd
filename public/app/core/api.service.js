(function () {
    'use strict';

    angular
        .module('app.core')
        .service('ApiService', ApiService);

    //service which consumes application's API
    ApiService.$inject = ['$http', 'API_URL'];    
    function ApiService($http, API_URL) {
        var service = {
            share: shareNote,
            retrieve: retrieveNote,
            destroy: destroyNote
        };

        return service;

        function shareNote(data){
            return $http.post(API_URL + '/notes/share', data);
        }

        function retrieveNote(id){
            return $http.get(API_URL + '/notes/retrieve/' + id);
        }

        function destroyNote(id){
            return $http.delete(API_URL + '/notes/destroy/' + id);
        }
    }
})();