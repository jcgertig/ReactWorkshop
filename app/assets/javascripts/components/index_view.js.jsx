// "use strict";
// var React = require("react");

var IndexView = React.createClass({

  getInitialState: function() {
    return {
      users: [],
      loading: true
    };
  },

  componentDidMount: function() {
    var self = this;
    setTimeout(
      function() {
        self.setState({
          users: self.props.users,
          loading: false
        });
      }, 500
    );
  },

  removeUser: function(target) {
    var users = this.state.users;
    var filtered = users.filter(function(user) {
      return user.email !== target.email;
    });
    this.setState({
      users: filtered
    });
  },

  render: function() {
    var users = this.state.users,
        loading = this.state.loading,
        content = loading? <LoadingWidget /> : (
                                                  <UserListWidget users={users}
                                                    handleClick={this.removeUser} />
                                                );
    return (
      <div>
        <h1>Users</h1>
        {content}
      </div>
    );
  }
});

//module.exports = IndexView;
window.IndexView = IndexView;
