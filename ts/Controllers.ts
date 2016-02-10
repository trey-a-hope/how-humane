angular.module("HowHuman", ['ui.bootstrap', 'ui.router']);
module Controllers {

    /*
    <RandomPersonController>
        $modal - Used for implementation of modal pop-up.
        $apiService - Handles all api calls to various endpoints.
        $helperService - General functions to help with main methods on scope.
        $timerService - Provides application with personal timer.
        $uiStoreService - Provides each view with stored information from application.
    */
    class RandomPersonController {
        /*	PROPERTIES  */
        personImageClass: string;//String: css animation class.
        personcolor: string; //String: css text-color.
        personImageToggle: boolean; //Boolean: Triggers addition of css classes on click.
        questionAnswered: boolean; //Boolean: Determines if the question has been answered or not.
        person: any; //JSON: person.
        goodQuestions: any; //JSON: questions.
        badQuestions: any; //JSON: questions.
        questionCount: any; //Integer: Count of number of questions answered by the user.
        testDone: boolean; //Boolean used to determine if the user has completed the test.

        /*	CONSTRUCTOR  */
        static $inject = ['$modal', '$apiService', '$helperService', '$timerService', '$uiStoreService'];
        constructor(public $modal: any, public $apiService: any, public $helperService: any, public $timerService: any, public $uiStoreService: any) {
            this.personImageToggle = true;
            this.questionAnswered = false;
            this.questionCount = $uiStoreService.questionCount;

            //Retreive first person once page loads.
            this.getRandomPerson();

            //Retreive questions once page loads.
            this.$apiService.getGoodQuestions().then((response: any) => { this.goodQuestions = response.data; });
            this.$apiService.getBadQuestions().then((response: any) => { this.badQuestions = response.data; });

            //Determine if the test has been completed yet.
            this.testDone = $uiStoreService.validateTestCompletion();
        }

        /*	METHODS  */
        //Retreive JSON data for person property. Also updated color, and image animation for user image.
        getRandomPerson = (): void => {
            this.$apiService.retreiveRandomUser().then(
                (response: any) => {
                    this.person = response.data;
                    this.personcolor = this.$helperService.getRandomColor();
                    this.updatePersonImageClass();
                }
                );
            this.questionAnswered = false;

        };

        // Update image animation for user image.
        updatePersonImageClass = (): void => {
            if (this.personImageToggle ? this.personImageClass = "zoomInDown animated" : this.personImageClass = "zoomInUp animated");
            this.personImageToggle = !this.personImageToggle;
        };

        // Retrieves an array of good questions from apiService call.
        getGoodQuestions = ((): void => {
            this.$apiService.getGoodQuestions().then(
                (response: any) => { this.goodQuestions = response.data; });
        });

        // Retrieves an array of bad questions from apiService call.
        getBadQuestions = ((): void => {
            this.$apiService.getBadQuestions().then(
                (response: any) => { this.badQuestions = response.data; });
        });

        openTestCompleteModal = (): void => {
            var modalInstance = this.$modal.open({
                templateUrl: 'modal-templates/testComplete.html',
                backdrop: 'static',
                controller: 'TestCompleteModalController',
                controllerAs: 'TCMC'
            });
        }

        // Open Question Modal.
        openQuestionModal = (type: string): void => {
            var template: string;
            var questions: any;
            this.$timerService.startTimer();

            if (type === 'positive') {
                template = 'modal-templates/goodQuestion.html';
                questions = this.goodQuestions;
            } else {
                template = 'modal-templates/badQuestion.html';
                questions = this.badQuestions;
            }

            var modalInstance = this.$modal.open({
                backdrop: 'static',
                templateUrl: template,
                controller: 'QuestionModalController',
                controllerAs: 'QMC',
                resolve: {
                    questionsArray: () => questions,
                    person: () => this.person
                }
            });

            // Modal Instance: success/failure handles with "then" and "catch". Record response.
            modalInstance.result.then(
                (user_response: any): void => {
                    this.$uiStoreService.updateUserResponses(user_response);

                    // Increment questions answered count.
                    this.questionCount++; //For current UI.
                    this.$uiStoreService.updateCount(this.$uiStoreService.questionCount + 1); //For passing between states.

                    // Set "testDone" value to true/false based on completed questions.
                    if (this.$uiStoreService.validateTestCompletion()) {
                        this.testDone = true;
                        this.openTestCompleteModal();
                    }

                    this.questionAnswered = true;
                });
        };
    }

