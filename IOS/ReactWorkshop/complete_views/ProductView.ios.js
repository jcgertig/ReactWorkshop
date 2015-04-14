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
      ScrollView
    } = React;

var ProductView = React.createClass({

  render () {
    var product = this.props.product;

    return (
      <ScrollView style={{overflow:'hidden'}}
        contentContainerStyle={styles.container}>
        <View style={styles.imageWrapper} >
          <Image style={styles.icon} source={{uri: product.thumbnail_image}} />
        </View>
        <View style={[styles.icon]}>
          <Text>{product.name}</Text>
          <Text>{`$${product.price}`}</Text>
        </View>
        <View style={styles.section}>
          <Text>{product.short_description}</Text>
        </View>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
    alignItems: 'center',
  },
  imageWrapper: {
    flex: 3,
    width: 300
  },
  icon: {
    flex: 1,
  },
  section: {
    flex: 4,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#7f8c8d',
    marginBottom: 10,
  }
});

module.exports = ProductView;
