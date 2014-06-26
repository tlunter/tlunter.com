var App = function() {
};

App.prototype.dispatch = function() {
  this.routeTargets = {
    appRouteTarget: new RouteTargets.AppRouteTargets()
  };

  this.routes = new Routes();
  this.routes.dispatch(this.routeTargets);
};
