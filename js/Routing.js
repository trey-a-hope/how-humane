'use strict';
var Routing;
(function (Routing) {
    var Routes = (function () {
        function Routes($stateProvider, $urlRouteProvider) {
            var _this = this;
            this.$stateProvider = $stateProvider;
            this.$urlRouteProvider = $urlRouteProvider;
            this.init = function () {
                _this.$stateProvider.state('main', {
                    url: '/',
                    templateUrl: 'views/main.html',
                    controller: 'RandomPersonController',
                    controllerAs: 'RPC'
                });
                _this.$stateProvider.state('about', {
                    url: '/about',
                    templateUrl: 'views/about.html'
                });
                _this.$stateProvider.state('results', {
                    url: '/results',
                    templateUrl: 'views/results.html',
                    controller: 'ResultsController',
                    controllerAs: 'RC'
                });
                _this.$urlRouteProvider.otherwise('/');
            };
            this.$stateProvider = $stateProvider;
            this.init();
        }
        return Routes;
    })();
    Routing.Routes = Routes;
})(Routing || (Routing = {}));
angular.module('HowHuman').config(["$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {
        return new Routing.Routes($stateProvider, $urlRouterProvider);
    }]);
//# sourceMappingURL=Routing.js.map