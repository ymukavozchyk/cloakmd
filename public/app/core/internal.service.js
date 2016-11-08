(function () {
    'use strict';

    angular
        .module('app.core')
        .service('InternalService', InternalService);

    /*service for pulling sample data (README.md)
    from the backend */
    InternalService.$inject = ['$http'];
    function InternalService($http) {
        var service = {
            getAbout: getAboutData
        };

        return service;

        function getAboutData() {
            return $http.get('/aboutmd');
        }
    }
})();