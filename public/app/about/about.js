(function () {
    'use strict';

    angular
        .module('app.about')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['InternalService'];
    function AboutController(InternalService) {
        var vm = this;

        vm.data = '';
        vm.hideLoader = false;

        activate();

        function activate() {
            //pulls README.md from the backend
            InternalService.getAbout()
                .then(function (res) {
                    vm.data = res.data;
                    vm.hideLoader = true;
                });
        }
    }
})();