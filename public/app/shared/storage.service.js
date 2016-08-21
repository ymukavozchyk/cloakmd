(function () {
    'use strict';

    angular
        .module('app.shared')
        .service('StorageService', StorageService);

    StorageService.$inject = ['localStorageService', 'CredentialService'];
    function StorageService(localStorageService, CredentialService) {
        var sampleData =
            '# CloakMD\n' +
            'GitHub flavored markdown notes with a twist\n';
        var sampleNotes = [{
            title: 'Untitled',
            data: sampleData,
            publicKey: null,
            expirationDate: null
        }];
        var localStorageData = null;
        var notes = null;

        var service = {
            areNotesPresent: areNotesPresent,
            setNotes: setNotes,
            getNotes: getNotes,
            decryptNotes: decryptNotes,
            resetNotes: resetNotes
        };

        return service;

        function areNotesPresent() {
            localStorageData = localStorageService.get('data');
            if (localStorageData != null) {
                return true;
            }
            else {
                return false;
            }
        };

        function resetNotes() {
            localStorageService.clearAll();
        };

        function setNotes(data) {
            if (data != null) {
                notes = data;
                try {
                    var jsonData = angular.toJson(notes);
                    var encrypted = sjcl.encrypt(CredentialService.getPassword(), jsonData);
                    localStorageService.set('data', encrypted);
                    return true;
                }
                catch (e) {
                    return false;
                }
            }
        };

        function getNotes() {
            if (notes != null) {
                return notes;
            }
            else {
                return sampleNotes;
            }
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