(function() {
    'use strict';


    angular.module("AngularQuiz").controller('QuizController', ['$scope', 'dataService', 'logicService', 'config', function($scope, dataService, logicService, config) {
        var vm = this;

        vm.onSelect = onSelect;
        vm.quizLogic = quizLogic;
        vm.initializeQuiz = initializeQuiz;

        initializeQuiz(); //Initalize Values

        function initializeQuiz() {
            vm.buttonText = config.BUTTONS;
            vm.answered = [];
            vm.currentPage = 1;
            vm.mode = 'quiz';

            dataService.getData().then(
                function(response) {
                    quizLogic(response.data);
                },
                function(error) {
                    vm.error = "API Service is down, Coudn't fetch Questions"
                }
            )
        }


        function quizLogic(data) {
            vm.questions = (config.ShuffleQuestions) ? logicService.shuffle(data) : Array.isArray(data) ? data : [];
            vm.totalQuestions = vm.questions.length;

            $scope.$watch(
                function() { return vm.currentPage },
                function() {
                    var begin = vm.currentPage - 1;
                    var end = begin + 1;
                    vm.currentQuestion = vm.questions.slice(begin, end);
                })
        }


        function onSelect(question, clickedButton) {
            var answeredIndex = vm.buttonText.indexOf(clickedButton);
            vm.answered.push({
                question: question.text,
                answered: question.options[answeredIndex],
                isCorrect: (question.answer == answeredIndex)
            });

            vm.currentPage++;
            if (vm.currentPage > vm.totalQuestions) {
                vm.mode = 'result';
            }
        }

    }]);
})()