(function() {
    'use strict'
    var app = angular.module("AngularQuiz");
    app.factory('dataService', ['$http', 'config', function($http, config) {

        var getData = function getData() {
            return $http({
                url: config.QuestionLink,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        };

        return {
            getData: getData
        }

    }])

})();