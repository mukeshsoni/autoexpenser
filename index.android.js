/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var AddExpense = require('./js/components/addexpense');
var Summary = require('./js/components/summary');
var ScrollableTabView = require('react-native-scrollable-tab-view');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  Dimensions,
  BackAndroid,
  Navigator
} = React;

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

function handleAddExpenseAction() {
  console.log('add expense or delete clicked');
}

function handleActionSelected(actionIndex) {
console.log('action index: ', actionIndex);
  if(actionIndex === 1) {
    _navigator.push({
      name: 'addExpense'
    });
  }
}

function handleExpenseDetailChange(expenseDetails) {
  console.log('Expense details changed, ', expenseDetails);
}

function handleTabChange(selectedTab) {
  const tabs = ['summary', 'accounts'];
  console.log('tab changed to: ', selectedTab, tabs[selectedTab.i]);
  // _navigator.push({name: tabs[selectedTab.i]});
}

function getMainView(tabIndex, navigationOperations) {
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
        onActionSelected={handleActionSelected} />
      <ScrollableTabView
        initialPage={tabIndex}
        onChangeTab={handleTabChange}
        >
        <Summary
          navigator={navigationOperations}
          tabLabel='Summary'
          expenses={EXPENSES}
          groupBy='category'
          />
        <Summary
          navigator={navigationOperations}
          tabLabel='Accounts'
          expenses={EXPENSES}
          groupBy='bank'
          />
      </ScrollableTabView>
    </View>
  );
}

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
console.log('change in route: ', route);
  switch(route.name) {
    case 'addExpense':
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          logo={require('./img/ic_launcher_mcube.png')}
          title="mcube"
          style={styles.toolbar}
          actions={[
            {
              title: 'Delete',
              icon: require('./img/ic_menu_delete.png'),
              show: 'always',
              showWithText: true
            },
            {
              title: 'Save',
              icon: require('./img/ic_action_save_expense.png'),
              show: 'always',
              showWithText: true
            }
          ]}
          onActionSelected={handleAddExpenseAction} />
        <AddExpense
          sms={SMS}
          onChange={handleExpenseDetailChange}
          />
      </View>
    );
    case 'summary':
    return getMainView(0, navigationOperations);
    case 'accounts':
    return getMainView(1, navigationOperations);
  }
};

var SMS = 'Some random expense blah blah';
var EXPENSES = [
  {category: 'Jewellery', bank: 'ICICI', expense: 10000},
  {category: 'Grocery', bank: 'HDFC', expense: 1000},
  {category: 'Jewellery', bank: 'HDFC', expense: 24500},
  {category: 'Grocery', bank: 'HDFC', expense: 12390},
];

var autoexpenser = React.createClass({
  render: function() {
    var initialRoute = {name: 'summary'};
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbar: {
    backgroundColor: '#e9eaed',
    width: Dimensions.get('window').width - 30,
    height: 56,
  },
});

AppRegistry.registerComponent('autoexpenser', () => autoexpenser);
