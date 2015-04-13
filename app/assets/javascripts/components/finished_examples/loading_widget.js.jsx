"use strict";
// var React = require("react");

var LoadingWidget = React.createClass({

  render: function() {
    return (
      <div style={styles.loading}>
        <i className="fa fa-spinner fa-spin"></i>
      </div>
    );
  }
});

var styles = {
  loading: {
    textAlign: "center",
    fontSize: 40
  }
};

//module.exports = LoadingWidget;
window.LoadingWidget = LoadingWidget;
