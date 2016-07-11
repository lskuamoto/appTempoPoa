angular.module('starter.services', [])

.factory('ServicesFactory', [function(){

}])
.service('MetroClimaEstacoes', ['$http', '$log', '$q', 
function($http, $log, $q){
  return {
      lista: function() {
          var d = $q.defer();
          var config = {};
          var url = 'https://metroclimaestacoes.procempa.com.br/metroclima/seam/resource/rest/externalRest/ultimaLeitura';

          $http.get(url, config)
          .success(function(response){
              d.resolve(response);
          })
          .error(function(msg, code) {
              d.reject(msg);
          });

          return d.promise;
      }
  }
}])
;

