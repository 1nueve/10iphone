$(document).on("ready", switchPagina);
function todasLasPaginas(url){
   if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.hide();
      //StatusBar.overlaysWebView(false);
    }

    //cargar cualquier pagina desde el borde superior
	$('html, body').scrollTop(0);
	/** comportamientos de backbutton (android) **/
    var backbutton = function(e){
		//evitar salida a la pagina anterior si el usuario esta usando el datepicker
        var existMobipicker = $('.ui-popup-container');
        if (existMobipicker.length > 0 && !existMobipicker.hasClass('ui-popup-hidden')) {
            return true;
        }
		//paginas donde se cierra la aplicacion si se presiona backbutton
        var portadas = new Array('index', 'sucursales', 'mas');
        if (portadas.indexOf(url) > -1 && location.hash.length == 0) {
            e.preventDefault();
            navigator.app.exitApp();
        }
        else{
            navigator.app.backHistory();
        }
    };
	/** activacion de comportamientos nativos **/
    document.addEventListener('deviceready', function(e){
        document.addEventListener('backbutton', backbutton, false);
		/* verificacion: hay conexion a internet? */
        var internet = new Array('item', 'contacto');
        var i = internet.indexOf(url);
        if (i > -1) {
            if(navigator.connection.type == Connection.NONE){
                var msg = i == 0? 'Necesitas conectarte a Internet para consultar la carta': 'Necesitas conectarte a Internet para enviar comentarios';
                navigator.notification.alert(msg, function(){history.go(-1);}, 'Sin Internet');
            }
        }
    }, false);
	/* activacion de clase browserExternal para abrir links en navegador nativo predeterminado */
    $('a.browserExternal').on('click', function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        window.open(href, '_system', 'location=yes');
    });
    /*pedidos a sucursales*/
    $('.pedidoBoton').on('click', function(e){
        e.preventDefault();
        var online = 'https://entrega.com.mx/dom/r/diezcon.html?m=sucursal;su_id=$1'.replace('$1', $(this).data('sucursal-web'));
        var onConfirm = function(index){
            switch(index){
                case 1:
                    launchPedido(15);
                    break;
                case 2:
                    launchPedido(38);
                    break;
                case 3:
                    launchPedido(36);
                    break;
                case 4:
                    launchPedido(35);
                    break;
                case 5:
                    launchPedido(37);
                    break;
                default:
                    break;
            }
        };
        var arraySucursales = [
            'Condesa I',
            'Roma',
            'Parques Polanco',
            'San Ángel',
            'Lomas', 
            'Cancelar'
        ];
        navigator.notification.
        confirm('Elige tu sucursal', onConfirm, 'Pedidos a domicilio', arraySucursales);
    });
    function launchPedido(sucursal){
        var online = 'https://entrega.com.mx/dom/r/diezcon.html?m=sucursal;su_id=' + sucursal;
        var onConfirm = function(index){
            switch(index){
                case 1:
                    document.location.href = 'tel:52789910';
                    break;
                case 2:
                    window.open(online, '_system', 'location=yes');
                    break;
            }
        };
        navigator.notification.
        confirm('Escoge el medio para hacer tu pedido', onConfirm,'Pedido a domicilio', ['Por teléfono','Por Internet', 'Cancelar']);
    };
    $(window).load(function(){
        $('.screen div').fadeOut(700, function(){
             $('.screen').css('display', 'none');
        });
    });
}
function index(){
	function modoLista () {
    	$('#carta .item').each(function(){
    		var figcaption = $(this).find('figcaption');
			figcaption.css('margin-top','0px');
		});
    }
	//parche: centrar titulos del mosaico
	function modoGaleria () {
		$('#carta .item').each(function(){
			var itemHeight = $(this).height();
			var figcaption = $(this).find('figcaption');
			var figcaptionHeight = figcaption.height();
			var x = itemHeight - figcaptionHeight;
			var y = x / 2;
			figcaption.css('margin-top', y + 'px');
		});
	}
	/** Cambiar vistas del menu **/
    $('#verLista').click(function() {
    	modoLista();
        $(this).addClass('selected');
        $('#verGaleria').removeClass('selected');
        $('#carta').removeClass('galeria');
        $('#carta').addClass('lista');
    });
    $('#verGaleria').click(function() {
    	
        $(this).addClass('selected');
        $('#verLista').removeClass('selected');
        $('#carta').removeClass('lista');
        $('#carta').addClass('galeria');
        modoGaleria();
    });
    modoGaleria();
    
}
function item(){
    var hash = location.hash;
	hash = hash.replace("#", "");
    loadMenu(hash, 1);
}

