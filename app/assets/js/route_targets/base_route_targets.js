var RouteTargets = RouteTargets || {};
RouteTargets.BaseRouteTargets = function() {};

RouteTargets.BaseRouteTargets.prototype = {
  showSection: function(component) {
    React.unmountComponentAtNode(CONTENT_NODE);
    React.renderComponent(component, CONTENT_NODE);
  }
};
