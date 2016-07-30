angular.module('main')
  .service('MainPageService', [ '$http', 'API_URL', function ($http, API_URL) {
      console.info('Main Page Service is online');

      return{
        helloApi: function(){
          return $http.get(API_URL + '/test/hello')
        }
      }
    }
  ]);