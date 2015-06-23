module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'picky-select.js',
      'tests/*.spec.js'
    ],

    autoWatch : true,
    autoWatchBatchDelay : 500,
    frameworks: ['jasmine'],
    browsers : ['PhantomJS'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-jasmine',
    ]

  });
};
