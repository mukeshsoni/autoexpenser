/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var AddExpense = require('./components/addexpense');
var Summary = require('./components/summary');
var Accounts = require('./components/accounts');
var ScrollableTabView = require('react-native-scrollable-tab-view');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  Dimensions,
} = React;

var SMS = 'Some random expense blah blah';

var autoexpenser = React.createClass({
  handleActionSelected(actionIndex) {
    console.log('action index: ', actionIndex);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          logo={require('./img/ic_launcher_mcube.png')}
          title="mcube"
          style={styles.toolbar}
          actions={[
            {
              title: 'Charts',
              icon: require('./img/ic_menu_charts.png'),
              show: 'always',
              showWithText: true
            },
            {
              title: 'New Expense',
              icon: require('./img/ic_action_add_expense.png'),
              show: 'always',
              showWithText: true
            },
          ]}
          onActionSelected={this.handleActionSelected} />
        <ScrollableTabView>
          <Summary
            tabLabel='Summary'
            />
          <Accounts
            tabLabel='Accounts'
            />
          <AddExpense
            tabLabel='Add Expense'
            sms={SMS}
            />
        </ScrollableTabView>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  toolbar: {
    backgroundColor: '#e9eaed',
    width: Dimensions.get('window').width - 30,
    height: 56,
  },
});

AppRegistry.registerComponent('autoexpenser', () => autoexpenser);
