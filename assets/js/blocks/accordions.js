/**
 * Initializes accordion functionality for elements with the class 'isp-accordion--header'.
 *
 */

/* global jQuery */

/**
 * Initializes the accordions by attaching event listeners to the headers.
 */
export function initializeAccordions() {
	// Select all elements with class 'isp-accordion--header'
	const headers = document.querySelectorAll( '.isp-accordion--header' );
	if ( headers.length === 0 ) {
		return null;
	}
	// Attach click event listener to each header element
	headers.forEach( function( header ) {
		header.addEventListener( 'click', toggleAccordion );
	} );
}

// Function to toggle the 'isp-accordion--active' class
function toggleAccordion() {
	this.classList.toggle( 'isp-accordion--active' );
	jQuery( this.nextElementSibling ).slideToggle();
}
