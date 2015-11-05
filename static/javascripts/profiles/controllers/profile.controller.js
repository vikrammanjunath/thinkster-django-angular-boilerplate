(function(){
    'use strict';
    angular.module('profiles.controllers')
        .controller('ProfileCtrl', ['$location', '$routeParams', 'Posts', 'Profile', 'SnackBar',
        function($location, $routeParams, Posts, Profile, SnackBar){
            var vm = this;
            vm.profile = undefined;
            vm.posts = [];

            activate();

            function activate(){
                var username = $routeParams.username.substr(1);
                Profile.get(username).then(
                    function(data, status, headers, config){
                        // success
                        vm.profile = data.data;
                    },
                    function(data, status, headers, config){
                        // error
                        $location.url('/');
                        SnackBar.error('Couldn\'t fetch that user\'s profile');
                    }
                );
                Posts.get(username).then(
                    function(data, status, headers, config){
                        // success
                        vm.posts = data.data;
                    },
                    function(data, status, headers, config){
                        // error
                        SnackBar.error(data.data.error);
                    }

                );
            }
        }]);
})();