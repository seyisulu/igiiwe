/* global ePub */
/* global Epub */
/* global Monocle */
/* global zip */
/* global angular */
/* global cordova */
/* global ionic */
angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  $scope.curBook = false;
  //$scope.bookDirExists = bookDirExists;
})

.controller('LibraryCtrl', function($scope, library, $ionicListDelegate) {
  $ionicListDelegate.closeOptionButtons(); //TODO: fix
  $scope.library = library;
  $scope.searcher = { title: "" };
})

.controller('BookCtrl', function ($scope, LibraryService, book) {
  $scope.book = book;
  $scope.onSwipeRight = function () {
    console.log("Swiping right.");
    LibraryService.getBook($scope.book.id+1).then(function (data) { $scope.book = data; });
  };
})

.controller('ReadCtrl', function ($scope, book, FileSysService) {
  $scope.book = book;
  $scope.ddir = FileSysService.appDir+'www/library/file/';
  $scope.file = $scope.ddir + book.file;
  $scope.data = false;
  
  $scope.onSwipeRight = function () {
    console.log('Swiping...');
  };
  
  $scope.bookNext = function () { $scope.Book.nextPage(); console.log('Next'); };
  $scope.bookPrev = function () { $scope.Book.prevPage(); console.log('Prev'); };
  
  EPUBJS.Render.Iframe.prototype.setLeft = function(leftPos){
    this.docEl.style["-webkit-transform"] = 'translate('+ (-leftPos) + 'px, 0)';
  };
  
  FileSysService.checkFile($scope.ddir, book.file).then(function (result) {
    $scope.data = result;
    $scope.data.file(function (file) {
      $scope.reader = new FileReader();
      $scope.reader.onloadend = function (evt) {
        $scope.Book = ePub(evt.target.result, {
            version: 4,
            restore: false, // Skips parsing epub contents, loading from localstorage instead
            storage: 'ram', // true (auto) or false (none) | override: 'ram', 'websqldatabase', 'indexeddb', 'filesystem'
            spreads: false, // Displays two columns
            fixedLayout: false, //-- Will turn off pagination
            styles: { }, // Styles to be applied to epub
            width: parseInt(window.getComputedStyle(document.getElementById('area')).width),
            height: parseInt(window.getComputedStyle(document.getElementById('area')).height)
        });
        $scope.Book.renderTo('area');
      };
      $scope.reader.readAsArrayBuffer(file);
    });
  });

})

.controller('SearchCtrl', function ($scope, $stateParams) {
})

.controller('SettingsCtrl', function ($scope, $stateParams) {
});
