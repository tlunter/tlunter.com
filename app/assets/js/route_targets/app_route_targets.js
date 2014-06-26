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
  },
  logout: function (request, options) {
    this.showSection(Views.Logout());
  },
  login: function (request, options) {
    this.showSection(Views.Login());
  },
  register: function (request, options) {
    this.showSection(Views.Register());
  }
};
