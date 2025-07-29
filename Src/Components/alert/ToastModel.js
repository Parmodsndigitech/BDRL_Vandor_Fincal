
import Toast from 'react-native-toast-message';

data = {
  warning: {
    type: 'error',
    text1: 'Warning'
  },
  error: {
    type: 'error',
    text1: 'Error'
  },
  success: {
    type: 'success',
    text1: 'Success'
  },
  info: {
    type: 'info',
    text1: 'Info'
  }
}

export const ToastModel = (props) => {
  const {
    type = 'success',
    text2 = 'This is some something 👋'
  } = props;
  Toast.show({
    type: data[type].type,
    text1: data[type].text1,
    text2: text2
  });
}
