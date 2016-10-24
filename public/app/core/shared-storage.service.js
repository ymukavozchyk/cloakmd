(function () {
    'use strict';

    angular
        .module('app.core')
        .service('SharedStorageService', SharedStorageService);

    SharedStorageService.$inject = ['localStorageService', 'CredentialService', 'LS_SHARED_COLLECTION'];
    function SharedStorageService(localStorageService, CredentialService, LS_SHARED_COLLECTION) {

        var encryptedSharedNotes = null;
        var sharedNotes = [];

        var service = {
            reset: reset,
            resetStorage: resetStorage,

            areNotesPresent: areNotesPresent,

            decryptNotes: decryptNotes,
            getNotes: getNotes,
            addNote: addNote,
            removeNote: removeNote
        };

        return service;

        function reset() {
            encryptedSharedNotes = null;
            sharedNotes = [];
        };

        function resetStorage() {
            localStorageService.remove(LS_SHARED_COLLECTION);
        };

        function areNotesPresent() {
            encryptedSharedNotes = localStorageService.get(LS_SHARED_COLLECTION);
            if (encryptedSharedNotes !== null) {
                return true;
            }
            return false;
        };

        function decryptNotes() {
            try {
                var decrypted = sjcl.decrypt(CredentialService.getPassword(), encryptedSharedNotes);
                sharedNotes = angular.fromJson(decrypted);
                return true;
            }
            catch (e) {
                return false;
            }
        };

        function getNotes() {
            return sharedNotes;
        };

        function addNote(note) {
            sharedNotes.push(note);
            return encryptNotes();
        };

        function removeNote(noteId){
            var tempNotes = [];
            sharedNotes.forEach(function(note){
                if(note.id !== noteId){
                    tempNotes.unshift(note);
                }
            });
            sharedNotes = tempNotes;
            return encryptNotes();
        };

        function encryptNotes(){
            try {
                var jsonData = angular.toJson(sharedNotes);
                var encrypted = sjcl.encrypt(CredentialService.getPassword(), jsonData);
                localStorageService.set(LS_SHARED_COLLECTION, encrypted);
                return true;
            }
            catch (e) {
                return false;
            }
        }
    }
})();