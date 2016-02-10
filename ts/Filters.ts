'use strict'

module Filters {
    // Capitalizes first character in string.
    var capitalize = () => {
        return function(input: any, all: any) {
            return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt: any) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }) : '';
        }
    };

    angular.module('HowHuman').filter('capitalize', capitalize);
}
