'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:InicioCtrl
 * @description
 * # InicioCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('InicioCtrl', function ($scope, $rootScope, $uibModal, $timeout, constantes, $resource, $localStorage, $location) {
    	$rootScope.cargando= false;
        $scope.constantes = constantes;
    	//comprobar session
        $scope.cargarDatos = function(){
        	var datos = $resource(constantes.URL + 'inicio').get();
        	datos.$promise.then(function(response){
        		if( !response.success ){
        			$rootScope.globals = {};
                    $rootScope.menu = {};
                    $localStorage.$reset();
                    $location.path('/login');
        		}
        	});
        };

        $timeout(function(){
            $scope.cargarDatos();
        }, 1000);

    })


    .controller('ModalReporteInformeCajaDiariaCobranzaCtrl', function ($scope, $httpParamSerializer, $rootScope, $http, $timeout, constantes, $uibModalInstance, $filter, funcionario, variableSistema ) {
        $scope.constantes = constantes;
        $scope.objeto={};
        function iniciarObjeto(){
            $scope.objeto = {  
                recaudador : '',
                fecha : new Date()
            };
        }

        $scope.fechas={
            fecha : false
        };

        $scope.open = function(fec) {
            $timeout(function(){
                $scope.fechas[fec] = true;
            }, 100);
        };


        $scope.getUsuarios = function(val){
            return funcionario.typeahead(val);
        };
   
        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.convFecha = function(fecha){
            return $filter('date')(fecha, 'yyyy-MM-dd');
        };

        $scope.rutaInforme = function(){
            var ruta='';
            var objeto = $scope.objeto;
            if( $scope.objeto.recaudador ){
                if( $scope.objeto.recaudador.id ){
                    var ruta = 'recaudador=' +$scope.objeto.recaudador.id + '&';
                }
            }
            ruta+='fecha=' + $scope.convFecha( objeto.fecha);       
            return ruta;
        };


    })


    .controller('ModalReporteCertificadoHonorariosVistaPreviaCtrl', function ($scope, $window, $httpParamSerializer, $sce, $rootScope, $http, $timeout, constantes, $uibModalInstance, $filter, boletaHonorarios, Notification, parametros ) {
        $rootScope.cargando=true;
        $scope.sinValidar=true;
        $scope.validado = false;
        $scope.idCertificado = 0;
        $scope.url = $sce.trustAsResourceUrl( constantes.URL + 'boletas-honorarios/certificado/vista-previa?anio=' + parametros.anio + '&proveedor=' + parametros.proveedor );

        $scope.cargarCertificado = function(){
            $scope.url= $sce.trustAsResourceUrl( constantes.URL + 'boletas-honorarios/certificado/pdf/' + $scope.idCertificado );
        };

        $scope.validar = function(){
            $scope.url = '';
            $scope.validando=true;
            $rootScope.cargando=true;
            var datos = boletaHonorarios.validar().post( {}, {anio:parametros.anio, proveedor:parametros.proveedor} );
            datos.$promise.then(function(response){
                if( response.success ){
                    Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
                    $scope.sinValidar=false;
                    $scope.validando=false;
                    $scope.idCertificado = response.id;
                    $scope.validado = true;
                    $scope.cargarCertificado();
                }else{
                    Notification.error({message: response.mensaje, title:'Notificación del Sistema'});
                }                
                $rootScope.cargando=false;
            });
        };

        $scope.imprimir = function() {
            var url = $sce.trustAsResourceUrl( constantes.URL + 'boletas-honorarios/certificado/pdf/' + $scope.idCertificado );
            var ancho = 800;
            var alto = 500;
            var posicionX=(screen.width/2)-(ancho/2); 
            var posicionY=(screen.height/2)-(alto/2); 
            $window.open( url, 'IMPRIMIRCERTIFICADOHONORARIOS', 'width='+ancho+',height='+alto+',left='+posicionX+',top='+posicionY+'');
        };

        $scope.cancel = function () {
            $uibModalInstance.close( $scope.validado );
        };

        window.finCargando=function(){
            if( $scope.url ){
                $timeout(function(){
                    $rootScope.cargando=false;
                },2000);
            }
        };

    })


    .controller('ModalReporteCertificadoHonorariosCtrl', function ($scope, $httpParamSerializer, $rootScope, $http, $timeout, constantes, $uibModal, $uibModalInstance, $filter, variableSistema ) {
        $scope.constantes = constantes;
        var anioActual = parseInt( $filter('date')(new Date(), 'yyyy') );
        $scope.opciones={
            anios : []
        };

        $scope.objeto={};
        var iniciarObjeto = function(){
            $scope.objeto = { 
                tipoPago : 2,
                anio :  $scope.opciones.anios[0],
                proveedor : ""
            };
        };

        

        $scope.getProveedores = function(val){
            return $http.get( constantes.URL + 'clientes-proveedores/buscador/json', {
                params: {
                    termino: val,
                    tipo: 2
                }
            }).then(function(response){
                return response.data.map(function(item){
                    return item;
                });
            });
        };
   
        $scope.cancel = function () {
            $uibModalInstance.close();
        };


        $scope.rutaInforme = function(){
            var ruta='';
            var objeto = $scope.objeto;
            if( $scope.objeto.proveedor ){
                if( $scope.objeto.proveedor.id ){
                    var ruta = 'proveedor=' +$scope.objeto.proveedor.id;
                }
            }
            ruta+='&anio=' + $scope.objeto.anio;
            return ruta;
        };

        $scope.vistaPreviaCertificadoHonorarios = function () {
            var modalInstance = $uibModal.open({
                animation: false,
                templateUrl: 'views/reports/report-vista-previa-certificado-honorarios.html?v=' + $filter('date')(new Date(), 'yyyyMMddHHmmss'),
                controller: 'ModalReporteCertificadoHonorariosVistaPreviaCtrl',
                size: '800',
                backdrop:'static',
                resolve : {
                    parametros : function(){
                        return {
                            'anio' : $scope.objeto.anio,
                            'proveedor' : $scope.objeto.proveedor.id
                        };
                    }
                }
            });

            modalInstance.result.then(function(validado){
                if( validado ){
                    iniciarObjeto();
                }
            }, function(){
                iniciarObjeto();
            });
        };

        iniciarObjeto();


        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push(an);
                }
                
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();
    })

    .controller('ModalReporteInformeHonorariosCtrl', function ($scope, $httpParamSerializer, $rootScope, $http, $timeout, constantes, $uibModalInstance, $filter, variableSistema ) {
        $scope.constantes = constantes;


        var anioActual = parseInt( $filter('date')(new Date(), 'yyyy') );
        $scope.opciones={
            anios : []
        };

        var mesActual = $filter('filter')( $scope.constantes.MESES, { id : parseInt( $filter('date')(new Date(), 'MM') ) }, true )[0];

        $scope.objeto={};
        function iniciarObjeto(){
            $scope.objeto = {  
                tipoPago : 2,
                anioInicial : $scope.opciones.anios[0],
                fechas : 1,
                fecha : new Date(),
                inicio : new Date(),
                fin : new Date(),
                mes : mesActual,
                anio :  $scope.opciones.anios[0],
                mesInicial : mesActual,
                mesFinal : mesActual,
                anioInicial : $scope.opciones.anios[0],
                anioFinal : $scope.opciones.anios[0]
            };
        }

        $scope.fechas={
            fecha : false,
            fechaInicial : false,
            fechaFinal : false
        };

        $scope.open = function(fec) {
            $timeout(function(){
                $scope.fechas[fec] = true;
            }, 100);
            
        };


        $scope.getProveedores = function(val){
            return $http.get( constantes.URL + 'clientes-proveedores/buscador/json', {
                params: {
                    termino: val,
                    tipo: 2
                }
            }).then(function(response){
                return response.data.map(function(item){
                    return item;
                });
            });
        };
   
        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.convFecha = function(fecha){
            return $filter('date')(fecha, 'yyyy-MM-dd');
        };

        $scope.rutaInforme = function(){

            var ruta='';
            var objeto = $scope.objeto;
            if( $scope.objeto.proveedor ){
                if( $scope.objeto.proveedor.id ){
                    var ruta = 'proveedor=' +$scope.objeto.proveedor.id;
                }
            }
            if( ruta ){
                ruta+='&tipoPago=' + $scope.objeto.tipoPago;
            }else{
                ruta='proveedor=0&tipoPago=' + $scope.objeto.tipoPago;
            }

            if(objeto.fechas==1){ // fechas
                ruta+='&fechas=1&fecha=' + $scope.convFecha( objeto.fecha);
            }else if(objeto.fechas==2){ // rango de fechas
                ruta+='&fechas=2&inicio=' + $scope.convFecha( objeto.inicio) + '&fin=' + $scope.convFecha( objeto.fin );
            }else if( objeto.fechas==3){ // mes
                ruta+='&fechas=3&mes=' + objeto.mes.id + '&anio='+ objeto.anio.id;
            }else if( objeto.fechas==4){ // rango de meses
                ruta+='&fechas=4&mesInicial='+ objeto.mesInicial.id +'&anioInicial='+ objeto.anioInicial.id+'&mesFinal='+ objeto.mesFinal.id +'&anioFinal='+ objeto.anioFinal.id;
            }else{
                ruta+='&fechas=0'
            }

            if( objeto.hojas ){ ruta+='&formato=folio'; }
            return ruta;
        };


        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();
    })


    .controller('ModalReporteInformeAnalisisCtrl', function ($scope, $httpParamSerializer, $rootScope, $http, $timeout, constantes, $uibModalInstance, $uibModal, $filter, variableSistema ) {
        $scope.constantes = constantes;

        var anioActual = parseInt( $filter('date')(new Date(), 'yyyy') );
        $scope.opciones={
            anios : []
        };

        var mesActual = $filter('filter')( $scope.constantes.MESES, { id : parseInt( $filter('date')(new Date(), 'MM') ) }, true )[0];

        $scope.tiposAnalisis=[
            {id:'prov', tipo:'Proveedor'},
            {id:'rut', tipo:'Rut'},
            {id:'fecha', tipo:'Fecha'},
            {id:'saldados', tipo:'Saldados'},
            {id:'todos', tipo:'Todos'}
        ];

        $scope.objeto={
            tipoAnalisis : 2
        };
        function iniciarObjeto(){
            $scope.objeto = {  
                tipoAnalisis : 2,
                anioInicial : $scope.opciones.anios[0],
                fechas : 0,
                fecha : new Date(),
                inicio : new Date(),
                fin : new Date(),
                mes : mesActual,
                anio :  $scope.opciones.anios[0],
                mesInicial : mesActual,
                mesFinal : mesActual,
                anioInicial : $scope.opciones.anios[0],
                anioFinal : $scope.opciones.anios[0]
            };
        }

        $scope.fechas={
            fecha : false,
            fechaInicial : false,
            fechaFinal : false
        };

        $scope.open = function(fec) {
            $timeout(function(){
                $scope.fechas[fec] = true;
            }, 100);
            
        };


        $scope.getProveedores = function(val){
            return $http.get( constantes.URL + 'clientes-proveedores/buscador/json', {
                params: {
                    termino: val,
                    tipo: $scope.objeto.tipoAnalisis
                }
            }).then(function(response){
                return response.data.map(function(item){
                    return item;
                });
            });
        };

        $scope.getCuentas = function(val){
            return $http.get( constantes.URL + 'cuentas/buscador/json', {
                params: {
                    termino: val
                }
            }).then(function(response){
                return response.data.map(function(item){
                    return item;
                });
            });
        };

        $scope.buscarCuenta=function(destino){
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/forms/form-buscar-cuenta.html?v=' + $filter('date')(new Date(), 'yyyyMMddHHmmss'),
                controller: 'ModalBuscarCuentaCtrl',
                size: '700'
            });

            modalInstance.result.then(function (cuenta) {
                $scope.objeto[destino] = cuenta;
            });
        };

   
        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.convFecha = function(fecha){
            return $filter('date')(fecha, 'yyyy-MM-dd');
        };

        $scope.rutaInforme = function(){

            var ruta='';
            var objeto = $scope.objeto;
            if( $scope.objeto.proveedor ){
                if( $scope.objeto.proveedor.id ){
                    ruta = 'proveedor=' +$scope.objeto.proveedor.id + '&';
                }
            }


            if( $scope.objeto.tipoAnalisis ){
                if( $scope.objeto.tipoAnalisis.id ){
                    ruta+='tipoAnalisis=' + $scope.objeto.tipoAnalisis.id + '&';
                }
            }


            if( $scope.objeto.cuentaAnalisis ){
                if( $scope.objeto.cuentaAnalisis.id ){
                    ruta+='cuentaAnalisis=' + $scope.objeto.cuentaAnalisis.id + '&';
                }
            }


            if(objeto.fechas==1){ // fechas
                ruta+='fechas=1&fecha=' + $scope.convFecha( objeto.fecha);
            }else if(objeto.fechas==2){ // rango de fechas
                ruta+='fechas=2&inicio=' + $scope.convFecha( objeto.inicio) + '&fin=' + $scope.convFecha( objeto.fin );
            }else if( objeto.fechas==3){ // mes
                ruta+='fechas=3&mes=' + objeto.mes.id + '&anio='+ objeto.anio.id;
            }else if( objeto.fechas==4){ // rango de meses
                ruta+='fechas=4&mesInicial='+ objeto.mesInicial.id +'&anioInicial='+ objeto.anioInicial.id+'&mesFinal='+ objeto.mesFinal.id +'&anioFinal='+ objeto.anioFinal.id;
            }else{
                ruta+='fechas=0';
            }

            if( objeto.hojas ){ ruta+='&formato=folio'; }
            return ruta;
        };


        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();
    })



    .controller('ModalReporteInformeComprasCtrl', function ($scope, $httpParamSerializer, $rootScope, $http, $timeout, constantes, $uibModalInstance, $filter, variableSistema ) {
        $scope.constantes = constantes;


        var anioActual = parseInt( $filter('date')(new Date(), 'yyyy') );
        $scope.opciones={
            anios : []
        };

        var mesActual = $filter('filter')( $scope.constantes.MESES, { id : parseInt( $filter('date')(new Date(), 'MM') ) }, true )[0];

        $scope.objeto={};
        function iniciarObjeto(){
            $scope.objeto = {  
                tipoPago : 2,
                anioInicial : $scope.opciones.anios[0],
                fechas : 1,
                fecha : new Date(),
                inicio : new Date(),
                fin : new Date(),
                mes : mesActual,
                anio :  $scope.opciones.anios[0],
                mesInicial : mesActual,
                mesFinal : mesActual,
                anioInicial : $scope.opciones.anios[0],
                anioFinal : $scope.opciones.anios[0]
            };
        }

        $scope.fechas={
            fecha : false,
            fechaInicial : false,
            fechaFinal : false
        };

        $scope.open = function(fec) {
            $timeout(function(){
                $scope.fechas[fec] = true;
            }, 100);
            
        };


        $scope.getProveedores = function(val){
            return $http.get( constantes.URL + 'clientes-proveedores/buscador/json', {
                params: {
                    termino: val,
                    tipo: 2
                }
            }).then(function(response){
                return response.data.map(function(item){
                    return item;
                });
            });
        };
   
        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.convFecha = function(fecha){
            return $filter('date')(fecha, 'yyyy-MM-dd');
        };

        $scope.rutaInforme = function(){

            var ruta='';
            var objeto = $scope.objeto;
            if( $scope.objeto.proveedor ){
                if( $scope.objeto.proveedor.id ){
                    var ruta = 'proveedor=' +$scope.objeto.proveedor.id;
                }
            }
            if( ruta ){
                ruta+='&tipoPago=' + $scope.objeto.tipoPago;
            }else{
                ruta='proveedor=0&tipoPago=' + $scope.objeto.tipoPago;
            }

            if(objeto.fechas==1){ // fechas
                ruta+='&fechas=1&fecha=' + $scope.convFecha( objeto.fecha);
            }else if(objeto.fechas==2){ // rango de fechas
                ruta+='&fechas=2&inicio=' + $scope.convFecha( objeto.inicio) + '&fin=' + $scope.convFecha( objeto.fin );
            }else if( objeto.fechas==3){ // mes
                ruta+='&fechas=3&mes=' + objeto.mes.id + '&anio='+ objeto.anio.id;
            }else if( objeto.fechas==4){ // rango de meses
                ruta+='&fechas=4&mesInicial='+ objeto.mesInicial.id +'&anioInicial='+ objeto.anioInicial.id+'&mesFinal='+ objeto.mesFinal.id +'&anioFinal='+ objeto.anioFinal.id;
            }else{
                ruta+='&fechas=0'
            }

            if( objeto.hojas ){ ruta+='&formato=folio'; }
            return ruta;
        };


        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();
    })

    .controller('ModalReporteInformeVentasCtrl', function ($scope, $httpParamSerializer, $rootScope, $http, $timeout, constantes, $uibModalInstance, $filter, variableSistema ) {
        $scope.constantes = constantes;


        var anioActual = parseInt( $filter('date')(new Date(), 'yyyy') );
        $scope.opciones={
            anios : []
        };

        var mesActual = $filter('filter')( $scope.constantes.MESES, { id : parseInt( $filter('date')(new Date(), 'MM') ) }, true )[0];

        $scope.objeto={};
        function iniciarObjeto(){
            $scope.objeto = {  
                tipoPago : 2,
                anioInicial : $scope.opciones.anios[0],
                fechas : 1,
                fecha : new Date(),
                inicio : new Date(),
                fin : new Date(),
                mes : mesActual,
                anio :  $scope.opciones.anios[0],
                mesInicial : mesActual,
                mesFinal : mesActual,
                anioInicial : $scope.opciones.anios[0],
                anioFinal : $scope.opciones.anios[0]
            };
        }

        $scope.fechas={
            fecha : false,
            fechaInicial : false,
            fechaFinal : false
        };

        $scope.open = function(fec) {
            $timeout(function(){
                $scope.fechas[fec] = true;
            }, 100);
        };

        $scope.getClientes = function(val){
            return $http.get( constantes.URL + 'clientes-proveedores/buscador/json', {
                params: {
                    termino: val,
                    tipo: 1
                }
            }).then(function(response){
                return response.data.map(function(item){
                    return item;
                });
            });
        };
   
        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.convFecha = function(fecha){
            return $filter('date')(fecha, 'yyyy-MM-dd');
        };

        $scope.rutaInforme = function(){

            var ruta='';
            var objeto = $scope.objeto;
            if( $scope.objeto.cliente ){
                if( $scope.objeto.cliente.id ){
                    var ruta = 'cliente=' +$scope.objeto.cliente.id;
                }
            }
            if( ruta ){
                ruta+='&tipoPago=' + $scope.objeto.tipoPago;
            }else{
                ruta='cliente=0&tipoPago=' + $scope.objeto.tipoPago;
            }

            if(objeto.fechas==1){ // fechas
                ruta+='&fechas=1&fecha=' + $scope.convFecha( objeto.fecha);
            }else if(objeto.fechas==2){ // rango de fechas
                ruta+='&fechas=2&inicio=' + $scope.convFecha( objeto.inicio) + '&fin=' + $scope.convFecha( objeto.fin );
            }else if( objeto.fechas==3){ // mes
                ruta+='&fechas=3&mes=' + objeto.mes.id + '&anio='+ objeto.anio.id;
            }else if( objeto.fechas==4 && objeto.mesInicial){ // rango de meses
                ruta+='&fechas=4&mesInicial='+ objeto.mesInicial.id +'&anioInicial='+ objeto.anioInicial.id+'&mesFinal='+ objeto.mesFinal.id +'&anioFinal='+ objeto.anioFinal.id;
            }else{
                ruta+='&fechas=0'
            }

            if( objeto.hojas ){ ruta+='&formato=folio'; }
            return ruta;
        };


        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();
    })


    .controller('ModalReporteResumenRecuadro2F22Ctrl', function ($scope, $rootScope, $timeout, constantes, $uibModalInstance, $filter, variableSistema ) {
        $scope.constantes = constantes;
        $scope.tiposComprobantes=[];
        $scope.resultado=[];

        var anioActual = parseInt( $filter('date')(new Date(), 'yyyy') );
        $scope.opciones={
            anios : []
        };

        $scope.objeto={};
        function iniciarObjeto(){
            $scope.objeto = {  
                anioInicial : $scope.opciones.anios[0]
            };
        }
     
        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.rutaInforme = function(){
            var objeto = $scope.objeto;
            if( objeto.anioInicial ){
                var ruta = 'tipo=3&anioinicio='+ objeto.anioInicial.id; 
            }else{
                var ruta = '';
            }            
            return ruta;
        };


        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();
    })
    .controller('ModalReporteDeclaracionJurada1926Ctrl', function ($scope, $rootScope, $timeout, constantes, $uibModalInstance, $filter, variableSistema ) {
        $scope.constantes = constantes;
        $scope.tiposComprobantes=[];
        $scope.resultado=[];

        var anioActual = parseInt( $filter('date')(new Date(), 'yyyy') );
        $scope.opciones={
            anios : []
        };

        $scope.objeto={};
        function iniciarObjeto(){
            $scope.objeto = {  
                anioInicial : $scope.opciones.anios[0]
            };
        }
     
        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.rutaInforme = function(){
            var objeto = $scope.objeto;
            if( objeto.anioInicial ){
                var ruta = 'tipo=3&anioinicio='+ objeto.anioInicial.id; 
            }else{
                var ruta = '';
            }          
            return ruta;
        };


        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();
    })
    .controller('ModalReporteDeclaracionJurada1847Ctrl', function ($scope, $rootScope, $timeout, constantes, $uibModalInstance, $filter, variableSistema ) {
        $scope.constantes = constantes;
        $scope.tiposComprobantes=[];
        $scope.resultado=[];

        var anioActual = parseInt( $filter('date')(new Date(), 'yyyy') );
        $scope.opciones={
            anios : []
        };

        $scope.objeto={};
        function iniciarObjeto(){
            $scope.objeto = {  
                anioInicial : $scope.opciones.anios[0]
            };
        }
     
        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.rutaInforme = function(){
            var objeto = $scope.objeto;
            if( objeto.anioInicial ){
                var ruta = 'tipo=3&anioinicio='+ objeto.anioInicial.id; 
            }else{
                var ruta = '';
            }
                        
            return ruta;
        };


        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();
    })
    .controller('ModalReporteLibroVentasCtrl', function ($scope, $rootScope, $timeout, constantes, $uibModalInstance, $filter, variableSistema ) {
        $scope.constantes = constantes;
       
        var anioActual = parseInt( $filter('date')(new Date(), 'yyyy') );
        $scope.opciones={
            anios : []
        };

        $scope.objeto={};
        function iniciarObjeto(){
            $scope.objeto = {
                mesInicial : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                mesFinal : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                anioInicial : $scope.opciones.anios[0],
                anioFinal: $scope.opciones.anios[0]
            };
        }
   
        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.rutaInforme = function(){
            var objeto = $scope.objeto;
            if( objeto.mesInicial && objeto.anioInicial ){
                var ruta = '&inicio=' + objeto.mesInicial.id + '&anioinicio='+ objeto.anioInicial.id;
            }else{
                var ruta = '';
            }
            if( objeto.hojas ){ ruta+='&formato=folio'; }
            return ruta;
        };


        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();
    })
    .controller('ModalReporteLibroComprasCtrl', function ($scope, $rootScope, $timeout, constantes, $uibModalInstance, $filter, variableSistema ) {
        $scope.constantes = constantes;
       
        var anioActual = parseInt( $filter('date')(new Date(), 'yyyy') );
        $scope.opciones={
            anios : []
        };

        $scope.objeto={};
        function iniciarObjeto(){
            $scope.objeto = {
                mesInicial : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                mesFinal : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                anioInicial : $scope.opciones.anios[0],
                anioFinal: $scope.opciones.anios[0]
            };
        }
   
        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.rutaInforme = function(){
            var objeto = $scope.objeto;

            if( objeto.mesInicial && objeto.anioInicial ){
                var ruta = '&inicio=' + objeto.mesInicial.id + '&anioinicio='+ objeto.anioInicial.id;
            }else{
                var ruta = '';
            }


            if( objeto.hojas ){ ruta+='&formato=folio'; }
            return ruta;
        };

        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();
    })
    .controller('ModalReporteLibroBoletasCtrl', function ($scope, $rootScope, $timeout, constantes, $uibModalInstance, $filter, variableSistema ) {
        $scope.constantes = constantes;
       
        var anioActual = parseInt( $filter('date')(new Date(), 'yyyy') );
        $scope.opciones={
            anios : []
        };

        $scope.objeto={};
        function iniciarObjeto(){
            $scope.objeto = {
                mesInicial : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                mesFinal : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                anioInicial : $scope.opciones.anios[0],
                anioFinal: $scope.opciones.anios[0]
            };
        }
   
        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.rutaInforme = function(){

            var objeto = $scope.objeto;
            if( objeto.mesInicial && objeto.anioInicial ){
                var ruta = '&inicio=' + objeto.mesInicial.id + '&anioinicio='+ objeto.anioInicial.id;
            }else{
                var ruta = '';
            }
            if( objeto.hojas ){ ruta+='&formato=folio'; }

            return ruta;
        };


        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();
    })
    .controller('ModalReporteLibroDiarioCtrl', function ($scope, $rootScope, $timeout, constantes, $uibModalInstance, $filter ) {
        $scope.constantes = constantes;
        $scope.tiposComprobantes=[];
        $scope.resultado=[];
        $scope.objeto = {
            fechaInicial : false,
            fechaFinal : false,
            inicio : '',
            fin : ''
        };
   
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };


        $scope.openFechaInicial = function() {
            $timeout(function(){
                $scope.objeto.fechaInicial = true;
            }, 100);            
        };
        
        $scope.openFechaFinal = function() {
            $timeout(function(){
                $scope.objeto.fechaFinal= true;
            }, 100);
            
        };

        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.convFecha = function(fecha){
            return $filter('date')(fecha, 'yyyy-MM-dd');
        };
    })
    .controller('ModalReporteLibroHonorariosCtrl', function ($scope, $rootScope, $timeout, constantes, $uibModalInstance, $filter, Notification, tipoComprobante, boletaHonorarios, variableSistema ) {
        $scope.constantes = constantes;
       
        var anioActual = parseInt( $filter('date')(new Date(), 'yyyy') );
        $scope.opciones={
            anios : []
        };

        $scope.objeto={};
        function iniciarObjeto(){
            $scope.objeto = {
                mesInicial : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                mesFinal : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                anioInicial : $scope.opciones.anios[0],
                anioFinal: $scope.opciones.anios[0]
            };
        }
   
        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.rutaInforme = function(){
            var objeto = $scope.objeto;
            if( objeto.anioInicial ){
                var ruta = '&inicio=' + objeto.mesInicial.id + '&anioinicio='+ objeto.anioInicial.id;
            }else{
                var ruta = '';
            }
            
            return ruta;
        };


        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();
    })
    .controller('ModalReporteLibroMayorCtrl', function ($scope, $rootScope, $http, $timeout, $uibModal, constantes, $uibModalInstance, $filter, Notification, tipoComprobante, cuenta, variableSistema, contAsiento ) {
        $scope.constantes = constantes;
        $scope.tiposComprobantes=[];
        $scope.resultado=[];
        $scope.cuentas=[];

        $scope.opciones={
            anios:[]
        };

        $scope.objeto={};
        function iniciarObjeto(){
            $scope.objeto = {
                fechaInicial : false,
                fechaFinal : false,
                inicio : new Date(),
                fin : new Date(),
                fechas : 1,
                mesInicial : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                mesFinal : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                cuentas : 1,
                cuentaInicial : null,
                cuentaFinal:null,
                anioInicial : $scope.opciones.anios[0],
                anioFinal: $scope.opciones.anios[0]
            };
        }
   
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.openFechaInicial = function() {
            $timeout(function(){
                $scope.objeto.fechaInicial = true;
            }, 100);            
        };
        
        $scope.openFechaFinal = function() {
            $timeout(function(){
                $scope.objeto.fechaFinal= true;
            }, 100);
            
        };

        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.convFecha = function(fecha){
            return $filter('date')(fecha, 'yyyy-MM-dd');
        };


        $scope.getCuentas = function(val){
            return $http.get( constantes.URL + 'cuentas/buscador/json', {
                params: {
                    termino: val
                }
            }).then(function(response){
                return response.data.map(function(item){
                    return item;
                });
            });
        };

        $scope.buscarCuenta=function(destino){
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/forms/form-buscar-cuenta.html?v=' + $filter('date')(new Date(), 'yyyyMMddHHmmss'),
                controller: 'ModalBuscarCuentaCtrl',
                size: '700'
            });

            modalInstance.result.then(function (cuenta) {
                $scope.objeto[destino] = cuenta;
            });
        };


        var anterior={
            cuentaInicial:{
                index:-1,
                nivel:1
            },
            cuentaFinal:{
                index:-1,
                nivel:1
            }
        };

        $scope.omitirBlancos = function(selCuenta){
            var cta = $scope.objeto[selCuenta];         
            if(cta){  
                if( anterior[selCuenta].index >= 0 ){
                    $scope.cuentas[anterior[selCuenta].index].nivel=anterior[selCuenta].nivel;
                }
                var index = $scope.cuentas.indexOf(cta);
                anterior[selCuenta]={
                    index : index,
                    nivel : $scope.cuentas[index].nivel
                };
                
                $scope.cuentas[index].nivel=1;
            }
        };

        $scope.filtroCuentaFinal = function(item){
            if( item && $scope.objeto.cuentaInicial ){
                if( item.orden >= $scope.objeto.cuentaInicial.orden ){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        };

        $scope.rutaInforme = function(){
            var ruta = '';
            var objeto = $scope.objeto;
            
            if(objeto.fechas===1){
                ruta+='tipo=1&inicio=' + $scope.convFecha( objeto.inicio) + '&fin=' + $scope.convFecha( objeto.fin );
            }else if( objeto.fechas===2){
                ruta+='&tipo=2&inicio=' + objeto.mesInicial.id + '&anioinicio='+ objeto.anioInicial.id + '&fin=' + objeto.mesFinal.id + '&aniofin='+ objeto.anioFinal.id;
            }else if( objeto.fechas===3 && objeto.anioInicial){
                ruta+='&tipo=3&anioinicio='+ objeto.anioInicial.id;
            }

            if(objeto.cuentas===1){
                ruta+='&cuentas=1';
            }else{
                if( objeto.cuentaInicial && objeto.cuentaFinal ){
                    ruta+='&cuentas=2&cta-inicial=' + objeto.cuentaInicial.id + '&cta-final=' + objeto.cuentaFinal.id;
                }
            }

            if( objeto.hojas ){ ruta+='&formato=folio'; }
            
             
            return ruta;
        };



        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();


        $scope.vistaPrevia=function(){

            $rootScope.cargando=true;
            var datos = contAsiento.obtenerLibroMayor( '?' + $scope.rutaInforme() ).get();
            datos.$promise.then(function(respuesta){
                if( respuesta.success ){
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/reports/report-libro-mayor-vista-previa.html?v=' + $filter('date')(new Date(), 'yyyyMMddHHmmss'),
                        controller: 'ModalVistaPreviaLibroMayorCtrl',
                        size: '1000',
                        backdrop : 'static',
                        resolve : {
                            registros : function(){
                                return respuesta;
                            },
                            rutaInforme : function(){
                                return $scope.rutaInforme();
                            }
                        }
                    });
                }else{
                    Notification.error({message:'No existen registros asociados a los parámetros ingresados', title:'Notificación del Sistema'});
                }

                $rootScope.cargando=false;
            });
        };

    })
    .controller('ModalVistaPreviaLibroMayorCtrl', function ($scope, $rootScope, constantes, $uibModalInstance, $uibModal, Notification, $filter, variableSistema, contAsiento, registros, rutaInforme ) {
        $scope.constantes = constantes;
        $scope.tiposComprobantes=[];
        $scope.resultado=[];
        $scope.registros = registros;
        $scope.rutaInforme = rutaInforme;

        $scope.cancel = function () {
            $uibModalInstance.close();
        };
        $scope.intervalos=[];

        $scope.imprimirContador = function(codigo){
            if( !$scope.intervalos[codigo] ){
                $scope.intervalos[codigo]=1;
            }
            var valor = $scope.intervalos[codigo];
            $scope.intervalos[codigo]++;
            return valor;
        };

        $scope.vistaPreviaComprobante=function(comprobanteId){

            $rootScope.cargando=true;
            var datos = contAsiento.datos().get({id:comprobanteId});
            datos.$promise.then(function(respuesta){

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/reports/report-asiento-contable-vista-previa.html?v=' + $filter('date')(new Date(), 'yyyyMMddHHmmss'),
                    controller: 'ModalVistaPreviaComprobanteCtrl',
                    size: '900',
                    backdrop : 'static',
                    resolve : {
                        comprobante : function(){
                            return respuesta;
                        }
                    }
                });
                $rootScope.cargando=false;
            });
        };
    })


    .controller('ModalVistaPreviaComprobanteCtrl', function ($scope, $rootScope, $window, constantes, $uibModalInstance, $filter, variableSistema, comprobante ) {
        $scope.constantes = constantes;
        $scope.movimiento=comprobante;

        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.editar = function(){
            $window.editarComprobante(''+comprobante.id);
        };
    })

    .controller('ModalReporteBalanceTributarioCtrl', function ($scope, $rootScope, $timeout, $uibModal, constantes, $uibModalInstance, $filter, contAsiento, Notification, variableSistema ) {
        $scope.constantes = constantes;
        $scope.tiposComprobantes=[];
        $scope.resultado=[];
        $scope.opciones={
            anios:[]
        };

        $scope.objeto={};
        function iniciarObjeto(){
            $scope.objeto = {
                fechaInicial : false,
                fechaFinal : false,
                inicio : new Date(),
                fin : new Date(),
                fechas : 1,
                mesInicial : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                mesFinal : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                anioInicial : $scope.opciones.anios[0],
                anioFinal: $scope.opciones.anios[0]
            };
        }

        $scope.niveles=[];
        for( var ind=1; ind <= 5; ind++ ){
            $scope.niveles.push(ind);
        }

        
   
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.openFechaInicial = function() {
            $timeout(function(){
                $scope.objeto.fechaInicial = true;
            }, 100);            
        };
        

        $scope.openFechaFinal = function() {
            $timeout(function(){
                $scope.objeto.fechaFinal= true;
            }, 100);
            
        };

        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.convFecha = function(fecha){
            return $filter('date')(fecha, 'yyyy-MM-dd');
        };

        $scope.filtroMesFinal = function(item){
            if( item ){
                if( item.id >= $scope.objeto.mesInicial.id ){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        };
        $scope.rutaInforme = function(){
            var objeto = $scope.objeto;
            var ruta = 'nivel=' + objeto.nivel;
            if(objeto.fechas===1){
                ruta+='&tipo=1&inicio=' + $scope.convFecha( objeto.inicio) + '&fin=' + $scope.convFecha( objeto.fin );
            }else if( objeto.fechas===2){
                ruta+='&tipo=2&inicio=' + objeto.mesInicial.id + '&anioinicio='+ objeto.anioInicial.id + '&fin=' + objeto.mesFinal.id + '&aniofin='+ objeto.anioFinal.id;
            }else if( objeto.fechas===3 && objeto.anioInicial){
                ruta+='&tipo=3&anioinicio='+ objeto.anioInicial.id;
            }
            if( objeto.hojas ){ ruta+='&formato=folio'; }
            if( objeto.firma ){ ruta+='&firmas=ok'; }
             
            return ruta;
        };


        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();


        $scope.vistaPrevia=function(){

            $rootScope.cargando=true;
            var datos = contAsiento.obtenerBalanceTributario( '?' + $scope.rutaInforme() ).get();
            datos.$promise.then(function(respuesta){
                if( respuesta.success ){
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/reports/report-balance-tributario-vista-previa.html?v=' + $filter('date')(new Date(), 'yyyyMMddHHmmss'),
                        controller: 'ModalVistaPreviaBalanceTributarioCtrl',
                        size: '1000',
                        backdrop : 'static',
                        resolve : {
                            registros : function(){
                                return respuesta;
                            },
                            rutaInforme : function(){
                                return $scope.rutaInforme();
                            }
                        }
                    });
                }else{
                    Notification.error({message:'No existen registros asociados a los parámetros ingresados', title:'Notificación del Sistema'});
                }

                $rootScope.cargando=false;
            });
        };

    })

    .controller('ModalVistaPreviaBalanceTributarioCtrl', function ($scope, $rootScope, constantes, $uibModalInstance, $uibModal, Notification, $filter, variableSistema, contAsiento, registros, rutaInforme ) {
        $scope.constantes = constantes;
        $scope.tiposComprobantes=[];
        $scope.resultado=[];
        $scope.registros = registros;
        $scope.rutaInforme = rutaInforme;

        $scope.cancel = function () {
            $uibModalInstance.close();
        };
        $scope.intervalos=[];

        $scope.vistaPreviaLibroMayor=function(enlace){
            $rootScope.cargando=true;
            var datos = contAsiento.obtenerLibroMayor( enlace ).get();
            datos.$promise.then(function(respuesta){
                if( respuesta.success ){
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/reports/report-libro-mayor-vista-previa.html?v=' + $filter('date')(new Date(), 'yyyyMMddHHmmss'),
                        controller: 'ModalVistaPreviaLibroMayorCtrl',
                        size: '1000',
                        backdrop : 'static',
                        resolve : {
                            registros : function(){
                                return respuesta;
                            },
                            rutaInforme : function(){
                                return enlace.replace('?', '');
                            }
                        }
                    });
                }else{
                    Notification.error({message:'No existen registros asociados a los parámetros ingresados', title:'Notificación del Sistema'});
                }

                $rootScope.cargando=false;
            });
        };


    })

    .controller('ModalReporteBalanceClasificadoCtrl', function ($scope, $rootScope, $uibModal, $http, $timeout, contAsiento, constantes, $uibModalInstance, $filter, Notification, tipoComprobante, cuenta, variableSistema ) {
        $scope.constantes = constantes;
        $scope.tiposComprobantes=[];
        $scope.resultado=[];
        $scope.cuentas=[];

        $scope.opciones={
            anios : []
        };

        $scope.objeto={};
        function iniciarObjeto(){

            $scope.objeto = {
                fechaInicial : false,
                fechaFinal : false,
                inicio : new Date(),
                fin : new Date(),
                fechas : 1,
                mesInicial : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                mesFinal : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                cuentas : 1,
                cuentaInicial : null,
                cuentaFinal:null,
                anioInicial : $scope.opciones.anios[0],
                anioFinal: $scope.opciones.anios[0]
            };
        }
   
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.openFechaInicial = function() {
            $timeout(function(){
                $scope.objeto.fechaInicial = true;
            }, 100);            
        };
        
        $scope.openFechaFinal = function() {
            $timeout(function(){
                $scope.objeto.fechaFinal= true;
            }, 100);
            
        };

        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.convFecha = function(fecha){
            return $filter('date')(fecha, 'yyyy-MM-dd');
        };


        $scope.getCuentas = function(val){
            return $http.get( constantes.URL + 'cuentas/buscador/json', {
                params: {
                    termino: val
                }
            }).then(function(response){
                return response.data.map(function(item){
                    return item;
                });
            });
        };

        $scope.buscarCuenta=function(destino){
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/forms/form-buscar-cuenta.html?v=' + $filter('date')(new Date(), 'yyyyMMddHHmmss'),
                controller: 'ModalBuscarCuentaCtrl',
                size: '700'
            });

            modalInstance.result.then(function (cuenta) {
                $scope.objeto[destino] = cuenta;
            });
        };

        var anterior={
            cuentaInicial:{
                index:-1,
                nivel:1
            },
            cuentaFinal:{
                index:-1,
                nivel:1
            }
        };

        $scope.omitirBlancos = function(selCuenta){
            var cta = $scope.objeto[selCuenta];         
            if(cta){  
                if( anterior[selCuenta].index >= 0 ){
                    $scope.cuentas[anterior[selCuenta].index].nivel=anterior[selCuenta].nivel;
                }
                var index = $scope.cuentas.indexOf(cta);
                anterior[selCuenta]={
                    index : index,
                    nivel : $scope.cuentas[index].nivel
                };
                
                $scope.cuentas[index].nivel=1;
            }
        };

        $scope.filtroCuentaFinal = function(item){
            if( item && $scope.objeto.cuentaInicial ){
                if( item.orden >= $scope.objeto.cuentaInicial.orden ){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        };

        $scope.rutaInforme = function(){
            var ruta = '';
            
            var objeto = $scope.objeto;
            
            if(objeto.fechas===1){
                ruta+='tipo=1&inicio=' + $scope.convFecha( objeto.inicio) + '&fin=' + $scope.convFecha( objeto.fin );
            }else if( objeto.fechas===2){
                ruta+='&tipo=2&inicio=' + objeto.mesInicial.id + '&anioinicio='+ objeto.anioInicial.id + '&fin=' + objeto.mesFinal.id + '&aniofin='+ objeto.anioFinal.id;
            }else if( objeto.fechas===3 && objeto.anioInicial){
                ruta+='&tipo=3&anioinicio='+ objeto.anioInicial.id;
            }

            if(objeto.cuentas===1){
                ruta+='&cuentas=1';
            }else{
                if( objeto.cuentaInicial && objeto.cuentaFinal ){
                    ruta+='&cuentas=2&cta-inicial=' + objeto.cuentaInicial.id + '&cta-final=' + objeto.cuentaFinal.id;
                }
            }

            if( objeto.hojas ){ ruta+='&formato=folio'; }
            if( objeto.firma ){ ruta+='&firmas=ok'; }
            
             
            return ruta;
        };


        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( respuesta.anioFinal );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();



        $scope.vistaPrevia=function(){

            $rootScope.cargando=true;
            var datos = contAsiento.obtenerBalanceClasificado( '?' + $scope.rutaInforme() ).get();
            datos.$promise.then(function(respuesta){
                if( respuesta.success ){
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/reports/report-balance-clasificado-vista-previa.html?v=' + $filter('date')(new Date(), 'yyyyMMddHHmmss'),
                        controller: 'ModalVistaPreviaBalanceClasificadoCtrl',
                        size: '1000',
                        backdrop : 'static',
                        resolve : {
                            registros : function(){
                                return respuesta;
                            },
                            rutaInforme : function(){
                                return $scope.rutaInforme();
                            }
                        }
                    });
                }else{
                    Notification.error({message:'No existen registros asociados a los parámetros ingresados', title:'Notificación del Sistema'});
                }

                $rootScope.cargando=false;
            });
        };
    })

    .controller('ModalVistaPreviaBalanceClasificadoCtrl', function ($scope, $rootScope, constantes, $uibModalInstance, $uibModal, Notification, $filter, variableSistema, contAsiento, registros, rutaInforme ) {
        $scope.constantes = constantes;
        $scope.tiposComprobantes=[];
        $scope.resultado=[];
        $scope.registros = registros;
        $scope.rutaInforme = rutaInforme;

        $scope.cancel = function () {
            $uibModalInstance.close();
        };
        $scope.intervalos=[];

        $scope.vistaPreviaLibroMayor=function(enlace){
            $rootScope.cargando=true;
            var datos = contAsiento.obtenerLibroMayor( enlace ).get();
            datos.$promise.then(function(respuesta){
                if( respuesta.success ){
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/reports/report-libro-mayor-vista-previa.html?v=' + $filter('date')(new Date(), 'yyyyMMddHHmmss'),
                        controller: 'ModalVistaPreviaLibroMayorCtrl',
                        size: '1000',
                        backdrop : 'static',
                        resolve : {
                            registros : function(){
                                return respuesta;
                            },
                            rutaInforme : function(){
                                return enlace.replace('?', '');
                            }
                        }
                    });
                }else{
                    Notification.error({message:'No existen registros asociados a los parámetros ingresados', title:'Notificación del Sistema'});
                }

                $rootScope.cargando=false;
            });
        };


    })




    .controller('ModalReporteEstadoResultadoCtrl', function ($scope, $rootScope, $timeout, $http, $uibModal, constantes, $uibModalInstance, $filter, Notification, tipoComprobante, cuenta , variableSistema) {
        $scope.constantes = constantes;
        $scope.tiposComprobantes=[];
        $scope.resultado=[];
        $scope.cuentas=[];
        $scope.opciones={
            anios : []
        };

        $scope.objeto={};
        function iniciarObjeto(){
            $scope.objeto = {
                fechaInicial : false,
                fechaFinal : false,
                inicio : new Date(),
                fin : new Date(),
                fechas : 1,
                mesInicial : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                mesFinal : constantes.MESES[ parseInt( $filter('date')(new Date(), 'MM') ) - 1 ],
                cuentas : 1,
                cuentaInicial : null,
                cuentaFinal:null,
                anioInicial : $scope.opciones.anios[0],
                anioFinal: $scope.opciones.anios[0]
            };
        }
   
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.openFechaInicial = function() {
            $timeout(function(){
                $scope.objeto.fechaInicial = true;
            }, 100);            
        };
        
        $scope.openFechaFinal = function() {
            $timeout(function(){
                $scope.objeto.fechaFinal= true;
            }, 100);
            
        };

        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.convFecha = function(fecha){
            return $filter('date')(fecha, 'yyyy-MM-dd');
        };

/*
        $scope.obtenerCuentas = function(){
            $rootScope.cargando=true;
            var datos = cuenta.listaNivel().query();
            datos.$promise.then(function(respuesta){
                $scope.cuentas = respuesta;
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerCuentas();
*/

        $scope.getCuentas = function(val){
            return $http.get( constantes.URL + 'cuentas/buscador/json', {
                params: {
                    termino: val
                }
            }).then(function(response){
                return response.data.map(function(item){
                    return item;
                });
            });
        };

        $scope.buscarCuenta=function(destino){
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/forms/form-buscar-cuenta.html?v=' + $filter('date')(new Date(), 'yyyyMMddHHmmss'),
                controller: 'ModalBuscarCuentaCtrl',
                size: '700'
            });

            modalInstance.result.then(function (cuenta) {
                $scope.objeto[destino] = cuenta;
            });
        };


        var anterior={
            cuentaInicial:{
                index:-1,
                nivel:1
            },
            cuentaFinal:{
                index:-1,
                nivel:1
            }
        };

        $scope.omitirBlancos = function(selCuenta){
            var cta = $scope.objeto[selCuenta];         
            if(cta){  
                if( anterior[selCuenta].index >= 0 ){
                    $scope.cuentas[anterior[selCuenta].index].nivel=anterior[selCuenta].nivel;
                }
                var index = $scope.cuentas.indexOf(cta);
                anterior[selCuenta]={
                    index : index,
                    nivel : $scope.cuentas[index].nivel
                };
                
                $scope.cuentas[index].nivel=1;
            }
        };

        $scope.filtroCuentaFinal = function(item){
            if( item && $scope.objeto.cuentaInicial ){
                if( item.orden >= $scope.objeto.cuentaInicial.orden ){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        };

        $scope.rutaInforme = function(){
            var ruta = '';
            
            var objeto = $scope.objeto;
            
            if(objeto.fechas===1){
                ruta+='tipo=1&inicio=' + $scope.convFecha( objeto.inicio) + '&fin=' + $scope.convFecha( objeto.fin );
            }else if( objeto.fechas===2){
                ruta+='&tipo=2&inicio=' + objeto.mesInicial.id + '&anioinicio='+ objeto.anioInicial.id + '&fin=' + objeto.mesFinal.id + '&aniofin='+ objeto.anioFinal.id;
            }else if( objeto.fechas===3 && objeto.anioInicial){
                ruta+='&tipo=3&anioinicio='+ objeto.anioInicial.id;
            }

            if(objeto.cuentas===1){
                ruta+='&cuentas=1';
            }else{
                if( objeto.cuentaInicial && objeto.cuentaFinal ){
                    ruta+='&cuentas=2&cta-inicial=' + objeto.cuentaInicial.id + '&cta-final=' + objeto.cuentaFinal.id;
                }
            }

            if( objeto.hojas ){ ruta+='&formato=folio'; }
            if( objeto.firma ){ ruta+='&firmas=ok'; }
            
             
            return ruta;
        };


        $scope.obtenerAnioAnicialRegistros = function(){
            $rootScope.cargando=true;
            var datos = variableSistema.obtenerAnioInicialRegistros().post();
            datos.$promise.then(function(respuesta){
                var anioActual = parseInt( $filter('date')(new Date(), 'yyyy') );
                var anioInicial = parseInt( respuesta.anioInicial );
                for( var an = anioActual; an >= anioInicial; an--){
                    $scope.opciones.anios.push({
                        id : an, value:an
                    });
                }
                iniciarObjeto();
                $rootScope.cargando=false;
            });
        };

        $scope.obtenerAnioAnicialRegistros();
    });

