/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native'),
    SearchView = require('./views/SearchView.ios'),
    {
      AppRegistry,
      Text,
      View
    } = React;

var ReactWorkshop = React.createClass({
  render () {
    return (
      <View>
        <Text>Hello World</Text>
      </View>
    );
  }
});

AppRegistry.registerComponent('ReactWorkshop', () => ReactWorkshop);
