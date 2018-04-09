'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:ReportesCtrl
 * @description
 * # ReportesCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('ReportesCtrl', function ($scope, $uibModal, $filter, filterFilter, $anchorScroll, reporte, $rootScope, Notification) {
    $anchorScroll();    

    function cargarDatos(){
      $scope.cargado = false;
      $rootScope.cargando = true;
      var datos = reporte.datos().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.menus = response.menus;
        $rootScope.cargando = false;
        $scope.cargado = true;
        crearModels();
      });
    };

    function crearModels(){
      $scope.objeto = { menu : $scope.menus[0], datos : $scope.datos };    
    }

    $scope.selectMenu = function(){
      $scope.objeto.submenu = $scope.objeto.menu.submenus[0];
      reordenar('menu');
    }

    $scope.selectSubmenu = function(){
      $scope.objeto.seccion = $scope.objeto.submenu.secciones[0];
      reordenar('submenu');
    }

    $scope.selectSeccion = function(){
      reordenar('seccion');
    }

    function reordenar(opcion){
      console.log($scope.objeto.menu.id)
      console.log($scope.objeto.submenu)
      var listaTemp;
      if(opcion=='seccion'){
        if($scope.objeto.seccion=='TODOS'){
          listaTemp = filterFilter($scope.datos, { idSubmenu: $scope.objeto.submenu.id });
        }else{
          listaTemp = filterFilter($scope.datos, { idSubmenu: $scope.objeto.submenu.id });
          listaTemp = filterFilter(listaTemp, { seccionOrden: $scope.objeto.seccion });
        }        
      }else{
        if(opcion=='menu'){
          if($scope.objeto.menu.id==0){
            listaTemp = $scope.datos;            
          }else{
            listaTemp = filterFilter($scope.datos, { idMenu: $scope.objeto.menu.id });     
          }
        }else if(opcion=='submenu'){
          if($scope.objeto.submenu.id==0){
            listaTemp = filterFilter($scope.datos, { idMenu: $scope.objeto.menu.id });           
          }else{
            listaTemp = filterFilter($scope.datos, { idSubmenu: $scope.objeto.submenu.id });    
          }
        }        
      }
      $scope.objeto.datos = [];
      if(listaTemp.length){
        $scope.objeto.datos = [];
        for(var ind in listaTemp){
          $scope.objeto.datos.push( listaTemp[ind] );
        }
      }else{
        console.log('empty')
      }
    }

    cargarDatos();

  });
  