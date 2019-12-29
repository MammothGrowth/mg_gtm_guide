function() {
  return function(event) {
    var clickEl = event.target;
    if((clickEl.matches('{CLICK ELEMENT}'))||(clickEl.closest('{PARENT ELEMENT}'))){
        analytics.track('CTA Clicked', {
          'CTA':clickEl.textContent
        })
    } 
    else if((clickEl.matches('{CLICK ELEMENT}'))||(clickEl.closest('{PARENT ELEMENT}'))){
        analytics.track('', {

        })
      }
    }