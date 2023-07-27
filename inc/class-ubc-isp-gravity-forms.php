<?php
/**
 *  Gravity form related functionality
 * 
 * @package UBC Collab ISP Child Theme Functions
 */
class UBC_ISP_Gravity_Forms {

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
		add_filter( 'gform_submit_button', array( 'UBC_ISP_Gravity_Forms', 'form_submit_button' ), 10, 1 );
	}

	/**
	 * Update the form submit button
	 * add classes and convert to a button element
	 *
	 * @param string $button The button HTML.
	 * 
	 * @return string
	 */
	public static function form_submit_button( $button ) {

		// Get Button Element.
		$dom = new DOMDocument();
		$dom->loadHTML( '<?xml encoding="utf-8" ?>' . $button );
		$input = $dom->getElementsByTagName( 'input' )->item( 0 );

		// Add button Classes.
		$classes  = $input->getAttribute( 'class' );
		$classes .= ' button-standard';
		$input->setAttribute( 'class', $classes );

		// Convert to a button element.
		$new_button = $dom->createElement( 'button' );
		$new_button->appendChild( $dom->createTextNode( $input->getAttribute( 'value' ) ) );
		$input->removeAttribute( 'value' );
		foreach ( $input->attributes as $attribute ) {
			$new_button->setAttribute( $attribute->name, $attribute->value );
		}
		$input->parentNode->replaceChild( $new_button, $input );

		// return the new button.
		return $dom->saveHtml( $new_button );
	}
}
UBC_ISP_Gravity_Forms::init();
