(function(){
    'use strict';

    angular.module('posts.controllers')
        .controller('NewPostCtrl', ['$rootScope', '$scope', 'Authentication', 'SnackBar', 'Posts',
            function($rootScope, $scope, Authentication, SnackBar, Posts){
                var vm = this;
                vm.submit = function(){
                    $rootScope.$broadcast('post.created', {
                        content: vm.content,
                        author: {
                            username: Authentication.getAuthenticatedAcount().username
                        }
                    });
                    $scope.closeThisDialog();

                    Posts.create(vm.content).then(
                        function(){
                            //success
                            SnackBar.show('Your post was created!');
                        },
                        function(){
                            //error
                            $rootScope.$broadcast('post.created.error');
                            SnackBar.show('Oops. Couldn\'t create your post');
                        })
                };
            }]);
})();