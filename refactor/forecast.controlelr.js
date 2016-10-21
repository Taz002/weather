(function() {
  'use strict';
  
  angular
    .module('app')
    .controller('ForecastController', ForecastController);

    ForecastController.$inject = [
      '$scope',
      '$routeParams',
      'cityService',
      'weatherService'
    ]
    
    function ForecastController($scope, $routeParams, cityService, weatherService) {
      
    }
})();