    /*
    <ResultsController>
        $uiStoreService - Provides each view with stored information from application.
    */
    class ResultsController {
        /*   PROPERTIES   */
        userResponses: any[]; //Array that holds the user's responses.
        testDone: boolean; //Boolean used to determine if the user has completed the test.
        sortOrder: string; //Combination of sortDirection and sortCategory.
        sortDirection: string; //Ascending, Descending, or Default sort order direction.
        sortCategory: string; //Category for sort order.

        /*   CONSTRUCTOR   */
        static $inject = ['$uiStoreService']
        constructor(public $uiStoreService: any) {
            this.userResponses = $uiStoreService.userResponses;
            this.testDone = $uiStoreService.validateTestCompletion();
            this.sortDirection = "Default";
        }

        updateSortOrder = (): void => {
            switch (this.sortDirection) {
                case "Default":
                    this.sortOrder = "";
                    this.sortCategory = "";
                    break;
                case "Ascending":
                    this.sortOrder = this.sortCategory
                    break
                case "Descending":
                    this.sortOrder = "-" + this.sortCategory;
                    break;
                default:
                    break;
            }
        }
        /*   METHODS   */
    }

    class TestCompleteModalController {
        /*   PROPERTIES   */
        /*   CONSTRUCTOR   */
        static $inject = ['$modalInstance'];
        constructor(public $modalInstance: any) {

        }
        /*   METHODS   */
        ok = (): void => {
            this.$modalInstance.close();
        };
    }

    /*
    <QuestionModalController>
        $modalInstance - Represents current instance of modal being active.
        $helperService - General functions to help with main methods on scope.
        $timerService - Provides application with personal timer.
        questionsArray - Passed in array of questions from RandomPersonController.
        person - Object representation of person currently on screen.
    */
    class QuestionModalController {
        /*   PROPERTIES   */
        questionIndex: number; // Index within the array of questions.
        question: string; // Question displayed in modal.

        /*   CONSTRUCTOR   */
        static $inject = ['$modalInstance', '$helperService', '$timerService', 'questionsArray', 'person'];
        constructor(public $modalInstance: any, public $helperService: any, public $timerService: any, public questionsArray: any, public person: any) {
            this.questionIndex = $helperService.getRandomInt(0, questionsArray.questions.length - 1); // Get index for question array.
            this.question = questionsArray.questions[this.questionIndex].question;// Randomly assign new question from array.
        }

        /*   METHODS   */
        // Positive response.
        positive = (): void => {
            this.$timerService.endTimer();
            var user_response = {
                question: this.question,
                time: this.$timerService.getRecordedTime(),
                answer: "Yes",
                personName: this.person.results[0].user.name.first + " " + this.person.results[0].user.name.last,
                personImgThumbnail: this.person.results[0].user.picture.thumbnail
            };
            this.$modalInstance.close(user_response);
        };

        // Negative response.
        negative = (): void => {
            this.$timerService.endTimer();
            var user_response = {
                question: this.question,
                time: this.$timerService.getRecordedTime(),
                answer: "No",
                personName: this.person.results[0].user.name.first + " " + this.person.results[0].user.name.last,
                personImgThumbnail: this.person.results[0].user.picture.thumbnail
            };
            this.$modalInstance.close(user_response);
        };
    }

    angular.module('HowHuman').controller('RandomPersonController', RandomPersonController);
    angular.module('HowHuman').controller('ResultsController', ResultsController);
    angular.module('HowHuman').controller('QuestionModalController', QuestionModalController);
    angular.module('HowHuman').controller('TestCompleteModalController', TestCompleteModalController);
}
