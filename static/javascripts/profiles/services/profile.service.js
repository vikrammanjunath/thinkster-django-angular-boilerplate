(function(){
    'use strict';
    angular.module('profiles.services')
        .service('Profile', ['$http', function($http){
            return {
                destroy: function(profile){
                    return $http.delete('/api/v1/accounts/' + profile.username + '/');
                },
                get: function(username){
                    return $http.get('/api/v1/accounts/' + username + '/');
                },
                update: function(profile){
                    return $http.put('/api/v1/accounts/' + profile.username + '/', profile);
                }
            }
        }]);
})();