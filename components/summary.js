'use strict';

var React = require('react-native');
var _ = require('lodash');
var Dropdown = require('react-native-dropdown-android');

var {
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableNativeFeedback
} = React;

var PropTypes = React.PropTypes;
const timePeriods = ['All Time', 'Last 30 Days', 'Last One Month', 'Last One Year'];

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
      dataSource: ds.cloneWithRows(expenseData),
      selectedTimePeriod: 0
    };
  },
  handleRowPress(arg1) {
    console.log('row pressed: ', arg1);
  },
  renderRow(rowData, sectionID, rowID, highlightRowFunc) {
    return (
      <View>
        <TouchableNativeFeedback
          onPress={this.handleRowPress}
          onHighlight={() => highlightRowFunc(sectionID, rowID)}
          onUnhighlight={() => highlightRowFunc(null, null)}
          >
          <View style={styles.row}>
            <Text>{rowData.groupName}</Text>
            <Text>{rowData.total}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  },
  handleTimeFilterChange(timePeriod) {
    this.setState({
      selectedTimePeriod: timePeriods.indexOf(timePeriod)
    });
  },
  getTotal() {
    return _.sum(this.props.expenses, (item) => item.expense)
  },
  render() {
    return (
      <View>
        <View style={styles.totalRow}>
          <Dropdown
            style={styles.dropdown}
            values={timePeriods}
            selected={this.state.selectedTimePeriod} onChange={this.handleTimeFilterChange} />
          <Text>{this.getTotal()}</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          />
      </View>
    )
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
    dropdown: {
      height: 20,
      width: 200
    },
    totalRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10
    }
});

module.exports = Summary;
