'use strict'

module Services {
    // API Service: Handles all api calls to various endpoints.
    export class $apiService {
        /*	PROPERTIES  */

        /*	CONSTRUCTOR  */
        constructor(public $http: ng.IHttpService) { }

        /*	METHODS  */
        // Get random user JSON from 'https://randomuser.me/api/'.
        retreiveRandomUser = (): ng.IPromise<any> => {
            return this.$http.get("https://randomuser.me/api/");
        };

        // Get JSON of 'Good Questions' from JSON file on personal Github account.
        getGoodQuestions = (): ng.IPromise<any> => {
            return this.$http.get("https://raw.githubusercontent.com/hopet1/Random-Person/master/json/positive-questions.json");
        };

        // Get JSON of 'Bad Questions' from JSON file on personal Github account.
        getBadQuestions = (): ng.IPromise<any>=> {
            return this.$http.get("https://raw.githubusercontent.com/hopet1/Random-Person/master/json/negative-questions.json");
        };
    }

    // Helper Service: General functions to help with main methods on scope.
    export class $helperService {
        /*	PROPERTIES  */

        /*	CONSTRUCTOR  */
        constructor() { }

        /*	METHODS  */
        getRandomColor = (): string => {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        // Random integer generator.
        getRandomInt = (min: number, max: number): number => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

    }
    // UI Store Service: Stores all fields from current UI to be passed between states.
    export class $uiStoreService {
        /*	PROPERTIES  */
        questionCount: number;
        userResponses: any[];
        totalQuestions: number;

        /*	CONSTRUCTOR  */
        constructor() {
            this.questionCount = 0;
            this.userResponses = [];
            this.totalQuestions = 3;
        }

        /*	METHODS  */
        // Update current question count for test.
        updateCount = (questionCount: number): void => {
            this.questionCount = questionCount;
        }

        // Update user responses to questions.
        updateUserResponses = (userResponse: any): void => {
            this.userResponses.push(userResponse);
        }

        validateTestCompletion = (): boolean => {
            return this.questionCount >= this.totalQuestions;
        }

    }

    // Timer Service: Provides application with personal timer.
    export class $timerService {
        /*	PROPERTIES  */
        startTime: number;// Current time when user opens modal.
        endTime: number;// Current time when user closes modal.

        /*	CONSTRUCTOR  */
        constructor() {
        }

        /*	METHODS  */
        startTimer = (): void => {
            this.startTime = new Date().getTime();
        }

        endTimer = (): void => {
            this.endTime = new Date().getTime();
        }

        getRecordedTime = (): number => {
            return (this.endTime - this.startTime) / 1000;
        }
    }

    angular.module('HowHuman').service('$apiService', $apiService);
    angular.module('HowHuman').service('$helperService', $helperService);
    angular.module('HowHuman').service('$uiStoreService', $uiStoreService);
    angular.module('HowHuman').service('$timerService', $timerService);
}
