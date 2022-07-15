# gtb-ci
Helper framework for Adobe Target

More info will be added here as we progress.
We'll need to go back and document what we already have.

# Common uses

<br>
<br>

<i>Please note, that unless stated otherwise, all parameters documented here are
<b>required</b>. Some parameters may have <b>default values</b> and can be passed as <b>null.</b>
Where applicable, this will be noted.
<h1>Getting started</h1>
<br>
<u>
    <b>
        Initalize the helper
    </b>
</u>
<br>
<br>
<u><b>Purpose of method:</b></u>
<br00>
<br>
<i>
Sets the ticket number as well as the logObject.
</i>
<br>
<br>

<code> 
<br>$().initHelper(_ticketNumber, _showLogs,_logObject)

<pre>  

    returns logObject (which is of type console)

    Example Values:

    _ticketNumber: 'tt:ab-xs-uk-123' (String)
    _showLogs: true (boolean)
    _logObject: myLogObj (console)

</pre>

//Example:
<br>var _myLogObj = $().fireImpressionId('OT-2022',false,console);
</code>
<br>
<br>
<h2>ImpressionID's</h2>
<br>
<u>
    <b>
        Fire an impressionId
    </b>
</u>
<br>
<br>
<u><b>Purpose of method:</b></u>
<br00>
<br>
<i>
Fires a pre-defined impressionID on the Adobe Target activity.
<br>
ImpressionId's are used to track metrics on Adobe Target.
</i>
<br>
<br>

<code> 
<br>$().fireImpressionId(impressionId, trackingType,flagCookie,expiryInHours, ___satellite);

<pre>  

    returns void

    Example Values:

    impressionId: 'tt:ab-xs-uk-123' (String)
    trackingType: 'none' / 'normal' (String)
    flagCookie: 'thisIsAcookieName' (String)
    expiryInHours: 12 (Number/Int),
    ___satellite : _satellite (AT Object)

</pre>

//Example:
<br>$().fireImpressionId('tt:ab-xs-uk-123','normal','thisIsAcookieName',1, _satellite);
</code>
<br>
<br>
<u>
    <b>
        Block an impressionId
    </b>
</u>
<br>
<br>
<u><b>Purpose of method:</b></u>
<br>
<i>
Prevents impressionID's from being re-fired. For some reason they refire<br> on certain DOM events.
</i>
<br>
<br>

<code> 

$().blockImpressionId(blockOnEvent, trackingType, ___satellite);

<pre>

    returns void

    Example Values:

    blockOnEvent: 'click' / 'keyup' (String)
    trackingType: 'none' / 'normal' (String)
    ___satellite: _satellite (AT Object that gets passed)
</pre>

//Example:
<br>
<br>
$().blockImpressionId('click','normal', _satellite);

</code>
<br>
<h2>Evalution Methods</h2>

<i>The methods listed below are used to 'check' for an object or compare a value</i>
<br>
<br>
<u>
    <b>
        Check if device is mobile.
    </b>
</u>
<br><br>
<u><b>Purpose of method:</b></u>
<br>
<i>
Checks the <u>navigator.userAgent</u> variable to see
if we are using a mobile device. <br> This works on devtools as well as 
actual devices.
</i>
<br>
<br>

<code> 
$().checkForMobile();

<pre>

    Assigns true or false to a variable called isMobile (bool) but does
    not return it directly.

    Example Values:
    None

</pre>  

//Example:
<br>$().checkForMobile();
</code>
<br>
<br>
<u>
    <b>
        Check for null or empty variable.
    </b>
</u>
<br>
<br>
<u><b>Purpose of method:</b></u>
<br>
<i>
Checks a variable to see if it is null or empty.
</i>
<br>
<br>

<code> 
$().checkForNullOrEmpty(myVar);

<pre>

    returns true or false (bool)

    Example Parameters
    myVar: (String) / (Object)

    Example Values:
    myVar: 'some string' / {myObject:{someObject}}

