import module from '../app-module.js';

module.controller('rootCtrl', ['$rootScope', '$route', function ($rootScope, $route) {

        if ($route.current){
            $rootScope.activeTab = $route.current.activeTab;
        }
   
}]);
