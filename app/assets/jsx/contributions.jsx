/** @jsx React.DOM */

var Views = Views || {};
Views.Contributions = React.createClass({
  render: function() {
    return (
      <div className="contributions">
        <h1 id="title">Contributions</h1>
        <div className="pure-g-r">
          <div className="pure-u-1-3"><h1><a href="http://www.github.com/swipely/docker-api/" target="_blank">swipely/docker-api</a></h1>Ruby</div>
          <div className="pure-u-1-3"><h1><a href="http://www.github.com/swipely/dockly/" target="_blank">swipely/dockly</a></h1>Ruby</div>
          <div className="pure-u-1-3"><h1><a href="http://www.github.com/geemus/excon/" target="_blank">geemus/excon</a></h1>Ruby</div>
        </div>
        <div className="pure-g-r">
          <div className="pure-u-1-3"><h1><a href="http://www.github.com/swipely/aerosol/" target="_blank">swipely/aerosol</a></h1>Ruby</div>
          <div className="pure-u-1-3"><h1><a href="http://www.github.com/fosskers/aura/" target="_blank">fosskers/aura</a></h1>Haskell</div>
          <div className="pure-u-1-3"><h1><a href="http://www.github.com/nahiluhmot/specl/" target="_blank">nahiluhmot/specl</a></h1>Common Lisp</div>
        </div>
        <div className="pure-g-r">
          <div className="pure-u-1-3"><h1><a href="http://www.github.com/jaor/xmobar/" target="_blank">jaor/xmobar</a></h1>Haskell</div>
          <div className="pure-u-1-3"><h1>ResNet Dashboard</h1>Python and Django</div>
          <div className="pure-u-1-3"><h1>ResNet Backup System</h1>Python, Django and GTK+</div>
        </div>
      </div>
    );
  }
});
