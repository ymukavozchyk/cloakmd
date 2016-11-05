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
        ]);
})();