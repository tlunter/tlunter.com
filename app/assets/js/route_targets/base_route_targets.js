var RouteTargets = RouteTargets || {};
RouteTargets.BaseRouteTargets = function() {};

RouteTargets.BaseRouteTargets.prototype = {
  showSection: function(component) {
    React.unmountComponentAtNode(contentNode);
    React.renderComponent(component, contentNode);
  }
};
