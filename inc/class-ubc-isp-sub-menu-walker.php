<?php
/**
 * Register a custom navigation walker class
 *
 * @package UBC Collab ISP Child Theme Functions
 */
class UBC_ISP_Sub_Menu_Walker extends Walker_Nav_Menu {

	/**
	 * Summary of start_el
	 *
	 * @param mixed $output output.
	 * @param mixed $item item.
	 * @param mixed $depth depth.
	 * @param mixed $args args.
	 * @param mixed $current_object_id current_object_id.
	 * @return void
	 */
	public function start_el( &$output, $item, $depth = 0, $args = null, $current_object_id = 0 ) {
		$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
		$current_object_id;

		$class_names = '';
		$value       = '';
		
		$classes = empty( $item->classes ) ? array() : (array) $item->classes;

		$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
		$class_names = ' class="' . esc_attr( $class_names ) . '"';

		$output .= $indent . '<li id="menu-item-' . $item->ID . '"' . $value . $class_names . '>';

		$attributes  = ! empty( $item->attr_title ) ? ' title="' . esc_attr( $item->attr_title ) . '"' : '';
		$attributes .= ! empty( $item->target ) ? ' target="' . esc_attr( $item->target ) . '"' : '';
		$attributes .= ! empty( $item->xfn ) ? ' rel="' . esc_attr( $item->xfn ) . '"' : '';
		$attributes .= ! empty( $item->url ) ? ' href="' . esc_url( $item->url ) . '"' : '';

		$item_output  = $args->before;
		$item_output .= '<a' . $attributes . '>';
		$item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
		$item_output .= '<button class="sub-menu__toggle isp-mobile-only"></button>';
		$item_output .= '</a>';


		$item_output .= $args->after;

		if ( $args && is_object( $args ) && is_object( $args->walker ) ) {
			$args->walker->lvl_description = $item->description ?? false;
		}

		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}

	/**
	 * Summary of start_lvl
	 *
	 * @param mixed $output output.
	 * @param mixed $depth depth.
	 * @param mixed $args args.
	 * @return void
	 */
	public function start_lvl( &$output, $depth = 0, $args = null ) {
		$output .= '<ul class="sub-menu sub-menu--' . $depth . '">';

		if ( $args->walker->lvl_description ) {
			$output .= '<div class="description-container isp-desktop-only"><p class="description">' . $args->walker->lvl_description . '</p></div>';
		}
	}
}
