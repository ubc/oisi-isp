/**
 * Initializes the accordions by attaching event listeners to the headers.
 */
export function initializeFAQs() {
	// Select all elements with class 'isp-accordion--header'
	const faqs = document.querySelectorAll( '.isp-faqs' );
	if ( faqs.length === 0 ) {
		return null;
	}
	// Attach click event listener to each header element
	faqs.forEach( function( faqContainer ) {
		new advancedFAQs( faqContainer );
	} );
}

class advancedFAQs {
	constructor( faqContainer ) {
		this.searchValue = {
			text: '',
			normalized: '',
		};

		this.activeFilter = null;

		/*
		 * Containers and Objects
		 */

		// The faq container
		this.faqContainer = faqContainer;

		// The search form
		this.searchForm = this.faqContainer.querySelector( '.wp-block-search' );

		this.searchInput = this.searchForm.querySelector(
			'.wp-block-search__input'
		);
		this.searchInput.removeAttribute( 'required' );

		// The Topic Filters
		this.filters = this.getFiltersData();

		// Create the mobile filter select box
		this.filterSelect = this.createFilterSelectBox();

		// The filter results text
		this.resultsText = this.faqContainer.querySelector(
			'.isp-faq__filter__results'
		);

		// The filter results text
		this.resultsTextTemplate = this.resultsText.textContent;

		// The faq items
		this.faqs = this.getFaqsData();

		// Add watchers for the search form and topic filters
		this.watchSearch();
		this.watchTopic();

		// add js class to faq container to display filters
		this.faqContainer.classList.add( 'isp-faqs--js' );
	}

	/*
	 * Data Setup
	 */
	getFaqsData() {
		const faqs = this.faqContainer.querySelectorAll(
			'.isp-accordion--single'
		);
		return Array.from( faqs ).map( ( faq ) => {
			const faqFilters = faq.querySelectorAll( '.isp-faq__filter' );
			return {
				dom: faq,
				normalized: this.normalizeText( faq.textContent ),
				filters: Array.from( faqFilters ).map( ( filter ) =>
					this.normalizeText( filter.textContent )
				),
				isVisible: true,
			};
		} );
	}
	getFiltersData() {
		const filters = this.faqContainer.querySelectorAll(
			'.isp-faq__filters__buttons .wp-element-button'
		);
		return Array.from( filters ).map( ( filter ) => {
			this.normalizeText( filter.textContent );
			return {
				dom: filter,
				text: filter.textContent,
				normalized: this.normalizeText( filter.textContent ),
			};
		} );
	}
	normalizeText( text ) {
		return text.toLowerCase().replace( /[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '' );
	}

	/*
	 * DOM CREATION
	 */
	createFilterSelectBox() {
		const selectBox = document.createElement( 'select' );
		selectBox.classList.add( 'isp-faq__filters__select' );

		const defaultOption = document.createElement( 'option' );
		defaultOption.textContent = 'All';
		defaultOption.value = '';
		selectBox.appendChild( defaultOption );

		this.filters.forEach( ( filter, index ) => {
			const option = document.createElement( 'option' );
			option.textContent = filter.text;
			option.value = index; // using the index as the value for simplicity
			selectBox.appendChild( option );
		} );

		this.faqContainer
			.querySelector( '.isp-faq__filters__inner' )
			.appendChild( selectBox );
		return selectBox;
	}

	/*
	 * Event Watchers
	 */
	watchSearch() {
		this.searchForm.addEventListener( 'submit', ( e ) => {
			// Prevent the form from submitting
			e.preventDefault();
			// Filter the faqs
			this.filterFAQ();
		} );

		this.searchInput.addEventListener( 'keyup', () => {
			this.filterFAQ();
		} );
	}

	watchTopic() {
		//loop through filterItems and add event listener set filterValue to match the button text
		this.filters.forEach( ( filter ) => {
			filter.dom.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				// If filter is already active, remove filter.
				this.activeFilter =
					this.activeFilter !== filter ? filter : null;
				// Set filter states.
				this.setFilterStates();
				// Filter the list.
				this.filterFAQ();
			} );
		} );

		this.filterSelect.addEventListener( 'change', ( e ) => {
			this.activeFilter = e.target.value
				? this.filters[ e.target.value ]
				: null;
			this.setFilterStates();
			this.filterFAQ();
		} );
	}

	/*
	 * State Setters
	 */
	setFilterStates() {
		this.filters.forEach( ( filter, index ) => {
			filter.dom.classList.remove( 'is-active' );
			if ( filter === this.activeFilter ) {
				filter.dom.classList.add( 'is-active' );
				this.filterSelect.value = index;
			}
		} );
		if ( ! this.filterValue ) {
			this.filterSelect.value = '';
		}
	}
	setSearchValue() {
		this.searchValue = {
			text: this.searchInput.value,
			normalized: this.normalizeText( this.searchInput.value ),
		};
	}

	/*
	 * Filter Functions
	 */
	filterFAQ() {
		this.setSearchValue();
		this.faqs.forEach( ( faq ) => {
			faq.isVisible = this.isDisplayed( faq );
			faq.dom.style.display = faq.isVisible ? 'block' : 'none';
		} );
		this.updateFaqClasses();
		this.updateFilterText();
	}

	isDisplayed( faq ) {
		if ( ! this.isDisplayedSearch( faq ) ) {
			return false;
		}
		if ( ! this.isDisplayedFilter( faq ) ) {
			return false;
		}
		return true;
	}

	isDisplayedSearch( faq ) {
		// If no search value, FAQ is not hidden.
		if ( ! this.searchValue.normalized ) {
			return true;
		}
		// If search value is in FAQ text, FAQ is not hidden.
		if ( faq.normalized.includes( this.searchValue.normalized ) ) {
			return true;
		}
		//  The FAQ is hidden.
		return false;
	}

	isDisplayedFilter( faq ) {
		// If no filter value, FAQ is not hidden.
		if ( ! this.activeFilter ) {
			return true;
		}
		// Check if any of the filters match the filter value.
		return Array.from( faq.filters ).some(
			( faqFilter ) => faqFilter === this.activeFilter.normalized
		);
	}

	updateFaqClasses() {
		if ( this.searchValue ) {
			this.faqContainer.classList.add( 'isp-faqs--searched' );
		} else {
			this.faqContainer.classList.remove( 'isp-faqs--searched' );
		}
		if ( this.filterValue ) {
			this.faqContainer.classList.add( 'isp-faqs--filtered' );
		} else {
			this.faqContainer.classList.remove( 'isp-faqs--filtered' );
		}
	}

	updateFilterText() {
		const visibleFaqsCount = this.faqs.filter(
			( faq ) => faq.isVisible
		).length;
		let filteredTerm = '';
		if ( this.activeFilter ) {
			filteredTerm += `<span>${ this.activeFilter.text }</span>`;
		}

		if ( this.activeFilter && this.searchValue.text ) {
			filteredTerm += ` & `;
		}

		if ( this.searchValue.text ) {
			filteredTerm += `<span>${ this.searchValue.text }</span>`;
		}

		this.resultsText.innerHTML = this.resultsTextTemplate
			.replace( '{{RESULTS}}', `<span>${ visibleFaqsCount }</span>` )
			.replace( '{{FILTER}}', filteredTerm );
	}
}
