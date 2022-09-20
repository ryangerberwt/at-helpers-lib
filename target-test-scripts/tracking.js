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
      alert('add tracking');
      alert('checking for mobile')
      $('body').text('click anywhere to trigger tracking').css('font-size:32px; position:absolute; top: 50%;')
      $('body').on('click',helper.addTracking({
        "mboxName":"testMbox",
        "params":{"someParameter": "someValue"}
      }));
    }
  }, 500);
};
