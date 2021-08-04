/** @namespace merl */
var merl = merl || {};
/**
 * Shuffles letters around in an element when hovered, making gibberish words. 
 * @author Andreas Nymark <andreas@nymark.me>
 * @namespace girbshebi
 * @memberof merl
 * @license MIT
 * @version 5
 * @property {boolean} capitilize - Always capitilize first letter. Will most likely change width.  
 * @property {string} selector - Selector
 * @property {integer} interval - Interval for shuffling letters
 * @property {boolean} width - Set styles for initial width
 * @property {string} attr - Attribute where default word is stored.
 * @property {integer} minWidth - Minimum screen width to where Girbshebi run. 
 */
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
	 * @class Girbshebi
	 * @memberof merl.girbshebi
	 */
	var Girbshebi = function ( elem, capitilize, interval, width ) {
		var t = this;
		t.int = [];
		t.elem = elem;
		t.txt = t.elem.innerText;
		t.blur = t.blur.bind( t );
		t.hover = t.hover.bind( t );
		t.capitilize = capitilize;
		t.original = t.elem.innerHTML;
		t.interval = interval;
		t.elemWidth = width;
		t.addEvent();
	};

	/** @lends merl.girbshebi.Girbshebi */
	Girbshebi.prototype = {
		/** 
		* Triggered via 'mouseover' event.
		* @protected
		* @memberof merl.girbshebi.Girbshebi
		*/
		hover: function () {
			var t = this;
			if ( t.elemWidth ) {
				t.elem.style.width = t.elem.offsetWidth + 'px';
				t.elem.style.overflow = 'visible';
			}
			t.int.push( setInterval( t.setText.bind( t ), t.interval ) ); 
			setTimeout( t.setText.bind( t ), 0 );
		},

		/** 
		* Triggered via 'mouseout' event.
		* @protected
		* @memberof merl.girbshebi.Girbshebi
		*/
		blur: function () {
			var t = this;
			if ( t.elemWidth ) t.elem.removeAttribute( 'style' );
			t.elem.innerHTML = t.original;
			for ( var i = 0, len = t.int.length; i < len; i++ ) {
				clearInterval( t.int[ i ] );	
			}
			t.int = [];
		},

		/** 
		* Changes text according to interval.
		* @protected
		* @memberof merl.girbshebi.Girbshebi
		*/
		setText: function () {
			var t = this;
			if ( t.elem.parentNode.querySelector( ':hover' ) ) {
				var txt = t.txt.shuffle();
				if ( t.capitilize ) txt = txt.capitalizeFirstLetter();	
				t.elem.innerHTML = txt;
			} else {
				t.blur();
			}
		},

		/**
		 * @protected
		 * @memberof merl.girbshebi.Girbshebi
		 */
		addEvent: function () {
			var t = this;
			t.elem.addEventListener( 'mouseover', t.hover );
			t.elem.addEventListener( 'mouseout', t.blur );
		},



		/**
		 * @protected
		 * @memberof merl.girbshebi.Girbshebi
		 */
		removeEvent: function () {
			var t = this;
			t.elem.removeEventListener( 'mouseover', t.hover );
			t.elem.removeEventListener( 'mouseout', t.blur );
		},
	};


	/**
	 * Shuffle letters to make new “word”. [Credit](https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string)
	 * @method shuffle
	 * @memberof merl.girbshebi
	 * @return {string} New “word” with letters shuffled.
	 */
	String.prototype.shuffle = function () {
		var a = this.split( '' );

		for ( var n = a.length, i = n - 1; i > 0; i-- ) {
			var j = Math.floor( Math.random() * ( i + 1 ) ),
				tmp = a[ i ];

			a[ i ] = a[ j ];
			a[ j ] = tmp;
		}

		a = a.join( '' );
		return a.replace( /\s/g, '&nbsp;' );
	};

	/**
	 * Capitalize first letter in new “word”. [Credit](http://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript)
	 * @method capitalizeFirstLetter
	 * @memberof merl.girbshebi
	 * @return {String} New “word” with capital first letter. All others are lowercase.
	 */
	String.prototype.capitalizeFirstLetter = function () {
		var txt = this.toLowerCase();
		return txt.charAt( 0 ).toUpperCase() + txt.slice( 1 );
	};
	
	
	/**
	 * Initiate girbshebi.
	 * @method init
	 * @inner
	 * @memberof merl.girbshebi
	 */
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


	return {
		init: init,
	};


} ( window, document ) );
