var Routes = function() {
};

Routes.prototype.dispatch = function(targets) {
  Aviator.setRoutes({
    target: targets.appRouteTarget,
    '/': 'posts',
    '/posts/:id': 'post'
  });

  Aviator.dispatch();
};
