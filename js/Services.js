'use strict';
var Services;
(function (Services) {
    var $apiService = (function () {
        function $apiService($http) {
            var _this = this;
            this.$http = $http;
            this.retreiveRandomUser = function () {
                return _this.$http.get("https://randomuser.me/api/");
            };
            this.getGoodQuestions = function () {
                return _this.$http.get("https://raw.githubusercontent.com/hopet1/Random-Person/master/json/positive-questions.json");
            };
            this.getBadQuestions = function () {
                return _this.$http.get("https://raw.githubusercontent.com/hopet1/Random-Person/master/json/negative-questions.json");
            };
        }
        return $apiService;
    })();
    Services.$apiService = $apiService;
    var $helperService = (function () {
        function $helperService() {
            this.getRandomColor = function () {
                var letters = '0123456789ABCDEF'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            };
            this.getRandomInt = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };
        }
        return $helperService;
    })();
    Services.$helperService = $helperService;
    var $uiStoreService = (function () {
        function $uiStoreService() {
            var _this = this;
            this.updateCount = function (questionCount) {
                _this.questionCount = questionCount;
            };
            this.updateUserResponses = function (userResponse) {
                _this.userResponses.push(userResponse);
            };
            this.validateTestCompletion = function () {
                return _this.questionCount >= _this.totalQuestions;
            };
            this.questionCount = 0;
            this.userResponses = [];
            this.totalQuestions = 3;
        }
        return $uiStoreService;
    })();
    Services.$uiStoreService = $uiStoreService;
    var $timerService = (function () {
        function $timerService() {
            var _this = this;
            this.startTimer = function () {
                _this.startTime = new Date().getTime();
            };
            this.endTimer = function () {
                _this.endTime = new Date().getTime();
            };
            this.getRecordedTime = function () {
                return (_this.endTime - _this.startTime) / 1000;
            };
        }
        return $timerService;
    })();
    Services.$timerService = $timerService;
    angular.module('HowHuman').service('$apiService', $apiService);
    angular.module('HowHuman').service('$helperService', $helperService);
    angular.module('HowHuman').service('$uiStoreService', $uiStoreService);
    angular.module('HowHuman').service('$timerService', $timerService);
})(Services || (Services = {}));
//# sourceMappingURL=Services.js.map