declare module Routing {
    class Routes {
        $stateProvider: ng.ui.IStateProvider;
        $urlRouteProvider: ng.ui.IUrlRouterProvider;
        constructor($stateProvider: ng.ui.IStateProvider, $urlRouteProvider: ng.ui.IUrlRouterProvider);
        private init;
    }
}
