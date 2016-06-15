angular.module('main', [])
.config(function ($stateProvider) {
  $stateProvider
  .state('main', {
    url: '/',
    templateUrl: 'app/main/main-view.html',
    controller: 'MainPageController as MainCtrl'
  });
});