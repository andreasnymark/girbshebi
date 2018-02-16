/**
 * Girbshebi. Just gibberish. Shuffles letters around in an element when hovered. 
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var merl = merl || {};

merl.girbshebi = ( function ( window, document ) {
	"use strict";


	var instances = [],
		defs = {
			selector: '.js-girbshebi',
			interval: 75,
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

		var items = document.querySelectorAll( defs.selector ),
			n = items.length;

		if ( instances.length > 0 ) {
			for ( var i = 0, n = instances.length; i < n; i++ ) {	
				instances[ i ].elem.dispatchEvent( new Event( 'mouseout' ) );
				instances[ i ].removeEvent();
			}		
			instances = [];
		}

		for ( var i = 0; i < n; i++ ) {
			instances[ i ] = new Girbshebi( items[ i ] );
		}
	};


	/**
	 * @constructor Girbshebi
	 * @param {HTMLElement} elem - DOM Element
	 */
	var Girbshebi = function ( elem ) {
		var t = this;
		t.int = null;
		t.elem = elem;
		t.text = t.elem.innerText;
		t.blur = t.blur.bind( t );
		t.hover = t.hover.bind( t );
		t.original = t.elem.innerHTML;
		t.addEvent();
	};


	Girbshebi.prototype = {

		/**
		 * @method hover
		 */
		hover: function () {
			var t = this;
			t.elem.style.width = t.elem.offsetWidth + 'px';
			t.int = setInterval( t.setText.bind( t ), defs.interval ); 
			setTimeout( t.setText.bind( t ), 0 );
		},

		/**
		 * @method blur
		 */
		blur: function () {
			var t = this;
			t.elem.removeAttribute( 'style' );
			t.elem.innerHTML = t.original;
			clearInterval( t.int );
		},

		/**
		 * @method setText
		 */
		setText: function () {
			this.elem.innerHTML = this.text.shuffle();
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


	return {
		init: init,
	};


} ( window, document ) );