(function () {
    'use strict';

    angular
        .module('app.core')
        .service('SjclService', SjclService);

    //wrapper for Stanford Javascript Crypto Library
    SjclService.$inject = ['$window'];
    function SjclService($window) {
        return $window.sjcl;
    }
})();