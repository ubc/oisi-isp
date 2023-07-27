import SimpleBar from 'simpleBar';
import { slideToggle } from '../utilities/slideToggle';

export function initializeTeamMembers() {
	document.addEventListener( 'DOMContentLoaded', () => {
		TeamMember.init();
	} );
}

const TeamMember = {
	init() {
		const teamElements = document.querySelectorAll( '.isp-team' );

		if ( teamElements.length === 0 ) {
			return;
		}

		teamElements.forEach( ( teamElement ) => {
			this.initAccordion( teamElement );
		} );
	},

	initAccordion( teamElement ) {
		this.addToggleButton( teamElement );
		new SimpleBar( teamElement.querySelector( '.isp-team__body__inner' ), { scrollbarMaxSize: 80 } );
	},

	addToggleButton( teamElement ) {
		const buttonContainer = teamElement.querySelector( '.isp-team__button-column' );
		if ( buttonContainer ) {
			const buttonElement = document.createElement( 'button' );
			buttonElement.classList.add( 'isp-team__toggle', 'button-tertiary' );
			buttonElement.setAttribute( 'aria-label', 'Toggle Team Member' );
			buttonElement.innerHTML =
				`<span class="isp-team__toggle__text">
					<span class="isp-team__toggle--open">Read More</span>
					<span class="isp-team__toggle--close">Close</span>
				</span>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M19 12.9981H13V18.9981H11V12.9981H5V10.9981H11V4.99814H13V10.9981H19V12.9981Z" fill="currentColor" />
				</svg>`;

			const teamBodyElement = teamElement.querySelector( '.isp-team__body' );
			buttonElement.addEventListener( 'click', () => {
				buttonElement.classList.toggle( 'is_active' );
				slideToggle( teamBodyElement );
			} );

			buttonContainer.appendChild( buttonElement );
		}
	},
};
