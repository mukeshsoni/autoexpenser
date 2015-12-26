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
  NativeModules,
  ToolbarAndroid,
  Dimensions,
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
  handleActionSelected(actionIndex) {
    console.log('action index: ', actionIndex);
  },
  render: function() {
    return (
        <View style={styles.container}>
          <View style={styles.row}>
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
      onActionSelected={this.handleActionSelected} />
  </View>
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
        </View>
    );
  }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        padding: 10
    },
    row: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    toolbar: {
      backgroundColor: '#e9eaed',
      width: Dimensions.get('window').width - 30,
      height: 56,
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
