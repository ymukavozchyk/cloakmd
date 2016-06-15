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
  .controller('appCtrl', ['$state', '$scope',
    function ($state, $scope) {
      console.info('CloakMD is online');
      $scope.loaded = true;
      $state.go('main');
  }]);