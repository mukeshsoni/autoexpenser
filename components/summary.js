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
  {category: 'Jewellery', expense: 10000},
  {category: 'Grocery', expense: 1000},
];

var Summary = React.createClass({
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
        <Text>{rowData.category}</Text>
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

module.exports = Summary;
