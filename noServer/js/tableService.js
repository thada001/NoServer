angular.module('eplApp').service('tableService', function($http, $q, fdata) {
  this.getTable = function() {
    var dfd = $q.defer();
    $http({
      headers: {'X-Auth-Token': 'd69db8b392004af18d5b09fce1dba987'},
      method: 'GET',
      url: fdata.url + 'leagueTable'
    }).then(function(res) {
      var result = res.data.standing;
      for(var i = 0; i < result.length; i++) {
        var a = result[i]._links.team.href.split('/');
        result[i].id = a[a.length-1];
      }
      dfd.resolve(result);
    })
    return dfd.promise;
  };
  this.getAllFixtures = function() {
    var dfd2 = $q.defer();
    $http({
      headers: {'X-Auth-Token': 'd69db8b392004af18d5b09fce1dba987'},
      method: 'GET',
      url: fdata.url + 'fixtures'
    }).then(function(res2) {
      var result = res2.data.fixtures;
      var comp = [], up = [], results = {};
      for (var i = 0; i < result.length; i++) {
        if(result[i].status === 'FINISHED') {
          comp.push(result[i]);
        }else {
          up.push(result[i]);
        }
      }
      results.comp = comp;
      results.up = up;
      dfd2.resolve(results);
    })
    return dfd2.promise;
  }
})
