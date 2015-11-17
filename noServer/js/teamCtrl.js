angular.module('eplApp').controller('teamCtrl', function($scope, teamService, teamData, playerData, fixtureData) {
  $scope.teamData = teamData.data;
  $scope.players = playerData;
  $scope.fixtures = fixtureData;
  console.log($scope.teamData);
  console.log($scope.players);
  console.log($scope.fixtures);
})
