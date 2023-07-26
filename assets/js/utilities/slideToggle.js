// Slide Toggle Utility.
export function slideToggle( element, duration, callback ) {
	if ( element.clientHeight === 0 ) {
		slideElement( element, duration, callback, true );
	} else {
		slideElement( element, duration, callback );
	}
}

// Slide Up Utility.
export function slideUp( element, duration, callback ) {
	slideElement( element, duration, callback );
}

// Slide Down Utility.
export function slideDown( element, duration, callback ) {
	slideElement( element, duration, callback, true );
}

// Slide Element Utility.
function slideElement( el, duration, callback, isDown ) {
	if ( typeof duration === 'undefined' ) {
		duration = 400;
	}
	if ( typeof isDown === 'undefined' ) {
		isDown = false;
	}

	el.style.overflow = 'hidden';
	if ( isDown ) {
		el.style.display = 'block';
	}

	const elStyles = window.getComputedStyle( el );

	const elHeight = parseFloat( elStyles.getPropertyValue( 'height' ) );
	const elPaddingTop = parseFloat( elStyles.getPropertyValue( 'padding-top' ) );
	const elPaddingBottom = parseFloat( elStyles.getPropertyValue( 'padding-bottom' ) );
	const elMarginTop = parseFloat( elStyles.getPropertyValue( 'margin-top' ) );
	const elMarginBottom = parseFloat( elStyles.getPropertyValue( 'margin-bottom' ) );

	const stepHeight = elHeight / duration;
	const stepPaddingTop = elPaddingTop / duration;
	const stepPaddingBottom = elPaddingBottom / duration;
	const stepMarginTop = elMarginTop / duration;
	const stepMarginBottom = elMarginBottom / duration;

	let start;

	function step( timestamp ) {
		if ( start === undefined ) {
			start = timestamp;
		}

		const elapsed = timestamp - start;

		if ( isDown ) {
			el.style.height = ( stepHeight * elapsed ) + 'px';
			el.style.paddingTop = ( stepPaddingTop * elapsed ) + 'px';
			el.style.paddingBottom = ( stepPaddingBottom * elapsed ) + 'px';
			el.style.marginTop = ( stepMarginTop * elapsed ) + 'px';
			el.style.marginBottom = ( stepMarginBottom * elapsed ) + 'px';
		} else {
			el.style.height = elHeight - ( stepHeight * elapsed ) + 'px';
			el.style.paddingTop = elPaddingTop - ( stepPaddingTop * elapsed ) + 'px';
			el.style.paddingBottom = elPaddingBottom - ( stepPaddingBottom * elapsed ) + 'px';
			el.style.marginTop = elMarginTop - ( stepMarginTop * elapsed ) + 'px';
			el.style.marginBottom = elMarginBottom - ( stepMarginBottom * elapsed ) + 'px';
		}

		if ( elapsed >= duration ) {
			el.style.height = '';
			el.style.paddingTop = '';
			el.style.paddingBottom = '';
			el.style.marginTop = '';
			el.style.marginBottom = '';
			el.style.overflow = '';
			if ( ! isDown ) {
				el.style.display = 'none';
			}
			if ( typeof callback === 'function' ) {
				callback();
			}
		} else {
			window.requestAnimationFrame( step );
		}
	}

	window.requestAnimationFrame( step );
}
