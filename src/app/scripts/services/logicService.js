(function() {
    'use strict'
    var app = angular.module('AngularQuiz');

    app.factory('logicService', function() {
        var shuffle = function shuffle(dataArray) {
            var index = Array.isArray(dataArray) ? dataArray.length : 0;
            var temp;
            var randomIndex = 0;

            while (0 !== index) {
                randomIndex = Math.floor(Math.random() * index);
                index = index - 1;
                temp = dataArray[index];
                dataArray[index] = dataArray[randomIndex];
                dataArray[randomIndex] = temp;
            }

            return dataArray || [];
        }

        return {
            shuffle: shuffle
        }

    });
})();