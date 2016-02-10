'use strict';
var Filters;
(function (Filters) {
    var capitalize = function () {
        return function (input, all) {
            return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }) : '';
        };
    };
    angular.module('HowHuman').filter('capitalize', capitalize);
})(Filters || (Filters = {}));
//# sourceMappingURL=Filters.js.map