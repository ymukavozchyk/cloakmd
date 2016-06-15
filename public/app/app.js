angular.module('cloakmd', [
  'ui.router',
  'ngMaterial',
  'ngMessages',
  'ui.ace',
  'ngSanitize',
  'ng-showdown',
  'main'
])
  .controller('appCtrl', ['$state',
    function ($state) {
      console.info('CloakMD is online');
      $state.go('main');
  }]);