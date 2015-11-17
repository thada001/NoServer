angular.module('eplApp', ['ui.router'])
  .constant('fdata', {
    url: 'http://api.football-data.org/v1/soccerseasons/398/',
    teamUrl: 'http://api.football-data.org/v1/teams/'
  })
  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/table');
    $stateProvider
      .state('table', {
        url: '/table',
        templateUrl: 'templates/table.html',
        controller: 'tableCtrl',
        // resolve: {}
      })
      .state('team', {
        url: '/team/:teamId',
        templateUrl: 'templates/team.html',
        controller: 'teamCtrl',
        resolve: {
          teamData: function($stateParams, teamService) {
            return teamService.getTeam($stateParams.teamId);
          },
          playerData: function($stateParams, teamService) {
            return teamService.getPlayers($stateParams.teamId);
          },
          fixtureData: function($stateParams, teamService) {
            return teamService.getFixtures($stateParams.teamId);
          }
        }
      })
      .state('player', {
        url: '/player/:jerseyNumber',
        templateUrl: 'templates/player.html',
        controller: 'playerCtrl',
        resolve: {
          playerInfo: function($stateParams, playerService) {
            return playerService.getPlayer($stateParams.jerseyNumber);
          }
        }
      })
  })
