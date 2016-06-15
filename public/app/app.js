angular.module('cloakmd', [
  'ui.router',
  'ngMaterial',
  'ngMessages',
  'ui.ace',
  'ngSanitize',
  'ng-showdown',
  'main'
])
  .config(['$showdownProvider', function($showdownProvider){
    $showdownProvider.loadExtension('hideMePlease');
  }])
  .controller('appCtrl', ['$state',
    function ($state) {
      console.info('CloakMD is online');
      $state.go('main');
  }]);