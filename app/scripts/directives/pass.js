'use strict';

/**
 * @ngdoc directive
 * @name angularjsApp.directive:pass
 * @description
 * # pass
 */
angular.module('angularjsApp')
  .directive('iframeOnload', [function(){
    return {
      scope: {
        callBack: '&iframeOnload'
      },
      link: function(scope, element, attrs){
        element.on('load', function(){
          return scope.callBack();
        })
      }
  }}])
  /*.directive('pass', function () {
        function formatear(valor){

            var valorRut = valorRutOrigen.replace(/ /g, '');
            var valor = valorRut.replace(/ /g, '');

            var str1 = valor.replace(/\./g, '');
            var rutOrigen = str1.replace(/-/g, '');

            if( valorRut !== undefined ){
                var rut, i, RutF, dv;
                    rut = rutOrigen.substr(0, rutOrigen.length-1);
                    dv = rutOrigen.substr( rutOrigen.length-1, 1);

                var numeros = [];
                for( i=0; i < rut.length; i++){
                    numeros[i] = rut.charAt(i);
                }
                numeros.reverse();
                var final=[];
                for( i=0; i < numeros.length; i++){
                    final.push( numeros[i] );
                    if( (i+1) % 3 === 0 && i+1 < numeros.length ){
                        final.push( '*' );
                    }
                }
                final.reverse();

                RutF = final.join('') + '*';
                return RutF;
            }else{
                return '';
            }

}
        return {

            template : 'nombre : {{trabajador.rut}}<br /> OK'            
        }
  });*/
