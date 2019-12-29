function() {
  return function(event) {
    var clickEl = event.target;
    if(clickEl.closest('.drawer__header-showHide')){
      window.dataLayer.push({
          event: 'auToggleDrawer',
          'custom.gtm.element': clickEl,
          'custom.gtm.elementClasses': clickEl.className || '',
          'custom.gtm.elementId': clickEl.id || '',
          'custom.gtm.targetText': clickEl.closest('.drawer__header-showHide').textContent || '',
          'custom.gtm.originalEvent': event    
      });  
    } else if(clickEl.closest('.media-selection-button__child-wrapper')){
      window.dataLayer.push({
          event: 'auMediaSelection',
          'custom.gtm.element': clickEl,
          'custom.gtm.elementClasses': clickEl.className || '',
          'custom.gtm.elementId': clickEl.id || '',
          'custom.gtm.targetText': clickEl.closest('.media-selection-button__child-wrapper').textContent || '',
          'custom.gtm.originalEvent': event    
      });    
    } else if (((clickEl.matches('.btn.btn--black-bordered'))||(clickEl.closest('.btn.btn--black-bordered')))&&((clickEl.textContent.includes('Expand View'))||(clickEl.closest('.btn.btn--black-bordered').textContent.includes('Expand View')))){
       window.dataLayer.push({
          event: 'auExpandView',
          'custom.gtm.element': clickEl,
          'custom.gtm.elementClasses': clickEl.className || '',
          'custom.gtm.elementId': clickEl.id || '',
          'custom.gtm.targetText': clickEl.parentNode.textContent || '',
          'custom.gtm.originalEvent': event    
      });      
    }
  };
}