angular.module('eplApp').service('teamService', function($http, $q, fdata, playerService) {
  var team;
  function setTeam(id) {
    team = id;
  }

  this.getTeam = function(id) {
    setTeam(id);
    return $http({
      headers: {'X-Auth-Token': 'd69db8b392004af18d5b09fce1dba987'},
      method: 'GET',
      url: fdata.teamUrl + id
    })
  };

  this.getPlayers = function(id) {
    var dfd = $q.defer();
    $http({
      headers: {'X-Auth-Token': 'd69db8b392004af18d5b09fce1dba987'},
      method: 'GET',
      url: fdata.teamUrl + id + '/players'
    }).then(function(res) {
      console.log(res);
      var result = res.data.players;
      playerService.setTeam(id);
      for (var i = 0; i <result.length; i++) {
        var today = new Date();
        var dob = Date.parse(result[i].dateOfBirth);
        var age = Math.floor((today.getTime() - dob)/1000/60/60/24/365);
        result[i].age = age;
        if (result[i].position === 'Keeper') result[i].position = 'GK';
        if (result[i].position === 'Left-Back') result[i].position = 'LB';
        if (result[i].position === 'Centre Back') result[i].position = 'CB';
        if (result[i].position === 'Right-Back') result[i].position = 'RB';
        if (result[i].position === 'Defensive Midfield') result[i].position = 'CDM';
        if (result[i].position === 'Central Midfield') result[i].position = 'CM';
        if (result[i].position === 'Attacking Midfield') result[i].position = 'CAM';
        if (result[i].position === 'Right Wing') result[i].position = 'RW';
        if (result[i].position === 'Left Wing') result[i].position = 'LW';
        if (result[i].position === 'Centre Forward' || result[i].position === 'Secondary Striker') result[i].position = 'ST';
      }
      dfd.resolve(result);
    })
    return dfd.promise;
  }


  this.getFixtures = function(id) {
    var dfd2 = $q.defer();
    $http({
      headers: {'X-Auth-Token': 'd69db8b392004af18d5b09fce1dba987'},
      method: 'GET',
      url: fdata.teamUrl + id + '/fixtures'
    }).then(function(res) {
      var result = res.data.fixtures;
      for (var i = 0; i < result.length; i++) {
        if (result[i].status !== 'FINISHED') {
          result[i].result.goalsHomeTeam = '-';
          result[i].result.goalsAwayTeam = '-';
        }
      }
      dfd2.resolve(result);
    })
    return dfd2.promise;
  };
})
