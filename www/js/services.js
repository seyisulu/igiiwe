angular.module('app.services', [])

.service('LibraryService', function($q) {
    return {
        getBook: function(id) {
            var dfd = $q.defer();
            setTimeout(function() {
                dfd.resolve(MOCK_BOOK_DATA[id]);
            }, 125);
            return dfd.promise;
        },
        getBooks: function() {
            var dfd = $q.defer();
            setTimeout(function() {
                dfd.resolve(MOCK_BOOK_DATA);
            }, 250);
            return dfd.promise;
        }
    }
})

.service('FileSysService', function($q, $cordovaFile) {
  var FSSvc = { appDir: "", libDir: "", ip: ionic.Platform, cf: null };
  
  FSSvc.init = function () {
    FSSvc.ip.ready(function() {
      //requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, onError);
      FSSvc.cf = cordova.file;
      FSSvc.appDir = FSSvc.cf.applicationDirectory;
      FSSvc.libDir = FSSvc.ip.isAndroid()? FSSvc.cf.externalDataDirectory: FSSvc.cf.dataDirectory;
      FSSvc.createBookDir();
    });
  };

  FSSvc.createBookDir = function() {
    var dfd = $q.defer();
    FSSvc.ip.ready(function() {
      $cordovaFile.copyDir(FSSvc.appDir, "www/library", FSSvc.libDir, "library")
      .then(function (success) {
        console.log("Copied over library directory.");
        console.log(success);
        console.log(FSSvc.appDir);
        console.log(FSSvc.libDir);
        dfd.resolve(true);
      }, function (error) {
        $cordovaFile.checkDir(FSSvc.libDir, "library")
          .then(function (success) {
            console.log("Unable to copy over library directory BECAUSE it already exists.");
            console.log(FSSvc.appDir);
            console.log(FSSvc.libDir);
            dfd.resolve(true);
          }, function (error) {
            console.log("Unable to copy over library directory AND it does not exist.");
            console.log(FSSvc.appDir);
            console.log(FSSvc.libDir);
            dfd.reject(false);
          });
      });
    });
    return dfd.promise;
  };
  
  FSSvc.getEntries = function(path) {
    var deferred = $q.defer();
    FSSvc.ip.ready(function() {
      window.resolveLocalFileSystemURL(path, function(fileSystem) {
          var directoryReader = fileSystem.createReader();
          directoryReader.readEntries(function(entries) {
              deferred.resolve(entries);
          }, function(error) {
              deferred.reject(error);
          });
      }, function(error) {
          deferred.reject(error);
      });
    });
    return deferred.promise;
  };
  
  FSSvc.getEntry = function(path) {
    var deferred = $q.defer();
    FSSvc.ip.ready(function() {
      window.resolveLocalFileSystemURL(path, function(fileSystem) {
        deferred.resolve(fileSystem);
      }, function(error) {
        deferred.reject(error);
      });
    });
    return deferred.promise;
  };
  
  FSSvc.checkFile = function(dir, file) {
    var deferred = $q.defer();
    FSSvc.ip.ready(function() {
      $cordovaFile.checkFile(dir, file)
      .then(function (success) {
        deferred.resolve(success);
      }, function (error) {
        deferred.reject(error);
      });
    });
    return deferred.promise;
  };
  
  
  
  FSSvc.getParentDirectory = function(path) {
    var deferred = $q.defer();
    FSSvc.ip.ready(function() {
      window.resolveLocalFileSystemURL(path, function(fileSystem) {
        fileSystem.getParent(function(result) {
          deferred.resolve(result);
        }, function(error) {
          deferred.reject(error);
        });
      }, function(error) {
        deferred.reject(error);
      });
    });
    return deferred.promise;
  };

  return FSSvc;
});