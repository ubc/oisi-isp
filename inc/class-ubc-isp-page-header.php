<?php
/**
 * This class is responsible for page header functions.
 *
 * There are 4 page headers:
 *
 * 1. Homepage (no header / breadcrumbs )
 * 2. Level 1 pages (no header / breacrumbs but include sub nav)
 * 3. Level 2 pages (sub menu, full header, and  breadcrumbs )
 * 4. Level 3 pages (sub menu, no header, and  breadcrumbs )
 *
 * @package UBC Collab ISP Child Theme Functions
 */
class UBC_ISP_Page_Header {

	/**
	 * Init function
	 */
	public static function init() {
		add_action( 'template_redirect', array( __CLASS__, 'setup_header' ), 10 );
		add_filter( 'body_class', array( __CLASS__, 'add_body_class' ), 10, 1 );
	}

	/**
	 * Add hooks for page headers
	 */
	public static function setup_header() {

		// Remove the default breadcrumbs and page header.
		remove_action( 'wp-hybrid-clf_before_container', array( 'UBC_Collab_Navigation', 'breadcrumb' ), 8 );

		// Add menu depth class to menu items.
		add_filter( 'nav_menu_css_class', array( __CLASS__, 'menu_depth_class' ), 10, 4 );

		switch ( self::header_size() ) {
			case ( 1 ):
				self::slim_header_hooks();
				break;
			case ( 2 ):
				self::full_header_hooks();
				break;
			case ( 3 ):
				self::small_header_hooks();
				break;
		}
	}

	/**
	 * Add a class to body
	 * 
	 * @param  array $classes The body classes.
	 */
	public static function add_body_class( $classes ) {
		$classes[] = 'isp-header--' . self::header_size();
		return $classes;
	}


	/**
	 * Get the header size
	 */
	public static function header_size() {
		switch ( true ) {
			case is_front_page():
				return 0; // No header/breadcrumbs.
			case is_search():
				return 0; // No Header/breadcrumbs.
			case is_singular( 'post' ):
				return 2; // Full header/breadcrumbs.
			case is_page_template( 'pages/level-1.php' ):
				return 1; // Slim header/breadcrumbs.
			case is_page_template( 'pages/level-2.php' ):
				return 2; // Full header/breadcrumbs.
			case is_page_template( 'pages/level-3.php' ):
				return 3; // Small header/breadcrumbs.
			default: 
				return self::page_depth();
		}
		return 1;
	}

	/**
	 * Get the page depth
	 */
	public static function page_depth() {
		global $post;
		$ancestors = $post->ancestors;
		if ( ! empty( $ancestors ) ) {
			return count( $ancestors ) + 1;
		}
		return 1;
	}

	/**
	 * Hooks used for the small header pages.
	 */
	public static function slim_header_hooks() {
		add_action( 'wp-hybrid-clf_before_container', array( __CLASS__, 'third_level_nav' ), 7 );
	}

	/**
	 * Hooks used for the small header pages.
	 */
	public static function small_header_hooks() {
		add_action( 'wp-hybrid-clf_before_container', array( __CLASS__, 'third_level_nav' ), 7 );

		add_action( 'wp-hybrid-clf_before_container', array( __CLASS__, 'small_page_header' ), 9 );

		add_filter( 'breadcrumb_trail_args', array( __CLASS__, 'breadcrumb_trail_args' ) );
	}

	/**
	 * Hooks used for the full header pages.
	 */
	public static function full_header_hooks() {
		add_action( 'wp-hybrid-clf_before_container', array( __CLASS__, 'third_level_nav' ), 7 );

		add_action( 'wp-hybrid-clf_before_container', array( __CLASS__, 'full_page_header' ), 9 );

		add_filter( 'breadcrumb_trail_args', array( __CLASS__, 'breadcrumb_trail_args' ) );
	}

	/**
	 * Small Header Size
	 */
	public static function small_page_header() {
		self::page_header( 'small' );
	}

