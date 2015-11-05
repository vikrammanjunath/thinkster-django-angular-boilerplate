(function($, _){
    angular.module('utils.services')
        .factory('SnackBar', function(){
            return {
                error: function(content, options){
                    _snackbar('Error' + content, options);
                },
                show: function(content, options){
                    _snackbar(content, options);
                }
            };

            function _snackbar(content, options){
                options = _.extend({timeout: 3000}, options);
                options.content = content;

                $.snackbar(options);
            }
        });
})($, _);

