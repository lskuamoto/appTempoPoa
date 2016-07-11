angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, MetroClimaEstacoes) {
  


function onMapInit(map) {
  console.log("map initialized");
  var GOOGLE = new plugin.google.maps.LatLng(-30.099405, -51.1364904);
  map.setCenter(GOOGLE);
  map.setZoom(12);  
      
  var lista = MetroClimaEstacoes.lista();
  
  lista.then(
    function (data) { 
        $scope.estacoes = data;                      
        for (i = 0; i < $scope.estacoes.length; i++) {
            
            var GOOGLE_MARKER = new plugin.google.maps.LatLng($scope.estacoes[i].latitude, $scope.estacoes[i].longitude);    
            console.log("$scope.estacoes[i].iconePrevisao: " + $scope.estacoes[i].iconePrevisao);
            var marker = map.addMarker({
              'position': GOOGLE_MARKER,
              'title':  $scope.estacoes[i].estacao,
              /*'icon': 'blue'*/
              'icon': {
                'url': "www/img/ico_" + $scope.estacoes[i].iconePrevisao + ".png"
              }
            }, function(marker) {
              marker.showInfoWindow();
            });                            
            console.log($scope.estacoes[i]);
            
        }
        
    }, function (err) {
        console.log(err);    
    }
  );

};


$scope.createMarker = function( estacao ){
};  
  
$scope.$on('$ionicView.loaded', function(e) {
    
    
    // Define a div tag with id="map_canvas"
    var mapDiv = document.getElementById("map_canvas");

    // Initialize the map plugin
    var map = plugin.google.maps.Map.getMap(mapDiv);

    // You have to wait the MAP_READY event.
    map.on(plugin.google.maps.event.MAP_READY, onMapInit);    

    
});



  
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
