var $, console, helper;
window.onload = function() {
  let waitForJquery = setInterval(function() {
    console.log("Checking for jQuery");
    if (window.jQuery) {
      // jQuery is loaded
      $ = jQuery;
      clearInterval(waitForJquery);
      // You can place the rest of your script(s) here
    helper = $();
      console.log("initalizing helper");
      helper.initHelper("OT-2022", true, console);
      alert('misc methods');
      alert('checking for mobile')
      var isMobile = helper.checkForMobile();
      //we should use devtools to enter a mobile view at this point, before we dismiss the alert
      isMobile === true ? alert('on a mobile device') : alert('NOT on a mobile device');
      
      //re-run
      isMobile = helper.checkForMobile();
      isMobile === true ? alert('on a mobile device') : alert('NOT on a mobile device');
      
      alert('testing formatDate');
      let date = new Date;
      alert('before format ' + date);
      var theDate = helper.formatDate(date);
      alert('date after format ' + theDate);
      alert('calling test function');
      helper.test();
      alert('checking for angular');
      var isAngular = helper.checkForAngular(null);
      if(isAngular){
        alert('angular components found');
      }else{
        alert('NO angular components found');
      }
      alert('Checking override log - you need to add ?td=OT-2022 to the URL to get this to work');
      helper.overrideLog('OT-2022',new DOMException);
     alert('done overriding - to access the errors, type "_targetErrors" in the console')
    }
  }, 500);
};
