(function () {
    'use strict';

    angular
        .module('app.core')
        .service('NotepadStorageService', NotepadStorageService);

    //service for handling active notes
    NotepadStorageService.$inject = ['SjclService', 'CredentialService', 'LS_NOTEPAD_COLLECTION'];
    function NotepadStorageService(SjclService, CredentialService, LS_NOTEPAD_COLLECTION) {

        //encrypted notes from the local storage
        var localStorageData = null;

        //decrypted array of notes
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
        }

        function resetStorage() {
            localStorage.removeItem(LS_NOTEPAD_COLLECTION);
        }

        //checks if notes are present in the local storage and fetches them
        function areNotesPresent() {
            localStorageData = localStorage.getItem(LS_NOTEPAD_COLLECTION);
            if (localStorageData !== null) {
                return true;
            }
            return false;
        }

        /* update local var with notes, encrypt them,
        and store in the local storage */
        function setNotes(data) {
            notes = data;
            try {
                var jsonData = angular.toJson(notes);
                var encrypted = SjclService.encrypt(CredentialService.getPassword(), jsonData);
                localStorage.setItem(LS_NOTEPAD_COLLECTION, encrypted);
                return true;
            }
            catch (e) {
                return false;
            }
        }

        function getNotes() {
            return notes;
        }

        function decryptNotes() {
            try {
                var decrypted = SjclService.decrypt(CredentialService.getPassword(), localStorageData);
                notes = angular.fromJson(decrypted);
                return true;
            }
            catch (e) {
                return false;
            }
        }
    }
})();