</pre>

//Example

$().checkForNullOrEmpty('myStringVar');

$().checkForNullOrEmpty({ myObject:{childData}});

</code>


<br>
<br>
<u>
    <b>
        Check for HTML element
    </b>
</u>
<br>
<br>
<u><b>Purpose of method:</b></u>
<br>
<i>
Uses jQuery selectors to check if an element exists in the DOM.
</i>
<br>
<br>

<code> 
$().checkForElement(elementSelector);

<pre>

    returns true or false (bool)

    Example Values:
    elementSelector: '.mySelector' (String)

    <i>Please note that you only need to provide the selector</i>
</pre>

//Example

$().checkForElement('#mySelectorId');

$().checkForElement('.mySelectorClass');
</code>


<br>
<br>
<u>
    <b>
        Check for HTML element and run an action afterwards.
    </b>
</u>

<u>
<i>
<br>
<u><b>Purpose of method:</b></u>
<br>
<i>
Checks if an element exists in the DOM and runs a method afterwards.
</i>
<br>
<br>
Please note the following:
</i>
</u>
<br>
<i>
<br>
- <b>'Action'</b> is the same as <b>'method'</b>
<br>
- The method will only run if the HTML element is found.
<br>
- ActionArgs can be omitted if not needed
<br>
- You only need to provide the selector for the variable element

<br>
<br>

<code>

$().waitForHtmlElementAndRunAction(element, action, actionArgs, timeOut);

<pre>

    returns void, but runs a method which may return something else entirely.
    
    Example Values:

    element: '.mySelector' (String)

    action: myMethod (function)

    actionArgs: [1,2,3] (Array) / (Object) / (String) / (Number) [Optional parameter]

    timeOut: 250 (Int)

</pre>

//Example

$().waitForHtmlElementAndRunAction('.some-element',someMethod,[1,2,3],250);
</code>

<br>
<br>
<h2>Utility Methods</h2>
<br>
<h2>Angular</h2>
<br>
<u>
    <b>
    Detecting angular elements
    </b>
</u>
<br>
<br>
<u><b>Purpose of method:</b></u>
<br>
Checks for angular components using jQuery selectors.<br>

<code>
<br>$().checkForAngular(angularSelector);
<br>
<br>
<pre>

    returns true or false

    Example Parameters:
    angularSelector: (String)

    Example Values:
    angularSelector: '.myAngularSelector' (Optional, defaults to '*[data-ng-controller]' if left blank)

</pre>

//Example
<br>
$().checkForAngular('.myAngularSelector')

</code>
<br>
<h2>Internal Variables</h2>
<br>
<i>The method(s) below are used to manipulate internal variables</i>
<br>
<u>
    <b>
        Set ticket number
    </b>
</u>
<br> 
<br>
<i>
<u><b>Purpose of method:</b></u>
<br>
Sets an internal varible called ticketNumber which we use to ensure that code for specific ticket will only run on that ticket. Ergo, each ticket has it's own number
</i>
<br>
<code>
<br>
$().setTicketNumber(_ticketNumber)

<pre>
    returns null 

    Example Values:

    _ticketNumber: 'OT-2022' (String)


</pre>

//Example
<br>
$().setTicketNumber('OT-2022')

</code>
<h2>*Logs</h2>
<br>
<u>
    <b>
        Set Logs
    </b>
</u>
<br> 
<i>
<u><b>Purpose of method:</b></u>
<br>
Allows logs to be output/blocked from the activity using <b>console.log</b> and
<b>console.dir()</b>
<br>
<b>
<br>
Please note that this will not affect log outputs that are stored in
<br>other 3rd-party scripts.
</b>
</i>
<br>
<code>

<br> $().setLogs(_logFlag)

<pre>

    returns null

    Example Parameters:
    _logFlag: (Boolean)

    Example Values:
    __logFlag : true

