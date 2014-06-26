var Routes = function() {
};

Routes.prototype.dispatch = function(targets) {
  Aviator.setRoutes({
    target: targets.appRouteTarget,
    '/': 'posts',
    '/posts/:id': 'post',
    '/about': 'about',
    '/contributions': 'contributions',
    '/logout': 'logout',
    '/login': 'login',
    '/register': 'register'
  });

  Aviator.dispatch();
};
