var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider

    .state("insertNote", {
        url: "/insertNote",
        templateUrl: "html/insertForm.ejs",
        controller: "ctrl"
    })

    .state("editNote", {
        url: "/editNote/{id}",
        templateUrl: "html/editNote.ejs",
        controller: function($scope, $http,$stateParams){
            $http.get("/notes/" + $stateParams.id ).success(function(response){
                $scope.note = response;
            });
        }
    })

    .state("addNewNote", {
        url: "/addNewNote",
        templateUrl: "html/notesList.ejs",
        controller: "ctrl"
    })

    .state("/", {
        url: "/",
        templateUrl: "html/notesList.ejs",
        controller: "ctrl"
    });

    $urlRouterProvider.otherwise('/');

});

app.controller('ctrl', function($scope, $http, $location, $state){

    if(typeof $scope.lang == "undefined")
        $scope.lang = "cz";

    $http.get("/notes").success(function(response){
        $scope.notes = response;
    });

    $scope.insertNote = function(note){
        console.log("ADD: " + note);
        if(typeof note != "undefined")
            $http.post("/notes", {title: note});
        else{
            if($scope.lang == "cz")
                alert("Nezadal jsi text poznamky!");
            else
                alert("You dont write any text of note!");
        }
        $state.go('/');
    };

    $scope.deleteNote = function(id){
        console.log("DELETE: " + id);
        $http.delete("/notes/" + id );
        $scope.notes = [];
        $http.get("/notes").success(function(response){
            $scope.notes = response;
        });
        $state.go('/');
    };

    $scope.saveNote = function(note){
        if(note.title == "" ){
            if($scope.lang == "cz")
                alert("Neplatná poznámka!");
            else
                alert("Invalid note");
        }
        else{
            $http.put("/notes/" + note.id, {id: note.id, title: note.title} );
        }
        $state.go("/");
    }

    $scope.setLang = function(language){
        $scope.lang = language;
    };
});
