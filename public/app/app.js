angular.module('cloakmd', [
  'ui.router',
  'ui.ace',
  'ui.bootstrap',
  'ngSanitize',
  'ng-showdown',
  'ngAnimate',
  'toaster',
  'LocalStorageModule',
  'config',
  'main'
])
  .controller('appCtrl', ['$state', '$scope',
    function ($state, $scope) {
      console.info('CloakMD is online');
      $scope.loaded = true;
      $state.go('main');
  }]);