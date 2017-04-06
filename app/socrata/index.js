var Socrata = require('node-socrata');

// This is a simple Socrata configuration module, you might have to create
// a robust config module for Socrata or populate this file with multiple configurations
// depending on your needs and expose them.

// This is how a public API URL looks like: https://data.cityofchicago.org/resource/alternative-fuel-locations.json?
// let's split it into what node-socrata receives as parameters.
// hostDomain = https://data.cityofchicago.org
// resource = alternative-fuel-locations
// XAppToken is something that you generated with a Socrata developer, create one here: https://dev.socrata.com/

var CHICACO_ALTERNATIVE_FUEL_LOCATIONS_CONFIGURATION = {
  hostDomain: 'https://data.cityofchicago.org',
  resource: 'alternative-fuel-locations',
  XAppToken: process.env.SOCRATA_APP_TOKEN || 'registered-app-token'
};


function getChicagoAlternativeFuelLocations() {
  var soda = new Socrata(CHICACO_ALTERNATIVE_FUEL_LOCATIONS_CONFIGURATION);
  return soda;
}

module.exports = {
  chicagoAlternativeFuelLocations: getChicagoAlternativeFuelLocations()
};
