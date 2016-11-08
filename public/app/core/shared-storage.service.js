(function () {
    'use strict';

    angular
        .module('app.core')
        .service('SharedStorageService', SharedStorageService);

    
    //service for handling shared notes
    SharedStorageService.$inject = ['CredentialService', 'SjclService', 'LS_SHARED_COLLECTION'];
    function SharedStorageService(CredentialService, SjclService, LS_SHARED_COLLECTION) {

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
        }

        function resetStorage() {
            localStorage.removeItem(LS_SHARED_COLLECTION);
        }

        //checks if notes are present in local storage and fetches them
        function areNotesPresent() {
            encryptedSharedNotes = localStorage.getItem(LS_SHARED_COLLECTION);
            if (encryptedSharedNotes !== null) {
                return true;
            }
            return false;
        }

        function decryptNotes() {
            try {
                var decrypted = SjclService.decrypt(CredentialService.getPassword(), encryptedSharedNotes);
                sharedNotes = angular.fromJson(decrypted);
                return true;
            }
            catch (e) {
                return false;
            }
        }

        function getNotes() {
            return sharedNotes;
        }

        function addNote(note) {
            sharedNotes.push(note);
            return encryptNotes();
        }

        function removeNote(noteId){
            var tempNotes = [];
            sharedNotes.forEach(function(note){
                if(note.id !== noteId){
                    tempNotes.unshift(note);
                }
            });
            sharedNotes = tempNotes;
            return encryptNotes();
        }

        function encryptNotes(){
            try {
                var jsonData = angular.toJson(sharedNotes);
                var encrypted = SjclService.encrypt(CredentialService.getPassword(), jsonData);
                localStorage.setItem(LS_SHARED_COLLECTION, encrypted);
                return true;
            }
            catch (e) {
                return false;
            }
        }
    }
})();