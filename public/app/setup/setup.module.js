(function () {
    'use strict';

    angular
        .module('app.setup', [
            'ngMessages'
        ])
        .config(function ($mdIconProvider) {
            $mdIconProvider
                .icon("lock", "./assets/images/svg/lock.svg", 24);
        });;
})();