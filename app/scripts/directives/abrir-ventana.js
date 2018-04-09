'use strict';

/**
 * @ngdoc directive
 * @name angularjsApp.directive:abrirVentana
 * @description
 * # abrirVentana
 */
angular.module('angularjsApp')
  .directive('abrirVentana', function ($window, $sce) {
  	function trustSrc(src) {
            return $sce.trustAsResourceUrl(src);
    }
  	function abrirVentana(url, nombre, ancho, alto){
  		  var newUrl = trustSrc(url);
        var posicionX =(screen.width/2)-(ancho/2); 
        var posicionY =(screen.height/2)-(alto/2); 
        $window.open(newUrl, nombre, 'width='+ancho+',height='+alto+',left='+posicionX+',top='+posicionY+', scrollbars=yes');
  	}
    return {
      	restrict: 'A',
      	link: function postLink(scope, element, attrs) {      
        	element.bind('click', function() {
        		abrirVentana( attrs.abrirVentana, attrs.ventanaNombre, attrs.ventanaAncho, attrs.ventanaAlto);
	        });
      	}
    };
  });
