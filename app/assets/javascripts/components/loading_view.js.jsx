var LoadingView = React.createClass({
  componentDidMount: function() {
    var Loader = require('../lib/partical_loader').Loader;
    Loader.init('.loading-view');
  },

  render: function() {
    return (
      <div className="loading-view"></div>
    );
  }
});

window.LoadingView = LoadingView;
