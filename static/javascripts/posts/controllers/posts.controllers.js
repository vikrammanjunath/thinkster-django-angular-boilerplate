(function(){
    'use strict';

    angular.module('posts.controllers')
        .controller('PostsCtrl', ['$scope', function($scope){
            var vm = this;

            vm.columns = [];
            activate();

            function activate(){
                $scope.$watchCollection(function(){
                    return $scope.posts;
                }, render);
                $scope.$watchCollection(function(){
                    return $(window).width();
                }, render);

            }

            function sum(m, n){
                return m+n;
            }

            function columnMapFn(column){
                var lengths = column.map(function(element){
                   return element.content.length;
                });
                return lengths.reduce(sum, 0) * column.length;
            }
            function approximateShortestColumn(){
                var scores = vm.columns.map(columnMapFn);
                return scores.indexOf(Math.min.apply(this, scores));
            }

            function calculateNumberOfColumns(){
                var width = $(window).width();
                if (width >= 1200){
                    return 4;
                } else if (width >= 992){
                    return 3;
                } else if (width >= 768){
                    return 2;
                } else {
                    return 1;
                }
            }

            function render(current, original) {
                if (current !== original){
                    vm.columns = [];
                    var numColumns = calculateNumberOfColumns();
                    for(var i = 0; i < numColumns; ++i){
                        vm.columns.push([]);
                    }
                    for(var i = 0; i < current.length; ++i )
                    {
                        var column = approximateShortestColumn();
                        vm.columns[column].push(current[i]);
                    }
                }
            }
        }]);
})();