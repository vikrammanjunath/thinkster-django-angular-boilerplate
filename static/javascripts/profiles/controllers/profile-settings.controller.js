(function(){
    'use strict';
    angular.module('profiles.controllers')
        .controller('ProfileSettingsCtrl', ['$location', '$routeParams', 'Authentication', 'Profile', 'SnackBar',
            function($location, $routeParams, Authentication, Profile, SnackBar){
                var vm = this;
                vm.destroy = function(){
                    Profile.destroy(vm.profile).then(
                        function(data, status, headers, config){
                            // success
                            Authentication.unauthenticate();
                            window.location = '/';
                            SnackBar.show('Your account has been deleted.')
                        },
                        function(data, status, headers, config){
                            // error
                            SnackBar.show(data.error);
                        }
                    );
                };
                vm.update = function(){
                    Profile.update(vm.profile).then(
                        function(data, status, headers, config){
                            // success
                            SnackBar.show('Your profile has been updated');
                        },
                        function(data, status, headers, config){
                            // error
                            SnackBar.show(data.error);
                        }
                    );
                };

                activate();

                function activate(){
                    var authenticatedAccount = Authentication.getAuthenticatedAcount();
                    var username = $routeParams.username.substr(1);

                    if(!authenticatedAccount) {
                        $location.url('/');
                        SnackBar.error('You aren\'t logged in.');
                    } else {
                        if (authenticatedAccount.username !== username) {
                            $location.url('/');
                            SnackBar.error('You can\'t edit someone else\'s profile.');
                        }
                    }
                    Profile.get(username).then(
                        function(data, status, headers, config){
                            // success
                            vm.profile = data.data;
                        },
                        function(data, status, headers, config){
                            // error
                            $location.url('/');
                            SnackBar.error('Couldn\'t load that user\'s profile');
                        }
                    );
                }

            }]);
})();