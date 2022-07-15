var $, console, helper;
window.onload = function() {
  let waitForJquery = setInterval(function() {
    console.log("Checking for jQuery");
    if (window.jQuery) {
      // jQuery is loaded
      $ = jQuery;
      clearInterval(waitForJquery);
      // You can place the rest of your script(s) here
      //Wait for _satellite
      let waitForSatellite = setInterval(function() {
        if (_satellite !== undefined) {
          clearInterval(waitForSatellite);

          helper = $();
          console.log("initalizing helper");
          helper.initHelper("OT-2022", true, console);
          alert("check ImpressionIds");
          alert("firing Id");
          helper.fireImpressionId("tt:123-abc", "click", "OT-2022-impressionIdFired", 1, _satellite);
          alert("we will try to re-fire it but the cookie should prevent it...");
          helper.fireImpressionId("tt:123-abc", "click", "OT-2022-impressionIdFired", 1, _satellite);
          alert("on to blocking the impressionId");
          helper.blockImpressionId("click", "none", _satellite);
          alert("script done");
        }
      }, 500);
    }
  }, 500);
};
