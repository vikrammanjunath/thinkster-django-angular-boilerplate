(function(){
    angular.module('notgoog')
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/register',{
                controller: 'RegisterCtrl',
                controllerAs: 'vm',
                templateUrl: 'static/templates/authentication/register.html'
            }).when('/login', {
                controller: 'LoginCtrl',
                controllerAs: 'vm',
                templateUrl: 'static/templates/authentication/login.html'
            }).otherwise({redirectTo: '/'});
        }]);
})();