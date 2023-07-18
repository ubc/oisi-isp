/* global jQuery */

export function initializeGoals() {
	const goalsElements = document.querySelectorAll( '.isp-goals' );
	if ( goalsElements ) {
		goalsElements.forEach( function( element ) {
			Goals.init( element );
		} );
	}
}

const Goals = {
	currentSlide: 0,
	wrapper: null,
	container: null,
	slides: null,
	buttons: null,
	buttonGroup: null,

	init( containerElement ) {
		this.wrapper = containerElement;
		this.carousel = containerElement.querySelector( '.isp-goals__slides' );
		this.slides = containerElement.querySelectorAll( '.isp-goals__slide' );

		this.getOnLoadSlide();

		this.setupButtons();

		this.buttons =
			this.buttonGroup.querySelectorAll( '.isp-goals__button' );

		this.setupContainer();

		this.setupAccordionToggle();

		this.setCurrentSlide();

		jQuery( this.container ).on( 'click', '.isp-goals__button', ( e ) => {
			e.preventDefault();
			const button = jQuery( e.currentTarget );
			const buttonIndex = button.data( 'index' );
			if ( buttonIndex !== this.currentSlide ) {
				this.currentSlide = buttonIndex;
				this.setCurrentSlide();
			}
		} );
	},

	getOnLoadSlide() {
		const loadHash = window.location.hash;
		if ( loadHash ) {
			for ( let i = 0; i < this.slides.length; i++ ) {
				const slide = this.slides[ i ];
				const slideHash = '#' + slide.getAttribute( 'id' );
				if ( slideHash === loadHash ) {
					this.currentSlide = i;

					jQuery( 'html, body' ).animate(
						{ scrollTop: jQuery( this.wrapper ).offset().top - 80 },
						500
					);
				}
			}
		}
	},

	setupContainer() {
		this.container = document.createElement( 'div' );
		this.container.classList.add( 'isp-goals__container' );

		this.container.appendChild( this.buttonGroup );
		this.container.appendChild( this.carousel );

		this.wrapper.appendChild( this.container );
	},

	setupButtons() {
		const buttonGroup = document.createElement( 'div' );
		buttonGroup.classList.add( 'isp-goals__buttons' );

		for ( let i = 0; i < this.slides.length; i++ ) {
			const slide = this.slides[ i ];

			const button = document.createElement( 'button' );
			button.classList.add( 'isp-goals__button' );
			button.setAttribute( 'data-index', i );

			const eyebrowText = slide.querySelector(
				'.isp-goals__header__eyebrow'
			);
			const titleText = slide.querySelector(
				'.isp-goals__header__title'
			);

			if ( eyebrowText ) {
				const eyebrow = document.createElement( 'h6' );
				eyebrow.classList.add( 'isp-goals__button__eyebrow' );
				eyebrow.textContent = eyebrowText
					? eyebrowText.textContent
					: null;
				button.appendChild( eyebrow );
			}
			if ( titleText ) {
				const title = document.createElement( 'h3' );
				title.classList.add( 'isp-goals__button__title' );
				title.textContent = titleText ? titleText.textContent : null;
				button.appendChild( title );
				button.appendChild( title );
			}
			buttonGroup.appendChild( button );
		}
		this.buttonGroup = buttonGroup;
	},

	setCurrentSlide() {
		for ( let i = 0; i < this.slides.length; i++ ) {
			const slide = this.slides[ i ];
			if ( i === this.currentSlide ) {
				slide.classList.add( 'is-active' );
			} else {
				slide.classList.remove( 'is-active' );
			}
		}
		for ( let i = 0; i < this.buttons.length; i++ ) {
			const button = this.buttons[ i ];
			if ( i === this.currentSlide ) {
				button.classList.add( 'is-active' );
			} else {
				button.classList.remove( 'is-active' );
			}
		}
		// window.location.hash = this.slides[this.currentSlide].getAttribute("id");
	},

	setupAccordionToggle() {
		jQuery( this.container )
			.find( '.isp-goals__header' )
			.append( '<button class="isp-goals__toggle"></button>' );

		jQuery( this.container ).on( 'click', '.isp-goals__toggle', ( e ) => {
			jQuery( e.target )
				.closest( '.isp-goals__slide' )
				.toggleClass( 'is-goal--open' )
				.find( '.isp-goals__body' )
				.slideToggle();
		} );
	},
};
