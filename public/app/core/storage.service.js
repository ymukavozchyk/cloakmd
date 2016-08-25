(function () {
    'use strict';

    angular
        .module('app.core')
        .service('StorageService', StorageService);

    StorageService.$inject = ['localStorageService', 'CredentialService', 'LS_NOTEPAD_COLLECTION'];
    function StorageService(localStorageService, CredentialService, LS_NOTEPAD_COLLECTION) {
        var sampleData =
            '# CloakMD\n' +
            'GitHub flavored markdown notes with a twist\n';
        var sampleNotes = [{
            title: 'Untitled',
            data: sampleData,
            publicKey: null
        }];
        var localStorageData = null;
        var notes = null;

        var service = {
            reset: reset,
            resetNotes: resetNotes,
            resetNoteForSharing: resetNoteForSharing,

            areNotesPresent: areNotesPresent,
            isNoteSelectedForSharing: isNoteSelectedForSharing,

            setNotes: setNotes,
            getNotes: getNotes,
            setNoteForSharing: setNoteForSharing,
            getNoteForSharing: getNoteForSharing,

            decryptNotes: decryptNotes
        };

        return service;

        function reset(){
            localStorageData = null;
            notes = null;
        };

        function resetNoteForSharing(){
            selectedNoteForSharing = null;
        }

        function areNotesPresent() {
            localStorageData = localStorageService.get(LS_NOTEPAD_COLLECTION);
            if (localStorageData != null) {
                return true;
            }
            return false;
        };

        function resetNotes() {
            localStorageService.clearAll();
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
            if (notes != null) {
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