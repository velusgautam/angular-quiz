(function() {
    'use strict';
    angular.module("AngularQuiz").config(['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'app/templates/quiz.html',
                controller: 'QuizController',
                controllerAs: 'quiz'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

})();