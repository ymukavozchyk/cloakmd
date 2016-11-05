(function () {
    'use strict';

    angular
        .module('app.core')
        .service('SjclService', SjclService);

    function SjclService($window) {
        return $window.sjcl;
    }
})();