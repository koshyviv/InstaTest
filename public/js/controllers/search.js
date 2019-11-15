angular
  .module("TravellyApp")
  .controller("SearchController", SearchController);

SearchController.$inject = ["$auth", "$rootScope", "$state", "$http","$rootScope"];
function SearchController($auth, $rootScope, $state, $http,$rootScope) {

  this.booking_stage = "trip"
  this.selected = null;
  this.location_origin = "Bangalore"
  this.location_destination = ""
  this.time_depart = null
  this.selected_cost = 0
  this.selected_driver = null
  this.previous_stage = "trip"

  this.currentUser = $auth.getPayload();
  console.log("User",this.currentUser)


  this.change_stage = (stage)=>{
    this.booking_stage = stage
    console.log("Booking changed to ",stage)
    if(stage=='driver' && this.previous_stage=="trip"){
      console.log({
        "this.location_destination":this.location_destination,
        "this.time_depart":this.time_depart
      })
      getDrivers()
      // setTimeout(() => {
        $(document).ready(function () {
          console.log("Document Ready")
          $('#dtBasicExample').DataTable();
        });
      // }, 2000);
    }
    else if(stage=='trip' && this.previous_stage=="driver"){
      this.selected_driver = null
    }
    else if(stage=='payment'){
      if(this.currentUser){
        this.change_stage("paymentuser")
      }
      else{
        this.change_stage("login")
      }
    }
    else if(stage=='login'){
      this.credentials = {};
    }
    this.previous_stage = stage
  }

  

  this.authenticate = (provider) => {
    $auth.authenticate(provider)
      .then(() => {
        $rootScope.$broadcast("loggedIn");
      });
  };

  this.submit = () => {
    $auth.login(this.credentials, {
      url: "/api/login"
    }).then(() => {
      $rootScope.$broadcast("loggedIn");
    });
  };


  this.driver_highlight = function(driver){
    console.log({"Driver Highlighted":driver,"selected":this.selected})
    this.selected_driver = driver
    console.log("parsed",JSON.parse(this.selected))
  }

  this.drivers = []
  let getDrivers = ()=>{
    $http.get("/api/drivers")
    .then(res=>{
      console.log("got response",res.data)
      this.drivers = res.data
    })
  }
}


// $( "#datepicker" ).datepicker({ minDate: 0});
// console.log("inside script")
// function initialize() {
//   console.log("inside initialize")
//   document.getElementById('datePicker').value = new Date();
//   var input = document.getElementById('searchTextField');
//   new google.maps.places.Autocomplete(input);
// }

// initialize()
// google.maps.event.addDomListener(window, 'load', initialize);