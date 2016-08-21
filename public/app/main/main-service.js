angular.module('main')
  .service('MainPageService', [ '$http', 'API_URL', 'localStorageService', function ($http, API_URL, localStorageService) {
      console.info('Main Page Service is online');

      return{
        getNotes: function(password){
          var data = localStorageService.get('data');
          if(data != null){
            var decrypted = sjcl.decrypt(password, data);
            return angular.fromJson(decrypted);
          }
          return null;
        },

        setNotes: function(data, password){
          if(data != null){
            var jsonData = angular.toJson(data);
            var encrypted = sjcl.encrypt(password, jsonData);
            localStorageService.set('data', encrypted);
          }
        },

        helloApi: function(){
          return $http.get(API_URL + '/test/hello')
        }
      }
    }
  ]);