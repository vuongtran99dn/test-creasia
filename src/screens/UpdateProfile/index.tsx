import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './styles';
import {Input} from './components';
import {useForm} from 'react-hook-form';
import api from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {mainContext} from '../../../App';
import {showMessage} from '../../functions/index.ts';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {launchImageLibrary} from 'react-native-image-picker';

type formDataInfo = {
  avatar: string;
  name: string;
  code: string;
  location?: string;
  gender: 0 | 1;
  dateOfBirth?: string;
  CMND?: string;
  email: string;
  dateCreated?: string;
  phoneNumber?: string;
  placeCreated?: string;

  usename: string;
  password: string;
  confirmPassword: string;
};

const UpdateProfile = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
    setError,
    watch,
  } = useForm<formDataInfo>();

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const typePicker = useRef<'dateOfBirth' | 'dateCreated'>('dateOfBirth');

  const watchedAvatar = watch('avatar');

  const onSubmit = data => {
    const {password, confirmPassword} = data;
    if (password && password !== confirmPassword) {
      if (password && password !== confirmPassword) {
        setError('password', {
          type: 'validate',
          message: 'Mật khẩu không trùng khớp',
        });
        setError('confirmPassword', {
          type: 'validate',
          message: 'Mật khẩu không trùng khớp',
        });
        return;
      }
    }
    api
      .put('api/user', data)
      .then(res => {
        showMessage(res.data.message);
      })
      .catch(err => console.log(err.message));
  };
  const {setState} = useContext(mainContext);
  useEffect(() => {
    api
      .get('api/user')
      .then(res => {
        const {data} = res.data;
        Object.entries(data).map(([prop, val]) => {
          if (prop) {
            setValue(prop, val);
          }
        });
      })
      .catch(err => console.log(err.message));
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleHeader}>Cập nhật profile</Text>
          <TouchableOpacity
            hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
            onPress={() => {
              AsyncStorage.removeItem('TOKEN');
              setState({});
            }}>
            <Text>x</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 40}}>
          <Text style={styles.title}>Thông tin cá nhân</Text>
          <View style={styles.underline} />
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1}}>Photo</Text>
            <TouchableOpacity
              style={{flex: 2}}
              onPress={() => {
                launchImageLibrary({
                  mediaType: 'photo',
                  includeBase64: true,
                  maxWidth: 200,
                  maxHeight: 200,
                  quality: 0.2,
                })
                  .then(res => {
                    if (res.assets?.length) {
                      // console.log(res.assets[0]?.base64);
                      setValue('avatar', res.assets[0]?.base64 || '');
                    }
                  })
                  .catch(() => {});
              }}>
              <View style={styles.imageWrap}>
                {watchedAvatar ? (
                  <Image
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                    source={{
                      uri: 'data:image/png;base64,' + watchedAvatar,
                    }}
                  />
                ) : (
                  <Text>No Image</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <Input
            type="input"
            title="Tên nhân viên"
            required
            control={control}
            errors={errors}
            name={'name'}
          />

          <Input
            type="input"
            title="Mã NV"
            required
            control={control}
            errors={errors}
            name={'code'}
          />
          <Input
            type="dropdown"
            title="Vị trí"
            control={control}
            errors={errors}
            name={'location'}
            listItem={['0', '1', '2', '3']}
          />
          <Input
            type="gender"
            title="Giới tính"
            control={control}
            errors={errors}
            name={'gender'}
          />
          <Input
            type="button"
            title="Ngày sinh"
            control={control}
            errors={errors}
            name={'dateOfBirth'}
            onPress={() => {
              typePicker.current = 'dateOfBirth';
              setOpenDatePicker(true);
            }}
          />

          <Input
            type="input"
            title="Số CMND/CCCD"
            control={control}
            errors={errors}
            name={'CMND'}
          />
          <Input
            type="input"
            title="Email"
            control={control}
            errors={errors}
            name={'email'}
          />
          <Input
            type="button"
            title="Ngày cấp"
            control={control}
            errors={errors}
            name={'dateCreated'}
            onPress={() => {
              typePicker.current = 'dateCreated';
              setOpenDatePicker(true);
            }}
          />
          <Input
            type="input"
            title="Số điện thoại"
            control={control}
            errors={errors}
            name={'phoneNumber'}
          />
          <Input
            type="input"
            title="Nơi cấp"
            control={control}
            errors={errors}
            name={'placeCreated'}
          />
        </View>

        <View>
          <Text style={styles.title}>Thông tin cá nhân</Text>
          <View style={styles.underline} />
          <Input
            type="input"
            title="Tên đăng nhập"
            control={control}
            errors={errors}
            name={'username'}
          />
          <Input
            type="input"
            title="Mật khẩu"
            control={control}
            errors={errors}
            name={'password'}
          />
          <Input
            type="input"
            title="Nhập lại mật khẩu"
            control={control}
            errors={errors}
            name={'confirmPassword'}
          />
          <DatePicker
            modal
            locale="vi"
            title={'Chọn ngày'}
            confirmText="Xác nhận"
            cancelText="Hủy"
            open={openDatePicker}
            mode={'date'}
            date={
              getValues(typePicker.current)
                ? dayjs(getValues(typePicker.current), 'DD/MM/YYYY').toDate()
                : new Date()
            }
            onConfirm={date => {
              const dateString = dayjs(date).format('DD/MM/YYYY');
              setOpenDatePicker(false);
              setValue(typePicker.current, dateString);
            }}
            onCancel={() => {
              setOpenDatePicker(false);
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#0096FF',
            width: '40%',
            alignSelf: 'flex-end',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            marginTop: 50,
            borderRadius: 10,
          }}
          onPress={handleSubmit(onSubmit)}>
          <Text style={{color: 'white'}}>Câp nhật</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;
