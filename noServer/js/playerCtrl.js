angular.module('eplApp').controller('playerCtrl', function($scope, playerService, playerInfo) {
  $scope.playerInfo = playerInfo;
  console.log($scope.playerInfo);
})
