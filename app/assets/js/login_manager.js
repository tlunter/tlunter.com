var LoginManager = function() {
  this.currentUser = {};
  this.callbacks = [];
  this.register(this.setCurrentUser.bind(this));
  this.checkLogin();
};

LoginManager.prototype.register = function (callbackFn) {
  this.callbacks.push(callbackFn);
};

LoginManager.prototype.unregister = function (callbackFn) {
  this.callbacks = _.without(this.callbacks, callbackFn);
};

LoginManager.prototype.setCurrentUser = function (user) {
  this.currentUser = user;
};

LoginManager.prototype.loggedInStatus = function() {
  if (this.currentUser.id) {
    return true;
  } else {
    return false;
  }
};

LoginManager.prototype.checkLogin = function() {
  var _that = this;
  reqwest({
    url: '/sessions.json',
    method: 'get',
    type: 'json',
    success: function (resp) {
      _that.pushChange(resp);
    },
    error: function (err) {
      _that.pushChange({});
    },
    complete: function (resp) {
      setTimeout(_that.checkLogin.bind(_that), 10000);
    }
  });
};

LoginManager.prototype.pushChange = function(user) {
  this.callbacks.forEach(function(cb) {
    cb(user);
  });
};
