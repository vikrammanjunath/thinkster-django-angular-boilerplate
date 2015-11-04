(function(){
    'use strict';

    angular.module('authentication.controllers')
        .controller('LoginCtrl', ['$location', '$scope', 'Authentication',
            function($location, $scope, Authentication){
                var vm = this;
                vm.login = function(){
                    Authentication.login(vm.username, vm.password);
                };
                function activate(){
                    if(Authentication.isAuthenticated()) {
                        $location.url('/');
                    }
                }
                activate();
            }]);
})();