	/**
	 * Small Header Size
	 */
	public static function full_page_header() {
		self::page_header( 'full' );
	}

	/**
	 * Setup the header Structure.
	 *
	 * @param string $size The size of the header image.
	 */
	public static function page_header( $size = 'full' ) {
		?>
		<header class="isp-breadcrumbs isp-breadcrumbs--<?php echo esc_attr( $size ); ?>">
			<div class="isp-breadcrumbs--row">
				<?php self::header_image(); ?>
				<div class="isp-breadcrumbs--container">
					<?php esc_html( UBC_Collab_Navigation::breadcrumb() ); ?>
					<?php esc_html( self::share_page() ); ?>
				</div>
			</div>
		</header>
		<?php
	}

	/**
	 * Add the header image.
	 */
	public static function header_image() {
		if ( has_post_thumbnail() ) :
			?>
			<div class="isp-header__featured-img">
				<img src="<?php echo esc_url( get_the_post_thumbnail_url() ); ?>">
				<div class="isp-header__featured-img__squiggle"></div>
			</div>
		<?php endif; ?>
		<?php
	}

	/**
	 * Add the 'Share' button to the page header.
	 */
	public static function share_page() {
		echo '<button class="isp-sharepage isp-desktop-only">
			<span class="isp-sharepage--text">Share</span>
			<span class="isp-sharepage--icon">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M19 8.29412C18.4847 8.52059 17.9293 8.66941 17.3537 8.74059C17.9426 8.39765 18.3977 7.85412 18.6119 7.20059C18.0564 7.52412 17.4407 7.75059 16.7916 7.88C16.2629 7.32353 15.5201 7 14.6769 7C13.1042 7 11.8193 8.24235 11.8193 9.77588C11.8193 9.99588 11.8461 10.2094 11.8929 10.41C9.51052 10.2935 7.3891 9.18706 5.97706 7.51118C5.72945 7.91882 5.58891 8.39765 5.58891 8.90235C5.58891 9.86647 6.09082 10.7206 6.86711 11.2059C6.39197 11.2059 5.95029 11.0765 5.56214 10.8824V10.9018C5.56214 12.2476 6.55258 13.3735 7.86424 13.6259C7.44313 13.7373 7.00102 13.7528 6.57266 13.6712C6.75442 14.2228 7.1104 14.7054 7.59055 15.0513C8.0707 15.3972 8.65087 15.5889 9.24952 15.5994C8.23474 16.3762 6.97686 16.796 5.6826 16.79C5.45507 16.79 5.22753 16.7771 5 16.7512C6.27151 17.5406 7.78394 18 9.40344 18C14.6769 18 17.5746 13.7682 17.5746 10.0994C17.5746 9.97647 17.5746 9.86 17.5679 9.73706C18.13 9.34882 18.6119 8.85706 19 8.29412Z" fill="white"/>
				</svg>
			</span>
		</button>';
	}

	/**
	 * Display the third level navigation
	 */
	public static function third_level_nav() {
		wp_nav_menu(
			array(
				'theme_location'  => 'primary',
				'container_class' => 'ubc-isp-nav__container',
				'container_id'    => 'ubc-isp-nav__menu',
				'walker'          => new UBC_ISP_Sub_Menu_Walker(),
				'menu_class'      => 'ubc-isp-nav',
			)
		);
	}

	/**
	 * Add a menu depth class to primary menu
	 *
	 * @param mixed $classes classes.
	 * @param mixed $item item.
	 * @param mixed $args args.
	 * @param mixed $depth depth.
	 */
	public static function menu_depth_class( $classes, $item, $args, $depth = 0 ) {
		$classes[] = 'menu-depth-' . $depth;
		return $classes;
	}

	/**
	 * Hide the home breadcrumb (the setting doesn't seam to hide it)
	 * 
	 * @param mixed $args args.
	 * @return mixed
	 */
	public static function breadcrumb_trail_args( $args ) {
		$args['show_home'] = false;
		return $args;
	}
}

UBC_ISP_Page_Header::init();
