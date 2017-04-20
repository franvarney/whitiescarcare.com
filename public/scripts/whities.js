$(document).ready(function() {
  function filterPath(string) {
    return string
      .replace(/^\//, '')
      .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
      .replace(/\/$/, '');
  }

  function scrollableElement(els) {
    for (var i = 0; i < arguments.length; ++i) {
      var el = arguments[i];
      var $scrollElement = $(el);

      if ($scrollElement.scrollTop() > 0) return el;
      else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop() > 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) return el;
      }
    }

    return [];
  }

  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');

  $('.link').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (locationPath == thisPath &&
        (location.hostname == this.hostname || !this.hostname)) {
      var $target = $(this.hash);
      var target = this.hash;

      if (target && $target.offset()) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({ scrollTop: targetOffset }, 400, function() {
            location.hash = target;
          });
        });
      }
    }
  });
});
