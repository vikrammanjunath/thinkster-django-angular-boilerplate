(function(){
    'use strict';
    angular.module('posts.services')
        .factory('Posts', ['$http', function($http){
            return {
                all: function(){
                    return $http.get('/api/v1/posts/');
                },
                create: function(content){
                    return $http.post('/api/v1/posts/', {
                        content: content
                    });
                },
                get: function(username){
                    return $http.get('/api/v1/posts/' + username + '/posts/')
                }
            };
        }]);
})();