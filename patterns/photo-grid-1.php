<?php
/**
 * Title: Photo Grid 1 Image
 * Slug: meetgoat/photo-grid-1
 * Categories: ubc-photo-grid
 * Viewport Width: 1280
 * Block Types: core/post-content 
 * Inserter: yes
 *
 * @package UBC Collab ISP Child Theme Pattern Library
 */

?>

<!-- wp:group {"className":"isp-photogrid","layout":{"type":"constrained"}} -->
<div class="wp-block-group isp-photogrid"><!-- wp:columns -->
	<div class="wp-block-columns"><!-- wp:column {"width":"75%"} -->
		<div class="wp-block-column" style="flex-basis:75%">
			<!-- wp:group {"className":"isp-photogrid--images","layout":{"type":"constrained"}} -->
			<div class="wp-block-group isp-photogrid--images">
				<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
				<figure class="wp-block-image size-large"><img
						src="/wp-content/themes/ubc-isp/patterns/images/placeholder.png" alt="" /></figure>
				<!-- /wp:image -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"bottom","width":"25%"} -->
		<div class="wp-block-column is-vertically-aligned-bottom" style="flex-basis:25%">
			<!-- wp:separator {"className":"is-style-squiggle-brown"} -->
			<hr class="wp-block-separator has-alpha-channel-opacity is-style-squiggle-brown" />
			<!-- /wp:separator -->

			<!-- wp:heading {"level":6,"style":{"typography":{"fontSize":"14px","fontStyle":"normal","fontWeight":"600"}},"className":"is-style-default"} -->
			<h6 class="wp-block-heading is-style-default" style="font-size:14px;font-style:normal;font-weight:600">Photo
				title</h6>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"14px"}}} -->
			<p style="font-size:14px">Lorem ipsum dolor sit amet consectetur. Et tristique cursus duis gravida.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
