import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  titleHeader: {
    fontSize: 18,
    color: '#E97451',
  },
  close: {},
  title: {fontWeight: 'bold', marginBottom: 2},
  underline: {height: 0.5, backgroundColor: 'gray', marginBottom: 10},
  imageWrap: {height: 100, width: 100, borderWidth: 1},
});
export default styles;
