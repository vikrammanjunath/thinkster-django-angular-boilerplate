(function(){
    'use strict';

    angular.module('notgoog', [
        'ngRoute', 'authentication', 'notgoog.config', 'layout', 'posts', 'utils'
    ]);

    angular.module('notgoog')
        .run(['$http', function($http){
            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
            $http.defaults.csrfCookieName = 'csrftoken';
        }]);
    angular.module('notgoog.config', []);
})();