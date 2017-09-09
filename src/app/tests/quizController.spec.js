describe('QuizController', function() {

    var $httpBackend, $scope, createController, dataHandler, dataService, Config;

    beforeEach(module('AngularQuiz'));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        dataService = $injector.get('dataService');
        config = $injector.get('config');

        $scope = $injector.get('$rootScope');
        var data = [{
                "text": "This is the first question",
                "options": ["answer1", "answer2", "answer3", "answer4"],
                "answer": 2
            },
            {
                "text": "This is the second question",
                "options": ["answer 1", "answer 2", "answer 3", "answer 4"],
                "answer": 1
            }
        ];
        var myData;
        dataHandler = $httpBackend.when('GET', config.QuestionLink).respond(data);

        var $controller = $injector.get('$controller');
        createController = function() {
            return $controller('QuizController', { '$scope': $scope });
        };
    }));

    describe('Initialize Quiz Function', function() {

        it('Check Initalization Current Page equals One', function() {
            var controller = createController();
            expect(controller.currentPage).toEqual(1);
        });

        it('Check DataSerice  Success', function() {
            var data = [{
                    "text": "This is the first question",
                    "options": ["answer1", "answer2", "answer3", "answer4"],
                    "answer": 2
                },
                {
                    "text": "This is the second question",
                    "options": ["answer 1", "answer 2", "answer 3", "answer 4"],
                    "answer": 1
                }
            ];
            var controller = createController();
            controller.initializeQuiz();
            dataService.getData().then(function(response) {
                myData = response.data
            });
            $httpBackend.flush();
            expect(myData).toEqual(data);


        });

        it('Check DataSerice Failed', function() {
            var controller = createController();
            $httpBackend.flush();

            dataHandler.respond(401, '');
            controller.initializeQuiz();
            $httpBackend.flush();
            expect(controller.error).toEqual("API Service is down, Coudn't fetch Questions");

        });

        it('Check Initalization Answered Array is Empty', function() {
            var controller = createController();
            expect(controller.answered).toEqual([]);
        });
        it('Check Initalization Button Text is being Set is Empty', function() {
            var controller = createController();
            expect(controller.buttonText).toEqual(config.BUTTONS);
        });
    });

    describe('Quiz Logic Function', function() {
        it('Expects Questions being set', function() {
            var controller = createController();
            var data = [{
                    "text": "This is the first question",
                    "options": ["answer1", "answer2", "answer3", "answer4"],
                    "answer": 2
                },
                {
                    "text": "This is the second question",
                    "options": ["answer 1", "answer 2", "answer 3", "answer 4"],
                    "answer": 1
                }
            ];
            controller.quizLogic(data);
            expect(controller.questions).toEqual(data);
            expect(controller.totalQuestions).toEqual(data.length);
        });

        it('Expect the Current Question to be Set as New Question when watch is triggered', function() {
            var controller = createController();
            var data = [{
                    "text": "This is the first question",
                    "options": ["answer1", "answer2", "answer3", "answer4"],
                    "answer": 2
                },
                {
                    "text": "This is the second question",
                    "options": ["answer 1", "answer 2", "answer 3", "answer 4"],
                    "answer": 1
                }
            ];
            controller.quizLogic(data);
            controller.currentPage = 1;
            $scope.$digest();
            controller.currentPage = 2;
            $scope.$digest();
            expect(controller.currentQuestion).toBeDefined();
            expect(controller.currentQuestion[0]).toEqual(data[1]);
        });
    });

    describe('Shuffle Logic', function() {
        it('When Shuffle is Enabled', function() {
            config.ShuffleQuestions = true;
            var controller = createController();
            var data = [{
                    "text": "This is the first question",
                    "options": ["answer1", "answer2", "answer3", "answer4"],
                    "answer": 2
                },
                {
                    "text": "This is the second question",
                    "options": ["answer 1", "answer 2", "answer 3", "answer 4"],
                    "answer": 1
                },
                {
                    "text": "This is the third question",
                    "options": ["answer 1", "answer 2", "answer 3", "answer 4"],
                    "answer": 3
                },
                {
                    "text": "This is the fourth question",
                    "options": ["answer 1", "answer 2", "answer 3", "answer 4"],
                    "answer": 0
                },
                {
                    "text": "This is the fifth question",
                    "options": ["answer 1", "answer 2", "answer 3", "answer 4"],
                    "answer": 0
                },
                {
                    "text": "This is the sixth question",
                    "options": ["answer 1", "answer 2", "answer 3", "answer 4"],
                    "answer": 3
                },
                {
                    "text": "This is the seventh question",
                    "options": ["answer 1", "answer 2", "answer 3", "answer 4"],
                    "answer": 3
                },
                {
                    "text": "This is the eighth question",
                    "options": ["answer 1", "answer 2", "answer 3", "answer 4"],
                    "answer": 2
                }
            ];
            controller.quizLogic(data.slice(0));
            expect(controller.questions[0]).not.toEqual(data[0]);
        });

        it('onSelect of Answer Array Push check', function() {
            var controller = createController();
            var data = [{
                "text": "This is the first question",
                "options": ["answer1", "answer2", "answer3", "answer4"],
                "answer": 2
            }];
            controller.onSelect(data[0], config.BUTTONS[0]);

            expect(controller.currentPage).toEqual(2);
        });

        it('onSelect of Expect Current Page Increment', function() {
            var controller = createController();
            var data = [{
                "text": "This is the first question",
                "options": ["answer1", "answer2", "answer3", "answer4"],
                "answer": 2
            }];
            controller.onSelect(data[0], config.BUTTONS[0]);

            expect(controller.currentPage).toEqual(2);
        });

        it('onSelect of Expect Last Question Set Results', function() {
            var controller = createController();
            var data = [{
                "text": "This is the first question",
                "options": ["answer1", "answer2", "answer3", "answer4"],
                "answer": 2
            }];
            controller.totalQuestions = 1;
            controller.currentPage = 1;
            controller.onSelect(data[0], config.BUTTONS[0]);

            expect(controller.mode).toEqual('result');
        });
    });
});