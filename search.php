<?php
/**
 * Search Template
 *
 * The search template is loaded when a visitor uses the search form to search for something
 * on the site.
 *
 * @package UBC Collab ISP Child Theme
 */

get_header(); // Loads the header.php template.
$content_class = ( isset( $content_class ) ) ? $content_class : '';
?>
	<?php if ( is_active_sidebar( 'search-page-template' ) ) : ?>
		<div>
			<?php dynamic_sidebar( 'search-page-template' ); ?>
		</div><!-- #utility-404 .utility -->
	<?php endif; ?>
<?php get_footer(); ?>
