/**
 * Initializes the accordions by attaching event listeners to the headers.
 */
export function initializePole() {
	// Select all elements with class 'isp-pole'
	const poles = document.querySelectorAll( '.isp-pole' );
	if ( poles.length === 0 ) {
		return null;
	}
	// Attach click event listener to each header element
	poles.forEach( function( pole ) {
		new TotemPole( pole );
	} );
}

// Classes used in block
const classNames = {
	open: 'isp-pole--open',
};

class TotemPole {
	constructor( pole ) {
		// Get and set elements for the object.
		this.container = pole;
		// Introduction Container.
		this.introduction = this.container.querySelector(
			'.isp-pole__intro__container'
		);
		// Display Marker.
		this.displayMarker = null;
		// Display Content.
		this.displayContent = null;
		// Explore/Open Button.
		this.exploreButton = this.container.querySelector( '.isp-pole__explore .wp-element-button' );
		// TotemPole Image.
		this.imageContainer = this.container.querySelector( '.isp-pole__pole' );
		this.image = this.container.querySelector( '.isp-pole__image img' );
		// Level Data.
		this.levels = this.gatherLevels();
		// Current Level Data.
		this.currentLevel = this.levels[ 0 ];
		// Open Status.
		this.isOpen = false;
		// pagination.
		this.pagination = {};

		// Add the close button to the block.
		this.addCloseButton();

		// Add the pagination to the block.
		this.addPagination();

		// Setup the watchers for the markers and explore button.
		this.watchEvents();

		// Adjust the positioning of the 'points' on the pole.
		this.adjustPointPositioning();

		// add a class to the container to show that the script is loaded.
		this.container.classList.add( 'isp-pole--js' );
	}

	/**
	 * Class Setup
	 */

	// Gather all the level data for the pole.
	gatherLevels() {
		const markers = this.container.querySelectorAll( '.isp-pole__marker' );
		const levels = this.container.querySelectorAll( '.isp-pole__level' );
		const levelData = [];
		markers.forEach( ( markerItem, index ) => {
			levelData.push( {
				index: parseInt( markerItem.textContent.trim() ),
				marker: markerItem,
				level: levels[ index ],
				position: {
					px: markerItem.offsetTop,
					percent: ( markerItem.offsetTop / 590 ) * 100,
				},
			} );
		} );
		return levelData;
	}

