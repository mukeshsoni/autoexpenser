/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var AddExpense = require('./addexpense');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var SMS = 'Some random expense blah blah';

var autoexpenser = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <AddExpense
          sms={SMS}
          />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('autoexpenser', () => autoexpenser);
