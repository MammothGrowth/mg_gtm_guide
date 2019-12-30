# Track & Identify GTM Implementation


This repo contains a boilerplate GTM container that provides non-technical folks a 
nice jumping off point for implementing modern behavioral analytics tools via GTM. 

### **Overview**

Web applications are able to be interactive as a result of browsers support for event detection. 
When a user interacts with a web element by, for example, clicking on it or hovering over it, an event
is emitted which can then be handled with some javascript. 

[Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) are used to listen for these events being emitted on the elements that they are attached to. If you attach a 'click' event listener to the body of a web page, that event listener will be triggered every time anything is clicked on that page. Once an event listener is triggered, a set of directions are initiated via what is called a 'callback' function.

 * A complete list of supported events can be found here: [MDN Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)

```javascript
var clickEl = document.querySelector('body')
clickEl.addEventListener('click', function(event){
	/* this is the callback function or the set of instructions that will fire when the
	event listener is triggered
	*/
	console.log('Hello World');
})
```

GTM splits this 'trigger' + 'callback' logic into 'triggers' and 'tags' respectively. Where 'triggers' are the actions taken by the user and 'tags' or 'callbacks' is the block of code that runs as a result of those actions. GTM supports a variety of 'triggers' out of the box, but we'll be deploying custom javascript with this container to allow for more flexability. 

### **Instructions** 

1. Fork and Clone this Repo for client specific work
2. Once the gtm-container.json file is downloaded, navigate to the admin options in GTM
3. Click Import Container
* Select the 'gtm-container.json' file to upload
* Select 'Merge' - This will add the tags, triggers, and variables from this file to your environment without overwriting any work already done in your environment
* Continue
5. Navigate to Tags >> 'MG - Attach Click Listener'
* This code should look familiar:) This code attaches the click event listener and provides the block of code that should run upon click
* MG - Track Calls is that block of code which we've stored as a Variable

```javascript
    // Use events from https://developer.mozilla.org/en-US/docs/Web/Events
    var eventName = 'click';
    // Attach listener directly to element or document if element not found
    var el = document.querySelector('body') || document;
    // Leave useCapture to true if you want to avoid propagation issues.
    var useCapture = true;
    el.addEventListener(eventName, {{MG - Track Calls}}, useCapture);
```
6. Navigate to Variables >> 'MG - Track Calls'
* Because we've attached the 'click' event listener to the body of the document, we are going to check the element that was clicked against some elements that we want to track.
* In this code, each if statement represents a unique track call that we want to make. The element the user clicked is stored in the variable clickEl, and we want to compare that element to some CSS to see if the clicked element is in fact the one we want to trigger a track call. IE. clickEl is the button a user clicked, and we want to compare that to the CSS of a button we want to track clicks of. 
* Each value with brackets needs to be replaced with the CSS of elements you want to track. Example below.
* [How to Find CSS w/ Devtools](http://www.abodeqa.com/inspecting-elements-for-writing-xpath-css-selector-in-chrome/) 
* [CSS Selector Cheat Sheet](https://www.web4college.com/questions/css-selectors-cheat-sheet.php) 

*Start*
```javascript
    if((clickEl.matches('{CLICK ELEMENT CSS}'))||(clickEl.closest('{PARENT ELEMENT CSS}'))){
        analytics.track('CTA Clicked', {
          // Edit so that the CTA text is always captured
          'CTA':clickEl.closest('{Enter CSS}').textContent || ''
        })
    }
```

*Finish*
```javascript
    if((clickEl.matches('.cta-button'))||(clickEl.closest('.cta-wrapper'))){
        analytics.track('CTA Clicked', {
          // Edit so that the CTA text is always captured
          'CTA':clickEl.closest('.cta-wrapper').textContent || ''
        })
    }
```
*It is important to note here that the "||"" characters mean or and is only necessary if a button contains child elements that a user could click on ie. an svg icon. In this situation, we'd want to compare against the parent element of the child to determine if a button we want to track was clicked*

### **Testing** 
