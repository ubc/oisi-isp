/* global jQuery */

export function initializeTimelines() {
	document.addEventListener( 'DOMContentLoaded', () => {
		jQuery( '.isp-timeline' ).each( function() {
			Timeline.init( jQuery( this ) );
		} );
	} );
}

const Timeline = {
	timeline: null,
	decades: null,
	buttons: null,

	init( timlineElement ) {
		this.timeline = timlineElement;
		this.decades = this.timeline.find( '.isp-timeline__decade' );
		this.createButtons();
		this.setupObserver();
	},

	createButtons() {
		this.buttons = this.decades.map( ( index, element ) => {
			return jQuery( '<button/>', {
				class: 'isp-timeline__button',
				'data-decade': index,
				text: jQuery( element )
					.find( '.isp-timeline__decade__title' )
					.text(),
				click: this.handleButtonClick,
			} )[ 0 ];
		} );

		const buttonsWrap = jQuery( '<div/>', {
			class: 'isp-timeline__buttons alignfull',
		} );

		const buttonsInner = jQuery( '<div/>', {
			class: 'isp-timeline__buttons__inner',
		} );
		const buttonsContainer = jQuery( '<div/>', {
			class: 'isp-timeline__button__container',
		} );

		this.buttons.prependTo(
			buttonsContainer.prependTo(
				buttonsInner.prependTo( buttonsWrap.prependTo( this.timeline ) )
			)
		);
	},

	handleButtonClick( event ) {
		const button = jQuery( event.target );
		Timeline.scrollToButton( button );
		Timeline.scrollToDecade( button );
	},

	scrollToButton( button ) {
		jQuery( '.isp-timeline__button' ).removeClass( 'is-active' );
		button.addClass( 'is-active' );
		const buttonOffset = button.position().left;
		const buttonContainer = button.parent();
		buttonContainer.css( { left: -buttonOffset - ( button.width() / 2 ) - 7 } );
	},
	scrollToDecade( button ) {
		const decade = button.data( 'decade' );
		const decadeElement = jQuery( Timeline.decades[ decade ] );
		const offset = jQuery( decadeElement ).offset().top;

		jQuery( 'html, body' ).animate( { scrollTop: offset - 80 }, 500 );
	},

	setupObserver() {
		const options = {
			rootMargin: '-81px 0px 0px 0px ',
			threshold: 1.0,
		};

		const downCallback = ( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.boundingClientRect.top < 81 ) {
					if ( entry.isIntersecting ) {
					} else {
						const timelineButton = jQuery(
							'.isp-timeline__button[data-decade=' +
								jQuery( entry.target ).index() +
								']'
						);
						Timeline.scrollToButton( timelineButton );
					}
				}
			} );
		};

		const upCallback = ( entries ) => {
			entries.forEach( ( entry ) => {
				if (
					entry.boundingClientRect.top > 81 &&
					entry.boundingClientRect.top < 500
				) {
					if ( entry.isIntersecting ) {
						const decade = jQuery( entry.target ).closest(
							'.isp-timeline__decade'
						);
						const timelineButton = jQuery(
							'.isp-timeline__button[data-decade=' +
								decade.index() +
								']'
						);
						Timeline.scrollToButton( timelineButton );
					}
				}
			} );
		};

		const downObserver = new IntersectionObserver( downCallback, options );
		const upObserver = new IntersectionObserver( upCallback, options );

		this.decades.each( ( index, element ) => {
			downObserver.observe( element );
		} );

		jQuery( '.isp-timeline__year:last-child' ).each( ( index, element ) => {
			upObserver.observe( element );
		} );
	},
};
