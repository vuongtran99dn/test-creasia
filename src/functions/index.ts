import Toast from 'react-native-simple-toast';

export const showMessage = message => {
  Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
};
