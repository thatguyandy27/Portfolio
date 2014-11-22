'use strict';

angular.module('portfolioApp')
    .controller('rootCtrl', ['$rootScope', '$route', function ($rootScope, $route) {

        if ($route.current){
            $rootScope.activeTab = $route.current.activeTab;
        }
   
}]);
