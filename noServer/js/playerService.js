angular.module('eplApp').service('playerService', function($http, fdata, teamService) {
  var team = teamService.setTeam();
  this.getPlayer = function(playerNum) {
    var dfd = $q.defer();
    $http({
      headers: {'X-Auth-Token': 'd69db8b392004af18d5b09fce1dba987'},
      method: 'GET',
      url: fdata.teamUrl + team + '/players',
    }).then(function(res) {
      var results = res.data.players;
      for(var i = 0; i < results.length; i++) {
        if(playerNum === results[i].jerseyNumber) {
          dfd.resolve(results[i]);
          break;
        }
      }
    })
    return dfd.promise;
  };
})
