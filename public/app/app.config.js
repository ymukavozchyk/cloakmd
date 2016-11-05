(function () {
    'use strict';

    angular
        .module('app')
        .config(AppConfig);

    AppConfig.$inject = ['$mdIconProvider'];

    function AppConfig($mdIconProvider) {
        $mdIconProvider
            .icon('exit', './assets/images/svg/exit.svg', 24)
            .icon('add', './assets/images/svg/add.svg', 24)
            .icon('remove', './assets/images/svg/remove.svg', 24)
            .icon('share', './assets/images/svg/share.svg', 24)
            .icon('notepad_menu', './assets/images/svg/notepad_menu.svg', 24)
            .icon('notepad', './assets/images/svg/notepad.svg', 24)
            .icon('warning', './assets/images/svg/warning.svg', 24)
            .icon('shared_notes', './assets/images/svg/shared_notes.svg', 24);
    }
})();