export function initializePostSliders() {
	const impactStoryCarousels = document.querySelectorAll( '.isp-post-slider' );
	if ( impactStoryCarousels ) {
		impactStoryCarousels.forEach( function( element ) {
			impactStoryCarousel.init( element );
		} );
	}
}

const impactStoryCarousel = {
	currentSlide: 0,
	container: null,
	carousel: null,
	slides: null,
	totalSlides: 0,
	infinite: true,
	activeClass: 'isp-post-slider__slide--active',

	// Initialize the slider.
	init( containerElement ) {
		this.container = containerElement;
		this.carousel = containerElement.querySelector( '.wp-block-post-template' );
		this.slides = containerElement.querySelectorAll( '.wp-block-post' );
		this.totalSlides = this.slides.length;

		this.setupSlider();
	},

	// Update the state of the slider.
	updateState() {
		this.slides.forEach( ( slide, index ) => {
			if ( index === this.currentSlide ) {
				slide.classList.add( this.activeClass );
			} else {
				slide.classList.remove( this.activeClass );
			}
		} );
	},

	// Change the current slide.
	changeSlide( direction ) {
		// Increase or decrease the current slide.
		this.currentSlide += ( 'previous' === direction ) ? -1 : 1;
		// If it's an infinite loop, we need to make sure we loop around.
		if ( this.infinite ) {
			// use modulus to get the remainder of the current slide divided by the total number of slides.
			// This will give us the remainder, which is the slide we want to show. (e.g. Slide 2 of 12 =  14 % 12 = 2)
			this.currentSlide = ( this.currentSlide + this.totalSlides ) % this.totalSlides;
		} else {
			// Not infinite. Make sure we don't go out of bounds.
			this.currentSlide = Math.max( 0, Math.min( this.currentSlide, this.totalSlides - 1 ) );
		}
		this.updateState();
	},

	/*
	 * Setup the slider.
	*/
	setupSlider() {
		// add next / previous buttons.
		this.setupButtons();
		// add class to carousel to signify that JS is enabled.
		this.carousel.classList.add( 'isp-post-slider__slides' );
		// add class to container to signify that JS is enabled.
		this.container.classList.add( 'isp-post-slider--js' );
		// update the state of the slider.
		this.updateState();
	},

	// Setup the previous and next buttons.
	setupButtons() {
		// Create a button group.
		const buttonGroup = document.createElement( 'div' );
		buttonGroup.classList.add( 'isp-post-slider__buttons' );
		// Add the previous and next buttons.
		buttonGroup.appendChild( this.createButton( 'previous' ) );
		buttonGroup.appendChild( this.createButton( 'next' ) );
		// Add them to the container.
		this.container.appendChild( buttonGroup );
	},

	// Create a navigation button and add an event listener.
	createButton( direction ) {
		const buttonElement = document.createElement( 'button' );
		buttonElement.classList.add( 'isp-post-slider__button' );
		buttonElement.classList.add( `isp-post-slider__button--${ direction }` );
		buttonElement.setAttribute( 'aria-label', direction );
		buttonElement.setAttribute( 'type', 'button' );
		buttonElement.textContent = direction;
		buttonElement.addEventListener( 'click', () => this.changeSlide( direction ) );
		return buttonElement;
	},
};
