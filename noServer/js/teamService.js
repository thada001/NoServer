angular.module('eplApp').factory('teamService', function($http, $q, fdata) {
  var team;
  function setTeam(id) {
    team = id;
  }

  var service = {};
  service.getSelectedTeam = function() {
    return team;
  }
  service.getTeam = function(id) {
    setTeam(id);
    return $http({
      headers: {'X-Auth-Token': 'd69db8b392004af18d5b09fce1dba987'},
      method: 'GET',
      url: fdata.teamUrl + id
    })
  };

  service.getPlayers = function(id) {
    var dfd = $q.defer();
    $http({
      headers: {'X-Auth-Token': 'd69db8b392004af18d5b09fce1dba987'},
      method: 'GET',
      url: fdata.teamUrl + id + '/players'
    }).then(function(res) {
      console.log(res);
      var result = res.data.players;
      setTeam(id);
      for (var i = 0; i <result.length; i++) {
        var today = new Date();
        var dob = Date.parse(result[i].dateOfBirth);
        var age = Math.floor((today.getTime() - dob)/1000/60/60/24/365);
        result[i].age = age;
        if (result[i].position === 'Keeper') result[i].pos = 'GK';
        if (result[i].position === 'Left-Back') result[i].pos = 'LB';
        if (result[i].position === 'Centre Back') result[i].pos = 'CB';
        if (result[i].position === 'Right-Back') result[i].pos = 'RB';
        if (result[i].position === 'Defensive Midfield') result[i].pos = 'CDM';
        if (result[i].position === 'Central Midfield') result[i].pos = 'CM';
        if (result[i].position === 'Attacking Midfield') result[i].pos = 'CAM';
        if (result[i].position === 'Right Wing') result[i].pos = 'RW';
        if (result[i].position === 'Left Wing') result[i].pos = 'LW';
        if (result[i].position === 'Centre Forward' || result[i].pos === 'Secondary Striker') result[i].pos = 'ST';
      }
      dfd.resolve(result);
    })
    return dfd.promise;
  }

  service.getFixtures = function(id) {
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
  return service;
})
