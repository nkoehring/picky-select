angular.module('koehr.directives', [])
angular.module('koehr.directives').directive('pickySelect', [

  '$document', function($document) {

    var directive = {
      restrict: "A",
      replace: true,
      templateUrl: "picky-select.html",
      scope: { options: '=' },
      link: function($scope, $element, $attrs) {

        function openList() {
          $element.addClass("open")
          $document.on("click", documentClickHandler)
        }

        function closeList() {
          $element.removeClass("open")
          $document.off("click", documentClickHandler)
        }

        function documentClickHandler(evt) {
          if(evt.target.className.indexOf("picky-select") < 0) closeList()
        }

        function clickHandler(evt) {

          var $target = angular.element(evt.target)

          if(!$target.hasClass("picky-select") &&
             !$target.hasClass("picky-select-title") &&
             !$target.hasClass("picky-select-option")) {
            return
          }

          $element.hasClass("open") ? closeList() : openList()

        }

        $element.on("click", clickHandler)

        $scope.selection = null
        $scope.defaultTitle = $attrs.title
        $scope.searchPlaceholder = $attrs.searchPlaceholder

        $scope.select = function select(newValue) {

          $scope.selection = newValue
          $scope.searchTerm = ""

          if(newValue && newValue.value) {
            var value = newValue.value;
            $scope.options.forEach(function(o) { o.selected = o.value === value })
          }

        }

        //TODO: stub
        $scope.keyNavigation = function keyNavigation(evt) {
          console.log("keypress", evt)
        }
      }
    }

    return directive
  }]
)
