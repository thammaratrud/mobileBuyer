angular.module('starter.controllers', [])

  .controller('ProductCtrl', function ($scope, $http, $state) {
    $scope.getAllproduct = function () {
      $http.get('https://thamapp.herokuapp.com/api/products').success(function (database) {
        $scope.datas = database;
      });
    }
    
    $scope.detail = function (product) {
      $state.go('product-detail', { data: JSON.stringify(product) });
    }

  })
  .controller('DetailCtrl', function ($scope, $http, $stateParams, $ionicModal) {
    $scope.data = JSON.parse($stateParams.data);
    var sumqty = 0;
    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    $scope.checkqty = function (qty) {
      sumqty += parseInt(qty);
      console.log(sumqty);
      $scope.modal.hide();
    };
  })
  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })
  .controller('LogInCtrl', function ($scope, $state, AuthService) {
    $scope.credentials = {}
    $scope.doLogIn = function (credentials) {
      var login = {
        username: credentials.username,
        password: 'Usr#Pass1234'
      }
      AuthService.loginUser(login)
        .then(function (response) {
          if (response.roles[0] === 'user') {
            $state.go('tab.product');
            alert('success');
            window.localStorage.setItem('user', JSON.stringify(response));
            var appData = JSON.parse(window.localStorage.getItem('user'));
            console.log(appData);
          } else {
            alert('ไม่มีสิทธิ์');
          }


        }, function (error) {
          console.log(error);
          alert('dont success' + " " + error.data.message);
        });
      // console.log("doing sign up");

    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });

