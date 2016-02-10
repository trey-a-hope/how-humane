declare module Services {
    class $apiService {
        $http: ng.IHttpService;
        constructor($http: ng.IHttpService);
        retreiveRandomUser: () => ng.IPromise<any>;
        getGoodQuestions: () => ng.IPromise<any>;
        getBadQuestions: () => ng.IPromise<any>;
    }
    class $helperService {
        constructor();
        getRandomColor: () => string;
        getRandomInt: (min: number, max: number) => number;
    }
    class $uiStoreService {
        questionCount: number;
        userResponses: any[];
        totalQuestions: number;
        constructor();
        updateCount: (questionCount: number) => void;
        updateUserResponses: (userResponse: any) => void;
        validateTestCompletion: () => boolean;
    }
    class $timerService {
        startTime: number;
        endTime: number;
        constructor();
        startTimer: () => void;
        endTimer: () => void;
        getRecordedTime: () => number;
    }
}
