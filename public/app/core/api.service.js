(function () {
    'use strict';

    angular
        .module('app.core')
        .service('ApiService', ApiService);

    ApiService.$inject = ['$http', 'API_URL'];
    function ApiService($http, API_URL) {
        var service = {};

        return service;
    };
})();