	// Watches the explore button and opens the pole.
	watchEvents() {
		// Set the watcher for the explore button.
		if ( this.exploreButton ) {
			this.exploreButton.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				// Open to the first level when using the exploe button.
				this.changeLevel( this.levels[ 0 ] );
			} );
		}

		// Set the watcher for the markers.
		if ( this.levels ) {
			this.levels.forEach( ( level ) => {
				level.marker.addEventListener( 'click', ( e ) => {
					e.preventDefault();
					this.changeLevel( level );
				} );
			} );
		}
	}

	/*
	 * Level Manipulation
	 */

	// Change to a level
	changeLevel( level ) {
		this.isOpen = true;
		this.currentLevel = ( Number.isInteger( level ) ) ? this.levels[ level - 1 ] : level;
		this.updateStatus();
	}

	// Updates the status of the block to open or closed and updates content.
	updateStatus() {
		if ( this.isOpen ) {
			this.container.classList.add( classNames.open );
		} else {
			this.container.classList.remove( classNames.open );
		}

		// Update the level content.
		this.updateLevel();
	}

	// Update the level content.
	updateLevel() {
		this.levels.forEach( ( level, index ) => {
			if ( level === this.currentLevel ) {
				// disable the previous button if needed.
				if ( index === 0 ) {
					this.pagination.previous.classList.add( 'is-disabled' );
				} else {
					this.pagination.previous.classList.remove( 'is-disabled' );
				}

				// disable the next button if needed.
				if ( index === this.levels.length - 1 ) {
					this.pagination.next.classList.add( 'is-disabled' );
				} else {
					this.pagination.next.classList.remove( 'is-disabled' );
				}

				// add the active class to the current pagination page.
				this.pagination.pages[ index ].classList.add( 'is-active' );

				// add the active class to the current level.
				level.level.classList.add( 'isp-pole__level--active' );
				level.marker.classList.add( 'isp-pole__marker--active' );
			} else {
				// remove the active class from the current pagination page.
				this.pagination.pages[ index ].classList.remove( 'is-active' );

				// remove the active class from the current level.
				level.level.classList.remove( 'isp-pole__level--active' );
				level.marker.classList.remove( 'isp-pole__marker--active' );
			}
		} );

		this.scrollImage();
	}

	// scroll the pole to the desired spot for the current level.
	scrollImage() {
		if ( this.isOpen ) {
			const transition = this.image.style.transition;
			this.image.style.transition = 'none';
			const markerOffset = parseInt( this.image.offsetHeight * ( 100 - this.currentLevel.position.percent ) / 100 );
			this.image.style.transition = transition;

			this.image.style.translate = `0 calc( -100% + ${ this.imageContainer.offsetHeight / 2 }px + ${ markerOffset }px)`;
		} else {
			this.image.style.translate = '0 0';
		}
	}

	/**
	 *  DOM Manipulation
	 */

	// Adjust the positioning for the points.
	adjustPointPositioning() {
		this.container.querySelectorAll( '.isp-pole__point' ).forEach( ( point ) => {
			const percentage = ( parseInt( point.style.marginTop ) / 590 ) * 100;
			point.style.marginTop = 0;
			point.style.top = `${ percentage }%`;
		} );
	}

	// Add close button (and close functionality).
	addCloseButton() {
		const closeButton = document.createElement( 'button' );
		closeButton.classList.add( 'isp-pole__close' );
		closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
			<path d="M15 24.5C20.2467 24.5 24.5 20.2467 24.5 15C24.5 9.75329 20.2467 5.5 15 5.5C9.75329 5.5 5.5 9.75329 5.5 15C5.5 20.2467 9.75329 24.5 15 24.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M18.5 15H11.5M22.5 22.5L28.5 28.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		`;
		closeButton.addEventListener( 'click', () => {
			this.isOpen = false;
			this.updateStatus();
		} );
		this.container.appendChild( closeButton );

		// Mobile Close Button
		const mobileCloseButton = document.createElement( 'button' );
		mobileCloseButton.classList.add( 'isp-pole__close__mobile' );
		mobileCloseButton.innerHTML = `BACK <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M11.25 18.375C15.185 18.375 18.375 15.185 18.375 11.25C18.375 7.31497 15.185 4.125 11.25 4.125C7.31497 4.125 4.125 7.31497 4.125 11.25C4.125 15.185 7.31497 18.375 11.25 18.375Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M13.875 11.25H8.625M16.875 16.875L21.375 21.375" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>`;
		mobileCloseButton.addEventListener( 'click', () => {
			this.isOpen = false;
			this.updateStatus();
		} );
		this.imageContainer.appendChild( mobileCloseButton );
	}

	// Add pagination for the block and functionality.
	addPagination() {
		// Create the pagination elements.
		const pagination = document.createElement( 'div' );
		pagination.classList.add( 'isp-pole__pagination' );

		// Create the pagination inner elements.
		const paginationInner = document.createElement( 'div' );
		paginationInner.classList.add( 'isp-pole__pagination__inner' );

		// Create the pagination pages container.
		const paginationPages = document.createElement( 'div' );
		paginationPages.classList.add( 'isp-pole__pagination__pages' );

		// Create the pagination previous button.
		this.pagination.previous = document.createElement( 'button' );
		this.pagination.previous.classList.add(
			'isp-pole__pagination__previous'
		);
		this.pagination.previous.innerHTML = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M13.9997 8.66671L8.66634 14L13.9997 19.3334L15.8663 17.4667L13.733 15.3334L19.333 15.3334L19.333 12.6667L13.733 12.6667L15.8663 10.5334L13.9997 8.66671ZM13.9997 0.666708C15.8441 0.666708 17.5775 1.01693 19.1997 1.71737C20.8219 2.41693 22.233 3.36671 23.433 4.56671C24.633 5.76671 25.5828 7.17782 26.2823 8.80004C26.9828 10.4223 27.333 12.1556 27.333 14C27.333 15.8445 26.9828 17.5778 26.2823 19.2C25.5828 20.8223 24.633 22.2334 23.433 23.4334C22.233 24.6334 20.8219 25.5836 19.1997 26.284C17.5775 26.9836 15.8441 27.3334 13.9997 27.3334C12.1552 27.3334 10.4219 26.9836 8.79967 26.284C7.17745 25.5836 5.76634 24.6334 4.56634 23.4334C3.36634 22.2334 2.41656 20.8223 1.71701 19.2C1.01656 17.5778 0.666339 15.8445 0.666339 14C0.666339 12.1556 1.01656 10.4223 1.71701 8.80004C2.41656 7.17782 3.36634 5.76671 4.56634 4.56671C5.76634 3.36671 7.17745 2.41693 8.79968 1.71737C10.4219 1.01693 12.1552 0.666708 13.9997 0.666708Z" fill="currentColor"/>
		</svg>`;

		// add the event listener to the previous button.
		this.pagination.previous.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			this.changeLevel( Math.max( this.currentLevel.index - 1, 1 ) );
		} );

		// Create the pagination next button.
		this.pagination.next = document.createElement( 'button' );
		this.pagination.next.classList.add( 'isp-pole__pagination__next' );
		this.pagination.next.innerHTML = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M14.0003 19.3333L19.3337 14L14.0003 8.66663L12.1337 10.5333L14.267 12.6666H8.66699V15.3333H14.267L12.1337 17.4666L14.0003 19.3333ZM14.0003 27.3333C12.1559 27.3333 10.4225 26.9831 8.80033 26.2826C7.1781 25.5831 5.76699 24.6333 4.56699 23.4333C3.36699 22.2333 2.41721 20.8222 1.71766 19.2C1.01721 17.5777 0.666992 15.8444 0.666992 14C0.666992 12.1555 1.01721 10.4222 1.71766 8.79996C2.41721 7.17774 3.36699 5.76663 4.56699 4.56663C5.76699 3.36663 7.1781 2.4164 8.80033 1.71596C10.4225 1.0164 12.1559 0.666626 14.0003 0.666626C15.8448 0.666626 17.5781 1.0164 19.2003 1.71596C20.8225 2.4164 22.2337 3.36663 23.4337 4.56663C24.6337 5.76663 25.5834 7.17774 26.283 8.79996C26.9834 10.4222 27.3337 12.1555 27.3337 14C27.3337 15.8444 26.9834 17.5777 26.283 19.2C25.5834 20.8222 24.6337 22.2333 23.4337 23.4333C22.2337 24.6333 20.8225 25.5831 19.2003 26.2826C17.5781 26.9831 15.8448 27.3333 14.0003 27.3333Z" fill="currentColor"/>
		</svg>`;

		// add the event listener to the next button.
		this.pagination.next.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			this.changeLevel( Math.min( this.currentLevel.index + 1, this.levels.length ) );
		} );

		// Create the buttons for each page
		this.levels.forEach( ( level ) => {
			// Create the pagination item.
			const paginationItem = document.createElement( 'button' );
			paginationItem.classList.add( 'isp-pole__pagination__item' );
			paginationItem.setAttribute( 'data-level', level.index );
			paginationItem.textContent = level.index;

			// add the event listener to the pagination item.
			paginationItem.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				this.changeLevel( level );
			} );

			// Add the pagination item to the pagination pages.
			paginationPages.appendChild( paginationItem );
		} );

		// Store the pagination pages in the class.
		this.pagination.pages = paginationPages.children;

		// Append the previous to the pagination container.
		paginationInner.appendChild( this.pagination.previous );
		// Append the pagination pages to the pagination container.
		paginationInner.appendChild( paginationPages );
		// Append the next to the pagination container.
		paginationInner.appendChild( this.pagination.next );
		// Append the pagination container to the pagination.
		pagination.appendChild( paginationInner );
		// Append the pagination to the container.
		this.container.appendChild( pagination );
	}
}