</pre>

//Example:
<br>
$().setLogs(true)

</code>
<br>
<br>
<u>
    <b>
        Test Logs
    </b>
</u>
<br> 
<br> 
<u><b>Purpose of method:</b></u>
<br>
<i>
Simulates the enabling/disbaling of logs so we can confirm that the mechanism is working correctly.
</i>

<br> 
<code>
<br> 
$().testLogs()

<pre>

    returns null

    Example Values:
    None

</pre>

//Example:
<br>
$().testLogs()

</code>


<br>
<br>
<h2>*LocalStorage Object</h2>
<br>
<br>
<u>
    <b>
        Add to LocalStorage
    </b>
</u>
<br> 
<br> 
<i>
<u><b>Purpose of method:</b></u>
<br>
Adds a value to a localStorage variable.
</i>
<br>

<code>
<br> 
$().lsAdd(name,value)

<pre>
    
    returns null

    Example Parameters:
    name: (String)
    value: (String) - Note, you can use objects as well, but you need to call JSON.stringify() on the object.

    Example Values:
    name: 'cookiesName';
    value: 'avalueforcookie'

</pre>

//Example:
<br>
$().lsAdd('cookiesName', 'avalueforcookie');

</code>

<br>
<br>
<u>
    <b>
        Remove from LocalStorage
    </b>
</u>
<br> 
<br> 
<u><b>Purpose of method:</b></u>
<br>
<i>
Removes a localStorage variable.
</i>
<br>
<br>

<code>

<br>    
$().lsRemove(name)

<pre>
    
    returns null

    Example Parameters:
    name: (String)
  

    Example Values:
    name: 'lsVar';

</pre>

//Example:
<br>
$().lsRemove('lsVar');

</code>

<br>
<br>
<u>
    <b>
        Get variable from LocalStorage
    </b>
</u>
<br> 
<br> 
<u><b>Purpose of method:</b></u>
<br>
<i>
Retrieves the value of a localStorage variable.
</i>
<br>
<br>

<code>
<br> 
$().lsGet(name)

<pre>

    returns variable from LocalStorage

    Example Parameters:
    name: (String)
  

    Example Values:
    name: 'lsVar';

</pre>

//Example:
<br>
$().lsGet('lsVar');

</code>
<br>
<h2>*Cookies</h2>
<br>
<br>
<u>
    <b>
        Add a cookie
    </b>
</u>
<br> 
<br> 
<u><b>Purpose of method:</b></u>
<br>
<i>
Adds a cookie and sets the value, expiry in hours and cookie path.
</i>
<br>

<code>
<br>
<br> 
$().setCookie(expireInHours, path, cookieName, cookieValue)

<pre>

    returns null

    Example Parameters:

    expireInHours: (Number) / (Int) - Should be a whole number.
    path: (String) - This refers to which URLs/Domains we should allow the cookie to access.
    cookieName: (String)
    cookieValue: (String) - Note, you can use objects as well, but you need to call JSON.stringify() on the object.

    Example Values:

    expireInHours: 24
    path: '/'
    cookieName: 'mycookie'
    cookieValue: 'myCookieVal'

    
</pre>

//Example:
<br>
$().setCookie(24,'/','myCookie',myCookieVal)

</code>

<u>
    <b>
        Format the date
    </b>
</u>
<br> 
<br> 
<i>
<u><b>Purpose of method:</b></u>
<br>
Used to format dates
</i>
<br>

<code>
<br> 
$().lsAdd(name,value)

<pre>
    
    returns null

    Example Parameters:
    name: (String)
    value: (String) - Note, you can use objects as well, but you need to call JSON.stringify() on the object.

    Example Values:
    name: 'cookiesName';
    value: 'avalueforcookie'

</pre>

//Example:
<br>
$().lsAdd('cookiesName', 'avalueforcookie');

</code>

<br>
<br>