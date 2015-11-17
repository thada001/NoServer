angular.module('eplApp').controller('tableCtrl', function($scope, tableService) {
  $scope.getTable = function() {
    tableService.getTable().then(function(res) {
      $scope.teams = res;
    });
  }();
})
