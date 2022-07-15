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
      $().testLogs();
      console.log('We are going to set a cookie called "myTestCookie" with a value of true and expiry of 24 hours');
      helper.setCookie(24, "/", "myCookie", "myCookieIsSet");
      console.log("Our cookie is set. The cookie name is myCookie and the value is " + helper.getCookie("myCookie"));
     console.log("Setting localStorage");
      helper.lsAdd("myLsObj", JSON.stringify({someObject: {someChildObject: {car1: 'fiesta', car2: 'focus', car3: 'puma'}}}));
      helper.lsAdd("myLsObj2", JSON.stringify({someObject: {someChildObject: {car1: 'mach-e', car2: 'kuga', car3: 'mondeo'}}}));
      console.log("removing from localStorage");
      helper.lsRemove("myLsObj");
      console.log("checking what is left over");
      helper.lsGet("myLsObj2");
      helper.lsGet("myLsObj");
    }
  }, 500);
};
