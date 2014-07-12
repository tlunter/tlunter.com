var RouteTargets = RouteTargets || {};

RouteTargets.AppRouteTargets = function() {
  _.extend(this, RouteTargets.BaseRouteTargets.prototype);
};

RouteTargets.AppRouteTargets.prototype = {
  posts: function (request, options) {
    this.showSection(Views.PostList());
  },
  post: function (request, options) {
    this.showSection(Views.Post({id: request.params.id}));
  },
  about: function (request, options) {
    this.showSection(Views.About());
  },
  contributions: function (request, options) {
    this.showSection(Views.Contributions());
  }
};
