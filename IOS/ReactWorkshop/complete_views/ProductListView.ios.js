/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native'),
    ProductListViewItem = require('./ProductListViewItem.ios'),
    ProductView = require('./ProductView.ios'),
    Utils = require('../lib/utils'),
    {
      StyleSheet,
      ListView,
      View,
      ActivityIndicatorIOS,
      TouchableHighlight,
    } = React;

var ProductListView = React.createClass({

  getInitialState () {
    return {
      searching: false,
      products: [],
      dataSource: this.getDataSource([]),
      page: 1
    };
  },

  getDataSource (data) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(data);
  },

  componentWillMount () {
    this.setState({
      products: this.props.products,
      dataSource: this.getDataSource(this.props.products)
    });
  },

  openProduct (product) {
    this.props.navigator.push({
      component: ProductView,
      title: 'Product',
      passProps: { product }
    });
  },

  renderRow (product) {
    return (
      <ProductListViewItem openProduct={this.openProduct} product={product} />
    );
  },

  getMoreItems () {
    var page = this.state.page + 1;
    var data = { query: this.props.searchTerm, page };
    this.setState({searching: true, page}, () => {
      Utils.getRequest(false, 'walmart/search', data, this.handleSearchResults);
    });
  },

  handleSearchResults (results) {
    var formatedResults = JSON.parse(results);
    var products = this.state.products.concat(formatedResults);
    this.setState({
      products,
      dataSource: this.getDataSource(products),
      searching: false
    });
  },

  render () {
    var searching = this.state.searching;
    var spinner = searching? <ActivityIndicatorIOS size="large" /> : <View />;

    return (
      <View style={{flex: 1}}>
        <ListView dataSource={this.state.dataSource}
          renderRow={this.renderRow} onEndReached={this.getMoreItems} />
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
});

module.exports = ProductListView;
