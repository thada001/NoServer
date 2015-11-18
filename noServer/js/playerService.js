angular.module('eplApp').factory('playerService', function($http, $q, fdata, teamService) {
  var team = teamService.getSelectedTeam();
  var service = {};
  service.getPlayer = function(playerNum) {
    var dfd = $q.defer();
    $http({
      headers: {'X-Auth-Token': 'd69db8b392004af18d5b09fce1dba987'},
      method: 'GET',
      url: fdata.teamUrl + team + '/players',
    }).then(function(res) {
      var results = res.data.players;
      for(var i = 0; i < results.length; i++) {
        if(results[i].jerseyNumber == playerNum) {
          results[i].team = team;
          dfd.resolve(results[i]);
          break;
        }
      }
    })
    return dfd.promise;
  };
  return service;
})
