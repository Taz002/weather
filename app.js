// api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=2&APPID=676a2c360a8fd3a14de4610ba5a4cdf4

//module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// routes
weatherApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'homeController'
  })
  .when('/forecast', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  })
  .when('/forecast/:days', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  })
})

// services
weatherApp.service('cityService', function() {
  this.city = "New York, NY";
})

weatherApp.service('weatherService', ['$resource', function($resource) {
  this.getWeather = function(city, days) {
    var weatherAPI = $resource("//api.openweathermap.org/data/2.5/forecast/daily", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
    return weatherAPI.get({q: city, cnt: days, APPID: '676a2c360a8fd3a14de4610ba5a4cdf4' })
  }
}]);

// controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
  $scope.city = cityService.city;
  $scope.$watch('city', function() {
    cityService.city = $scope.city;
  })
}]);

weatherApp.controller('forecastController', ['$scope', '$routeParams', 'cityService', 'weatherService', function($scope, $routeParams, cityService, weatherService) {
  
  $scope.city = cityService.city;
  $scope.days = $routeParams.days || 2;
  $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);
  
  
  $scope.convertToFahrenheit = function(degK) {
    return Math.round((1.8 * (degK - 273)) +32);
  }
  
  $scope.convertToDate = function(dt) {
    return new Date(dt * 1000);
  }
  
  $scope.$watch('city', function() {
    cityService.city = $scope.city;
  })
}]);


// directives
weatherApp.directive("weatherReport", function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/weatherReport.html',
    replace: true,
    scope: {
      weatherDay: "=",
      convertToStandard: "&",
      convertToDate: "&",
      dateFormat: "@"
    }
  }
});