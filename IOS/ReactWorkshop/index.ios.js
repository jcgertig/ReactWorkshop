/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native'),
    SearchView = require('./views/SearchView.ios'),
    {
      AppRegistry,
      NavigatorIOS
    } = React;

var ReactWorkshop = React.createClass({
  render () {
    var initialRoute = {
      component: SearchView,
      title: 'Search',
    };

    return (
      <NavigatorIOS style={{flex: 1}} initialRoute={initialRoute} />
    );
  }
});

AppRegistry.registerComponent('ReactWorkshop', () => ReactWorkshop);
