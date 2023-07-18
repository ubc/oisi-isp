<?php
/**
 * This class is responsible for theme functions
 *
 * @package UBC Collab ISP Child Theme Functions
 */
class UBC_ISP_Theme_Functions {

	/**
	 * Initialize the class
	 */
	public static function init() {
		self::theme_hooks();
	}

	/**
	 * Setup the theme hooks
	 */
	public static function theme_hooks() {   
		add_action( 'after_setup_theme', array( 'UBC_ISP_Theme_Functions', 'theme_setup' ), 20, 2 );

		add_action( 'wp_enqueue_scripts', array( 'UBC_ISP_Theme_Functions', 'theme_scripts' ) );
		add_action( 'enqueue_block_editor_assets', array( 'UBC_ISP_Theme_Functions', 'editor_scripts' ) );

		add_action( 'wp-hybrid-clf_before_header', array( 'UBC_ISP_Theme_Functions', 'open_header_wrap' ) );
		add_action( 'wp-hybrid-clf_after_header', array( 'UBC_ISP_Theme_Functions', 'close_header_wrap' ) );

		add_action( 'wp-hybrid-clf_before_footer', array( 'UBC_ISP_Theme_Functions', 'open_footer_wrap' ) );
		add_action( 'wp-hybrid-clf_after_footer', array( 'UBC_ISP_Theme_Functions', 'close_footer_wrap' ) );
	}

	/**
	 * Enqueue scripts and styles.
	 */
	public static function theme_scripts() {

		$theme = wp_get_theme();
		wp_enqueue_style( 'style', get_template_directory_uri() . '/style.css', array(), $theme->parent()->get( 'Version' ) );
	   
		wp_enqueue_style( 'dataTable-style', '//cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css', array(), CHILD_THEME_VERSION );
		wp_enqueue_script( 'dataTable-js', '//cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js', array( 'jquery' ), CHILD_THEME_VERSION, true );
		
		wp_enqueue_style( 'slick-style', '//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.css', array(), CHILD_THEME_VERSION );
		wp_enqueue_script( 'slick-js', '//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.min.js', array( 'jquery' ), CHILD_THEME_VERSION, true );

		wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/dist/css/main.css', array(), CHILD_THEME_VERSION );
		wp_enqueue_script( 'child-js', get_stylesheet_directory_uri() . '/dist/js/main.js', array( 'jquery', 'dataTable-js' ), CHILD_THEME_VERSION, true );
	}

	/**
	 * Enqueue scripts and styles for the editor.
	 */
	public static function editor_scripts() {
		wp_enqueue_style( 'editor-css', get_stylesheet_directory_uri() . '/dist/css/editor.css', false, '1.0', 'all' );
	}
	/**
	 * Loads carbon fields and sets up additional theme options.
	 */
	public static function theme_setup() {
		// Temporary, will remove if I find the setting.
		UBC_Collab_CLF::$full_width = true;

		// Remove core block patterns.
		remove_theme_support( 'core-block-patterns' );

		// Add theme support for post thumbnails for pages (headers).
		add_theme_support( 'post-thumbnails', array( 'post', 'page' ) );

		$theme_color_palette = UBC_ISP_Theme_Colors::colors();

		/* Add UBC palette colors for block editor */
		add_theme_support( 'editor-color-palette', $theme_color_palette );
	}

	/**
	 * Open the header wrap
	 */
	public static function open_header_wrap() {
		echo '<div class="isp-header-wrap">';
	}

	/**
	 * Close the header wrap
	 */
	public static function close_header_wrap() {
		echo '</div>';
	}

	/**
	 * Open the footer wrap
	 */
	public static function open_footer_wrap() {
		echo '<div class="isp-footer-wrap">';
	}

	/**
	 * Close the footer wrap
	 */
	public static function close_footer_wrap() {
		echo '</div>';
	}
}
UBC_ISP_Theme_Functions::init();
