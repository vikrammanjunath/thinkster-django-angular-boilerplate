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
            }).when('/',{
                controller: 'IndexCtrl',
                controllerAs: 'vm',
                templateUrl: 'static/templates/layout/index.html'

            }).when('/+:username',{
                controller: 'ProfileCtrl',
                controllerAs: 'vm',
                templateUrl: 'static/templates/profiles/profile.html'
            }).when('/+:username/settings',{
                controller: 'ProfileSettingsCtrl',
                controllerAs: 'vm',
                templateUrl: 'static/templates/profiles/settings.html'
            }).otherwise({redirectTo: '/'});
        }]);
})();