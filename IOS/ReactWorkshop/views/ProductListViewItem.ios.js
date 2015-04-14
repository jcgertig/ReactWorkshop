/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native'),
    {
      StyleSheet,
      View,
      Text,
      Image,
      TouchableHighlight
    } = React;

var ProductListViewItem = React.createClass({

  openProduct () {
    this.props.openProduct(this.props.product);
  },

  render () {
    var product = this.props.product;

    return (
      <TouchableHighlight onPress={this.openProduct} underlayColor="rgba(0,0,0,0)">
        <View style={styles.container}>
          <View style={styles.imageWrapper} >
            <Image style={styles.icon} source={{uri: product.thumbnail_image}} />
          </View>
          <Text style={styles.text}>{product.name}</Text>
        </View>
      </TouchableHighlight >
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    flex: 1,
    flexDirection: 'row',
    height: 90,
    paddingVertical: 5,
  },
  imageWrapper: {
    flex: 3,
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
  text: {
    flex: 7,
  },
});

module.exports = ProductListViewItem;