function sucursales(){
	var id;
	var name, name_original = $('.title').eq(0).text();
	/** actualizar pantalla segun sucursal seleccionada **/
    $('.verFicha').click(function() {
        $('.ficha').hide();
        id = $(this).parent().attr('id');
        name = $(this).parent().attr("data-name");
        $(".title").text(name);
		var ficha = $('#' + id + '-info');
        ficha.show();
        regresar.removeClass('hide');
    });
	/** regresar a listado de sucursales **/
	var regresar = $('.leftBtns .iconBtn');
    regresar.on('click', function(){
		$(this).addClass('hide');
		$(".title").text(name_original);
		$('#' + id + '-info').hide();
    });
	/** preguntar metodo de contacto si la sucursal tiene servicio de venta en linea **/
	$('.pedido').on('click', function(e){
        var tel = $(this).attr('href');
        if ($(this).data('sucursal-web')) {
            e.preventDefault();
            var online = 'https://entrega.com.mx/dom/r/diezcon.html?m=sucursal;su_id=$1'.replace('$1', $(this).data('sucursal-web'));
            var onConfirm = function(index){
                switch(index){
                    case 1:
                        document.location.href = tel;
                        break;
                    case 2:
                        window.open(online, '_system', 'location=yes');
                        break;
                }
            };
            navigator.notification.
            confirm('Escoge el medio para hacer tu pedido', onConfirm, name, ['Por teléfono','Por Internet', 'Cancelar']);
        };
	});
}
function loadMenu(hash, display) {
    var topLoading = $(window).height()/2 - 36;
    $('.loading img').css('margin-top', topLoading);

	/** Variables de configuracion **/
	//var url = "http://198.1.89.58//~appel10/el10/p.php?categoria="; //anterior produccion
    var url = "http://eldiez.apps.godisruptive.com/p.php?categoria="; //produccion
	//var url = "http://localhost/webs/el10/eldiezadmin/p.php?categoria="; //local
	var SIN_IMAGEN = new Array('cafeteria', 'bebidas');
	var pagina = url + hash;
	//Actualizando titulo de la pagina segun la categoria consultada
    hash = hash.charAt(0).toUpperCase() + hash.slice(1); //poniendo primera letra en mayuscula
    $("#itemName").text(hash);
	var sin = SIN_IMAGEN.indexOf(hash) > -1;
	/** definicion funcion: agrupar platillos por categoria **/
	var anexarPlatillo = function(lista, platillo, fusionar) {
		var agregado = false;
		categoria = platillo.categoria;
		if (fusionar) {
			categoria += ' ' + platillo[fusionar];
		}
		for (var i = 0; i < lista.length; i++) {
			if (lista[i].clave == categoria) {
				lista[i].platillo.push(platillo);
				agregado = true;
				break;
			}
		}
		if (!agregado) {
			lista.push({clave: categoria, mostrar: !platillo.personalizacion, criterio: platillo[fusionar], nombre: platillo.categoria, platillo: [platillo]});
		}
	}
	/** consulta y tratamiento de platillos **/
	$.ajax({
		url: pagina,
		async: false,
		timeout: 9000,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		success: function(data, status) {
			/** variables de estilo segun seccion consultada **/
            var newData = {
				vino: hash == 'Vinos',
                cortes: hash == "Cortes",
                cafeteria: hash == 'Cafeteria',
				bebida: hash == 'Bebidas' || hash == 'Cafeteria',
				categoria: []
			};
			newData.especial = newData.vino || newData.bebida || newData.cortes ;
            //tratamiento de cada platillo recibido segun su categoria
			for(var i = 0; i < data.length; i++){
                data[i].seccion = data[i].seccion.toLowerCase();
                data[i].personalizacion = data[i].personalizacion != "0";
				/** separacion de descripcion de vinos en 'vista', 'nariz' y 'boca' **/
				if (newData.vino && data[i].descripcion.toLowerCase().indexOf('vista') > -1) {
					var fragmento = data[i].descripcion.split(/\n/);
					for(var j = 0; j < fragmento.length; j++){
						var par = fragmento[j].split(':');
						if (par.length != 2) {break;}
						data[i][par[0].toLowerCase()] = par[1].trim();
					}
				}
				anexarPlatillo(newData.categoria, data[i], newData.vino? 'ml': false);
				/** tratamiento de valores por defecto **/
                data[i].imagen = data[i].imagen && data[i].imagen.length > 0? data[i].imagen: null;
                data[i].descripcion = data[i].descripcion && data[i].descripcion.length > 0? data[i].descripcion: null;
                data[i].contenido = data[i].descripcion || data[i].imagen;
                data[i].imagen = sin? null: data[i].imagen;
                if(data[i].imagen && data[i].imagen.indexOf('.') ==-1) {
                    data[i].imagen +='.jpg';
                }
            }
			/** impresion de datos recibidos **/
            var platilloTemplateDOM = $('#platilloTemplate');
            var platilloTemplate = platilloTemplateDOM.html();
            var contenido = newData;
            var render = Mustache.render(platilloTemplate, contenido);
            platilloTemplateDOM.parent().append(render);
            platilloTemplateDOM.remove();
			/** calculo de tamaños originales de elementos de cada platillo para despues ocultarlos **/
			$('.item').each(function(){
				var crece = $(this).find('.crece');
				var imagen = crece.find('.imagen');
				$(this).data('original-height', crece.length == 0? 0: crece.height());
				$(this).data('original-min-height', crece.length == 0? 0: parseInt(crece.css('min-height')));
				crece.css('min-height', '0px');
				crece.height(0);
			});
			//quitar icono de cargando, mostrado al incio por defecto
            if(hash == "Vinos"){
                $.each($(".col2"), function(key, value){
                    var altura = $(value).parent().find(".col1").height();
                    $(value).css("height", altura)
                })
            }
			$('.loading').addClass('hide');
		},
		error: function() {
            navigator.notification.alert('Se ha producido un error al cargar los datos', function(){location.href = 'index.html';}, 'Sin Internet');
		}
	});
	/** Efectos de apertura de platillos para categorias CON imagen **/
    function abrirElemento (elm, otherOpen) {
        var t = $("#" + elm);
        var grow = t.find('.crece');
        proportion  = $( window ).width()/$( window ).height();
        if($(window).width() == 600 && $(window).height() >= 900){
            heightAnimation = 270;
        } else if(proportion > 1.2 ){
            heightAnimation = $( window ).height()*.7 + "px";
            $('#items figure.platillo img').css('margin-top','-15%');
        }
        else if(proportion > 1 ){
            heightAnimation = 300;
            $('#items figure.platillo img').css('margin-top','-15%');
        }
        else if(proportion > 0.70 ){
            heightAnimation = 250;
        }
        else if(proportion < 0.70 ){
            heightAnimation = 220;
        }
        /** abrir elementos a alturas calculadas con animacion **/
        $('.colfull').css('height', heightAnimation);
        t.addClass('open');
        t.find("#descripcion").stop().animate({'opacity': 1}, 600);

        t.find('.crece').addClass('open');
        //analizamos la duracion de la animación
        var st = t.offset().top - $('header').height();
        var currentSt = $(window).scrollTop();
        heigthCrece = hash == 'Vinos'? t.data('original-height') : heightAnimation;
        animationTime = (currentSt - st)*2;
        if (animationTime < 0) {
            animationTime = animationTime*-1;
        };
        $('.content.lista').css("height", $('.content.lista').height() + 100 + heigthCrece);

        $('body').stop().animate({'scrollTop': st}, animationTime, function() {
            grow.stop().animate({'height': heigthCrece}, 300, function(){
                if (hash == 'Vinos') {grow.css('min-height', t.data('original-min-height') + 'px');}
                $('.content.lista').removeAttr("style");
            });
        });  
    };
    function colapsarElemento (elm, elm2) {
        //si existe elm2, al terminar de colapsar, abrirá el segundo elemento
        var t = $("#" + elm);
        var grow = t.find('.crece');
        var st = t.offset().top - $('header').height();
        var alto = $('.content.lista').outerHeight();
        $('.content.lista').css("height", $('.content.lista').outerHeight());
        alturascrollerEnDispositivo = $(window).height() - $(".tabBar").outerHeight() - $(".navBar").outerHeight();
        scrollMaximoTotal = alto - grow.height() - alturascrollerEnDispositivo ;
        scrollMaximoItem = st + t.outerHeight() - grow.height();
        heightMaximo = alto - t.outerHeight() - alturascrollerEnDispositivo - 6;
        t.find('.crece').removeClass('open');
        t.find("#descripcion").css("opacity", 0);
        t.removeClass('open');
        t.removeAttr("style");
        grow.stop().animate({'height': 0}, 300, function() {
            //SI DESPUES ABRIMOS UN ELEMENTO 
            if (elm2 != null) {
                abrirElemento(elm2, true);
            //SI SOLO SE COLAPSA ESTE ELEMENTO
            } else {
                if(scrollMaximoTotal < scrollMaximoItem){
                    //console.log("no alcanza");
                    $('body').stop().animate({'scrollTop': heightMaximo}, 300,function  () {
                        $('.content.lista').removeAttr("style");
                    });
                } else {
                    $('.content.lista').removeAttr("style");
                };
            };
        });
    }
    if (!sin) {
        $('#items').on('click', 'figure', function(){
            var id = $(this).attr("id");
            var t = $("#" + id);
            //no hacer nada si no hay contenido
            var hasContent = t.find('#descripcion').text().length > 0;
            hasContent = hasContent || t.find('img, div.imagen').length > 0;
            if (!hasContent) {return;}
            //colapsar todos los abietos
            var grow = t.find('.crece');
            $('.crece').css('min-height', '0px');
            var has = t.find('.crece').hasClass('open');
            if (has) {
                colapsarElemento(id);
            } else {
                if ($('.crece.open').length > 0) {
                    idAbierto = (hash == "Vinos")?$('.crece.open').parent().parent().attr("id"):$('.crece.open').parent().attr("id");
                    colapsarElemento(idAbierto, id);
                } else {
                    abrirElemento(id);
                }
            };
        });
    }
}
function contacto(){
    $('.content').on('focus', 'input, select, textarea', function() {
        $('.navBar, .tabBar').css('position', 'absolute');
        //$('.tabBar').addClass("focus");
    });
    $('.content').on('blur', 'input, select, textarea', function() {
        $('.navBar, .tabBar').css('position', 'fixed');
        //$('.tabBar').removeClass("focus");
    });
	$("#cumple").on('focus', function() {
        $('#miCumple').fadeOut();
    })
    $('#cumple').on('blur', function() {
        if($(this).val()== ""){
            $('#miCumple').fadeIn();
        };
    });
    $('#comentarios').on('focus', function(){
        if($(this).val() == "Mensaje"){
            $(this).val("");
        }
    });
    $('#comentarios').on('blur', function(){
        if($(this).val() == ""){
            valor = "Mensaje";
            $(this).val(valor); 
        }
    });
    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    $('#enviar').on('click', function(e){
        var valido = true;
        if ($('#nombre').val().length <= 3) {
            valido = false;
            elem = $('#nombre'); 
            label = elem.parent().find('label');
            if(elem.val().length == 0){
                text = 'Por favor introduzca su nombre.';
            } else {
                text = 'Necesita al menos 3 caracteres.';
            }
            label.text(text);
            label.addClass('error');
            elem.addClass("error");
            watchInput(elem, label, 'Necesita al menos 3 caracteres.' );
        };
        if ($('#comentarios').val().length <= 3 || $('#comentarios').val() == "Mensaje") {
            valido = false;
            elem = $('#comentarios'); 
            label = elem.parent().find('label');
            if(elem.val().length == 0){
                text = 'Introduzca sus comentarios.';
            } else {
                text = 'Requiere de más de tres caracteres.';
            }
            label.text(text);
            label.addClass('error');
            elem.addClass("error");
            watchText(elem, label, 'Requiere de más de tres caracteres.' );
        };

        if (!IsEmail($("#email").val())){
            valido = false;
            elem = $("#email");
            elem.addClass("error");
            label = elem.parent().find('label');
            text = 'Introduzca un e-mail valido.';
            watchMail(elem, label, text);
        };
        if ($('#sucursal').val() == "Sucursal") {
            valido = false;
            elem = $('#sucursal');
            label = elem.parent().find('label');
            label.removeClass('right');
            label.addClass('error');
            text = 'Escoja una sucursal.';
            elem.addClass("error");
            watchSucursal(elem, label, text);
        }
        function watchSucursal (elem, label, text) {
            elem.data('oldVal', elem.val());
            label.text(text);
            elem.bind("propertychange change click keyup input paste", function(event){
                if (elem.data('oldVal') != elem.val()) {
                    
                    if(elem.val() != null){
                        label.removeClass("error");
                        label.addClass("right");
                        if (elem.hasClass("error")) {
                            elem.removeClass("error");
                        };
                        elem.addClass('valid');
                    } else {
                        if (elem.hasClass("valid")) {
                            elem.removeClass("valid");
                        };
                        label.addClass('error');
                        elem.addClass("error");
                    };
                }
            });
        }
        function watchMail (elem, label, text) {
            elem.data('oldVal', elem.val());
            label.text(text);
            elem.bind("propertychange change click keyup input paste", function(event){
                if (elem.data('oldVal') != elem.val()) {
                    if ( IsEmail(elem.val()) ){
                        elem.removeClass("error");
                        label.removeClass("error");
                        elem.addClass("valid");
                    } else{
                        elem.removeClass("valid");
                        elem.addClass("error");
                        label.addClass("error");
                    }               
                }
            });
        }
        function watchInput (elem, label, text) {
            elem.data('oldVal', elem.val());
            label.text(text);
            elem.bind("propertychange change click keyup input paste", function(event){
                if (elem.data('oldVal') != elem.val()) {
                    
                    if(elem.val().length > 3 ){
                        label.removeClass("error");
                        if (elem.hasClass("error")) {
                            elem.removeClass("error");
                        };
                        elem.addClass('valid');
                    } else if (elem.val().length <= 3) {
                        if (elem.hasClass("valid")) {
                            elem.removeClass("valid");
                        };
                        label.addClass('error');
                        elem.addClass("error");
                    };
                }
            });
        }
        function watchText (elem, label, text) {
            elem.data('oldVal', elem.val());
            label.text(text);
            elem.bind("propertychange change click keyup input paste", function(event){
                if (elem.data('oldVal') != elem.val()) {
                    
                    if(elem.val().length > 3 ){
                        label.removeClass("error");
                        if (elem.hasClass("error")) {
                            elem.removeClass("error");
                        };
                        elem.addClass('valid');
                    } else if (elem.val().length <= 3) {
                        if (elem.hasClass("valid")) {
                            elem.removeClass("valid");
                        };
                        label.addClass('error');
                        elem.addClass("error");
                    };
                }
            });
        }
        var datos = $('#quejaycomen').serializeArray();
        if (valido == true ) {    
            $.getJSON('http://eldiez.apps.godisruptive.com/send.php',datos,function(res){
                if (res.guardado == true) {
                    $(".content").fadeOut(300, function () {
                        $(".content").empty();
                        $(".content").html("<div class='whiteBk'></div><p class='text'>Gracias por tus comentarios, nos comunicaremos contigo a la brevedad.</p>");
                        $(".content").fadeIn(300);
                    });
                };
            }, function () {
                console.log("error");
            });
        }; 
    });
}
function switchPagina() {
    var url = document.location.href;
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
    url = url.length == 0 ? "index.html": url;
    url = url.split(".")[0];
    todasLasPaginas(url);
    if(typeof window[url] == 'function'){window[url]();}
}