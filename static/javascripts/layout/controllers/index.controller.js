(function(){
    'use strict';

    angular.module('layout.controllers')
        .controller('IndexCtrl', ['$scope', 'Authentication', 'Posts', 'SnackBar',
            function($scope, Authentication, Posts, SnackBar){
                var vm = this;
                vm.isAuthenticated = Authentication.isAuthenticated();
                vm.posts = [];

                activate();

               function activate(){
                   Posts.all().then(function(data){
                       // success
                       vm.posts = data.data;
                   }, function(data){
                       // error
                       SnackBar.error(data.error);
                   });
                   $scope.$on('post.created', function(event, post){
                       vm.posts.unshift(post);
                   });
                   $scope.$on('post.created.error', function(){
                       vm.posts.shift();
                   });
               }
            }]);
})();