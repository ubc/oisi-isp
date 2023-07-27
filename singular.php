<?php
/**
 * Singular Template
 *
 * @package UBC Collab ISP Child Theme
 */

get_header();

?>
<div id="content" --class="hfeed content">
	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : ?>
			<?php the_post(); ?>
			<div id="post-<?php the_ID(); ?>">
				<div class="entry-content">
					<?php the_content(); ?>
				</div><!-- .entry-content -->
			</div><!-- .hentry -->
		<?php endwhile; ?>
	<?php else : ?>
		<?php get_template_part( 'loop-error' ); // Loads the loop-error.php template. ?>
	<?php endif; ?>
</div><!-- .content .hfeed -->

<?php 
get_footer();
