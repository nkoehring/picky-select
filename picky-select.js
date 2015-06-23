angular.module('koehr.directives', [])
angular.module('koehr.directives').directive('pickySelect', [

  '$document', function($document) {

    function isChildOf(suggestedParent, element) {

      var parent = element.parentElement

      do {
        if(parent === null || parent === suggestedParent) break
      } while(parent = parent.parentElement)

      // parent will be null if element is no child of suggestedParent
      // and suggestedParent otherwise
      return !!parent
    }


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

          var target = evt.target

          if(!$element[0] === target || !isChildOf($element[0], target))
            closeList()

        }

        function clickHandler(evt) {

          var target = evt.target
              $target = angular.element(target)

          // do not close on search field click
          if($target.hasClass("picky-select-search") && isChildOf($element[0], target))
            return

          $element.hasClass("open") ? closeList() : openList()

        }

        if($attrs.multiSelect) {
          $element.addClass("multi-select")
        } else {
          $element.on("click", clickHandler)
        }

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
