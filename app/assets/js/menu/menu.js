document.addEventListener('DOMContentLoaded', function() {
  var toggle_nav = function() {
    var nav = document.querySelector('div.nav')
    if (nav.style.display != "block") {
      nav.style.display = "block";
      nav.style.visibility = "visible";
    } else {
      nav.style.display = "none";
      nav.style.visibility = "hidden";
    }
  };

  var add_onclick_close = function(mediaQueryList) {
    var nav_links = document.querySelectorAll('div.nav li a');

    console.log(document);

    if (mediaQueryList.matches) {
      Array.prototype.forEach.call(nav_links, function(link) {
        link.onclick = null;
      });
    } else {
      Array.prototype.forEach.call(nav_links, function(link) {
        link.onclick = toggle_nav;
      });
    }
  };

  var mql = window.matchMedia('(min-width:961px)');
  mql.addListener(add_onclick_close);

  add_onclick_close(mql);

  var nav_button = document.querySelector('[name="nav-button"]');
  nav_button.onclick = toggle_nav;
});
