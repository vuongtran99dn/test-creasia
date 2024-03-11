import {StyleSheet} from 'react-native';

const HEIGHT = 25;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  title: {flex: 1},
  inputWrap: {
    borderWidth: 0.25,
  },
  textInput: {
    padding: 0,
    margin: 0,
    height: HEIGHT,
  },
  inputButtonWrap: {
    borderWidth: 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    height: HEIGHT,
    paddingHorizontal: 5,
  },
  inputGenderWrap: {
    flex: 1,
    borderWidth: 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    height: HEIGHT,
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
  inputButtonValue: {flex: 1},
  inputDropdownContainer: {},
  inputDropdownWrap: {
    width: '100%',
    borderWidth: 0.25,
    height: HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
});

export default styles;
