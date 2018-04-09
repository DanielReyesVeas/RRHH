'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:EmpresasCtrl
 * @description
 * # EmpresasCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
	.controller('EmpresasCtrl', function ($scope, $location, $route, $filter, $rootScope, $timeout, $uibModal, Notification, empresa, constantes, $localStorage) {
   
    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;
    var empresaActual = $rootScope.globals.currentUser.empresa;
    var mutuales;
    var cajas;

    $scope.getEmpresas = function(){
      $rootScope.cargando = true;
      var datos = empresa.empresasSistema().get();
      datos.$promise.then(function(response){
        $rootScope.cargando = false;      
      });
    }

    $scope.open = function (emp) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/forms/form-nueva-empresa.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'ModalFormEmpresaCtrl',
        size: 'lg',
        backdrop:'static',
        resolve: {
          objeto : function(){
            return emp.datos;
          },
          mutuales : function(){
            return mutuales;
          },
          cajas : function(){
            return cajas;
          },
          anios : function(){
            return emp.anios;
          }
        }
      });
      modalInstance.result.then(function (obj) {
        Notification.success({message: obj.mensaje, title: 'Mensaje del Sistema'});
        if(obj.crear){
          $scope.cambiarEmpresa(obj.empresa);
        }else if(obj.editar){          
          if(obj.empresa.id===empresaActual.id){
            $scope.cambiarEmpresa(obj.empresa);
          }else{
            $scope.cargarDatos();
          }
        }
      }, function () {
        javascript:void(0);
      });
    };

    $scope.cargarDatos = function(){
      $rootScope.cargando=true;
      $scope.cargado=false;

      var listado=false;
      var emp = empresa.datos().get();
      emp.$promise.then(function(response){
        $scope.datos = response.empresas;
        mutuales = response.mutuales;
        cajas = response.cajas;

        delete $localStorage.globals.currentUser.empresas;
        delete $rootScope.globals.currentUser.empresas;
        $localStorage.globals.currentUser.empresas=[];
        $rootScope.globals.currentUser.empresas=[];

        $rootScope.cargando=true;
        var datosEmp = empresa.listaSelect().query();
        datosEmp.$promise.then(function(response2){

          if( response2.length > 0 ){
            for( var ind in response2 ){
              if( response2[ind].id ){
                $localStorage.globals.currentUser.empresas.push( response2[ind] );
                if( $rootScope.globals.currentUser.empresa.id === response2[ind].id ){
                  listado=true;
                }
              }
            }
          }
          /*
          if(!listado && response2.length > 0 ){
              $scope.$parent.cambiarEmpresa( response2[0].id );
          }
          */
          $rootScope.cargando=false;
          $scope.cargado=true;
        });
      });
    };    

    $scope.editar = function(emp){
      $rootScope.cargando=true;
      var datos = empresa.datos().get({id:emp.id});
      datos.$promise.then(function(response){
        $scope.open( response );
        $rootScope.cargando=false;
      });
    };

    $scope.eliminar = function(emp){
      $rootScope.cargando=true;
      $scope.result = empresa.datos().delete({ id: emp.id });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          var empresa = { id : null };
          if(response.empresas.length>0){
            empresa = response.empresas[0];
          }
          $scope.cambiarEmpresa(empresa);
        }else{
          Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
        }
      });
    };

    $scope.toolTipEdicion = function( nombre ){
    	return 'Editar los datos de la Empresa: <b>' + nombre + '</b>';
    };

    $scope.cargarDatos();
      
  })
  .controller('ModalFormEmpresaCtrl', function ($scope, $route, mutuales, anios, cajas, $rootScope, $timeout, $http, $uibModal, $uibModalInstance, $filter, Notification, objeto, empresa, constantes, $localStorage) {

    var anioActual = parseInt( $filter('date')(new Date(), 'yyyy') );
    $scope.mutuales = angular.copy(mutuales);
    $scope.cajas = angular.copy(cajas);
    $scope.anios=[];
    $scope.meses = angular.copy(constantes.MESES); 
    $scope.niveles = [ 1, 2, 3, 4, 5 ];
    $scope.isZona = false;   
    $scope.isCentro = false;   
    $scope.isEdit = false;    
    $scope.isSanna = false;
    $scope.isCollapsed = true;

    $scope.cambiarAnioInicial = function(){
      if($scope.objeto.anioInicial>2017){
        $scope.objeto.mutual.tasaFija = 0.90;
        if($scope.objeto.anioInicial==2018){
          $scope.objeto.mutual.extraordinaria = 0.015;
          $scope.objeto.mutual.sanna = 0.015;
        }else if($scope.objeto.anioInicial==2019){
          $scope.objeto.mutual.extraordinaria = 0.01;
          $scope.objeto.mutual.sanna = 0.02;
        }else{
          $scope.objeto.mutual.extraordinaria = 0;
          $scope.objeto.mutual.sanna = 0.03;
        }
      }else{
        $scope.objeto.mutual.tasaFija = 0.95;        
        $scope.objeto.mutual.extraordinaria = 0;
        $scope.objeto.mutual.sanna = 0;
      }
      $scope.objeto.mutual.tasaAdicional = 0;
      $scope.isSanna = ($scope.objeto.anioInicial > 2017);
      console.log($scope.objeto)
    } 

    $scope.cambiarAnio = function(){
      cambiarMutual();
      cambiarCaja();      
      $scope.isSanna = ($scope.objeto.anio.nombre > 2017);
    }

    if(objeto.id){
      $scope.objeto = objeto;
      $scope.anios = angular.copy(anios);
      $scope.objeto.fotografiaBase64='';            
      $scope.objeto.anio = $filter('filter')( $scope.anios, { nombre :  anioActual }, true )[0];
      if(!$scope.objeto.anio){
        $scope.objeto.anio = $scope.anios[0];
      }
      $scope.cambiarAnio();
    }else{
      for( var i=anioActual; i >= 2010; i--){
        $scope.anios.push(i);
      }
      $scope.objeto = { impuestoUnico : 'e', anioInicial : $scope.anios[0], proporcionalLicencias : false, proporcionalInasistencias : false, mesInicial : $scope.meses[0], sis : true, mutual : { tasaFija : 0.9, tasaAdicional : 0, extraordinaria : 0.15, sanna : 0.15, codigo : null, id : $scope.mutuales[0].id }, caja : { codigo : null, id : $scope.cajas[0].id }, tipoGratificacion : 'm', gratificacion : 'e', zona : 0.00, topeGratificacion : 4.75, centroCosto : false, nivelesCentroCosto : 0, cme : false, zonasImpuestoUnico : [], centrosCosto : [], saludCompleta : false, licencias30 : false, ingresos30 : false, finiquitos30 : false };
      $scope.objeto.caja = $filter('filter')( $scope.cajas, { id :  $scope.objeto.caja.id }, true )[0];
      $scope.objeto.mutual = $filter('filter')( $scope.mutuales, { id :  $scope.objeto.mutual.id }, true )[0];
      $scope.cambiarAnioInicial();
      $scope.objeto.mutual.codigo = null;
      $scope.objeto.caja.codigo = null;
      $scope.objeto.fotografiaBase64='';      
    }
    
    $scope.imagen={};
    $scope.erroresDatos = {};

    $scope.empresas = [
      { id:100000, empresa:'Ninguna' }
    ];

    var empresas = empresa.listaSelect().query();
    empresas.$promise.then(function(response){
      if( response.length > 0 ){
        for( var ind in response ){
          if( response[ind].id ){
            $scope.empresas.push(response[ind]);
          }
        }
      }
    });

    if( $scope.objeto.logo ){
      $scope.logo = constantes.URL + 'stories/' + objeto.logo;
    }else{
      $scope.logo = 'images/dashboard/EMPRESAS.png';
    }

    $scope.getComunas = function(val){
      return $http.get( constantes.URL + 'comunas/buscador/json', {
        params: {
          termino: val
        }
      }).then(function(response){
        return response.data.map(function(item){
          return item;
        });
      });
    };

    $scope.ocultarProgressBar = function(){
      $scope.creandoImagen=false;
      $scope.valorPB=0;
    };

    $scope.cambiarGratificacion = function(tipo){
      if(tipo === 'mensual'){
        if($scope.objeto.gratificacionMensual){
          $scope.objeto.gratificacionAnual = false;          
        }else{
          $scope.objeto.gratificacionAnual = true;          
        }
      }
      if(tipo === 'anual'){
        if($scope.objeto.gratificacionAnual){
          $scope.objeto.gratificacionMensual = false;
        }else{
          $scope.objeto.gratificacionMensual = true;          
        }
      }
    }

    $scope.cambiarCentroCosto = function(){
      if($scope.objeto.centroCosto){
        $scope.objeto.nivelesCentroCosto = 1;
        $scope.objeto.centrosCosto = [{ nombre : 'Nivel 1', edit : false }];
      }else{
        $scope.objeto.nivelesCentroCosto = 0;
        $scope.objeto.centrosCosto = [];
      }
    }

    $scope.cambiarNiveles = function(){
      $scope.objeto.centrosCosto = [];
      for(var i=0,len=$scope.objeto.nivelesCentroCosto; i<len; i++){
        $scope.objeto.centrosCosto.push({ nombre : 'Nivel ' + (i+1), edit : false });
      }
    }    

    $scope.cambiarMutual = function(){
      var anio;
      if($scope.objeto.id){
        anio = $scope.objeto.anio.nombre;
      }else{
        anio = $scope.objeto.anioInicial;
      }
      if(anio>2017){
        $scope.objeto.mutual.tasaFija = 0.90;
        if(anio==2018){
          $scope.objeto.mutual.extraordinaria = 0.015;
          $scope.objeto.mutual.sanna = 0.015;
        }else if(anio==2019){
          $scope.objeto.mutual.extraordinaria = 0.01;
          $scope.objeto.mutual.sanna = 0.02;
        }else{
          $scope.objeto.mutual.extraordinaria = 0;
          $scope.objeto.mutual.sanna = 0.03;
        }
      }else{
        $scope.objeto.mutual.tasaFija = 0.95;        
        $scope.objeto.mutual.extraordinaria = 0;
        $scope.objeto.mutual.sanna = 0;
      }
      $scope.objeto.mutual.tasaAdicional = 0;
      $scope.objeto.mutual.codigo = null;
      console.log($scope.objeto)
    }

    $scope.cambiarCaja = function(){
      $scope.objeto.caja.codigo = null;
    }

    function cambiarMutual(){
      if($scope.objeto.id){
        if($scope.objeto.mutual){
          var actual = $filter('filter')( $scope.objeto.mutuales, { id :  $scope.objeto.mutual.idMutual }, true )[0];
          var index = $scope.objeto.mutuales.indexOf(actual);
          $scope.objeto.mutuales[index].mutual = { id : $scope.objeto.mutual.id, nombre : $scope.objeto.mutual.nombre };
          $scope.objeto.mutuales[index].codigo = $scope.objeto.mutual.codigo;
          $scope.objeto.mutuales[index].tasaFija = $scope.objeto.mutual.tasaFija;
          $scope.objeto.mutuales[index].tasaAdicional = $scope.objeto.mutual.tasaAdicional;
          $scope.objeto.mutuales[index].extraordinaria = $scope.objeto.mutual.extraordinaria;
          $scope.objeto.mutuales[index].sanna = $scope.objeto.mutual.sanna;
        }
        console.log($scope.objeto)
        var mutual = $filter('filter')( $scope.objeto.mutuales, { idAnio :  $scope.objeto.anio.id }, true )[0];
        $scope.objeto.mutual = $filter('filter')( $scope.mutuales, { id :  mutual.mutual.id }, true )[0];
        $scope.objeto.mutual.codigo = mutual.codigo;
        $scope.objeto.mutual.tasaFija = mutual.tasaFija;
        $scope.objeto.mutual.tasaAdicional = mutual.tasaAdicional;
        $scope.objeto.mutual.extraordinaria = mutual.extraordinaria;
        $scope.objeto.mutual.sanna = mutual.sanna;
        $scope.objeto.mutual.idMutual = mutual.id;
      }
    }

    function cambiarCaja(){
      if($scope.objeto.id){
        if($scope.objeto.caja){
          var actual = $filter('filter')( $scope.objeto.cajas, { id :  $scope.objeto.caja.idCaja }, true )[0];
          var index = $scope.objeto.cajas.indexOf(actual);
          $scope.objeto.cajas[index].caja = { id : $scope.objeto.caja.id, nombre : $scope.objeto.caja.nombre };
          $scope.objeto.cajas[index].codigo = $scope.objeto.caja.codigo;
        }
        var caja = $filter('filter')( $scope.objeto.cajas, { idAnio :  $scope.objeto.anio.id }, true )[0];
        $scope.objeto.caja = $filter('filter')( $scope.cajas, { id :  caja.caja.id }, true )[0];
        $scope.objeto.caja.codigo = caja.codigo;
        $scope.objeto.caja.idCaja = caja.id;
      }
    }

    $scope.obtenerImagenB64 = function(){
      $scope.objeto.fotografiaBase64 = '';
      $scope.creandoImagen=true;
      $timeout(function(){
        var base64;
        var fileReader = new FileReader();
        fileReader.onload = function (event){
          base64 = event.target.result;
          $scope.objeto.fotografiaBase64 = base64;
          $timeout(function(){
              $scope.ocultarProgressBar();
          }, 250);
        };
        fileReader.readAsDataURL( $scope.imagen.flow.files[0].file );      
      }, 1000);
    };

    $scope.agregarZona = function(){
      if($scope.isZona){
        $scope.isZona = false;
        $scope.isEdit = false;
      }else{
        $scope.tituloZona = 'Agregar Zona';
        $scope.isZona = true;
      }
    }

    $scope.updateZona = function(zona){
      $scope.isZona = false;
      $scope.isEdit = false;

      $scope.objeto.zonasImpuestoUnico[$scope.zonaIndex].nombre = zona.nombre;
      $scope.objeto.zonasImpuestoUnico[$scope.zonaIndex].porcentaje = zona.porcentaje;

      $scope.zona.nombre = "";
      $scope.zona.porcentaje = null;
    }

    $scope.guardarZona = function(){
      var zona = angular.copy($scope.zona);
      $scope.objeto.zonasImpuestoUnico.push(zona);
      $scope.isZona = false;
      $scope.zona.nombre = "";
      $scope.zona.porcentaje = null;
    }

    $scope.editarZona = function(zona){
      $scope.tituloZona = 'Modificar no Zona';
      $scope.zonaIndex = $scope.objeto.zonasImpuestoUnico.indexOf(zona);
      $scope.isZona = true;
      $scope.isEdit = true;
      $scope.zona = { nombre : zona.nombre, porcentaje : zona.porcentaje };
    }

    $scope.eliminarZona = function(zona){
      var index = $scope.objeto.zonasImpuestoUnico.indexOf(zona);
      $scope.objeto.zonasImpuestoUnico.splice(index,1);
    }

    $scope.updateCentro = function(centro){
      $scope.isCentro = false;
      $scope.objeto.centrosCosto[$scope.centroIndex] = { nombre : centro.nombre, edit : false };
      centro.nombre = "";
    }

    $scope.editarCentro = function(centro){
      $scope.centroIndex = $scope.objeto.centrosCosto.indexOf(centro);
      for(var i=0,len=$scope.objeto.centrosCosto.length; i<len; i++){
        $scope.objeto.centrosCosto[i].edit = false;
      }
      $scope.objeto.centrosCosto[$scope.centroIndex].edit = true;
      $scope.isCentro = true;
      centro.nombre = centro.nombre;
    }

    $scope.guardar = function () {
      $rootScope.cargando=true;
      var response;
      cambiarMutual();
      cambiarCaja();

      if( $scope.objeto.id ){
        response = empresa.datos().update({id:$scope.objeto.id}, $scope.objeto);
      }else{
        $scope.objeto.mesInicial.fecha = $scope.objeto.anioInicial + "-" + $scope.objeto.mesInicial.fecha;
        response = empresa.datos().create({}, $scope.objeto);
      }
      response.$promise.then(
        function(response){
          if(response.success){                        
            if( response.modMenu ){
              delete $localStorage.globals.currentUser.menu;
              delete $rootScope.globals.currentUser.menu;
              delete $localStorage.globals.currentUser.accesos;
              delete $rootScope.globals.currentUser.accesos;
              delete $localStorage.globals.currentUser.default;
              delete $rootScope.globals.currentUser.default;
              delete $localStorage.globals.currentUser.empresa;
              delete $rootScope.globals.currentUser.empresa;
              $localStorage.globals.currentUser.menu=response.menu.menu;
              $rootScope.globals.currentUser.menu=response.menu.menu;

              $localStorage.globals.currentUser.accesos=response.menu.accesos;
              $rootScope.globals.currentUser.accesos=response.menu.accesos;

              $localStorage.globals.currentUser.default=response.menu.inicio;
              $rootScope.globals.currentUser.default=response.menu.inicio;

              $localStorage.globals.currentUser.empresa=response.menu.empresa;
              $rootScope.globals.currentUser.empresa=response.menu.empresa;
            }
            $uibModalInstance.close({ mensaje : response.mensaje, empresa : response, crear : response.crear, editar : response.editar });            
          }else{
            Notification.error({message: response.mensaje, title:'Notificación del Sistema'});
            $scope.erroresDatos = response.errores;
            $rootScope.cargando=false;
          }
        }
      );
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.errores = function(name){
      var s = $scope.form[name];
      return s.$invalid && s.$touched;
    };
  });






/*


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


CREATE TABLE IF NOT EXISTS `afps` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;



INSERT INTO `afps` (`codigo`,`nombre`, `updated_at`, `created_at`) VALUES
('96572800-7', 'Banmédica','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('96856780-2', 'Consalud','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('96502530-8', 'Vida Tres','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('76296619-0', 'Colmena','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('96501450-0', 'Isapre Cruz Blanca S.A.','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('61603000-0', 'Fonasa','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('79566720-2', 'Chuquicamata','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('96504160-5', 'Óptima Isapre','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('76334370-7', 'Institución de Salud Previsional Fusat','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('71235700-2', 'Isapre Bco. Estado','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('96522500-5', 'Más Vida','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('89441300-K', 'Río Blanco','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('79906120-1', 'San Lorenzo Isapre','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('76521250-2', 'Cruz del Norte','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('70360100-6', 'Asociación Chilena de Seguridad ACHS','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('70285100-9', 'Mutual de Seguridad CCHC','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('70015580-3', 'Instituto de Seguridad del Trabajo IST','2017-07-03 16:12:03', '2015-07-03 21:57:09'),
('61533000-0', 'Instituto de Seguridad Laboral ISL','2017-07-03 16:12:03', '2015-07-03 21:57:09');






*/