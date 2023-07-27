<?php
/**
 * This class is responsible for functions related to table press plugin.
 *
 * @package UBC Collab ISP Child Theme Functions
 */
class UBC_ISP_Table_Press {

	/**
	 * Init function
	 */
	public static function init() {
		add_filter( 'tablepress_datatables_parameters', array( __CLASS__, 'add_datatable_parameters' ), 10, 4 );
	}

	/**
	 * Adjust the parameters for tablepress dataTable calls.
	 * 
	 * @param  array $parameters The parameters for the dataTable call.
	 * @return array The adjusted parameters.
	 */
	public static function add_datatable_parameters( $parameters ) {
		// add an extra div that wraps JUST the table so we can scroll it but not pagination and filters.
		$parameters['dom'] = '"dom": \'lf<"tablepress-overflow"t>ipr\'';
		return $parameters;
	}
}

UBC_ISP_Table_Press::init();
