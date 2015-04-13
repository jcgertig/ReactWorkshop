"use strict";
// var React = require("react");

var UserListWidget = React.createClass({

  propTypes: {
    users: React.PropTypes.array.isRequired,
    handleClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      users: [],
      handleClick: function(){}
    };
  },

  render: function() {
    var handleClick = this.props.handleClick,
        userItems = this.props.users.map(function(user){
          return <UserListItem user={user} handleClick={handleClick} />;
        });

    return (
      <div className="user-list-widget">
        {userItems}
      </div>
    );
  }
});

//module.exports = UserListWidget;
window.UserListWidget = UserListWidget;
