(function () {
    'use strict';

    angular
        .module('app.core')
        .service('NotepadStorageService', NotepadStorageService);

    NotepadStorageService.$inject = ['localStorageService', 'CredentialService', 'LS_NOTEPAD_COLLECTION'];
    function NotepadStorageService(localStorageService, CredentialService, LS_NOTEPAD_COLLECTION) {
        var sampleData =
            '# CloakMD\n' +
            'GitHub flavored markdown notes with a twist\n';
        var sampleNotes = [{
            title: 'Untitled',
            data: sampleData
        }];

        var localStorageData = null;
        var notes = null;

        var service = {
            reset: reset,
            resetStorage: resetStorage,

            areNotesPresent: areNotesPresent,

            setNotes: setNotes,
            getNotes: getNotes,
            decryptNotes: decryptNotes
        };

        return service;

        function reset() {
            localStorageData = null;
            notes = null;
        };

        function resetStorage() {
            localStorageService.remove(LS_NOTEPAD_COLLECTION);
        };

        function areNotesPresent() {
            localStorageData = localStorageService.get(LS_NOTEPAD_COLLECTION);
            if (localStorageData !== null) {
                return true;
            }
            return false;
        };

        function setNotes(data) {
            notes = data;
            try {
                var jsonData = angular.toJson(notes);
                var encrypted = sjcl.encrypt(CredentialService.getPassword(), jsonData);
                localStorageService.set(LS_NOTEPAD_COLLECTION, encrypted);
                return true;
            }
            catch (e) {
                return false;
            }
        };

        function getNotes() {
            if (notes !== null) {
                return notes;
            }
            return sampleNotes;
        };

        function decryptNotes() {
            try {
                var decrypted = sjcl.decrypt(CredentialService.getPassword(), localStorageData);
                notes = angular.fromJson(decrypted);
                return true;
            }
            catch (e) {
                return false;
            }
        };
    }
})();