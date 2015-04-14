/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native'),
    Utils = require('../lib/utils'),
    ProductListView = require('./ProductListView.ios'),
    {
      StyleSheet,
      Text,
      View,
      Image,
      TextInput,
      TouchableHighlight,
      ActivityIndicatorIOS
    } = React;

var SearchView = React.createClass({

  getInitialState () {
    return {
      searchTerm: "",
      searching: false
    };
  },

  search () {
    var data = { query: this.state.searchTerm };
    this.setState({searching: true}, () => {
      Utils.getRequest(false, 'walmart/search', data, this.handleSearchResults);
    })
  },

  handleSearchResults (results) {
    var searchTerm = this.state.searchTerm;
    var formatedResults = JSON.parse(results);
    this.setState({searching: false}, () => {
      this.props.navigator.push({
        component: ProductListView,
        title: `Results For: ${searchTerm}`,
        passProps: { products: formatedResults, searchTerm },
      });
    });
  },

  updateTerm (searchTerm) {
    this.setState({searchTerm});
  },

  render () {
    var searching = this.state.searching;
    var spinner = !searching? <View /> : (
                    <ActivityIndicatorIOS size="large" style={{marginTop: 10}} />
                  );
    return (
      <View style={styles.container}>
        <Image source={require('image!walmart')} style={styles.icon} />
        <Text style={styles.title}>Search the Walmart API</Text>
        <TextInput value={this.state.searchTerm} style={styles.input}
          onChangeText={this.updateTerm} placeholder="Search Terms" />
        <TouchableHighlight onPress={this.search} underlayColor="#2980b9">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </View>
        </TouchableHighlight>
        {spinner}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 167,
    height: 70,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
  },
  button: {
    flex: 1,
    height: 30,
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#2c3e50',
    marginBottom: 5,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginHorizontal: 10,
  }
});

module.exports = SearchView;
