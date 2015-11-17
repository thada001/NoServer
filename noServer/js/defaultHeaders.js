angular.module('eplApp').factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
      config.headers = {'X-Auth-Token': 'd69db8b392004af18d5b09fce1dba987'}
      return config;
    }
  };
});
