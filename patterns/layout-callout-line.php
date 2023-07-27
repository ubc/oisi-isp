<?php
/**
 * Title: Callout Block With Line
 * Slug: meetgoat/layout-callout-line
 * Categories: ubc-callout-layouts
 * Viewport Width: 1280
 * Block Types: core/template-part/UBC Callout
 * Inserter: yes

 * @package UBC Collab ISP Child Theme Pattern Library
 */

?>

<!-- wp:group {"align":"full","backgroundColor":"isp-sand_2","className":"isp-callout-block isp-callout-block--lined","layout":{"type":"constrained"}} -->
<div
	class="wp-block-group alignfull isp-callout-block isp-callout-block--lined has-isp-sand-2-background-color has-background">
	<!-- wp:group {"layout":{"type":"constrained","contentSize":"760px"}} -->
	<div class="wp-block-group">
		<!-- wp:heading {"textAlign":"center","style":{"typography":{"textTransform":"uppercase"}},"textColor":"isp-calcite","className":"is-style-sub-heading","fontSize":"small"} -->
		<h2 class="wp-block-heading has-text-align-center is-style-sub-heading has-isp-calcite-color has-text-color has-small-font-size"
			style="text-transform:uppercase">Funding Streams</h2>
		<!-- /wp:heading -->

		<!-- wp:heading {"textAlign":"center","textColor":"isp-bistre","fontSize":"medium"} -->
		<h2 class="wp-block-heading has-text-align-center has-isp-bistre-color has-text-color has-medium-font-size">
			Indigenous Strategic Initiatives funding <br>is allocated across three streams.</h2>
		<!-- /wp:heading -->

		<!-- wp:paragraph {"align":"center","fontSize":"large"} -->
		<p class="has-text-align-center has-large-font-size">The Indigenous Strategic Initiatives (ISI) Fund supports
			implementation of the Indigenous Strategic Plan. Funds are available to support projects that advance UBC’s
			Indigenous Strategic Plan priority actions across both the Vancouver and Okanagan campuses.</p>
		<!-- /wp:paragraph -->

		<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
		<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-tertiary"} -->
			<div class="wp-block-button is-style-tertiary"><a class="wp-block-button__link wp-element-button">Learn
					More</a></div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->
	</div>
	<!-- /wp:group -->

	<!-- wp:spacer {"height":"16px","className":"isp-mobile-only"} -->
	<div style="height:16px" aria-hidden="true" class="wp-block-spacer isp-mobile-only"></div>
	<!-- /wp:spacer -->
</div>
<!-- /wp:group -->




<div class="gta-post-list">
	<div class="post"></div>
	<div class="post"></div>
	<div class="post"></div>
	<div class="post"></div>
	<div class="post"></div>
</div>
<div class="gta-post-pagination" id="gta-pagination" hx-swap-oob="true">
	<a hx-get="http://website.com/blog/page/1" hx-target=".gta-post-list" href="http://website.com/blog/page/1" class="prev">Prev</a>
	<a hx-get="http://website.com/blog/page/1" hx-target=".gta-post-list" class="page">1</a>
	<span class="page">2</span>
	<a hx-get="http://website.com/blog/page/3" hx-target=".gta-post-list" class="page">3</a>
	<a hx-get="http://website.com/blog/page/4" hx-target=".gta-post-list" class="next">Next</a>
	<a hx-get="http://website.com/blog/page/2" hx-target=".gta-post-list" class="next">Next</a>
</div>
<div class="gta-post-load-more" id="gta-load-more" hx-swap-oob="true">
	<button hx-get="http://website.com/blog/page/2" hx-target=".gta-post-list" hx-swap="beforeend">Load More</button>
</div>
<div class="infinitescroll" id="gta-load-more" hx-swap-oob="true">
	<span class="loading_spinner" hx-get="http://website.com/blog/page/2" hx-trigger="revealed" hx-swap="afterend"></span>
</div>
