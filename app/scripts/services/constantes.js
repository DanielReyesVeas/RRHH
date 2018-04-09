'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.constantes
 * @description
 * # constantes
 * Constant in the angularjsApp.
 */
angular.module('angularjsApp')
  	.constant('constantes', {
  		URL : 1 ?  'http://rrhh.easysystems.test/' : '',
	 	MESES : [
	 		{ id:1 , mes:'Enero', abrev:'Ene', fecha : '01-01' },
	 		{ id:2 , mes:'Febrero', abrev:'Feb', fecha : '02-01' },
	 		{ id:3 , mes:'Marzo', abrev:'Mar', fecha : '03-01' },
	 		{ id:4 , mes:'Abril', abrev:'Abr', fecha : '04-01' },
	 		{ id:5 , mes:'Mayo', abrev:'May', fecha : '05-01' },
	 		{ id:6 , mes:'Junio', abrev:'Jun', fecha : '06-01' },
	 		{ id:7 , mes:'Julio', abrev:'Jul', fecha : '07-01' },
	 		{ id:8 , mes:'Agosto', abrev:'Ago', fecha : '08-01' },
	 		{ id:9 , mes:'Septiembre', abrev:'Sep', fecha : '09-01' },
	 		{ id:10 , mes:'Octubre', abrev:'Oct', fecha : '10-01' },
	 		{ id:11 , mes:'Noviembre', abrev:'Nov', fecha : '11-01' },
	 		{ id:12 , mes:'Diciembre', abrev:'Dic', fecha : '12-01' }
	 	],
	 	version : '1.4.9',
	 	versionFecha : '04-04-2018'
  	});