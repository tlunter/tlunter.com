angular.module('services.date', []);

angular.module('services.date').service('DateFormatter',
    [function () {
  var month_names = new Array ( );
  month_names[month_names.length] = "Jan";
  month_names[month_names.length] = "Feb";
  month_names[month_names.length] = "Mar";
  month_names[month_names.length] = "Apr";
  month_names[month_names.length] = "May";
  month_names[month_names.length] = "Jun";
  month_names[month_names.length] = "Jul";
  month_names[month_names.length] = "Aug";
  month_names[month_names.length] = "Sep";
  month_names[month_names.length] = "Oct";
  month_names[month_names.length] = "Nov";
  month_names[month_names.length] = "Dec";

  this.parseDate = function(d) {
    return "" + d.getDate() +
          " " + month_names[d.getMonth()] +
          " " + d.getFullYear()
  };
  this.setupDate = function(model, key) {
    var date = new Date(model[key]);
    model[key] = this.parseDate(date);
    return model;
  };
}]);
