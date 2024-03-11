import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  textContent: {
    alignSelf: 'flex-start',
    fontWeight: '300',
    color: 'black',
    fontSize: 16,
    marginBottom: 20,
  },
  textInputWrap: {
    borderRadius: 2,
    width: '100%',
    borderColor: 'gray',
    backgroundColor: 'white',
    marginBottom: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 1,
  },
  buttonWrap: {flexDirection: 'row', justifyContent: 'space-between'},
  fogotpasswordButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fogotPasswordText: {
    textDecorationLine: 'underline',
    color: 'black',
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#E97451',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
});
export default styles;
