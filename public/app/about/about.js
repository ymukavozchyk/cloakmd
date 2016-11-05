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

        function activate(){
            InternalService.getAbout().then(setAboutData, setAboutData);
        }

        function setAboutData(res){
            vm.data = res.data;
            vm.hideLoader = true;
        }
    }
})();