'use strict';

var React = require('react-native');
var Dropdown = require('react-native-dropdown-android');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  TouchableOpacity,
  NativeModules
} = React;

var PropTypes = React.PropTypes;
const BANKS = ['ICICI', 'HDFC'];
const CATEGORIES = ['Jewellery', 'Grocery'];

var AddExpense = React.createClass({
  getInitialState: function() {
    return {
      date: new Date(),
      selectedBank: 0,
      selectedCategory: 0,
      amount: 0,
      note: ''
    };
  },
  formatDate(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  },
  getDefaultProps: function() {
    return {
      banks: BANKS,
      categories: CATEGORIES
    };
  },
  handleBankChange(bank) {
    this.setState({
      selectedBank: this.props.banks.indexOf(bank)
    });
  },
  handleCategoryChange(category) {
    this.setState({
      selectedCategory: this.props.categories.indexOf(category)
    });
  },
  handleAmountChange(amount) {
    this.setState({amount});
  },
  handleNoteChange(note) {
    this.setState({note});
  },
  handleSaveClick() {

  },
  handleCancelClick(){

  },
  handleDateChange(year, month, day, forthfellow) {
    console.log('forth arg: ', forthfellow);
    this.setState({
      date: new Date(`${year}-${month}-${day}`)
    });
  },
  handleDatePickerClick: function () {
    NativeModules.DateAndroid.showDatepicker(function() {}, this.handleDateChange);
  },
  render: function() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Date</Text>
                <Text style={{fontSize: 20}}>{this.formatDate(this.state.date)}</Text>
                <TouchableOpacity onPress={this.handleDatePickerClick}>
                  <Text style={styles.instructions}>
                    Pick Date
                  </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Bank</Text>
                <Dropdown
                  style={styles.dropdown}
                  values={this.props.banks}
                  selected={this.state.selectedBank} onChange={this.handleBankChange} />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={this.handleAmountChange}
                  value={this.state.amount + ''}
                  keyboardType='numbers-and-punctuation'
                  />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Category</Text>
                <Dropdown
                  style={styles.dropdown}
                  values={this.props.categories}
                  selected={this.state.selectedCategory} onChange={this.handleCategoryChange} />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Notes</Text>
                <TextInput
                  style={styles.textInput}
                  multiline={true}
                  onChangeText={this.handleNoteChange}
                  value={this.state.note}
                  />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Sms</Text>
                <Text>{this.props.sms}</Text>
            </View>
              <TouchableHighlight
                onPress={this.handleSaveClick}>
                  <Text>Save</Text>
              </TouchableHighlight>
        </View>
    );
  }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
    },
    row: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    label: {
      fontSize: 30
    },
    dropdown: {
      height: 20,
      width: 200
    },
    textInput: {
      width: 200,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1
    },
    button: {
      color: '#ffffff',
      marginBottom: 7,
      borderRadius: 2
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      margin: 5,
    },
});

module.exports = AddExpense;
