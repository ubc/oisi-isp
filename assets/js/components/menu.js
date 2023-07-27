export function initializeSubMenu() {
	const navMenu = document.querySelector( '#ubc-isp-nav__menu' );
	if ( navMenu ) {
		navMenu.addEventListener( 'click', function( e ) {
			if ( e.target.matches( '.sub-menu__toggle' ) ) {
				e.preventDefault();
				e.stopPropagation();

				const menuItem = e.target.closest( '.menu-item' );
				menuItem.classList.toggle( 'menu-item--open' );

				const subMenu = menuItem.querySelector( '.sub-menu' );
				subMenu.style.display = 'none' ? 'block' : 'none';
			}
		} );
	}
}
