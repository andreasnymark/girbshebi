/**
 * Girbshebi. Just gibberish. Shuffles letters around in an element when hovered. 
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 3
**/
var merl = merl || {};

merl.girbshebi = ( function ( window, document ) {
	"use strict";


	var instances = [],
		winWidth,
		defs = {
			capitilize: false,
			selector: '.js-girbshebi',
			interval: 75,
			width: false,
			attr: 'data-girbshebi',
			minWidth: 768,
		};


	/**
	 * Initiate plugin
	 * @method init
	 * @param {Object} options - override default settings
	**/
	var init = function ( options ) {
		if ( options ) {
			for ( var o in options ) {
				defs[ o ] = options[ o ];
			}
		}

		winWidth = window.innerWidth || document.documentElement.clientWidth;

		var items = document.querySelectorAll( defs.selector ),
			n = items.length;

		if ( instances.length > 0 ) {
			for ( var i = 0, n = instances.length; i < n; i++ ) {	
				instances[ i ].elem.dispatchEvent( new Event( 'mouseout' ) );
				instances[ i ].removeEvent();
			}		
			instances = [];
		}

		if ( winWidth > defs.minWidth ) {
			for ( var i = 0; i < n; i++ ) {
				var item = items[ i ],
					data = item.getAttribute( defs.attr ),
					json = JSON.parse( data ),
					width = defs.width,
					cap = defs.capitilize,
					int = defs.interval;

				if ( json ) {
					if ( typeof json.width === 'boolean' ) width = json.width;
					if ( typeof json.interval === 'number' ) int = json.interval;	
					if ( typeof json.capitilize === 'boolean' ) cap = json.capitilize;
				}

				instances[ i ] = new Girbshebi( items[ i ], cap, int, width );
			}
		}
	};


	/**
	 * @constructor Girbshebi
	 * @param {HTMLElement} elem - DOM Element
	 */
	var Girbshebi = function ( elem, capitilize, interval, width ) {
		var t = this;
		t.int = [];
		t.elem = elem;
		t.text = t.elem.innerText;
		t.blur = t.blur.bind( t );
		t.hover = t.hover.bind( t );
		t.capitilize = capitilize;
		t.original = t.elem.innerHTML;
		t.interval = interval;
		t.width = width;
		t.addEvent();
	};


	Girbshebi.prototype = {

		/**
		 * @method hover
		 */
		hover: function () {
			var t = this;
			if ( t.width ) t.elem.style.width = t.elem.offsetWidth + 'px';
			t.int.push( setInterval( t.setText.bind( t ), t.interval ) ); 
			setTimeout( t.setText.bind( t ), 0 );
		},

		/**
		 * @method blur
		 */
		blur: function () {
			var t = this;
			if ( t.width ) t.elem.removeAttribute( 'style' );
			t.elem.innerHTML = t.original;
			for ( var i = 0, len = t.int.length; i < len; i++ ) {
				clearInterval( t.int[ i ] );	
			}
			t.int = [];
		},

		/**
		 * @method setText
		 */
		setText: function () {
			var t = this;
			if ( t.elem.parentNode.querySelector( ':hover' ) ) {
				var txt = t.text.shuffle();
				if ( t.capitilize ) txt = txt.capitalizeFirstLetter();	
				t.elem.innerHTML = txt;
			} else {
				t.blur();
			}
		},

		/**
		 * @method addEvent
		 */
		addEvent: function () {
			var t = this;
			t.elem.addEventListener( 'mouseover', t.hover );
			t.elem.addEventListener( 'mouseout', t.blur );
		},

		/**
		 * @method removeEvent
		 */
		removeEvent: function () {
			var t = this;
			t.elem.removeEventListener( 'mouseover', t.hover );
			t.elem.removeEventListener( 'mouseout', t.blur );
		},
	};


	/**
	 * Shuffle letters in a string. Credit: https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
	 * @method shuffle
	 * @return {String} new string with letters shuffled
	 */
	String.prototype.shuffle = function () {
		var a = this.split( '' );

		for ( var n = a.length, i = n - 1; i > 0; i-- ) {
			var j = Math.floor( Math.random() * ( i + 1 ) ),
				tmp = a[ i ];

			a[ i ] = a[ j ];
			a[ j ] = tmp;
		}

		a = a.join( '' )
		return a.replace( /\s/g, '&nbsp;' );
	};

	/**
	 * http://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
	 * @method capitalizeFirstLetter
	 * @return {String} string with capital first letter, and all others lowercase
	 */
	String.prototype.capitalizeFirstLetter = function () {
		var txt = this.toLowerCase();
		return txt.charAt( 0 ).toUpperCase() + txt.slice( 1 );
	};


	return {
		init: init,
	};


} ( window, document ) );