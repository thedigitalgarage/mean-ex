// public/app.js
var helloTaskList = angular.module('helloTaskList', [])

    .controller('MainCtrl', function($scope, $http) {
            $scope.formData = {};

            // when landing on the page, get all tasks and show them
            $http.get('/api/tasks')
                .then(
                    function(response) {
                        // success callback
                        $scope.tasks = response.data;
                        console.log(response.data);
                    },
                    function(error) {
                        // failure call back
                        console.log('Error: ' + error);
                    }
                );

            // when submitting the add form, send the text to the node API
            $scope.createTask = function() {
                $http.post('/api/tasks', $scope.formData)
                    .then(
                        function(response) {
                            $scope.formData = {}; // clear the form so our user is ready to enter another
                            $scope.tasks = response.data;
                            console.log(response.data);
                        },
                        function(error) {
                            console.log('Error: ' + error);
                        }
                    );
            };

            // delete a task after checking it
            $scope.deleteTask = function(id) {
                $http.delete('/api/tasks/' + id)
                    .then(
                        function(response) {
                            // success callback
                            $scope.tasks = response.data;
                            console.log(response.data);
                        },
                        function(error) {
                            // failure call back
                            console.log('Error: ' + error);
                        }
                    );
            };
        });
