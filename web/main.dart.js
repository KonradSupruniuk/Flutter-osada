self.addEventListener('fetch', function(event) {});
var _flutter = _flutter || {};
_flutter.loader = {
  loadEntrypoint: async function(options) {
    let config = {
      entrypointUrl: "main.dart.js",
      serviceWorker: options.serviceWorker || null,
      onEntrypointLoaded: options.onEntrypointLoaded,
    };

    let engineInitializer = {
      initializeEngine: async function() {
        return {
          runApp: async function() {
            let script = document.createElement("script");
            script.src = config.entrypointUrl;
            document.body.appendChild(script);
          }
        };
      }
    };

    config.onEntrypointLoaded(engineInitializer);
  }
};
window.addEventListener('load', function(ev) {
  _flutter.loader.loadEntrypoint({
    serviceWorker: {
      serviceWorkerVersion: null,
    },
    onEntrypointLoaded: function(engineInitializer) {
      engineInitializer.initializeEngine().then(function(appRunner) {
        appRunner.runApp();
      });
    }
  });
});

var dartMainRunner = function(main) {
  main();
};

function main() {
  console.log("Flutter Web App Started");
}
