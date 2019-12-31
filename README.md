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

### **Start Up** 
1. Fork and Clone this Repo for client specific work
2. Once the gtm-container.json file is downloaded, navigate to the admin options in GTM
3. Click Import Container
* Select the 'gtm-container.json' file to upload
* Select 'Merge' - This will add the tags, triggers, and variables from this file to your environment without overwriting any work already done in your environment
* Continue

## **Track Instructions**
*For further reading on the following design pattern you may reference this [blog post](https://www.simoahava.com/analytics/simple-custom-event-listeners-gtm/)*

#### Click Events

1. Navigate to Tags >> 'MG - Attach Click Listener'
* This code should look familiar:) This code attaches the click event listener and provides the block of code that should run upon click

*MG - Attach Click Listener*
```javascript
    // Use events from https://developer.mozilla.org/en-US/docs/Web/Events
    var eventName = 'click';
    // Attach listener directly to element or document if element not found
    var el = document.querySelector('body') || document;
    // Leave useCapture to true if you want to avoid propagation issues.
    var useCapture = true;
    el.addEventListener(eventName, {{MG - Click Events}}, useCapture);
```
* MG - Click Events is that block of code which we've stored as a Variable

2. Navigate to Variables >> 'MG - Click Events'
* Because we've attached the 'click' event listener to the body of the document, we are going to check the element that was clicked against some elements that we want to track.
* In this code, each if statement represents a unique track call that we want to make. The element the user clicked is stored in the variable clickEl, and we want to compare that element to some CSS to see if the clicked element is in fact the one we want to trigger a track call. IE. clickEl is the button a user clicked, and we want to compare that to the CSS of a button we want to track clicks of. 
* Each value with brackets needs to be replaced with the CSS of elements you want to track. Example below.
* [How to Find CSS w/ Devtools](http://www.abodeqa.com/inspecting-elements-for-writing-xpath-css-selector-in-chrome/) 
* [CSS Selector Cheat Sheet](https://www.web4college.com/questions/css-selectors-cheat-sheet.php) 

*Start*
```javascript
    else if((clickEl.matches('{CLICK ELEMENT CSS}'))||(clickEl.closest('{PARENT ELEMENT CSS}'))){
        analytics.track('CTA Clicked', {
          // Edit so that the CTA text is always captured
          'CTA':clickEl.closest('{Enter CSS}').textContent || ''
        })
    }
```

*Finish*
```javascript
    else if((clickEl.matches('.cta-button'))||(clickEl.closest('.cta-wrapper'))){
        analytics.track('CTA Clicked', {
          // Edit so that the CTA text is always captured
          'CTA':clickEl.closest('.cta-wrapper').textContent || ''
        })
    }
```
*It is important to note here that the "||" characters mean or and is only necessary if a button contains child elements that a user could click on ie. an svg icon. In this situation, we'd want to compare against the parent element of the child to determine if a button we want to track was clicked*

3. Copy paste as many if blocks as click events are called for in the tracking plan

#### **Form Submits**

* For each type of [event](https://developer.mozilla.org/en-US/docs/Web/Events) that we want to track, we need to attach an event listener to listen for that event.
* In this example, we'll be looking at form submits

*MG - Attach Submit Listener*
```javascript
    // Use events from https://developer.mozilla.org/en-US/docs/Web/Events
    var eventName = 'submit';
    // Attach listener directly to element or document if element not found
    var el = document.querySelector('body') || document;
    // Leave useCapture to true if you want to avoid propagation issues.
    var useCapture = true;
    el.addEventListener(eventName, {{MG - Form Submits}}, useCapture);
```

1. MG - Form Submits is that block of code which we've stored as a Variable
2. Navigate to Variables >> 'MG - Form Submits'
* Similarly to before with MG - Click Events, we're going to compare the form submission that triggers our event listener against a list of forms that we want to track. 
* Forms typically have an ID which makes looking for them easier than working with classes as we did before. If you're unable to find a form id, you can still use classes and attributes to check which if block should fire. 
* [ID CSS Selector](https://www.w3schools.com/cssref/sel_id.asp) 

*Start*
```javascript
    if(formEl.matches('{Form ID}')){
        analytics.track('{Event Name}', {
          // Replace these with event properties defined in the tracking plan
          // Forms have input elements that are filled out prior to submission
          // Find the CSS of each input you want to include as a property
          'Property Name':formEl.querySelector('{Input CSS}').value || ''
        })
    }
```

*Finish*
```javascript
    else if(formEl.matches('#signup')){
        analytics.track('Signup Form Submitted', {
          'companySize':formEl.querySelector('.company-size').value || ''
        })
    }
```

3. Copy paste as many if blocks as form submit events are called for by the tracking plan

*When testing, if you are having trouble getting the form submit events to fire, it is likely because the form's functionality is managed via javascript and not standard html. To handle this use case, track form submits by tracking clicks on the form submit button or more preferably via a server side event*


### **Identify Instructions** 

*Managing identify is truly a case by case scenario. But here are some common design patterns*

1. Identify using a backend userId
* After a user submits a form and a new user record is created on the backend, have your developers push that user's userId and properties to the dataLayer client side on every page load.
* Create [dataLayer variables](https://www.analyticsmania.com/post/data-layer-variable/) for each value pushed to the dataLayer
* [How to push values to the dataLayer](https://www.analyticsmania.com/post/datalayer-push/)
* Now you can simply call identify on every page load if the userId is not null
* Create a GTM Tag to manage the identify call that is triggered on page view
```javascript
<script>
  if({{userID}}){
    analytics.identify({{userID}},{
      'firstName':{{firstName}},
      'lastName':{{lastName}},
      'email':{{email}}
    })
  }
</script>
```

2. Identify on form submit
* If you don't have a user management system to generate a userId and building one isn't feasible, you can default to identifying users on form submit using their email. *This is not recommended*
* To do this, simply edit *MG - Form Submits* to handle identify

*Before*
```javascript
    else if(formEl.matches('#signup')){
        analytics.track('Signup Form Submitted', {
          'companySize':formEl.querySelector('.company-size').value || ''
        })
    }
```

*After*
```javascript
    else if(formEl.matches('#signup')){
        if({{email}}){
            analytics.identify({{email}},{
              'firstName':{{firstName}},
              'lastName':{{lastName}},
              'email':{{email}}  
            })
        }
        analytics.track('Signup Form Submitted', {
          'companySize':formEl.querySelector('.company-size').value || ''
        })
    }
```
*It is important to note that the identify call should be made before making the track call*


### **Testing** 

*Any changes made to your GTM workspace will be local to you until you publish the container*

1. Once you're ready to test, click preview. 
2. Open up your website and you should see a control panel at the bottom of your screen. *(If not give it a minute as it can take a bit to load)*
3. Navigate through each of your funnels and check the left side of the preview control panel for the events that you want to track. They should appear as clicks etc and you'll need to find the specific one that corresponds to triggering the events you want to track. 
4. Click on the event and check that the dataLayer variables are populated with the desired values
5. Then check each of your destinations and determine if the events are populating
6. If the events are not making it into your destinations and the dataLayer variables are populating, you may need to add an alert inside of the callback function ie MG - Click Events like so

**Check with a developer before testing and do not publish**
```javascript
    else if((clickEl.matches('.cta-button'))||(clickEl.closest('.cta-wrapper'))){
        alert('CTA Clicked')
        analytics.track('CTA Clicked', {
          // Edit so that the CTA text is always captured
          'CTA':clickEl.closest('.cta-wrapper').textContent || ''
        })
    }
```
*remember this is local to your experience until you publish (DO NOT PUBLISH AN ALERT!!)
7. The alert will cause a pop up to appear on the screen, if it does not appear, check that your css is correct in your if statements. 


