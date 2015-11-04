(function(){
    'use strict';

    angular.module('authentication.services')
        .factory('Authentication', ['$cookies', '$http', function($cookies, $http){
            var setAuthenticatedAccount = function(account) {
              $cookies.authenticatedAccount = JSON.stringify(account);
            };

            return {
                register: function(email, password, username){
                    return $http.post('/api/v1/accounts/', {
                        username: username,
                        password: password,
                        email: email
                    }).then(function(data){
                        //success
                        setAuthenticatedAccount(data.data);
                        window.location = '/';
                    }, function(){
                        //error
                        console.error('Registration failed');
                    });
                },
                login: function(username, password){
                    return $http.post('/api/v1/auth/login/', {
                        username: username,
                        password: password
                    }).then(function(data){
                        //success
                        setAuthenticatedAccount(data.data);
                        window.location = '/';
                    }, function(){
                        //error
                        console.error('Login failed');
                    });
                },
                getAuthenticatedAcount: function(){
                    if (!$cookies.authenticatedAccount){
                        return;
                    }
                    return JSON.parse($cookies.authenticatedAccount);
                },
                isAuthenticated: function(){
                    return !!$cookies.authenticatedAccount;
                },
                setAuthenitcatedAccount: setAuthenticatedAccount,
                unauthenticate: function(){
                    delete $cookies.authenticatedAccount;
                }

            }
        }]);

})();