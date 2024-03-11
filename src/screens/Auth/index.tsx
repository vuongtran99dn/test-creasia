import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import styles from './styles';
import api from '../../services';
import {mainContext} from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from '../../functions/index.ts';

const Auth = ({navigation}) => {
  const [username, setUsername] = useState('001A');
  const [password, setPassword] = useState('123456');
  const {state, setState} = useContext(mainContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ĐĂNG NHẬP</Text>
      <Text style={styles.textContent}>Đăng nhập hệ thống</Text>
      <View style={styles.textInputWrap}>
        <TextInput
          placeholder="Username"
          placeholderTextColor={'gray'}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.textInputWrap}>
        <TextInput
          placeholder="Password"
          placeholderTextColor={'gray'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.buttonWrap}>
        <TouchableOpacity style={styles.fogotpasswordButton}>
          <Text style={styles.fogotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            api
              .post('api/auth', {username: username, password: password})
              .then(response => {
                if (response.data.code === 200) {
                  setState({token: response.data.token});
                  AsyncStorage.setItem('TOKEN', response.data.token);
                } else {
                  showMessage(response.data.message);
                }
              })
              .catch(error => {
                console.log(error.message);
              });
          }}>
          <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Auth;
