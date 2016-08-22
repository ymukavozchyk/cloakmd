(function () {
    'use strict';

    angular
        .module('app.share')
        .controller('ShareController', ShareController);

    ShareController.$inject = ['ShareService', 'toaster'];
    function ShareController(ShareService, toaster) {
        var vm = this;


        activate();

        function activate() { }
    }
})();