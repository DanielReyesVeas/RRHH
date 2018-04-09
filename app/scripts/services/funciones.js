'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.funciones
 * @description
 * # funciones
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('funciones', function () {
   
    // Public API here
    return {
        verificadorRut: function (rut) {
            rut = rut.replace(/\.|\-/gi, '');
            var secuencia = new Array (3,2,7,6,5,4,3,2);
            
            var resto , verificador;
            if(rut.length < 9){
                rut = '0' + rut;    
            }
            
            for(var a=0; a < 8; a++){
                if(isNaN(parseInt(rut.charAt(a))) ){
                    return false;
                }
            }
                    
            var suma = 0;
            var indice = 0;
            while(indice < 8){
                suma = suma + ((parseInt(secuencia[indice])) * (parseInt(rut.charAt(indice))));   
                indice++;
            }
            resto = suma % 11;
            verificador = 11 - resto;
            if( verificador === rut.charAt(8)){
                return true;
            }
            var veri22 = rut.charAt(8);
            if( ( verificador === 10 ) && (  veri22.toLowerCase() === 'k' ) ){
                return true;
            }
            if( ( verificador === 11 ) && (  veri22 === 0 ) ){
                return true;
            }
            return false;
          }
      };
  });
