(function () {
    'use strict';

    angular
        .module('app',
        [
            'app.core',
            'app.config',
            'app.setup',
            'app.notepad',
            'app.notepad.share',
            'app.partials.share-details',
            'app.shared',
            'app.read',
            'app.read.decrypt',
            'app.about'
        ])
        .config(function ($mdIconProvider) {
            $mdIconProvider
                .icon('exit', './assets/images/svg/exit.svg', 24)
                .icon('add', './assets/images/svg/add.svg', 24)
                .icon('remove', './assets/images/svg/remove.svg', 24)
                .icon('share', './assets/images/svg/share.svg', 24)
                .icon('notepad_menu', './assets/images/svg/notepad_menu.svg', 24)
                .icon('notepad', './assets/images/svg/notepad.svg', 24)
                .icon('warning', './assets/images/svg/warning.svg', 24)
                .icon('shared_notes', './assets/images/svg/shared_notes.svg', 24);
        });
})();