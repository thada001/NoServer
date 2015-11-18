angular.module('eplApp').controller('tableCtrl', function($scope, tableService) {
  $scope.getTable = function() {
    tableService.getTable().then(function(res) {
      $scope.teams = res;
    });
  }();
  $scope.getFixtures = function() {
    tableService.getAllFixtures().then(function(res2) {
      $scope.compFix = res2.comp;
      $scope.upFix = res2.up;
      console.log(res2);
    })
  }();
  $scope.change = function() {
    $scope.completed = !$scope.completed;
  }
})
