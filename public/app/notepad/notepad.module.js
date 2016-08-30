(function () {
    'use strict';

    angular
        .module('app.notepad', [
            'LocalStorageModule',
            'ui.ace',
            'ng-showdown'
        ])
        .config(function ($mdIconProvider) {
            $mdIconProvider
                .icon("menu", "./assets/images/svg/menu.svg", 24)
                .icon("exit", "./assets/images/svg/exit.svg", 24)
                .icon("add", "./assets/images/svg/add.svg", 24)
                .icon("remove", "./assets/images/svg/remove.svg", 24)
                .icon("share", "./assets/images/svg/share.svg", 24)
                .icon("note", "./assets/images/svg/note.svg", 24);
        });
})();