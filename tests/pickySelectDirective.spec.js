describe('pickySelect', function() {
  var $document,
      $compile,
      $scope,
      $element

  beforeEach(module('koehr.directives'))

  beforeEach(inject(function(_$document_, _$compile_, _$rootScope_, $templateCache){
    $document = _$document_
    $compile = _$compile_
    $scope = _$rootScope_
    $templateCache.put("picky-select.html", "<div><div>juicy markup</div></div>")
    //$templateCache.put(
    //  "picky-select.html",
    //  "<div>" +
    //  " <input class='picky-select-search'></input>" +
    //  " <div>juicy markup</div>" +
    //  "</div>"
    //)
  }));

  beforeEach(function() {
    $element = $compile("<div picky-select></div>")($scope)
    $scope.$digest()
  })

  it("will totally replace everything", function() {
    expect($element.html()).toContain("juicy markup")
  })

  it("will toggle the element on click", function() {
    $element.triggerHandler("click")
    expect($element.hasClass("open")).toBeTruthy()
    $element.triggerHandler("click")
    expect($element.hasClass("open")).toBeFalsy()
  })

  it("will close the element on outside click", function() {
    $element.triggerHandler("click")
    $document.triggerHandler("click")
    expect($element.hasClass("open")).toBeFalsy()
  })

  it("listens for document click only once", function() {
    $element.triggerHandler("click")
    $document.triggerHandler("click")
    $element.addClass("open")
    $document.triggerHandler("click")
    expect($element.hasClass("open")).toBeTruthy()
  })

  it("will not close on search element click", function() {
    var $searchEl = angular.element("<input class='picky-select-search'>"),
        clickEvent = {type: "click", target: $searchEl[0]}

    $element.append($searchEl)
    $element.triggerHandler(clickEvent)
    expect($element.hasClass("open")).toBeFalsy()
  })

})
