'use strict';

/**
 * @ngdoc directive
 * @name angularjsApp.directive:rut
 * @description
 * # rut
 */
angular.module('angularjsApp')
    .directive('rut', function () {
        function formatearRut(valorRutOrigen, largo, extranjero){
            var valorRut = valorRutOrigen.replace(/ /g, '');
            var valor = valorRut.replace(/ /g, '');
            if(valorRutOrigen.length >= parseInt(largo)){
                valor = valorRut.substr(0, parseInt(largo)-1 );
            }

            var str1 = valor.replace(/\./g, '');
            var rutOrigen = str1.replace(/-/g, '');

            if( valorRut !== undefined ){
                var rut, i, RutF, dv;
                if( !extranjero ){
                    rut = rutOrigen.substr(0, rutOrigen.length-1);
                    dv = rutOrigen.substr( rutOrigen.length-1, 1);
                }else{
                    rut = rutOrigen;
                }

                var numeros = [];
                for( i=0; i < rut.length; i++){
                    numeros[i] = rut.charAt(i);
                }
                numeros.reverse();
                var final=[];
                for( i=0; i < numeros.length; i++){
                    final.push( numeros[i] );
                    if( (i+1) % 3 === 0 && i+1 < numeros.length ){
                        final.push( '.' );
                    }
                }
                final.reverse();

                if( !extranjero ){
                    RutF = final.join('') + '-'+dv.substr(0,1);
                }else{
                    RutF = final.join('');
                }
                return RutF;
            }else{
                return '';
            }
        }

        return {
            restrict: 'A',
            require: '?ngModel',
            scope : {
                extranjero : '='
            },
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl){ return; }

                ctrl.$formatters.unshift(function () {
                    var RutF='';
                    if( ctrl.$modelValue ){
                        RutF = formatearRut(ctrl.$modelValue, attrs.maxlength, scope.extranjero );                       
                    }
                    return RutF;
                });

                ctrl.$parsers.unshift(function (viewValue) {
                    var rutOrigen='';
                    var RutF='';
                    if( viewValue ){
                        RutF = formatearRut(viewValue, attrs.maxlength, scope.extranjero );
                        rutOrigen = RutF.replace(/-/g, '').replace(/\./g, '');
                    }
                    elem.val(RutF);
                    return rutOrigen;
                });
            }
            
        };
});
