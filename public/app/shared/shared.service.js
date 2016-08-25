(function () {
    'use strict';

    angular
        .module('app.shared')
        .service('SharedService', SharedService);

    function SharedService() {
        var service = {};
        return service;
    }
})();