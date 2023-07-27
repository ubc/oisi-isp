<?php
/**
 * This class that holds theme colors for gutenburg editor
 *
 * @package UBC Collab ISP Child Theme Functions
 */
class UBC_ISP_Theme_Colors {

	/**
	 * Loads carbon fields and sets up additional theme options.
	 */
	public static function colors() {
		return array(

			/*
			* UBC Colors -- Core
			*/
			array(
				'name'  => __( 'UBC white', 'ubc_collab' ),
				'slug'  => 'ubc-white',
				'color' => '#ffffff',
			),
			array(
				'name'  => __( 'UBC black', 'ubc_collab' ),
				'slug'  => 'ubc-black',
				'color' => '#222222',
			),
			array(
				'name'  => __( 'UBC Blue', 'ubc_collab' ),
				'slug'  => 'ubc-blue',
				'color' => '#002145',
			),

			/*
			* UBC Colors -- Blue
			*/
			array(
				'name'  => __( 'UBC secondary blue', 'ubc_collab' ),
				'slug'  => 'ubc-secondary-blue',
				'color' => '#0055b7',
			),
			array(
				'name'  => __( 'UBC tertiary blue', 'ubc_collab' ),
				'slug'  => 'ubc-tertiary-blue',
				'color' => '#00a7e1',
			),
			array(
				'name'  => __( 'UBC quaternary blue', 'ubc_collab' ),
				'slug'  => 'ubc-quaternary-blue',
				'color' => '#40b4e5',
			),
			array(
				'name'  => __( 'UBC quinary blue', 'ubc_collab' ),
				'slug'  => 'ubc-quinary-blue',
				'color' => '#6ec4e8',
			),
			array(
				'name'  => __( 'UBC senary blue', 'ubc_collab' ),
				'slug'  => 'ubc-senary-blue',
				'color' => '#97d4e9',
			),

			/*
			* UBC Colors -- Grey
			*/
			array(
				'name'  => __( 'UBC Grey', 'ubc_collab' ),
				'slug'  => 'ubc-grey',
				'color' => '#2f5d7c',
			),
			array(
				'name'  => __( 'UBC secondary grey', 'ubc_collab' ),
				'slug'  => 'ubc-secondary-grey',
				'color' => '#5e869f',
			),
			array(
				'name'  => __( 'UBC tertiary grey', 'ubc_collab' ),
				'slug'  => 'ubc-tertiary-grey',
				'color' => '#98b2c3',
			),
			array(
				'name'  => __( 'UBC quaternary grey', 'ubc_collab' ),
				'slug'  => 'ubc-quaternary-grey',
				'color' => '#c3d0db',
			),

			/*
			* ISP Colors -- Core
			*/
			array(
				'name'  => __( 'ISP Bistre', 'ubc_collab' ),
				'slug'  => 'isp-bistre',
				'color' => '#3f261a',
			),
			array(
				'name'  => __( 'ISP Camelian', 'ubc_collab' ),
				'slug'  => 'isp-camelian',
				'color' => '#b20e18',
			),
			array(
				'name'  => __( 'ISP Calcite', 'ubc_collab' ),
				'slug'  => 'isp-calcite',
				'color' => '#b55a18',
			),

			/*
			* UBC Colors -- Sand
			*/
			array(
				'name'  => __( 'ISP Sand 1', 'ubc_collab' ),
				'slug'  => 'isp-sand_1',
				'color' => '#f0e6d9',
			),
			array(
				'name'  => __( 'ISP Sand 2', 'ubc_collab' ),
				'slug'  => 'isp-sand_2',
				'color' => '#f8f4ee',
			),
			array(
				'name'  => __( 'ISP Sand 3', 'ubc_collab' ),
				'slug'  => 'isp-sand_3',
				'color' => '#fbf9f6',
			),
		);
	}
}
