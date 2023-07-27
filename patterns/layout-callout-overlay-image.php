<?php
/**
 * Title: Overlay Image Callout
 * Slug: meetgoat/layout-callout-overlay-image
 * Categories: ubc-callout-layouts
 * Viewport Width: 1280
 * Block Types: core/post-content
 * Inserter: yes
 *
 * @package UBC Collab ISP Child Theme Pattern Library
 */

?>

<!-- wp:group {"className":"isp-cta-d isp-cta","layout":{"type":"constrained","contentSize":"940px"}} -->
<div class="wp-block-group isp-cta-d isp-cta"><!-- wp:html -->
	<a href="">
		<!-- /wp:html -->

		<!-- wp:group {"className":"isp-cta__inner","layout":{"type":"constrained"}} -->
		<div class="wp-block-group isp-cta__inner"><!-- wp:columns {"className":"isp-cta__columns"} -->
			<div class="wp-block-columns isp-cta__columns">
				<!-- wp:column {"verticalAlignment":"center","width":"48%"} -->
				<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:48%">
					<!-- wp:group {"className":"isp-cta__content","layout":{"type":"constrained"}} -->
					<div class="wp-block-group isp-cta__content">
						<!-- wp:heading {"level":6,"style":{"typography":{"textTransform":"uppercase"},"spacing":{"margin":{"bottom":"var:preset|spacing|20"}}},"textColor":"isp-calcite","className":"is-style-sub-heading","fontSize":"small"} -->
						<h6 class="wp-block-heading is-style-sub-heading has-isp-calcite-color has-text-color has-small-font-size"
							style="margin-bottom:var(--wp--preset--spacing--20);text-transform:uppercase">Learn</h6>
						<!-- /wp:heading -->

						<!-- wp:heading {"level":3,"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|40","top":"0"}}},"textColor":"isp-bistre","className":"is-style-default","fontSize":"medium"} -->
						<h3 class="wp-block-heading is-style-default has-isp-bistre-color has-text-color has-medium-font-size"
							style="margin-top:0;margin-bottom:var(--wp--preset--spacing--40)">The Reconciliation Pole
						</h3>
						<!-- /wp:heading -->

						<!-- wp:separator {"align":"full","style":{"spacing":{"margin":{"top":"var:preset|spacing|50"}}},"className":"is-style-squiggle-brown"} -->
						<hr class="wp-block-separator alignfull has-alpha-channel-opacity is-style-squiggle-brown"
							style="margin-top:var(--wp--preset--spacing--50)" />
						<!-- /wp:separator -->

						<!-- wp:paragraph {"textColor":"isp-bistre","fontSize":"large"} -->
						<p class="has-isp-bistre-color has-text-color has-large-font-size">Lorem ipsum dolor sit amet
							consectetur. Nunc semper ultrices amet mus lobortis suspendisse amet.</p>
						<!-- /wp:paragraph -->

						<!-- wp:heading {"className":"button-tertiary"} -->
						<h2 class="wp-block-heading button-tertiary">Learn More</h2>
						<!-- /wp:heading -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:column -->

				<!-- wp:column -->
				<div class="wp-block-column">
					<!-- wp:group {"className":"isp-cta__images","layout":{"type":"constrained"}} -->
					<div class="wp-block-group isp-cta__images">
						<!-- wp:image {"sizeSlug":"large","linkDestination":"none","className":"is-style-default isp-cta__image--background"} -->
						<figure class="wp-block-image size-large is-style-default isp-cta__image--background"><img
								src="/wp-content/themes/ubc-isp/patterns/images/cloud-background.png" alt="" /></figure>
						<!-- /wp:image -->

						<!-- wp:image {"sizeSlug":"large","linkDestination":"none","className":"isp-cta__image--overlay"} -->
						<figure class="wp-block-image size-large isp-cta__image--overlay"><img
								src="/wp-content/themes/ubc-isp/patterns/images/cta-overlay.png" alt="" /></figure>
						<!-- /wp:image -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:column -->
			</div>
			<!-- /wp:columns -->
		</div>
		<!-- /wp:group -->

		<!-- wp:html -->
	</a>
	<!-- /wp:html -->
</div>
<!-- /wp:group -->
