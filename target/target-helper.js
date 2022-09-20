var $, dataObject;
var _logObject = {
  _dir: console.dir,
  _log: console.log,
};
var _targetErrors;
var _satellite;
var _adobeObject;
let waitForJquery = setInterval(function() {
  if (window.jQuery !== undefined) {
    console.log("jQuery has loaded");
    clearInterval(waitForJquery);
    $ = jQuery;
    console.log("target-helper.js is up");
    _adobeObject = adobe.target;
    //Usage: $().checkForNullOrEmpty(myVar)
    $.fn.checkForNullOrEmpty = function(varToCheck) {
      if ($.isPlainObject(varToCheck)) {
        return $.isEmptyObject;
      } else {
        return varToCheck !== undefined && varToCheck !== null ? true : false;
      }
    };

    //Usage: $().checkForElement('.some-element')
    $.fn.checkForElement = function(element) {
      console.log("checking for element " + element);
      if ($().checkForNullOrEmpty(element) && $(element).length > 0) {
        console.log("element " + element + " was found");
        return true;
      } else {
        console.log("element " + element + " was NOT found");
        return false;
      }
    };

    // Usage: $().initHelper(_ticketNumber, _showLogs)
    $.fn.initHelper = function(_ticketNumber, _showLogs) {
      dataObject = {
        ticketNumber: "",
      };
      _targetErrors = [];
      _showLogs = true; //Do we need to force this? If we do, then just remove the parameter and pass true into the $().setLogs() call.
      if ($().checkForNullOrEmpty(_ticketNumber)) $().setTicketNumber(_ticketNumber);
      console.log("setting logs");
      $().setLogs(_showLogs);
      console.log("can you see me?");
    };

    //Usage: $().setCookie(24,'/','myCookie',myCookieVal)
    $.fn.setCookie = function(expireInHours, path, cookieName, cookieValue) {
      var now = new Date();
      now.setTime(now.getTime() + expireInHours * 3600 * 1000);
      document.cookie = cookieName + "=" + cookieValue + ";path=" + path + ";expires=" + now.toUTCString();
      console.log("Cookie " + cookieName + " was set");
    };

    $.fn.getTicketNumber = function() {
      return ticketNumber;
    };

    $.fn.getLocale = function() {
      if ($().checkForNullOrEmpty()) {
        return dataObject.storedDataObj.market;
      } else {
        $().overrideLog("No market was specified in storedDataObj ", dataObject.ticketNumber);
        return "";
      }
    };

    //Usage: $().getCookie('myCookie')
    $.fn.getCookie = function(cookieName) {
      function escape(s) {
        return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
      }
      var match = document.cookie.match(RegExp("(?:^|;\\s*)" + escape(cookieName) + "=([^;]*)"));
      return match ? match[1] : null;
    };

    //Usage: $().waitForHtmlElementAndRunAction('.some-element',someMethod,[1,2,3])
    $.fn.waitForHtmlElementAndRunAction = function(element, action, actionArgs, timeOut) {
      if ($().checkForNullOrEmpty(element)) {
        let waitForElement = setInterval(function(element, action, actionArgs) {
          if ($().checkForElement(element)) {
            clearInterval(waitForElement);
            if ($().checkForNullOrEmpty(actionArgs)) {
              action(actionArgs);
            } else {
              action();
            }
          }
        }, timeOut);
      }
    };

    $.fn.setLogs = function(_logFlag) {
      if (_logFlag) {
        console.log = function(logMsg) {
          _logObject._log.apply(console, arguments);
        };
        console.dir = function(logMsg) {
          _logObject._dir.apply(console, arguments);
        };
      } else {
        console.log = function(logMsg) {};
        console.dir = function(logMsg) {};
      }
    };

    // Usage: $().lsAdd('cookiesName', 'avalueforcookie')
    $.fn.lsAdd = function(name, value) {
      localStorage.setItem(name, value);
      console.log("added " + name + " to ls");
    };

    // Usage: $().lsRemove('cookiesName')
    $.fn.lsRemove = function(name) {
      if ($().checkForNullOrEmpty(localStorage.getItem(name))) {
        localStorage.removeItem(name);
        console.log("removed " + name + " from ls");
      }
    };

    //Usage: $().lsGet('çookiesName')
    $.fn.lsGet = function(name) {
      var lsVar;
      lsVar = $().checkForNullOrEmpty(localStorage.getItem(name)) ? localStorage.getItem(name) : null;
      console.log("ls value for " + name);
      console.dir(lsVar);
      return lsVar;
    };

    //Usage: $().checkForMobile()
    $.fn.checkForMobile = function() {
      let isMobile = false;
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          navigator.userAgent.substr(0, 4)
        )
      ) {
        isMobile = true;
      } else {
        // userAgent fix - some iPads use the Macintosh (Desktop) userAgent
        // iPads only go up to 1024
        window.innerWidth < 1025 ? (isMobile = true) : (isMobile = false);
      }
      return isMobile;
    };

    // Usage: $().updateConfig(configArr)) - For MutationObserver
    $.fn.updateConfig = function(_config) {
      settings.config = _config;
    };

    // Usage: $().testLogs()
    $.fn.testLogs = function() {
      console.log("testing logs!");
      let testObj = {
        command: "sayHello",
        content: "hello from me!",
      };

      let testObj2 = {
        command: "tryToSayHello",
        content: "do you read me??",
      };

      console.log("Initial console log - you should see this in the console");
      console.dir(testObj);
      $().setLogs(false);
      console.dir(testObj2);
      console.log("Logs are disabled - you should NOT be able to see this");
      $().setLogs(true);
      console.log("Logs are re-enabled. You should see this");
      console.dir(testObj2);
    };
    //Usage: $().formatDate(someDate)
    $.fn.formatDate = function(date) {
      return $().checkForNullOrEmpty(date) ? date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() : null;
    };

    //Usage: $().test()
    $.fn.test = function() {
      alert("Test");
    };

    $.fn.overrideLog = function(error, ticketNumber) {
      if (window.location.href.indexOf("?td=" + ticketNumber) || window.location.href.indexOf("?targetDebug=" + ticketNumber)) {
        console.log(error);
      }
      _targetErrors.push({
        ticket: $().checkForNullOrEmpty(ticketNumber) ? ticketNumber : "no-ticket-number",
        error: error,
      });
    };

    //TODO: Add Cookie Mechanismn
    //Usage: $().blockImpressionId('click','none')
    $.fn.blockImpressionId = function(blockOnEvent, trackingType, ____satellite) {
      _satellite = ____satellite;
      if (blockOnEvent === "click" || blockOnEvent === "onClick") {
        window.addEventListener("click", function() {
          this.window.addEventListener("click", function() {
            window.targetCampaign.page.campaignName = "";
          });
        });
      } else if (blockOnEvent === "keypress" || blockOnEvent === "onKeyPress") {
        this.window.addEventListener("keyUp", function() {
          window.targetCampaign.page.campaignName = "";
        });
      }

      if (trackingType === "normal") {
        ____satellite.track("genericTestingImpressionIDWorkaround");
      } else if (trackingType === "none") {
        ____satellite.track("");
      }
    };

    //TODO: Add Cookie Mechanismn
    //Usage: $().fireImpressionId('tt:123-abc','none','OT-2022-impressionIdFired',1)
    $.fn.fireImpressionId = function(impressionId, trackingType, flagCookie, expiryInHours, ____satellite) {
      var hasSattelite = $().checkForNullOrEmpty(____satellite.track);
      var flagCookieHasVal = $().checkForNullOrEmpty(flagCookie);
      var flagCookieActualVal = $().getCookie(flagCookie);
      if (flagCookieHasVal && !$().checkForNullOrEmpty(flagCookieActualVal) && hasSattelite) {
        window.targetCampaign = {
          page: {
            campaignName: impressionId,
          },
        };
        if (trackingType === "normal" || trackingType === "click") {
          ____satellite.track("genericTestingImpressionIDWorkaround");
        } else if (trackingType === "none") {
          ____satellite.track("");
        }

        $().setCookie(expiryInHours, "/", flagCookie, "fired");
      }
    };

    $.fn.setTicketNumber = function(_ticketNumber) {
      if ($().checkForNullOrEmpty(_ticketNumber)) {
        dataObject.ticketNumber = _ticketNumber;
      }
    };

    $.fn.getTicketNumber = function() {
      if ($().checkForNullOrEmpty(dataObject.ticketNumber)) {
        return dataObject.ticketNumber;
      } else {
        return false;
      }
    };

    //Usage: $().formatMoney(50,00)
    $.fn.formatMoney = function(amount) {
      return Number(Number(amount).toFixed(0)).toLocaleString().replace(/\,/gm, ".");
    };

    //Usage: $().checkDisplayVar('UK',myStoredDataObj,'OT-12345')
    $.fn.checkDisplayVar = function(market, storedDataObj, ticketNumber) {
      let displayVar = market == storedDataObj.market && ticketNumber == storedDataObj.ticket && !storedDataObj.contextualiseLink.toLowerCase().includes("undefined") ? true : false;
      return displayVar;
    };

    //Usage: $().enforcePopinLimits(popinStateCookie)
    $.fn.enforcePopinLimits = function(name) {
      return false; //Don't forget to remove this later.
      if ($().lsGet(name) !== false) {
        $().storePopinState(null, Number(0));
        $().showPopin();
      }
    };

    //Usage: $().storePopinState(1655988009,3)
    $.fn.storePopinState = function(last_closed, display_count) {
      let objs = {
        last_closed_time: last_closed,
        alert_display_count: display_count,
      };
      localStorage.setItem("popupState", JSON.stringify(objs));
    };

    //Usage: $().compareLastClosed()
    $.fn.compareLastClosed = function() {
      let popupState = JSON.parse(localStorage.getItem("popupState"));
      let current_timestamp = Math.floor(Date.now() / 1000);
      let last_closed_current = Math.floor(popupState.last_closed_time / 1000);
      var minuteDifference = current_timestamp / 60 - last_closed_current / 60;
      console.log("min diff is " + minuteDifference);
      if (minuteDifference >= 1) {
        if (popupState.alert_display_count < 3) {
          $().showPopin();
        }
      }
    };

    //Usage: $().showPopin()
    $.fn.showPopin = function() {
      let popupState = JSON.parse(localStorage.getItem("popupState"));
      storeAlertState(Math.floor(Date.now()), Number(popupState.alert_display_count) + 1);
    };
    //Don't forget to remove the "false" here
    if (false && $().checkForNullOrEmpty(Popup)) {
      Popup.setLastClosed = function() {
        Popup.currentTimeStamp = Math.floor(Date.now() / 1000);
        Popup.setKeyValue("popup_last_closed", Math.floor(Date.now() / 1000));
      };
    }

    //Usage: $().checkForAngular('myAngularSelector')
    $.fn.checkForAngular = function(angularSelector) {
      if (!$().checkForNullOrEmpty(angularSelector)) {
        //Default
        angularSelector = jQuery("*[data-ng-controller]");
      }
      if ($().checkForElement(angularSelector)) {
        return true; //Contains angular components
      } else {
        return false;
      }
    };

    //Usage: $().addTracking({myMboxObject})
    $.fn.addTracking = function(mboxObject){

      if(!$().checkForNullOrEmpty(mboxObject)){
        try{
          _adobeObject.trackEvent({mboxObject});
        }catch(ex){
          console.error(ex);
          console.log('thrown by addTracking');
          return false;
        }
        return true;
      }else{
        return false;
      }

    }


  } else {
    console.log("waiting for jquery");
  }
}, 500);


