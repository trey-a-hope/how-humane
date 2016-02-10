'use strict'

module Routing {
    export class Routes {
        /*	PROPERTIES  */

        /*	CONSTRUCTOR  */
        constructor(public $stateProvider: ng.ui.IStateProvider, public $urlRouteProvider: ng.ui.IUrlRouterProvider) {
            this.$stateProvider = $stateProvider;
            this.init();
        }

        /*	METHODS  */
        private init = () => {
            // Main page view where the user will take the test.
            this.$stateProvider.state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'RandomPersonController',
                controllerAs: 'RPC'
            });

            // About page for information about website.
            this.$stateProvider.state('about', {
                url: '/about',
                templateUrl: 'views/about.html'
            });

            // Results page to view scoring after test has been completed.
            this.$stateProvider.state('results', {
                url: '/results',
                templateUrl: 'views/results.html',
                controller: 'ResultsController',
                controllerAs: 'RC'
            });

            this.$urlRouteProvider.otherwise('/');
        }
    }
}

angular.module('HowHuman').config(
    ["$stateProvider", "$urlRouterProvider",
        function($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
            return new Routing.Routes($stateProvider, $urlRouterProvider);
        }]
    );
