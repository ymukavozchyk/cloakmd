(function () {
    'use strict';

    angular
        .module('app.share')
        .controller('SharedController', SharedController);

    function SharedController() {
        var vm = this;

        activate();

        function activate() { }
    }
})();