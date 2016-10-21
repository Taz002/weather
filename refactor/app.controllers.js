(function() {
  angular
    .module('weatherApp')
    .controller('HomeController', HomeController);
  
  function HomeController($scope, cityService) {
    var vm = this;
    vm.city = cityService.city;
    
    $scope.$watch('vm.city', function() {
      cityService.city = vm.city;
    });
  }
})();