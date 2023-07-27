<?php
/**
 * Archive Template
 *
 * The archive template is basically a placeholder for archives that don't have a template file.
 * Ideally, all archives would be handled by a more appropriate template according to the current
 * page context.
 *
 * @package UBC Collab ISP Child Theme
 */

get_header(); // Loads the header.php template.

?>
<div id="content" class="hfeed content">

	<?php do_atomic( 'before_content' ); ?>

	<?php $block_page = get_option( 'page_for_posts' ); ?>
	<?php $block_page_content = get_post( $block_page ); ?>
	<?php $block_page_content = apply_filters( 'the_content', $block_page_content->post_content ); ?>
	<?php esc_html( $block_page_content ); ?>

</div>

<?php get_footer(); ?>
