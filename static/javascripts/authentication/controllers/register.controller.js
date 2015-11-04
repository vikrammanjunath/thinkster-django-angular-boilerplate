(function(){
    'use strict';

    angular.module('authentication.controllers')
        .controller('RegisterCtrl', ['$location', '$scope', 'Authentication', function($location, $scope, Authentication){
            var vm = this;
            this.register = function(){
                Authentication.register(vm.email, vm.password, vm.username);
            };
            function activate(){
                if(Authentication.isAuthenticated()) {
                    $location.url('/');
                }
            }
            activate();
        }]);
})();