// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  const configuration = {
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-scss-preprocessor'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      
      { pattern: './src/styles.scss', included: true, watched: true },
      { pattern: "./node_modules/font-awesome/scss/font-awesome.scss", watched: true, included: true },
      { pattern: "./node_modules/bootstrap/dist/css/bootstrap.css", watched: true, included: true },
      { pattern: "./node_modules/leaflet/dist/leaflet.css", watched: true, included: true },
      { pattern: "./node_modules/leaflet-easybutton/src/easy-button.css", watched: true, included: true },
    ],
    preprocessors: {
      
      './src/styles.scss': ['scss'],
      './node_modules/font-awesome/scss/font-awesome.scss': ['scss'],
      './node_modules/bootstrap/dist/css/bootstrap.css': ['scss'],
      './node_modules/leaflet/dist/leaflet.css': ['scss'],
      './node_modules/leaflet-easybutton/src/easy-button.css': ['scss'],
    },
    scssPreprocessor: {
      options: {
        sourceMap: true,
        importer: require('node-sass-tilde-importer')
      }
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'), reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    singleRun: false
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
