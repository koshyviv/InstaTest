angular
  .module("TravellyApp", ["ngResource", "ui.router", "satellizer"])
  // .config(authProvider, Router)
  .config(oAuthConfig)
  .config(Router);

// Auth Social API Keys
oAuthConfig.$inject = ["$authProvider"];
function oAuthConfig($authProvider) {
  $authProvider.facebook({
    url: 'api/oauth/facebook',
    clientId: "329436664057921"
  });
  $authProvider.twitter({
    url: 'api/oauth/twitter',
    clientId: "y9CHIe4zAlRP36gfp1SXDBqbj"
  });
}

// Rooting 
Router.$inject = ["$stateProvider", "$urlRouterProvider"];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider 
    .state('search', {
      url: '/aq-index',
      templateUrl: '/templates/main.html',
      controller: "SearchController as search"
    })

  $urlRouterProvider.otherwise("/aq-index"); 
}