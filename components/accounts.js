'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ListView,
  Text,
  View,
} = React;

var PropTypes = React.PropTypes;
var EXPENSES = [
  {bankName: 'ICICI', expense: 102000},
  {bankName: 'HDFC', expense: 231400},
];

var Accounts = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    return {
      dataSource: ds.cloneWithRows(EXPENSES)
    };
  },
  renderRow(rowData) {
    return (
      <View style={styles.row}>
        <Text>{rowData.bankName}</Text>
        <Text>{rowData.expense}</Text>
      </View>
    )
  },
  render() {
    return <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            />;
  }
});

var styles = StyleSheet.create({
    row: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
});

module.exports = Accounts;
