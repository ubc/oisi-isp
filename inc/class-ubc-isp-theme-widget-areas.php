<?php
/**
 * This class is responsible for theme widget areas
 *
 * @package UBC Collab ISP Child Theme Functions
 */
class UBC_ISP_Theme_Widget_Areas {

	/**
	 * Initialize the class
	 */
	public static function init() {
		add_action( 'init', array( 'UBC_ISP_Theme_Widget_Areas', 'register_widget_areas' ), 11 );
	}

	/**
	 * Register additional sidebars that are not a part of the core framework and are exclusive to this
	 * theme.
	 *
	 * @since 0.9.0
	 */
	public static function register_widget_areas() {
		/* Register the Search template widget area. */
		register_sidebar(
			array(
				'id'            => 'search-page-template',
				'name'          => __( 'Search Page Template', 'ubc_collab' ),
				'description'   => __( 'Replaces the default Search page content.', 'ubc_collab' ),
				'before_widget' => '<div id="%1$s" class="widget %2$s widget-%2$s"><div class="widget-inside">',
				'after_widget'  => '</div></div>',
				'before_title'  => '<h3 class="widget-title">',
				'after_title'   => '</h3>',
			)
		);
	}
}
UBC_ISP_Theme_Widget_Areas::init();
