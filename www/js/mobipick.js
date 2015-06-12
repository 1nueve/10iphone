/*
 XDate v0.7
 Docs & Licensing: http://arshaw.com/xdate/
*/
var XDate=function(g,m,A,p){function f(){var a=this instanceof f?this:new f,c=arguments,b=c.length,d;typeof c[b-1]=="boolean"&&(d=c[--b],c=q(c,0,b));if(b)if(b==1)if(b=c[0],b instanceof g||typeof b=="number")a[0]=new g(+b);else if(b instanceof f){var c=a,h=new g(+b[0]);if(l(b))h.toString=w;c[0]=h}else{if(typeof b=="string"){a[0]=new g(0);a:{for(var c=b,b=d||!1,h=f.parsers,r=0,e;r<h.length;r++)if(e=h[r](c,b,a)){a=e;break a}a[0]=new g(c)}}}else a[0]=new g(n.apply(g,c)),d||(a[0]=s(a[0]));else a[0]=new g;
typeof d=="boolean"&&B(a,d);return a}function l(a){return a[0].toString===w}function B(a,c,b){if(c){if(!l(a))b&&(a[0]=new g(n(a[0].getFullYear(),a[0].getMonth(),a[0].getDate(),a[0].getHours(),a[0].getMinutes(),a[0].getSeconds(),a[0].getMilliseconds()))),a[0].toString=w}else l(a)&&(a[0]=b?s(a[0]):new g(+a[0]));return a}function C(a,c,b,d,h){var e=k(j,a[0],h),a=k(D,a[0],h),h=c==1?b%12:e(1),f=!1;d.length==2&&typeof d[1]=="boolean"&&(f=d[1],d=[b]);a(c,d);f&&e(1)!=h&&(a(1,[e(1)-1]),a(2,[E(e(0),e(1))]))}
function F(a,c,b,d){var b=Number(b),h=m.floor(b);a["set"+o[c]](a["get"+o[c]]()+h,d||!1);h!=b&&c<6&&F(a,c+1,(b-h)*G[c],d)}function H(a,c,b){var a=a.clone().setUTCMode(!0,!0),c=f(c).setUTCMode(!0,!0),d=0;if(b==0||b==1){for(var h=6;h>=b;h--)d/=G[h],d+=j(c,!1,h)-j(a,!1,h);b==1&&(d+=(c.getFullYear()-a.getFullYear())*12)}else b==2?(b=a.toDate().setUTCHours(0,0,0,0),d=c.toDate().setUTCHours(0,0,0,0),d=m.round((d-b)/864E5)+(c-d-(a-b))/864E5):d=(c-a)/[36E5,6E4,1E3,1][b-3];return d}function t(a){var c=a(0),
b=a(1),a=a(2),b=new g(n(c,b,a)),d=u(c),a=d;b<d?a=u(c-1):(c=u(c+1),b>=c&&(a=c));return m.floor(m.round((b-a)/864E5)/7)+1}function u(a){a=new g(n(a,0,4));a.setUTCDate(a.getUTCDate()-(a.getUTCDay()+6)%7);return a}function I(a,c,b,d){var h=k(j,a,d),e=k(D,a,d),b=u(b===p?h(0):b);d||(b=s(b));a.setTime(+b);e(2,[h(2)+(c-1)*7])}function J(a,c,b,d,e){var r=f.locales,g=r[f.defaultLocale]||{},i=k(j,a,e),b=(typeof b=="string"?r[b]:b)||{};return x(a,c,function(a){if(d)for(var b=(a==7?2:a)-1;b>=0;b--)d.push(i(b));
return i(a)},function(a){return b[a]||g[a]},e)}function x(a,c,b,d,e){for(var f,g,i="";f=c.match(M);){i+=c.substr(0,f.index);if(f[1]){g=i;for(var i=a,j=f[1],l=b,m=d,n=e,k=j.length,o=void 0,q="";k>0;)o=N(i,j.substr(0,k),l,m,n),o!==p?(q+=o,j=j.substr(k),k=j.length):k--;i=g+(q+j)}else f[3]?(g=x(a,f[4],b,d,e),parseInt(g.replace(/\D/g,""),10)&&(i+=g)):i+=f[7]||"'";c=c.substr(f.index+f[0].length)}return i+c}function N(a,c,b,d,e){var g=f.formatters[c];if(typeof g=="string")return x(a,g,b,d,e);else if(typeof g==
"function")return g(a,e||!1,d);switch(c){case "fff":return i(b(6),3);case "s":return b(5);case "ss":return i(b(5));case "m":return b(4);case "mm":return i(b(4));case "h":return b(3)%12||12;case "hh":return i(b(3)%12||12);case "H":return b(3);case "HH":return i(b(3));case "d":return b(2);case "dd":return i(b(2));case "ddd":return d("dayNamesShort")[b(7)]||"";case "dddd":return d("dayNames")[b(7)]||"";case "M":return b(1)+1;case "MM":return i(b(1)+1);case "MMM":return d("monthNamesShort")[b(1)]||"";
case "MMMM":return d("monthNames")[b(1)]||"";case "yy":return(b(0)+"").substring(2);case "yyyy":return b(0);case "t":return v(b,d).substr(0,1).toLowerCase();case "tt":return v(b,d).toLowerCase();case "T":return v(b,d).substr(0,1);case "TT":return v(b,d);case "z":case "zz":case "zzz":return e?c="Z":(d=a.getTimezoneOffset(),a=d<0?"+":"-",b=m.floor(m.abs(d)/60),d=m.abs(d)%60,e=b,c=="zz"?e=i(b):c=="zzz"&&(e=i(b)+":"+i(d)),c=a+e),c;case "w":return t(b);case "ww":return i(t(b));case "S":return c=b(2),c>
10&&c<20?"th":["st","nd","rd"][c%10-1]||"th"}}function v(a,c){return a(3)<12?c("amDesignator"):c("pmDesignator")}function y(a){return!isNaN(+a[0])}function j(a,c,b){return a["get"+(c?"UTC":"")+o[b]]()}function D(a,c,b,d){a["set"+(c?"UTC":"")+o[b]].apply(a,d)}function s(a){return new g(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds(),a.getUTCMilliseconds())}function E(a,c){return 32-(new g(n(a,c,32))).getUTCDate()}function z(a){return function(){return a.apply(p,
[this].concat(q(arguments)))}}function k(a){var c=q(arguments,1);return function(){return a.apply(p,c.concat(q(arguments)))}}function q(a,c,b){return A.prototype.slice.call(a,c||0,b===p?a.length:b)}function K(a,c){for(var b=0;b<a.length;b++)c(a[b],b)}function i(a,c){c=c||2;for(a+="";a.length<c;)a="0"+a;return a}var o="FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds,Day,Year".split(","),L=["Years","Months","Days"],G=[12,31,24,60,60,1E3,1],M=/(([a-zA-Z])\2*)|(\((('.*?'|\(.*?\)|.)*?)\))|('(.*?)')/,
n=g.UTC,w=g.prototype.toUTCString,e=f.prototype;e.length=1;e.splice=A.prototype.splice;e.getUTCMode=z(l);e.setUTCMode=z(B);e.getTimezoneOffset=function(){return l(this)?0:this[0].getTimezoneOffset()};K(o,function(a,c){e["get"+a]=function(){return j(this[0],l(this),c)};c!=8&&(e["getUTC"+a]=function(){return j(this[0],!0,c)});c!=7&&(e["set"+a]=function(a){C(this,c,a,arguments,l(this));return this},c!=8&&(e["setUTC"+a]=function(a){C(this,c,a,arguments,!0);return this},e["add"+(L[c]||a)]=function(a,d){F(this,
c,a,d);return this},e["diff"+(L[c]||a)]=function(a){return H(this,a,c)}))});e.getWeek=function(){return t(k(j,this,!1))};e.getUTCWeek=function(){return t(k(j,this,!0))};e.setWeek=function(a,c){I(this,a,c,!1);return this};e.setUTCWeek=function(a,c){I(this,a,c,!0);return this};e.addWeeks=function(a){return this.addDays(Number(a)*7)};e.diffWeeks=function(a){return H(this,a,2)/7};f.parsers=[function(a,c,b){if(a=a.match(/^(\d{4})(-(\d{2})(-(\d{2})([T ](\d{2}):(\d{2})(:(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/)){var d=
new g(n(a[1],a[3]?a[3]-1:0,a[5]||1,a[7]||0,a[8]||0,a[10]||0,a[12]?Number("0."+a[12])*1E3:0));a[13]?a[14]&&d.setUTCMinutes(d.getUTCMinutes()+(a[15]=="-"?1:-1)*(Number(a[16])*60+(a[18]?Number(a[18]):0))):c||(d=s(d));return b.setTime(+d)}}];f.parse=function(a){return+f(""+a)};e.toString=function(a,c,b){return a===p||!y(this)?this[0].toString():J(this,a,c,b,l(this))};e.toUTCString=e.toGMTString=function(a,c,b){return a===p||!y(this)?this[0].toUTCString():J(this,a,c,b,!0)};e.toISOString=function(){return this.toUTCString("yyyy-MM-dd'T'HH:mm:ss(.fff)zzz")};
f.defaultLocale="";f.locales={"":{monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),amDesignator:"AM",pmDesignator:"PM"}};f.formatters={i:"yyyy-MM-dd'T'HH:mm:ss(.fff)",u:"yyyy-MM-dd'T'HH:mm:ss(.fff)zzz"};K("getTime,valueOf,toDateString,toTimeString,toLocaleString,toLocaleDateString,toLocaleTimeString,toJSON".split(","),
function(a){e[a]=function(){return this[0][a]()}});e.setTime=function(a){this[0].setTime(a);return this};e.valid=z(y);e.clone=function(){return new f(this)};e.clearTime=function(){return this.setHours(0,0,0,0)};e.toDate=function(){return new g(+this[0])};f.now=function(){return+new g};f.today=function(){return(new f).clearTime()};f.UTC=n;f.getDaysInMonth=E;if(typeof module!=="undefined"&&module.exports)module.exports=f;return f}(Date,Math,Array);
XDate.locales['en'] = {
  monthNames: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  monthNamesShort: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  dayNames: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  dayNamesShort: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
  dateFormat: "dddd, MMMM d, yyyy",
  dateFormatMonth: "MMMM yyyy",
  dateFormatYear: "yyyy",
  ok: "Accept",
  cancel: "Cancel"
};
XDate.locales['es'] = {
  monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
  monthNamesShort: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
  dayNames: ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],
  dayNamesShort: ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],
  dateFormat: "dddd, d 'de' MMMM 'de' yyyy",
  dateFormatMonth: "MMMM 'de' yyyy",
  dateFormatYear: "yyyy",
  ok: "Aplicar",
  cancel: "Cancelar"
};
/*
 * Mobi Pick - An Android-style datepicker widget for jQuery Mobile.
 *
 * Created by Christoph Baudson.
 *
 * Please report issues at https://github.com/sustainablepace/mobipick/issues
 *
 * Version 0.9
 *
 * Licensed under MIT license, see MIT-license.txt
 */
( function( $, undefined ){
$.widget( "sustainablepace.mobipick", $.mobile.widget, {
	options: {
		date            : null,
		dateFormat      : "yyyy-MM-dd",
		dateFormatMonth : "yyyy-MM",
		dateFormatYear  : "yyyy",
		locale          : "es",
		intlStdDate     : true,
		popup           : {
			dismissible: false,
			history: false,
			overlayTheme: "a",
			positionTo: "window",
			theme: "a",
			transition: "none"
		}
	},
	// Controller
	_picker: $( [] ),
	widgetEventPrefix: "mobipick",
	destroy: function() {
		this._close();
		this.element.off( "tap click" );
		this._picker.popup( "destroy" );
		$.Widget.prototype.destroy.call( this );
	},
	_create: function() {
		this._initOptions();          // parses options
		this._createView();           // inserts markup into DOM
		this.element.on( "tap click", $.proxy( this.open, this ) );
	},
	_initOptions: function() {
		var date    = this.element.val()         || this.options.date,
		    minDate = this.element.attr( "min" ) || this.options.minDate,
		    maxDate = this.element.attr( "max" ) || this.options.maxDate;

		if( date ) {
			this._setOption( "date", date );
		}
		// Min and max dates can be set in the markup.
		// See http://dev.w3.org/html5/markup/input.date.html
		if( maxDate ) {
			this._setOption( "maxDate", maxDate );
		}
		if( minDate ) {
			this._setOption( "minDate", minDate );
		}
		this._setOption( "locale", this.options.locale );
	},
	_init: function() {
		// fill input field with default value
		if( this._getDate() !== null ) {
			this.updateDateInput();
		}
	},
	open: function( evt ) {
        if( evt ) {
            evt.stopPropagation();
            evt.preventDefault();
        }
		var date = this._getDate();
		if( !this._isXDate( date ) ) {
			date = new XDate();
		}
		this._setOption( "date",         this._fitDate( date ) );
		this._setOption( "originalDate", this._getDate()       );

		this._showView();
		this._updateView();
		this._bindEvents();
	},
	_bindEvents: function() {
		var self    = this,
		    p       = this._picker,
		    confirm = $.proxy( this._confirmDate,     this ),
		    cancel  = $.proxy( this._cancelDate,      this ),
		    esc     = $.proxy( this._cancelDateOnEsc, this );

		// Set and Cancel buttons
		p.find( ".mobipick-set"    ).off().on( "tap", confirm );
		p.find( ".mobipick-cancel" ).off().on( "tap", cancel  );
		$( document ).off( "keyup", esc ).on( "keyup", esc );

		// +/- Buttons
		var selectorMap = {
			".mobipick-prev-day"   : "_prevDay",
			".mobipick-prev-month" : "_prevMonth",
			".mobipick-prev-year"  : "_prevYear",
			".mobipick-next-day"   : "_nextDay",
			".mobipick-next-month" : "_nextMonth",
			".mobipick-next-year"  : "_nextYear"
		};
		for( var selector in selectorMap ) {
			(function() {
				var handler = self[ selectorMap[ selector ] ];
				p.find( selector ).off().on( "tap", $.proxy( function() {
					return self._handleDate( handler );
				}, self ));
			})();
		}
	},
	_close: function() {
		this._hideView();
	},
	_handleDate: function( dateHandler ) {
		this._setOption( "date", this._fitDate( dateHandler.apply( this ) ) );
		return false;
	},
	_confirmDate: function() {
		var proceed    = true,
		    dateDiff   = this._getDate().diffDays( this.options.originalDate ),
		    hasChanged = dateDiff !== 0 || this.element.val() === "";

		if( this.options.close && typeof this.options.close === "function" ) {
			proceed = this.options.close.call() !== false;
		}
		if( proceed && hasChanged ) {
			this._setOption( "originalDate", this._getDate() );
			this.updateDateInput();
			this.element.trigger("change");
		} else {
			this._setOption( "date", this.options.originalDate );
		}
		this._close();
		return false;
	},
	_cancelDate: function() {
		this._setOption( "date", this.options.originalDate );
		this._close();
		return false;
	},
	_cancelDateOnEsc: function( evt ) {
		if( evt.keyCode === 27 ) {
			this._cancelDate();
		}
	},
	_setOption: function( key, val ) {
		switch( key ) {
			case "date":
				var sane = this._sanitizeDate( val );
				this.options[ key ] = sane ? sane.toDate() : sane;
				break;
			case "originalDate":
				this.options[ key ] = this._sanitizeDate( val ).toDate();
				break;
			case "maxDate":
				this.options[ key ] = this._sanitizeMaxDate( val ).toDate();
				break;
			case "minDate":
				this.options[ key ] = this._sanitizeMinDate( val ).toDate();
				break;
			case "intlStdDate":
				this.options[ key ] = !!val;
				break;
			case "locale":
				this.options[ key ] = this._isValidLocale( val ) ? val : "en";
				break;
			default:
				// Do not update view!
				return $.Widget.prototype._setOption.apply( this, arguments );
		}
		this._updateView();
	},
	//
	// Model
	//
	_sanitizeDate: function( date ) {
		if( date === null ) {
			return null;
		}
		var d = date;
		if( typeof d === "string" ) {
			d = new XDate( d );
		}
		if( this._isXDate( d ) ) {
			d = d.toDate();
		}
		if( !this._isDate( d ) ) {
			throw "Parameter 'date' must be a Date.";
		}
		return new XDate( d.getFullYear(), d.getMonth(), d.getDate() );
	},
	_sanitizeMinDate: function( date ) {
		var minDate = this._sanitizeDate( date );
		if( this._isAfterMaxDate( minDate ) ) {
			throw "Min date must be before max date.";
		}
		return minDate;
	},
	_sanitizeMaxDate: function( date ) {
		var maxDate = this._sanitizeDate( date );
		if( this._isBeforeMinDate( maxDate ) ) {
			throw "Max date must be after min date.";
		}
		return maxDate;
	},
	_getDateFormat: function() {
		switch( this.options.accuracy ) {
			case "month":
				return "dateFormatMonth";
			case "year":
				return "dateFormatYear";
			default:
				return "dateFormat";
		}
	},
	dateString: function() {
		var format = this._getDateFormat(),
		    date   = this._getDate();
		return !date ? '' : date.toString( this.options[ format ] );
	},
	localeString: function() {
		var l    = this.options.locale,
		    a    = this._getDateFormat(),
		    date = this._getDate();

		return !date ? '' : date.toString(
			this._isValidLocale( l ) ? XDate.locales[ l ][ a ] : this.options[ a ]
		);
	},
	_fitDate: function( d ) {
		return this._isAfterMaxDate( d ) ? this._getMaxDate() :
			( this._isBeforeMinDate( d ) ? this._getMinDate() : d );
	},
	_isAfterMaxDate: function( d ) {
		var maxDate = this._getMaxDate();
		return this._isXDate( maxDate ) && d.diffDays( maxDate ) < 0;
	},
	_isBeforeMinDate: function( d ) {
		var m = this._getMinDate();
		return this._isXDate( m ) && m.diffDays( d ) < 0;
	},
	_isValidLocale: function( l ) {
		return typeof l === "string" && XDate.locales && XDate.locales[ l ];
	},
	_isDate: function( d ) {
		return typeof d === "object" && d !== null && d.constructor === Date;
	},
	_isXDate: function( x ) {
		return typeof x === "object" && x !== null && x.constructor === XDate;
	},
	_getMaxDate: function() {
		var maxDate = this.options.maxDate;
		return this._isDate( maxDate ) ? new XDate( maxDate ) : null;
	},
	_getMinDate: function() {
		var minDate = this.options.minDate;
		return this._isDate( minDate ) ? new XDate( minDate ) : null;
	},
	_getDate: function() {
		var date = this.options.date;
		return this._isDate( date ) ? new XDate( date ) : null;
	},
	_prevDay: function() {
		return this._addDay( -1 );
	},
	_nextDay: function() {
		return this._addDay( 1 );
	},
	_prevMonth: function() {
		return this._addMonth( -1 );
	},
	_nextMonth: function() {
		return this._addMonth( 1 );
	},
	_prevYear: function() {
		return this._addYear( -1 );
	},
	_nextYear: function() {
		return this._addYear( 1 );
	},
	_addYear: function( y ) {
		return this._getDate().addYears( y, true );
	},
	_addMonth: function( m ) {
		var date     = this._getDate(),
		    month    = date.getMonth(),
		    newMonth = ( 12 + month + m ) % 12;
		return date.setMonth( newMonth, true );
	},
	_addDay: function( d ) {
		var dt = this._getDate(),
		    n  = XDate.getDaysInMonth( dt.getFullYear(), dt.getMonth() );
		return dt.setDate( ( dt.getDate() - 1 + n + d ) % n + 1 );
	},

	//
	// View
	//
	_markup: "<div class='mobipick-main'><ul class='mobipick-groups'><li><ul><li><a class='mobipick-next-day'>+</a></li><li><input type='text' class='mobipick-input mobipick-day' /></li><li><a class='mobipick-prev-day'>-</a></li></ul></li><li><ul><li><a class='mobipick-next-month'>+</a></li><li><input type='text' class='mobipick-input mobipick-month' /></li><li><a class='mobipick-prev-month'>-</a></li></ul></li><li><ul><li><a class='mobipick-next-year'>+</a></li><li><input type='text' class='mobipick-input mobipick-year' /></li><li><a class='mobipick-prev-year'>-</a></li></ul></li></ul><ul class='mobipick-buttons'><li><a class='mobipick-cancel'>Cancelar</a></li><li><a class='mobipick-set'>Aceptar</a></li></ul></div>",
	_applyTheme: function() {
		var p       = this._picker,
		    buttons = {
		        "bottom": "ul.mobipick-groups ul > li:first-child > a",
		        "top":    "ul.mobipick-groups ul > li:last-child > a"
		    };

		for( var key in buttons ) {
			p.find( buttons[ key ] ).addClass( "ui-corner-all" )
				.css( "border-" + key + "-left-radius", "0")
				.css( "border-" + key + "-right-radius", "0");
		}
		p.addClass( "ui-body-" + this.options.popup.theme + " ui-corner-all" );
		p.find( "a" ).attr( "href", "#" )
			.addClass( "ui-body-" + this.options.buttonTheme );
		p.find( "ul.mobipick-buttons a" ).addClass( "ui-corner-all" );
		p.find( "input" )
			.attr( "readonly", "readonly" ).addClass( "ui-shadow-inset" );
	},
	_createView: function() {
		this.element.attr( "readonly", "readonly" );
		this._picker = $( this._markup ).popup( this.options.popup );
		$.data( this.element, "mobipick", this );
		this._applyTheme();
	},
	_updateView: function() {
		var date = this._getDate(),
		    p    = this._picker;

		if( this._isXDate( date ) ) {
			p.find( ".mobipick-year"  ).val( date.toString( "yyyy" ) );
			p.find( ".mobipick-month" ).val( date.toString( "MMM"  ) );
			p.find( ".mobipick-day"   ).val( date.toString( "dd"   ) );
		}
		var locale = {};
		if( this._isValidLocale( this.options.locale ) ) {
			XDate.defaultLocale = this.options.locale;
			locale = XDate.locales[ this.options.locale ];
		}

		p.find( ".mobipick-set"    ).text( locale.ok     || "Aceptar"    );
		p.find( ".mobipick-cancel" ).text( locale.cancel || "Cancelar" );

		// Display items based on accuracy setting
		
		var columns = p.find( ".mobipick-groups > li" )
			.removeClass( "mobipick-hide" )
			.addClass( "mobipick-inline-block" );

		if( this.options.accuracy === "month" ) {
			p.css( "max-width", "280px" )
				.find( ".mobipick-groups > li:first-child" )
				.addClass( "mobipick-hide" )
				.removeClass( "mobipick-inline-block" );
		} else if( this.options.accuracy === "year" ) {
			p.css( "max-width", "200px" )
				.find( ".mobipick-groups > li:last-child" )
				.siblings().addClass( "mobipick-hide" )
				.removeClass( "mobipick-inline-block" );
		} else {
			p.css( "max-width", "300px" );
		}
		// minus 1% margin (left and right) per column
		/*
		var columnCount = columns.filter( ":visible" ).size(),
		    width       = ( ( 100 - columnCount * 2 ) / columnCount ) + "%";
		columns.css( "width", width );*/
	},
	_showView: function() {
		this._picker.show().popup("open").focus();
	},
	_hideView: function() {
		this._picker.popup("close");
	},
	updateDateInput: function() {
		this.element.val( this.options.intlStdDate ?
			this.dateString() : this.localeString()
		);
	}
});
}( jQuery ) );