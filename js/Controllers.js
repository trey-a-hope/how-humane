angular.module("HowHuman", ['ui.bootstrap', 'ui.router']);
var Controllers;
(function (Controllers) {
    var RandomPersonController = (function () {
        function RandomPersonController($modal, $apiService, $helperService, $timerService, $uiStoreService) {
            var _this = this;
            this.$modal = $modal;
            this.$apiService = $apiService;
            this.$helperService = $helperService;
            this.$timerService = $timerService;
            this.$uiStoreService = $uiStoreService;
            this.getRandomPerson = function () {
                _this.$apiService.retreiveRandomUser().then(function (response) {
                    _this.person = response.data;
                    _this.personcolor = _this.$helperService.getRandomColor();
                    _this.updatePersonImageClass();
                });
                _this.questionAnswered = false;
            };
            this.updatePersonImageClass = function () {
                if (_this.personImageToggle ? _this.personImageClass = "zoomInDown animated" : _this.personImageClass = "zoomInUp animated")
                    ;
                _this.personImageToggle = !_this.personImageToggle;
            };
            this.getGoodQuestions = (function () {
                _this.$apiService.getGoodQuestions().then(function (response) { _this.goodQuestions = response.data; });
            });
            this.getBadQuestions = (function () {
                _this.$apiService.getBadQuestions().then(function (response) { _this.badQuestions = response.data; });
            });
            this.openTestCompleteModal = function () {
                var modalInstance = _this.$modal.open({
                    templateUrl: 'modal-templates/testComplete.html',
                    backdrop: 'static',
                    controller: 'TestCompleteModalController',
                    controllerAs: 'TCMC'
                });
            };
            this.openQuestionModal = function (type) {
                var template;
                var questions;
                _this.$timerService.startTimer();
                if (type === 'positive') {
                    template = 'modal-templates/goodQuestion.html';
                    questions = _this.goodQuestions;
                }
                else {
                    template = 'modal-templates/badQuestion.html';
                    questions = _this.badQuestions;
                }
                var modalInstance = _this.$modal.open({
                    backdrop: 'static',
                    templateUrl: template,
                    controller: 'QuestionModalController',
                    controllerAs: 'QMC',
                    resolve: {
                        questionsArray: function () { return questions; },
                        person: function () { return _this.person; }
                    }
                });
                modalInstance.result.then(function (user_response) {
                    _this.$uiStoreService.updateUserResponses(user_response);
                    _this.questionCount++;
                    _this.$uiStoreService.updateCount(_this.$uiStoreService.questionCount + 1);
                    if (_this.$uiStoreService.validateTestCompletion()) {
                        _this.testDone = true;
                        _this.openTestCompleteModal();
                    }
                    _this.questionAnswered = true;
                });
            };
            this.personImageToggle = true;
            this.questionAnswered = false;
            this.questionCount = $uiStoreService.questionCount;
            this.getRandomPerson();
            this.$apiService.getGoodQuestions().then(function (response) { _this.goodQuestions = response.data; });
            this.$apiService.getBadQuestions().then(function (response) { _this.badQuestions = response.data; });
            this.testDone = $uiStoreService.validateTestCompletion();
        }
        RandomPersonController.$inject = ['$modal', '$apiService', '$helperService', '$timerService', '$uiStoreService'];
        return RandomPersonController;
    })();
    var ResultsController = (function () {
        function ResultsController($uiStoreService) {
            var _this = this;
            this.$uiStoreService = $uiStoreService;
            this.updateSortOrder = function () {
                switch (_this.sortDirection) {
                    case "Default":
                        _this.sortOrder = "";
                        _this.sortCategory = "";
                        break;
                    case "Ascending":
                        _this.sortOrder = _this.sortCategory;
                        break;
                    case "Descending":
                        _this.sortOrder = "-" + _this.sortCategory;
                        break;
                    default:
                        break;
                }
            };
            this.userResponses = $uiStoreService.userResponses;
            this.testDone = $uiStoreService.validateTestCompletion();
            this.sortDirection = "Default";
        }
        ResultsController.$inject = ['$uiStoreService'];
        return ResultsController;
    })();
    var TestCompleteModalController = (function () {
        function TestCompleteModalController($modalInstance) {
            var _this = this;
            this.$modalInstance = $modalInstance;
            this.ok = function () {
                _this.$modalInstance.close();
            };
        }
        TestCompleteModalController.$inject = ['$modalInstance'];
        return TestCompleteModalController;
    })();
    var QuestionModalController = (function () {
        function QuestionModalController($modalInstance, $helperService, $timerService, questionsArray, person) {
            var _this = this;
            this.$modalInstance = $modalInstance;
            this.$helperService = $helperService;
            this.$timerService = $timerService;
            this.questionsArray = questionsArray;
            this.person = person;
            this.positive = function () {
                _this.$timerService.endTimer();
                var user_response = {
                    question: _this.question,
                    time: _this.$timerService.getRecordedTime(),
                    answer: "Yes",
                    personName: _this.person.results[0].user.name.first + " " + _this.person.results[0].user.name.last,
                    personImgThumbnail: _this.person.results[0].user.picture.thumbnail
                };
                _this.$modalInstance.close(user_response);
            };
            this.negative = function () {
                _this.$timerService.endTimer();
                var user_response = {
                    question: _this.question,
                    time: _this.$timerService.getRecordedTime(),
                    answer: "No",
                    personName: _this.person.results[0].user.name.first + " " + _this.person.results[0].user.name.last,
                    personImgThumbnail: _this.person.results[0].user.picture.thumbnail
                };
                _this.$modalInstance.close(user_response);
            };
            this.questionIndex = $helperService.getRandomInt(0, questionsArray.questions.length - 1);
            this.question = questionsArray.questions[this.questionIndex].question;
        }
        QuestionModalController.$inject = ['$modalInstance', '$helperService', '$timerService', 'questionsArray', 'person'];
        return QuestionModalController;
    })();
    angular.module('HowHuman').controller('RandomPersonController', RandomPersonController);
    angular.module('HowHuman').controller('ResultsController', ResultsController);
    angular.module('HowHuman').controller('QuestionModalController', QuestionModalController);
    angular.module('HowHuman').controller('TestCompleteModalController', TestCompleteModalController);
})(Controllers || (Controllers = {}));
//# sourceMappingURL=Controllers.js.map