app.directive('myTodo', function () {
    return {
        restrict: 'EA',
        templateUrl: 'app/directives/templates/todo.tpl.html',
        scope: {
            list: '=',
            title: '@'
        },
        controller: function ($scope) {
            $scope.add1ToDo = function () {
                newtoDo = {};
                newtoDo.name = $scope.name;
                newtoDo.completed = false;
                $scope.list.push(newtoDo);
                console.log($scope.list);
            };
        }
    };
});