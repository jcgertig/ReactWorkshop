"use strict";
// var React = require("react");

var UserListItem = React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired,
    handleClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      handleClick: function(){}
    };
  },

  render: function() {
    var handleClick = this.props.handleClick,
        user = this.props.user;
    return (
      <div className="user-list-item well" style={styles.clickable}
        onClick={handleClick.bind(null, user)}>
        <img src={user.profile_image} style={styles.inlineBlock} />
        <div style={styles.inlineBlock}>
          {user.email}
        </div>
      </div>
    );
  }
});

var styles = {
  inlineBlock: {
    display: "inline-block"
  },
  clickable: {
    cursor: "pointer"
  }
};

//module.exports = UserListItem;
window.UserListItem = UserListItem;
