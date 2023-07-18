import { initializeAccordions } from './blocks/accordions.js';
import { initializeTeamMembers } from './blocks/teamMember.js';
import { initializeTimelines } from './blocks/timeline.js';
import { initializeGoals } from './blocks/goals.js';
import { initializeSubMenu } from './components/menu.js';
import { initializePostSliders } from './blocks/postSlider.js';
import { initializeFAQs } from './blocks/faqs.js';

/* global DataTable */

// Call the initializeAccordions function to initialize the accordions
initializeAccordions();
initializeTeamMembers();
initializeSubMenu();
initializeTimelines();
initializeGoals();
initializePostSliders();
initializeFAQs();

document.addEventListener( 'DOMContentLoaded', function() {
	new DataTable( '.wp-block-table table' );
} );
