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
  }
})
