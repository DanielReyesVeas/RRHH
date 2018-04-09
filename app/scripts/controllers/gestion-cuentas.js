'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:GestionCuentasCtrl
 * @description
 * # GestionCuentasCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('GestionCuentasCtrl', function ($scope, $uibModal, $filter, tipoHaber, tipoDescuento, $anchorScroll, aporte, constantes, mesDeTrabajo, $rootScope, Notification) {
    $anchorScroll();

    $scope.empresa = $rootScope.globals.currentUser.empresa;
    $scope.constantes = constantes;
    $scope.cargado = false;
    
    $scope.tabGeneral = true;
    $scope.tabAportes = false;
    $scope.tabAfpEmpleador = false;
    $scope.tabAfpTrabajador = false;
    $scope.tabSalud = false;
    $scope.tabSeguroCesantiaEmpleador = false;
    $scope.tabSeguroCesantiaTrabajador = false;
    $scope.tabCuentasAhorroAfp = false;
    $scope.tabApvA = false;
    $scope.tabApvB = false;
    $scope.tabApvc = false;
    $scope.tabCCAF = false;
    $scope.tabExCaja = false;
    $scope.tabHaberesImp = false;
    $scope.tabHaberesNoImp = false;
    $scope.tabDescuentos = false;
    $scope.tabDescuentosLegales = false;

    $scope.openTab = function(tab){
      switch (tab) {
        case 'generales':
          $scope.tabGeneral = true;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'aportes':
          $scope.tabGeneral = false;
          $scope.tabAportes = true;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'afpEmpleador':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = true;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'afpTrabajador':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = true;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'cuentasAhorroAfp':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = true;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'salud':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = true;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'seguroCesantiaEmpleador':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = true;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'seguroCesantiaTrabajador':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = true;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'apvA':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = true;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'apvB':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = true;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'apvc':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = true;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'exCaja':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = true;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'ccaf':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = true;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'imp':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = true;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'noImp':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = true;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales= false;
          break;
        case 'descuentos':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = true;
          $scope.tabDescuentosLegales = false;
          break;
        case 'descuentosLegales':
          $scope.tabGeneral = false;
          $scope.tabAportes = false;
          $scope.tabAfpEmpleador = false;
          $scope.tabAfpTrabajador = false;
          $scope.tabSalud = false;
          $scope.tabSeguroCesantiaEmpleador = false;
          $scope.tabSeguroCesantiaTrabajador = false;
          $scope.tabCuentasAhorroAfp = false;
          $scope.tabApvA = false;
          $scope.tabApvB = false;
          $scope.tabApvc = false;
          $scope.tabCCAF = false;
          $scope.tabExCaja = false;
          $scope.tabHaberesImp = false;
          $scope.tabHaberesNoImp = false;
          $scope.tabDescuentos = false;
          $scope.tabDescuentosLegales = true;
          break;
      }
    }
    
    $scope.editar = function(apo, tab){
      $rootScope.cargando = true;
      if($scope.empresa.centroCosto.isCentroCosto){
        var datos = aporte.centroCosto().get({ sid: apo.sid });
        datos.$promise.then(function(response){
          openFormCentrosCosto(response.datos, response.cuentas, 'aporte', tab, response.centrosCostos);
          $rootScope.cargando = false;      
        }); 
      }else{
        var datos = aporte.datos().get({ sid: apo.sid });
        datos.$promise.then(function(response){
          openForm(response.datos, response.cuentas, 'aporte', tab);            
          $rootScope.cargando = false;      
        }); 
      }
    }

    $scope.editarHaber = function(apo, tab){
      $rootScope.cargando = true;
      if($scope.empresa.centroCosto.isCentroCosto){
        var datos = tipoHaber.centroCosto().get({ sid: apo.sid });
        datos.$promise.then(function(response){
          openFormCentrosCosto(response.datos, response.cuentas, 'haber', tab, response.centrosCostos);
          $rootScope.cargando = false;      
        }); 
      }else{
        var datos = tipoHaber.cuenta().get({ sid: apo.sid });
        datos.$promise.then(function(response){
          openForm(response.datos, response.cuentas, 'haber', tab);
          $rootScope.cargando = false;      
        }); 
      }
    }

    $scope.editarDescuento = function(apo, tab){
      $rootScope.cargando = true;
      if($scope.empresa.centroCosto.isCentroCosto){
        var datos = tipoDescuento.centroCosto().get({ sid: apo.sid });
        datos.$promise.then(function(response){
          openFormCentrosCosto(response.datos, response.cuentas, 'descuento', tab, response.centrosCostos);
          $rootScope.cargando = false;      
        }); 
      }else{
        var datos = tipoDescuento.cuenta().get({ sid: apo.sid });
        datos.$promise.then(function(response){
          openForm(response.datos, response.cuentas, 'descuento', tab); 
          $rootScope.cargando = false;      
        }); 
      }
    }

    function openForm(obj, cuentas, tipo, tab) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-cuenta.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCuentaCtrl',
        resolve: {
          objeto: function () {
            return obj;
          },
          cuentas: function () {
            return cuentas;
          },
          tipo: function () {
            return tipo;
          },
          tab: function () {
            return tab;
          }
        }
      });
      miModal.result.then(function (object) {
        Notification.success({message: object.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();
        $scope.openTab(object.tab);
      }, function () {
        javascript:void(0);
      });
    };

    function openFormCentrosCosto(obj, cuentas, tipo, tab, centrosCostos) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-cuenta-centro-costo.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCuentaCentrosCostoCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;
          },
          cuentas: function () {
            return cuentas;
          },
          centrosCostos: function () {
            return centrosCostos;
          },
          tipo: function () {
            return tipo;
          },
          tab: function () {
            return tab;
          }
        }
      });
      miModal.result.then(function (object) {
        Notification.success({message: object.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();
        //$scope.openTab(object.tab);
      }, function () {
        cargarDatos();
      });
    };

    function cargarDatos(){
      $scope.cargado = false;
      $rootScope.cargando = true;
      var datos = aporte.datos().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        //$scope.isCuentas = response.isCuentas;
        $scope.aportes = response.aportes;
        $scope.afpsEmpleador = response.afpsEmpleador;
        $scope.afpsTrabajador = response.afpsTrabajador;
        $scope.salud = response.salud;
        $scope.seguroCesantiaEmpleador = response.seguroCesantiaEmpleador;
        $scope.seguroCesantiaTrabajador = response.seguroCesantiaTrabajador;
        $scope.cuentasAhorroAfps = response.cuentasAhorroAfps;
        $scope.apvsA = response.apvsA;
        $scope.apvsB = response.apvsB;
        $scope.apvcs = response.apvcs;
        $scope.ccafs = response.ccafs;
        $scope.exCajas = response.exCajas;
        $scope.haberesImp = response.haberesImp;
        $scope.haberesNoImp = response.haberesNoImp;
        $scope.descuentos = response.descuentos;
        $scope.descuentosLegales = response.descuentosLegales;
        $scope.generales = response.generales;
        $scope.centrosCostos = response.centrosCostos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

  })
  .controller('FormBuscarCuentaCtrl', function ($scope, $uibModalInstance, objeto, Notification, $rootScope, tipoHaber) {
    $scope.datos = angular.copy(objeto);    

    $scope.tiposCuenta = [
      { id:0, tipo : 'Todos'},
      { id:1, tipo : 'Activos'},
      { id:2, tipo : 'Pasivos'},
      { id:3, tipo : 'Perdidas'},
      { id:4, tipo : 'Ganancias'}
    ];

    $scope.filtro={
      filtro:'',
      tipoCuenta : $scope.tiposCuenta[0]
    };

    $scope.tipoCodigo = function(cuenta){
      if( $scope.filtro.tipoCuenta.id > 0 ){
        if( cuenta.codigo.indexOf($scope.filtro.tipoCuenta.id) === 0 ){
          return true;
        }else{
          return false;
        }
      }else{
        return true;
      }
    };

    $scope.seleccionar=function(cta){
      $uibModalInstance.close(cta);
    };


  })
  .controller('FormCuentaCentrosCostoCtrl', function ($scope, tipo, centrosCostos, tipoHaber, tab, tipoDescuento, $uibModalInstance, $filter, $uibModal, mesDeTrabajo, cuentas, objeto, Notification, $rootScope, aporte) {

    $scope.empresa = $rootScope.globals.currentUser.empresa;
    $scope.centrosCostos = angular.copy(centrosCostos);
    $scope.cuentas = angular.copy(cuentas);
    $scope.objeto = angular.copy(objeto);
    $scope.tipo = angular.copy(tipo);
    $scope.titulo = 'Modificación de Cuentas de Aportes';
    $scope.encabezado = $scope.objeto.nombre;
    $scope.isSelect = false;
    $scope.cargado = true;

    $scope.guardar = function () {
      $rootScope.cargando=true;
      var cc = { 'centrosCosto' : $scope.centrosCostos, 'concepto' : $scope.tipo, 'idConcepto' : $scope.objeto.id }

      if($scope.tipo==='aporte'){
        var response = aporte.updateCuentaCentrosCosto().post({}, cc);
      }else if($scope.tipo==='haber'){
        var response = tipoHaber.updateCuentaCentrosCosto().post({}, cc);
      }else if($scope.tipo==='descuento'){
        var response = tipoDescuento.updateCuentaCentrosCosto().post({}, cc);
      }

      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close({ mensaje : response.mensaje, tab : tab});
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      );
    };

    $scope.seleccionar = function(select){
      $scope.isSelect = select;
    }

    $scope.openCuentas = function(obj){
      var miModal = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/forms/form-buscar-cuenta.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormBuscarCuentaCtrl',
        size: '700',
        resolve: {
          objeto: function() {
            return $scope.cuentas;
          }
        }
      });
      miModal.result.then(function(cuenta) {
        obj.cuenta = cuenta;
        $scope.objeto.cuenta = cuenta;
      }, function () {
        javascript:void(0);
      });
    }

    $scope.openMasivo = function(){
      var miModal = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/forms/form-cuentas-masivo.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCuentasMasivo',
        resolve: {
          objeto: function() {
            return $scope.objeto;
          },
          tipo: function() {
            return $scope.tipo;
          },
          centrosCostos: function() {
            return $scope.centrosCostos;
          },
          cuentas: function() {
            return $scope.cuentas;
          }
        }
      });
      miModal.result.then(function(obj) {
        Notification.success({message: obj.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos(obj.sid);
      }, function () {
        javascript:void(0);
      });
    }

    function cargarDatos(sid){
      $rootScope.cargando = true;
      $scope.cargado = false;
      if($scope.tipo==='aporte'){
        var datos = aporte.centroCosto().get({ sid: sid });
      }else if($scope.tipo==='haber'){
        var datos = tipoHaber.centroCosto().get({ sid: sid });
      }else if($scope.tipo==='descuento'){
        var datos = tipoDescuento.centroCosto().get({ sid: sid });
      }      
      datos.$promise.then(function(response){
        $scope.centrosCostos = response.centrosCostos;
        $scope.cuentas = response.cuentas;
        $scope.objeto = response.datos;
        $scope.encabezado = $scope.objeto.nombre;
        $scope.isSelect = false;
        $scope.cargado = true;
        $rootScope.cargando = false;      
      }); 
    }

  })
  .controller('FormCuentasMasivo', function ($scope, tipo, centrosCostos, tipoHaber, tipoDescuento, $uibModalInstance, $filter, $uibModal, mesDeTrabajo, cuentas, objeto, Notification, $rootScope, aporte) {

    $scope.centrosCostos = angular.copy(centrosCostos);
    $scope.cuentas = angular.copy(cuentas);
    $scope.objeto = angular.copy(objeto);
    $scope.tipo = angular.copy(tipo);
    $scope.isSelect = false;
    $scope.todos = { cuenta : null };    

    $scope.guardar = function () {
      $rootScope.cargando=true;

      for(var i=0,len=$scope.centrosCostos.length; i<len; i++){
        $scope.centrosCostos[i].cuenta = $scope.todos.cuenta;
      }

      var cc = { 'centrosCosto' : $scope.centrosCostos, 'concepto' : $scope.tipo, 'idConcepto' : $scope.objeto.id }

      if($scope.tipo==='aporte'){
        var response = aporte.updateCuentaCentrosCosto().post({}, cc);
      }else if($scope.tipo==='haber'){
        var response = tipoHaber.updateCuentaCentrosCosto().post({}, cc);
      }else if($scope.tipo==='descuento'){
        var response = tipoDescuento.updateCuentaCentrosCosto().post({}, cc);
      }

      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close({ mensaje : response.mensaje , sid : $scope.objeto.sid });
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      );
    };

    $scope.seleccionar = function(select){
      $scope.isSelect = select;
    }

    $scope.openCuentas = function(obj){
      var miModal = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/forms/form-buscar-cuenta.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormBuscarCuentaCtrl',
        size: '700',
        resolve: {
          objeto: function() {
            return $scope.cuentas;
          }
        }
      });
      miModal.result.then(function(cuenta) {
        $scope.todos.cuenta = cuenta;
      }, function () {
        javascript:void(0);
      });
    }

  })
  .controller('FormCuentaCtrl', function ($scope, tipo, tipoHaber, tab, tipoDescuento, $uibModalInstance, $filter, $uibModal, mesDeTrabajo, cuentas, objeto, Notification, $rootScope, aporte) {

    $scope.empresa = $rootScope.globals.currentUser.empresa;
    $scope.cuentas = angular.copy(cuentas);
    $scope.objeto = angular.copy(objeto);
    $scope.tipo = angular.copy(tipo);
    $scope.titulo = 'Modificación de Cuentas de Aportes';
    $scope.encabezado = $scope.objeto.nombre;

    $scope.guardar = function () {
      $rootScope.cargando=true;
      if($scope.tipo==='aporte'){
        var response = aporte.updateCuenta().post({}, $scope.objeto);
      }else if($scope.tipo==='haber'){
        var response = tipoHaber.updateCuenta().post({}, $scope.objeto);
      }else if($scope.tipo==='descuento'){
        var response = tipoDescuento.updateCuenta().post({}, $scope.objeto);
      }

      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close({ mensaje : response.mensaje, tab : tab});
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      );
    };

    $scope.openCuentas = function(obj){
      var miModal = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/forms/form-buscar-cuenta.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormBuscarCuentaCtrl',
        size: '700',
        resolve: {
          objeto: function() {
            return $scope.cuentas;
          }
        }
      });
      miModal.result.then(function(cuenta) {
        $scope.objeto.cuenta = cuenta;
      }, function () {
        javascript:void(0);
      });
    }
    
});
