var disqus_shortname = 'tlunter';
var disqus_identifer = '';
var disqus_title = '';
var disqus_url = '';
var shown_disqus = false;

function ShowDisqus(identifer, title, url) {
  var disqus_thread = document.querySelector("#disqus_thread");
  disqus_thread.style.display = 'block';
  if (shown_disqus) {
    DISQUS.reset({
      reload: true,
      config: function() {
        this.page.identifer = identifer;
        this.page.title = title;
        this.page.url = url;
      }
    });
  } else {
    disqus_identifer = identifer;
    disqus_title = title;
    disqus_url = url;
    shown_disqus = true;
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
  }
}

function HideDisqus() {
  var disqus_thread = document.querySelector("#disqus_thread");
  disqus_thread.style.display = 'none';
}
