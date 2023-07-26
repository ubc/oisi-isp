export function initializeTimelines() {
	document.addEventListener( 'DOMContentLoaded', () => {
		document.querySelectorAll( '.isp-timeline' ).forEach( ( timelineElement ) => {
			Timeline.init( timelineElement );
		} );
	} );
}

const Timeline = {
	navigationOffset: 81,
	timeline: null,
	decades: null,
	buttons: null,
	observer: null,
	scroll: {
		oldPosition: 0,
		direction: false,
	},

	// Setup the timeline.
	init( timlineElement ) {
		this.timeline = timlineElement;
		this.decades = Array.from( this.timeline.querySelectorAll( '.isp-timeline__decade' ) );
		this.createNavigation();
		this.setupObservers();
		this.addObserverTriggers();
	},

	createElement( params = {}, elem = 'div' ) {
		return Object.assign( document.createElement( elem ), params );
	},

	// Create buttons for each decade.
	createNavigation() {
		const buttonsWrap = this.createElement( {
			classList: 'isp-timeline__buttons alignfull',
		} );

		const buttonsInner = this.createElement( {
			classList: 'isp-timeline__buttons__inner',
		} );

		const buttonsContainer = this.createElement( {
			classList: 'isp-timeline__button__container',
		} );

		this.buttons = this.decades.map( ( decade, decadeIndex ) => {
			const button = this.createDecadeButton( decade, decadeIndex );
			buttonsContainer.appendChild( button );
			return button;
		} );

		buttonsInner.appendChild( buttonsContainer );
		buttonsWrap.appendChild( buttonsInner );
		this.timeline.prepend( buttonsWrap );
		this.navigationOffset = buttonsWrap.offsetHeight;
	},

	createDecadeButton( decade, decadeIndex ) {
		const button = this.createElement( {
			classList: [ 'isp-timeline__button' ],
			textContent: decade.querySelector( '.isp-timeline__decade__title' ).textContent,
			data: {
				decade: decadeIndex,
			},
		} );
		button.addEventListener( 'click', () => {
			Timeline.scrollNavigationToDecade( button );
			Timeline.scrollContentToDecade( decade );
		} );
		return button;
	},

	// Scroll the decade navigation to the current decade
	scrollNavigationToDecade( destinationButton ) {
		this.buttons.forEach( ( button ) => {
			if ( button === destinationButton ) {
				button.classList.add( 'is-active' );
				button.parentNode.style.left = ( -1 * button.offsetLeft ) + 'px';
			} else {
				button.classList.remove( 'is-active' );
			}
		} );
	},

	// Scroll the content area to a specific decade.
	scrollContentToDecade( decadeElement ) {
		window.scrollTo( {
			top: decadeElement.getBoundingClientRect().top + window.pageYOffset - 80,
			behavior: 'smooth',
		} );
	},

	addObserverTriggers() {
		// Add the trigger elements to the decades.
		this.decades.forEach( ( decade ) => {
			// downscroll trigger.
			this.addTrigger( decade, 'down' );
			// Add a trigger to the last event in the decade.
			this.addTrigger( decade.querySelector( '.isp-timeline__year:last-of-type .isp_timeline__year__event:last-of-type' ), 'up' );
		} );
	},

	addTrigger( location, tag ) {
		const trigger = this.createElement( {
			classList: `isp-timeline__scroll-trigger isp-timeline__scroll-trigger--${ tag }`,
		} );
		location.append( trigger );
		this.observer.observe( trigger );
	},

	// Setup the observer to watch for decade changes.
	setupObservers() {
		this.observer = new IntersectionObserver( ( targetDecades ) => {
			this.onIntersect( targetDecades );
		}, {
			rootMargin: `${ ( this.navigationOffset ) * -1 }px 0px 0px 0px`,
			threshold: 0,
		} );
	},

	// Handle the decades intersecting the scroll trigger.
	onIntersect( scrollTriggers ) {
		this.setScrollDirection();
		scrollTriggers.forEach( ( scrollTrigger ) => {
			this.processIntersection( scrollTrigger );
		} );
	},

	// Set scroll direction.
	setScrollDirection() {
		// Get the scroll direction.
		this.scroll.direction = ( window.scrollY > this.scroll.oldPosition ) ? 'down' : 'up';
		this.scroll.oldPosition = window.scrollY;
	},

	// Process the intersection.
	processIntersection( scrollTrigger ) {
		const ScrollTriggerElement = scrollTrigger.target;
		if (
			ScrollTriggerElement.classList.contains( `isp-timeline__scroll-trigger--${ this.scroll.direction }` ) && (
				( this.scroll.direction === 'down' && ScrollTriggerElement.getBoundingClientRect().top <= this.navigationOffset ) ||
			( this.scroll.direction === 'up' && ScrollTriggerElement.getBoundingClientRect().bottom < window.pageYOffset ) )
		) {
			this.setActiveDecade( ScrollTriggerElement.closest( '.isp-timeline__decade' ) );
		}
	},

	// Set the active decade.
	setActiveDecade( targetDecade ) {
		const targetIndex = this.decades.findIndex( ( decade ) => targetDecade === decade );
		if ( targetIndex !== -1 ) {
			Timeline.scrollNavigationToDecade( this.buttons[ targetIndex ] );
		}
	},
};
