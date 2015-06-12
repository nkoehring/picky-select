angular.module("pickyExampleApp", ['koehr.directives'])
angular.module("pickyExampleApp").controller(
  'Ctrl', ['$scope', '$document', function($scope, $document) {

    var lipsum = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur",
                  "adipiscing", "elit", "integer", "nec", "odio", "praesent",
                  "libero", "sed", "cursus", "ante", "dapibus", "diam", "nisi",
                  "nulla", "quis", "sem", "at", "nib"]

    $scope.options = lipsum.map(function(w,i) {
      return { value:"i"+i, title:w, selected:false }
    })

    $scope.getSelection = function getSelection() {
      var selection = []

      for(var i=0; i<$scope.options.length; i++) {
        var option = $scope.options[i]
        if(option.selected) selection.push(option.title)
      }

      return selection
    }
  }]
)
