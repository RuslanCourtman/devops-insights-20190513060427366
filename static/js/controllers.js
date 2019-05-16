

var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);
        

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);


    function initMap() {    
    var map;
    var latlng = new google.maps.LatLng(-41.310811, 174.8860);
    // The map, centered at NZ
         
     
        
        
    map = new google.maps.Map(document.getElementById('map-name'), {
    center: latlng,
    zoom: 4
    });
        google.maps.event.addDomListener(window, "load", initMap);

    }    


ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";
    

    $scope.zip = function(which) {

        var data = "";
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        } 
               
        if(data.length) {
            $http({
                method: "GET",
                url: '/api/v1/getWeather?zip=' + data
            }).then( function(response) {
                if(which === 1) {
                    $scope.zip1City = response.data.coord;
                    $scope.zip1Weather = response.data.weather;
                        

                        var markL1 = {lat: response.data.late, lng: response.data.long};
                        
                        
                      var marker1 = new google.maps.Marker({position: markL1, map: 'map-name'});
                } else if(which === 2) {
                    $scope.zip2City = response.data.coord;
                    $scope.zip2Weather = response.data.weather;
                      var marker2 = new google.maps.Marker({position:  $scope.zip2City, map: 'map-name'});

                } else if(which === 3) {
                    $scope.zip3City = response.data.coord;
                    $scope.zip3Weather = response.data.weather;
                      var marker3 = new google.maps.Marker({position:  $scope.zip3City, map: 'map-name'});

                } else if(which === 4) {
                    $scope.zip4City = response.data.coord;
                    $scope.zip4Weather = response.data.weather;
                      var marker4 = new google.maps.Marker({position:  $scope.zip4City, map: 'map-name'});

                } 
             
            });
        } else {
            if(which === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                } else if(which === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                } else if(which === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                } else if(which === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                } 
        }
    };
    
}]);
