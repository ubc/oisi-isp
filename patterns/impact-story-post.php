<?php
/**
 * Title: Post Link Impact Story
 * Slug: meetgoat/impact-story-post
 * Categories: ubc-impact-story
 * Viewport Width: 1280
 * Block Types: core/template-part/UBC Content
 * Inserter: yes
 *
 * @package UBC Collab ISP Child Theme Pattern Library
 */

?>

<!-- wp:query {"queryId":0,"query":{"perPage":"1","pages":"1","offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false},"displayLayout":{"type":"flex","columns":4}} -->
<div class="wp-block-query"><!-- wp:post-template -->
	<!-- wp:group {"className":"isp-story-card","layout":{"type":"constrained"}} -->
	<div class="wp-block-group isp-story-card">
		<!-- wp:post-featured-image {"isLink":true,"width":"","height":"","align":"full"} /-->

		<!-- wp:group {"className":"isp-story-card\u002d\u002ddetails","layout":{"type":"constrained"}} -->
		<div class="wp-block-group isp-story-card--details">
			<!-- wp:group {"className":"isp-story-card\u002d\u002ddate","layout":{"type":"constrained"}} -->
			<div class="wp-block-group isp-story-card--date">
				<!-- wp:post-terms {"term":"post_tag","style":{"typography":{"textTransform":"uppercase","fontStyle":"normal","fontWeight":"600","fontSize":"12px","letterSpacing":"0.1em"},"elements":{"link":{"color":{"text":"var:preset|color|isp-calcite"}}}},"textColor":"isp-calcite","className":"isp-story-card__tag"} /-->

				<!-- wp:post-date {"style":{"typography":{"textTransform":"uppercase","fontStyle":"normal","fontWeight":"600","fontSize":"12px","letterSpacing":"0.1em"}},"textColor":"ubc-grey"} /-->
			</div>
			<!-- /wp:group -->

			<!-- wp:post-title {"level":3,"isLink":true,"style":{"typography":{"fontSize":"16px","fontStyle":"normal","fontWeight":"700"},"elements":{"link":{"color":{"text":"var:preset|color|isp-bistre"}}}},"textColor":"isp-bistre","className":"isp-story-card__title"} /-->

			<!-- wp:read-more {"content":"Read More","className":"is-style-tertiary button-tertiary"} /-->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
	<!-- /wp:post-template -->

	<!-- wp:query-no-results -->
	<!-- wp:paragraph {"placeholder":"Add text or blocks that will display when a query returns no results."} -->
	<p></p>
	<!-- /wp:paragraph -->
	<!-- /wp:query-no-results -->
</div>
<!-- /wp:query -->
