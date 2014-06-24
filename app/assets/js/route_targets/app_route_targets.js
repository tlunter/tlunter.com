var RouteTargets = RouteTargets || {};

RouteTargets.AppRouteTargets = function() {
  _.extend(this, RouteTargets.BaseRouteTargets.prototype);
};

RouteTargets.AppRouteTargets.prototype = {
  posts: function (request, options) {
    console.log("Showing posts");
    this.showSection(Views.Posts());
  },
  post: function (request, options) {
    console.log("Showing post " + request.params.id);
    this.showSection(Views.Post({id: request.params.id}));
  }
};
