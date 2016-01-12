angular.module('app', ['ionic', 'ngCordova', 'app.controllers', 'app.services'])

.run(function($ionicPlatform, FileSysService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    FileSysService.init();
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
 
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'/*,
      resolve: {
        bookDirExists: function(FileSysService) {
           return FileSysService.initBookDir();
        }
      }*/
      
    })  
    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html',
          controller: 'SearchCtrl'
        }
      }
    })
    .state('app.library', {
      url: '/library',
      views: {
        'menuContent': {
          templateUrl: 'templates/library.html',
          controller: 'LibraryCtrl',
          resolve: {
            library: function(LibraryService) {
                return LibraryService.getBooks();
            }
          }
        }
      }
    })
    .state('app.book', {
      url: '/library/:bookId',
      views: {
        'menuContent': {
          templateUrl: 'templates/book.html',
          controller: 'BookCtrl',
          resolve: {
            book: function(LibraryService, $stateParams) {
                return LibraryService.getBook($stateParams.bookId);
            }
          }
        }
      }
    })
    .state('app.read', {
      url: '/read/:bookId',
      views: {
        'menuContent': {
          templateUrl: 'templates/read.html',
          controller: 'ReadCtrl',
          resolve: {
            book: function(LibraryService, $stateParams) {
                return LibraryService.getBook($stateParams.bookId);
            }
          }
        }
      }
    })
    .state('app.reader', {
      url: '/reader/:bookId',
      views: {
        'menuContent': {
          templateUrl: 'templates/reader.html',
          controller: 'ReaderCtrl',
          resolve: {
            book: function(LibraryService, $stateParams) {
                return LibraryService.getBook($stateParams.bookId);
            }
          }
        }
      }
    })
    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl',
          resolve: {
            library: function(LibraryService) {
                return LibraryService.getBooks();
            }
          }
        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/library');
});

var MOCK_BOOK_DATA = [
    { title: 'Chitty-Chitty-Bang-Bang (Book 1)', author: 'Ian Fleming', id: 0, image: 'chitty-chitty-bang-bang-book-1-7e0e1a.jpg', file: 'fleming-chitty-chitty-bang-bang-book-1.epub', description: "Ian Fleming, best known for his James Bond novels, wrote only one children’s book—and it is a classic! Chitty Chitty Bang Bang is the name of the flying, floating, driving-by-itself automobile that takes the Pott family on a riotous series of adventures as they try to capture a notorious gang of robbers. This is a story filled with humor, adventure, and gadgetry that only a genius like Fleming could create. The 1968 movie of the same name, starring Dick Van Dyke, was based loosely on this story." },
    { title: 'Henry VI', author: 'William Shakespeare', id: 1, image: 'henry-vi-c6f7fa.jpg', file: 'shakespeare-henry-vi.epub', description: "Displaying the bold vision and growing skill of a young playwright, these are Shakespeare’s first three history plays, covering some sixty tumultuous years of English history. Their pageantry, violence, and stirring speeches excite audiences with action as well as character, and midway through the final play in this trilogy, a shocking, clever, inimitably evil new voice is heard—that of Richard of Gloucester, destined to become England’s most fearsome and hated ruler of all time, Richard III." },
    { title: 'In the Wet', author: 'Nevil Shute', id: 2, image: 'in-the-wet-771636.jpg', file: 'shute-in-the-wet.epub', description: "Shute’s speculative glance into the future of the British Empire. An elderly clergyman stationed in the Australian bush is called to the bedside of a dying derelict. In his delirium Stevie tells a story of England in 1983 through the medium of a squadron air pilot in the service of Queen Elizabeth II. It is the rainy season. Drunk and delirious, an old man lies dying in the Queensland bush. In his opium-hazed last hours, a priest finds his deserted shack and listens to his last words. Half-awake and half-dreaming the old man tells the story of an adventure set decades in the future, in a very different world..." },
    { title: 'Nineteen Eighty-Four', author: 'George Orwell', id: 3, image: 'nineteen-eighty-four-ead60b.jpg', file: 'orwell-nineteen-eighty-four.epub', description: "It is 1984. The world is in a state of perpetual war and Big Brother sees and controls all. Winston Smith, a member of the Outer Party and propaganda-writer at the Ministry of Truth, is keeping a journal he should not be keeping and falling in love with Julia, a woman he should not be seeing. Outwardly compliant, Winston dreams of rebellion against the oppressive Big Brother, risking everything to recover his lost sense of individuality and control of his own future. One of the bestselling books of the twentieth century, 1984 is the dystopian classic that introduced such Orwellian terms as ‘Big Brother,’ ‘doublethink,’ ‘Newspeak,’ and ‘thoughtcrime’ to the collective consciousness, giving official terminology to state-sanctioned deception, surveillance, and historical revisionism." },
    { title: 'On the Beach', author: 'Nevil Shute', id: 4, image: 'on-the-beach-17a58b.jpg', file: 'shute-on-the-beach.epub', description: "After a nuclear World War III has destroyed most of the globe, the few remaining survivors in southern Australia await the radioactive cloud that is heading their way and bringing certain death to everyone in its path. Among them is an American submarine captain struggling to resist the knowledge that his wife and children in the United States must be dead. Then a faint Morse code signal is picked up, transmitting from somewhere near Seattle, and Captain Towers must lead his submarine crew on a bleak tour of the ruined world in a desperate search for signs of life. On the Beach is a remarkably convincing portrait of how ordinary people might face the most unimaginable nightmare." },
    { title: 'Playback', author: 'Raymond Chandler', id: 5, image: 'playback-77fbab.jpg', file: 'chandler-playback.epub', description: "The final complete novel by Raymond Chandler, featuring his iconic creation Philip Marlowe. Betty Mayfield is blond and beautiful and has just been found guilty of murdering her husband. But when the jundge realizes the jury is terrified of her father-in-law–the man who owns everything in this small North Carolina town–he overturns the verdict. Her father-in-law swears vengeance, and Betty flees. Seeking a new life, she meets Larry Mitchell, a brash but charming gigolo, on the train to Vancouver. He brings her to the Royal Vancouver Hotel, where she checks into a room beneath the penthouse of wealthy playboy Clark Brandon, who takes her under his wing. When Mitchell's body turns up on Betty's balcony, jaded inspector Jeff Killaine is assigned to the case, but finds himself falling for Betty. Did she do it, or was she framed?" },
    { title: 'Vendetta', author: 'Marie Corelli', id: 6, image: 'vendetta-adab99.jpg', file: 'corelli-vendetta.epub', description: "Imagine friends and family believed you were dead from the Cholera - Imagine being buried alive and awakening in your coffin - Now, imagine a frantic escape from the rotting crypt only to discover something worse waiting in store. Thus begins Marie Corelli’s suspense-thriller, Vendetta. Awakening to find he has been prematurely buried, Fabio narrowly escapes from his decrepit family mausoleum in order to seek revenge upon those who have wronged him. Disfigured from the Cholera, Fabio assumes a new identity and name, and re-introduces himself to his family who are unaware of his true character. The plan he sets in motion is gruesomely terrifying - and deliciously perverse. More than a novel of revenge, Vendetta is a finely tuned character study of madness, obsession, decadence, and a celebration of Gothic settings unrivaled by even Edgar Allan Poe. Impossible to put down, it is easy to see why Marie Corelli was called the Queen of Victorian best-sellers, for Vendetta remains as spellbinding today as it was over a century ago." }
  ];