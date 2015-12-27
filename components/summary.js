'use strict';

var React = require('react-native');
var _ = require('lodash');

var {
  StyleSheet,
  ListView,
  Text,
  View,
} = React;

var PropTypes = React.PropTypes;

var Summary = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    var groupedExpenses = _.groupBy(this.props.expenses, this.props.groupBy);
    var expenseData = _.map(groupedExpenses, (val, key) => {
      return {
        groupName: key,
        total: _.sum(val, (item) => item.expense)
      }
    });

    return {
      dataSource: ds.cloneWithRows(expenseData)
    };
  },
  renderRow(rowData) {
    return (
      <View style={styles.row}>
        <Text>{rowData.groupName}</Text>
        <Text>{rowData.total}</Text>
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

module.exports = Summary;
