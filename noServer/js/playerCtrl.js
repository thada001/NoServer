angular.module('eplApp').controller('playerCtrl', function($scope, playerService) {
  $scope.player = playerInfo;
  console.log($scope.player);
})
