(function () {
    'use strict';

    angular
        .module('app.core')
        .service('SharingService', SharingService);

    function SharingService() {
        var selectedNoteForSharing = null;

        var service = {
            reset: reset,
            isNoteSelectedForSharing: isNoteSelectedForSharing,
            setNoteForSharing: setNoteForSharing,
            getNoteForSharing: getNoteForSharing
        }

        return service;

        function reset() {
            selectedNoteForSharing = null;
        }

        function isNoteSelectedForSharing() {
            if (selectedNoteForSharing != null) {
                return true;
            }
            return false;
        };

        function setNoteForSharing(data) {
            selectedNoteForSharing = data;
        };

        function getNoteForSharing() {
            return selectedNoteForSharing;
        };
    }
})();