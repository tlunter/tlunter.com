/** @jsx React.DOM */

var Views = Views || {};
Views.Register = React.createClass({
  render: function() {
    return (
      <div>
        <h1 id="title">Register</h1>
        <form className="pure-form pure-form-stacked form-center">
          <fieldset>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirmation" />
            <button type="submit" className="pure-button pure-button-primary">Register</button>
          </fieldset>
        </form>
      </div>
    );
  }
});
