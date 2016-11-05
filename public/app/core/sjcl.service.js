(function () {
    'use strict';

    angular
        .module('app.core')
        .service('SjclService', SjclService);

    SjclService.$inject = ['$window'];
    function SjclService($window) {
        return $window.sjcl;
    }
})();