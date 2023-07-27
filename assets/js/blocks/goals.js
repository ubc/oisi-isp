import { slideToggle } from '../utilities/slideToggle';

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

	init( containerElement ) {
		this.wrapper = containerElement;
		this.carousel = containerElement.querySelector( '.isp-goals__slides' );
		this.slides = containerElement.querySelectorAll( '.isp-goals__slide' );

		this.setupContainer();

		this.getOnLoadSlide();

		this.setupButtons();

		this.setupAccordionToggle();

		this.setCurrentSlide();
	},

	getOnLoadSlide() {
		const loadHash = window.location.hash;
		if ( loadHash ) {
			for ( let i = 0; i < this.slides.length; i++ ) {
				const slide = this.slides[ i ];
				const slideHash = '#' + slide.getAttribute( 'id' );
				if ( slideHash === loadHash ) {
					this.currentSlide = i;
					window.scrollTo( {
						top: this.wrapper.offsetTop - 80,
						behavior: 'smooth',
					} );
				}
			}
		}
	},

	// Add container element to wrap the carousel.
	setupContainer() {
		// Create the container.
		this.container = document.createElement( 'div' );
		this.container.classList.add( 'isp-goals__container' );
		// Move the carousel to the container.
		this.container.appendChild( this.carousel );
		// Add the container to the wrapper.
		this.wrapper.appendChild( this.container );
	},

	setupButtons() {
		const buttonGroup = document.createElement( 'div' );
		buttonGroup.classList.add( 'isp-goals__buttons' );

		for ( let i = 0; i < this.slides.length; i++ ) {
			const slide = this.slides[ i ];

			// Create the button for this goal.
			const button = document.createElement( 'button' );
			button.classList.add( 'isp-goals__button' );
			button.setAttribute( 'data-index', i );

			// Add event listener to button
			button.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				const buttonIndex = button.getAttribute( 'data-index' );
				if ( buttonIndex !== this.currentSlide ) {
					this.currentSlide = parseInt( buttonIndex );
					this.setCurrentSlide();
				}
			} );

			// Get the eyebrow test.
			const eyebrowText = slide.querySelector(
				'.isp-goals__header__eyebrow'
			);
			// If the eyebrow text is set, add it to the button.
			if ( eyebrowText ) {
				// Create element.
				const eyebrowElement = document.createElement( 'h6' );
				// Add class.
				eyebrowElement.classList.add( 'isp-goals__button__eyebrow' );
				// Add content.
				eyebrowElement.textContent = eyebrowText.textContent;
				// Add to button.
				button.appendChild( eyebrowElement );
			}

			// Get the title text.
			const titleText = slide.querySelector( '.isp-goals__header__title' );
			// If the title text is set, add it to the button.
			if ( titleText ) {
				// Create element.
				const titleElement = document.createElement( 'h3' );
				// Add class.
				titleElement.classList.add( 'isp-goals__button__title' );
				// Add content.
				titleElement.textContent = titleText.textContent;
				// Add to button.
				button.appendChild( titleElement );
			}
			// Add button to button group.
			buttonGroup.appendChild( button );
		}
		// Store the group of buttons.
		this.buttons = buttonGroup.children;

		// Add the button group to the container.
		this.container.prepend( buttonGroup );
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
	},

	setupAccordionToggle() {
		const goalsToggleElement = document.createElement( 'button' );
		goalsToggleElement.classList.add( 'isp-goals__toggle' );
		goalsToggleElement.setAttribute( 'aria-label', 'Toggle Goal' );

		this.container.addEventListener( 'click', ( e ) => {
			if ( e.target.classList.contains( 'isp-goals__toggle' ) ) {
				e.preventDefault();
				const slide = e.target.closest( '.isp-goals__slide' );
				if ( slide ) {
					slide.classList.toggle( 'is-goal--open' );
					const body = slide.querySelector( '.isp-goals__body' );
					slideToggle( body );
				}
			}
		} );

		this.container
			.querySelectorAll( '.isp-goals__header' )
			.forEach( ( element ) => {
				element.appendChild( goalsToggleElement.cloneNode( true ) );
			} );
	},
};
