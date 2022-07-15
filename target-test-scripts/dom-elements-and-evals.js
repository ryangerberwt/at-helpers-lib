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

      alert('now runnning checkForElement tests...')
      console.log('We need to find some dom elements');
      var isElement = helper.checkForElement('nav');
      if(isElement){
        //Check for nav sub menus
        isElement = helper.checkForElement('ul.site-links');
        if(isElement){
            //Check for a specific link
            isElement = helper.checkForElement('li.site-link-chevron > a[data-target-category="#finance"]');
            if(isElement){
                alert('Finance link is loaded');
            }
        }
      }

      isElement = helper.checkForElement('.thisElementWontExist');
      if(!isElement){
        alert('we cannot find element with class thisElementWontExist');
      }

      alert('now running waitForHtmlElementAndRunAction tests...');
      //TODO: Call functionA and functionB
      waitForHtmlElementAndRunAction('.model-item-content', functionA, null, 250);
   
      waitForHtmlElementAndRunAction('.search-input', functionB, 'search element found', 250);
    }
  }, 500);
};

function functionA(){
    alert('in function A');
}
function functionB(paraVal){
    alert('in function b with paraVal ' + paraVal);
}