angular.module('cloakmd', [
  'ui.router',
  'ui.ace',
  'ngSanitize',
  'ng-showdown',
  'LocalStorageModule',
  'main'
])
  .config(['$showdownProvider', function($showdownProvider){
    $showdownProvider.loadExtension('hideMePlease');
  }])
  .controller('appCtrl', ['$state', '$scope',
    function ($state, $scope) {
      console.info('CloakMD is online');
      $scope.loaded = true;
      $state.go('main');
  }]);