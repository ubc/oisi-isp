<?php
/**
 * This class is responsible for initializing and managing custom Gutenberg blocks and
 * block styles for the UBC ISP theme.
 *
 * @package UBC Collab ISP Child Theme Functions
 */
class UBC_ISP_Gutenburg_Blocks {

	/**
	 * Initialize the class
	 *
	 * @since 1.0.0
	 */
	public static function init() {
		self::theme_hooks();
	}

	/**
	 * Register theme hooks
	 *
	 * @since 1.0.0
	 */
	public static function theme_hooks() {
		add_action( 'init', array( 'UBC_ISP_Gutenburg_Blocks', 'block_styles' ) );
		add_action( 'init', array( 'UBC_ISP_Gutenburg_Blocks', 'pattern_categories' ) );
	}

	/**
	 * Register pattern categories for the UBC ISP theme
	 *
	 * @since 1.0.0
	 */
	public static function pattern_categories() {
		register_block_pattern_category(
			'ubc-headers',
			array( 'label' => __( 'UBC ISP - Headers', 'ubc_collab' ) )
		);
		register_block_pattern_category(
			'ubc-content',
			array( 'label' => __( 'UBC ISP - Content', 'ubc_collab' ) )
		);
		register_block_pattern_category(
			'ubc-layouts',
			array( 'label' => __( 'UBC ISP - Layouts', 'ubc_collab' ) )
		);
		register_block_pattern_category(
			'ubc-component',
			array( 'label' => __( 'UBC ISP - Components', 'ubc_collab' ) )
		);
		register_block_pattern_category(
			'ubc-card-layouts',
			array( 'label' => __( 'UBC ISP - Card Layouts', 'ubc_collab' ) )
		);
		register_block_pattern_category(
			'ubc-callout-layouts',
			array( 'label' => __( 'UBC ISP - Callout Layouts', 'ubc_collab' ) )
		);
		register_block_pattern_category(
			'ubc-callouts',
			array( 'label' => __( 'UBC ISP - Callouts', 'ubc_collab' ) )
		);
		register_block_pattern_category(
			'ubc-photo-grid',
			array( 'label' => __( 'UBC ISP - Photo Grid', 'ubc_collab' ) )
		);
		register_block_pattern_category(
			'ubc-timeline',
			array( 'label' => __( 'UBC ISP - Timeline', 'ubc_collab' ) )
		);
		register_block_pattern_category(
			'ubc-goals',
			array( 'label' => __( 'UBC ISP - Goals', 'ubc_collab' ) )
		);
		register_block_pattern_category(
			'ubc-impact-story',
			array( 'label' => __( 'UBC ISP - Impact Story', 'ubc_collab' ) )
		);
		register_block_pattern_category(
			'ubc-ctas',
			array( 'label' => __( 'UBC ISP - Buckets', 'ubc_collab' ) )
		);
	}

	/**
	 * Register block styles for the UBC ISP theme
	 *
	 * @since 1.0.0
	 */
	public static function block_styles() {
		self::image_block_styles();
		self::separator_block_styles();
		self::heading_block_styles();
		self::button_block_styles();
		self::group_block_styles();
		self::spacer_block_styles();
	}

	/**
	 * Register block styles for Image Block
	 *
	 * @since 1.0.0
	 */
	public static function image_block_styles() {
		register_block_style(
			'core/image',
			array(
				'name'         => 'single-radius-right',
				'label'        => __( 'Single Rounded', 'ubc_collab' ),
				'is_default'   => false,
				'inline_style' => '.is-style-single-radius-right { border-radius: 16px 0 0 1000px; }',
			)
		);
	}

	/**
	 * Register block styles for Separator Block
	 *
	 * @since 1.0.0
	 */
	public static function separator_block_styles() {
		register_block_style(
			'core/separator',
			array(
				'name'       => 'squiggle-brown',
				'label'      => __( 'Squiggle Brown', 'ubc_collab' ),
				'is_default' => false,
			)
		);
		register_block_style(
			'core/separator',
			array(
				'name'       => 'squiggle-brown--small',
				'label'      => __( 'Small Squiggle Brown', 'ubc_collab' ),
				'is_default' => false,
			)
		);

		register_block_style(
			'core/separator',
			array(
				'name'       => 'squiggle-grey',
				'label'      => __( 'Squiggle Grey', 'ubc_collab' ),
				'is_default' => false,
			)
		);
	}

	/**
	 * Register block styles for Heading Block
	 *
	 * @since 1.0.0
	 */
	public static function heading_block_styles() {
		register_block_style(
			'core/heading',
			array(
				'name'       => 'sub-heading',
				'label'      => __( 'Sub Heading', 'ubc_collab' ),
				'is_default' => false,
			)
		);
	}

	/**
	 * Register block styles for Group Block
	 *
	 * @since 1.0.0
	 */
	public static function group_block_styles() {
		register_block_style(
			'core/group',
			array(
				'name'       => 'square',
				'label'      => __( 'Square', 'ubc_collab' ),
				'is_default' => true,
			)
		);
		register_block_style(
			'core/group',
			array(
				'name'       => 'rounded',
				'label'      => __( 'Rounded', 'ubc_collab' ),
				'is_default' => false,
			)
		);
		register_block_style(
			'core/group',
			array(
				'name'       => 'rounded-sm',
				'label'      => __( 'Rounded Small', 'ubc_collab' ),
				'is_default' => false,
			)
		);
	}

	/**
	 * Register block styles for Button Block
	 *
	 * @since 1.0.0
	 */
	public static function button_block_styles() {
		register_block_style(
			'core/button',
			array(
				'name'       => 'tertiary',
				'label'      => __( 'Tertiary', 'ubc_collab' ),
				'is_default' => false,
			)
		);
	}
	
	/**
	 * Register block styles for Spacer Block
	 *
	 * @since 1.0.0
	 */
	public static function spacer_block_styles() {
		register_block_style(
			'core/spacer',
			array(
				'name'       => 'pull-up-background',
				'label'      => __( 'Pull Up Background', 'ubc_collab' ),
				'is_default' => false,
			)
		);
		register_block_style(
			'core/spacer',
			array(
				'name'       => 'pull-up-next',
				'label'      => __( 'Pull Up Next Element', 'ubc_collab' ),
				'is_default' => false,
			)
		);
	}
}
UBC_ISP_Gutenburg_Blocks::init();
