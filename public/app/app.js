angular.module('cloakmd', [
  'ui.router',
  'ngMaterial',
  'ngMessages',
  'main'
])
  .controller('appCtrl', ['$state',
    function ($state) {
      console.info('CloakMD is online');
      $state.go('main');
  }]);