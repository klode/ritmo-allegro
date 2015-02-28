angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap'
    ])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    var x = 0;
    $routeProvider
        .when('/main', {
            templateUrl: 'partials/home.html',
            controller: 'EmptyCtrl'
        })
        .when('/user/profile', {
            templateUrl: 'partials/twitterTrends.html',
            controller: 'TwitterTrendsCtrl'
        })
        .otherwise({
            redirectTo: '/main'
        });
    $locationProvider.html5Mode(true);
}])
.factory('Auth', ['$http', '$window', function($http, $window){
    var service = {
        currentUser: null,
        loginOauth: function(provider) {
            $window.location.href = '/auth/' + provider;
        },
        logout: function(success, error) {
            $http.post('/logout').success(function(){
                service.currentUser = null;
                success();
            }).error(error);
        },
        requestCurrentUser: function() {
            if (service.isAuthenticated()) {
                return $q.when(service.currentUser);
            } else {
                return $http.get('/current-user').then(function(response) {
                    service.currentUser = response.data.user;
                    return service.currentUser;
                });
            }
        },
        isAuthenticated: function() {
            return !!service.currentUser;
        }
    };
    return service;
}])
.controller('NavbarCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
    $scope.loginOauth = Auth.loginOauth;
    $scope.logout = function() {
        Auth.logout(function() {
            $location.path('/');
        }, function() {
            $rootScope.error = "Failed to logout";
        });
    };

    $scope.getActive = function(path) {
        if ($location.path() === path) {
            return "active";
        } else {
            return "";
        }
    };
}])
.controller('TwitterTrendsCtrl', ['$scope', '$http', function($scope, $http){
    function loadTrends() {
        $http.get('/api/twitter/trends/worldwide')
            .then(function(response){
                $scope.trends = response.data.trends;
                $scope.locations = response.data.locations;
                $scope.asOf = new Date(response.data.as_of);
                $scope.createdAt = response.data.created_at;
                //show tweets for first trend topic
                $scope.viewLatestTeets(response.data.trends[0]);
            });
    }

    $scope.searchTwitter = function(query) {
        $http.get('/api/twitter/search?q='+query)
            .then(function(response){
                $scope.searchResults = response.data;
            });
    };

    $scope.viewLatestTeets = function(trend) {
        $scope.searchTwitter(trend.query);
        $scope.selectedTrendName = trend.name;
    };

    loadTrends();
}])
.controller('EmptyCtrl', ['$scope', function($scope){

}]);
