/**
 * Shuffles letters around in an element when hovered, making gibberish words.
 * @author Andreas Nymark <andreas@nymark.co>
 * @license MIT
 * @version 7
 * @property {boolean} capitilize - Always capitilize first letter. Will most likely change width.
 * @property {integer} interval - Interval for shuffling letters
 * @property {boolean} width - Measure with of element and set styles
 */
/**
 * @class Girbshebi
 */
export class Girbshebi {
	constructor ( elem, options ) {
		this.elem = elem;
		this.orgTextValue = elem.textContent;
		this.int = [];
		this.defs = {
			capitilize: false,
			interval: 75,
			width: true,
		};

		// Overriding defaults
		if ( options ) {
			for ( var o in options ) {
				this.defs[ o ] = options[ o ];
			}
		}

		// Make sure we bind all to this
		this.blur = this.blur.bind( this );
		this.hover = this.hover.bind( this );
		this.setText = this.setText.bind( this );

		// Event listeners
		this.addEvent();
	}

	/**
	 * Update text when hover.
	 */
	hover () {
		if ( this.defs.width ) {
			this.elem.style.width = this.elem.offsetWidth + 'px';
			this.elem.style.overflow = 'visible';
		}
		this.int.push( setInterval( this.setText, this.defs.interval ) );
		this.elem.setAttribute( 'aria-label', this.orgTextValue );
		setTimeout( this.setText, 0 );
	}

	/**
	 * Reset to original text when mouseout.
	 */
	blur () {
		if ( this.defs.width ) {
			this.elem.style.width = 'auto';
			this.elem.style.overflow = 'auto';
		}
		clearInterval( this.int[ this.int.length - 1 ] );
		this.elem.setAttribute( 'aria-label', '' );
		this.elem.innerHTML = this.orgTextValue;
		this.int = [];
	}

	/**
	 * Sets new shuffled word in element
	 */
	setText () {
		if ( this.elem.parentNode.querySelector( ':hover' ) ) {
			let txt = this.orgTextValue.shuffle();
			if ( this.defs.capitilize ) txt = txt.capitalizeFirstLetter();
			this.elem.innerHTML = '<span style="pointer-events:none">' + txt + '</span>'; // Safari-fix
		}
	}

	/**
	 * Add event listeners
	 */
	addEvent () {
		this.elem.addEventListener( 'mouseover', this.hover );
		this.elem.addEventListener( 'mouseout', this.blur );
	}

	/**
	 * Remove event listeners
	 */
	removeEvent () {
		this.elem.removeEventListener( 'mouseover', this.hover );
		this.elem.removeEventListener( 'mouseout', this.blur );
	}
}

/**
 * Shuffle letters to make new “word”. [Credit](https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string)
 * @method shuffle
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
 * @return {String} New “word” with capital first letter. All others are lowercase.
 */
String.prototype.capitalizeFirstLetter = function () {
	var txt = this.toLowerCase();
	return txt.charAt( 0 ).toUpperCase() + txt.slice( 1 );
};
