(function () {
    'use strict';

    angular
        .module('app',
        [
            'ngMaterial',
            'app.core',
            'app.config',
            'app.shared',
            'app.notepad',
            'app.setup',
            'app.share'
        ])
        .config(function ($mdIconProvider) {
            $mdIconProvider
                .icon("show_notes", "./assets/images/svg/show_notes.svg", 24)
                .icon("exit", "./assets/images/svg/exit.svg", 24)
                .icon("add", "./assets/images/svg/add.svg", 24)
                .icon("remove", "./assets/images/svg/remove.svg", 24)
                .icon("share", "./assets/images/svg/share.svg", 24)
                .icon("notepad_menu", "./assets/images/svg/notepad_menu.svg", 24);
        });
})();