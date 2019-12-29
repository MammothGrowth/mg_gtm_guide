(function() {
  function findAncestor(el, cls) {
    if (!el.classList.contains(cls)) {
      while ((el = el.parentElement) && !el.classList.contains(cls));
    }
    return el;
  }
  var ancestor = findAncestor(event.target, '{INSERT_PARENT_CSS_SELECTOR}');
  var title = ancestor.querySelector('{INSERT_DESIRED_DATA_CSS_SELECTOR}').textContent;
  return title;
})();