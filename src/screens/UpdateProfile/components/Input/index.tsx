import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {Controller} from 'react-hook-form';

interface contentProp {
  type: 'input' | 'button' | 'dropdown' | 'gender';
  placeholder?: string;
  value?: any;
  onChange?: (value: string) => void;
  onPress?: () => void;
  listItem?: string[];
}

interface inputProps {
  type: 'input' | 'button' | 'dropdown' | 'gender';
  placeholder?: string;
  onPress?: () => void;
  title: string;
  control: any;
  errors: any;
  name: string;
  required?: boolean;
  listItem?: string[];
}

const genderData = [
  {id: 1, text: 'Nam'},
  {id: 0, text: 'Nữ'},
];

const Content: React.FC<contentProp> = ({
  type,
  placeholder,
  value,
  onChange,
  onPress,
  listItem,
}) => {
  const [isExpand, setIsExpand] = useState(false);
  switch (type) {
    case 'input': {
      return (
        <View style={styles.inputWrap}>
          <TextInput
            value={value}
            placeholder={placeholder}
            onChangeText={onChange}
            style={styles.textInput}
          />
        </View>
      );
    }
    case 'button': {
      return (
        <TouchableOpacity style={styles.inputButtonWrap} onPress={onPress}>
          <Text style={styles.inputButtonValue}>{value}</Text>
          <Text>🔽</Text>
        </TouchableOpacity>
      );
    }
    case 'gender': {
      return (
        <View style={{flexDirection: 'row'}}>
          {genderData.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.inputGenderWrap,
                  value == item.id ? {borderColor: 'blue'} : {},
                ]}
                onPress={() => {
                  onChange && onChange(item.id.toString());
                }}>
                <Text
                  style={[
                    styles.inputButtonValue,
                    value == item.id ? {color: 'blue', fontWeight: 'bold'} : {},
                  ]}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
    case 'dropdown': {
      return (
        <View style={styles.inputDropdownContainer}>
          <TouchableOpacity
            style={styles.inputDropdownWrap}
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
              setIsExpand(!isExpand);
            }}>
            <Text style={styles.inputButtonValue}>{value}</Text>
            <Text>🔽</Text>
          </TouchableOpacity>
          {isExpand && (
            <View>
              {listItem?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    LayoutAnimation.easeInEaseOut();
                    onChange && onChange(item);
                    setIsExpand(false);
                  }}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      );
    }
  }
};
const Input: React.FC<inputProps> = ({
  type = 'input',
  placeholder,
  title,
  control,
  errors,
  name,
  required,
  listItem,
  onPress,
}) => {
  return (
    <Controller
      control={control}
      rules={{
        required: required,
      }}
      render={({field: {onChange, value}}) => (
        <View style={styles.container}>
          <Text style={styles.title}>
            {title}
            {required ? '*' : ''}
          </Text>
          <View style={{flex: 2}}>
            <Content
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              listItem={listItem}
              onPress={onPress}
            />
            {errors[name] && errors[name]?.message !== '' ? (
              <Text>{errors[name].message}</Text>
            ) : null}
          </View>
        </View>
      )}
      name={name}
    />
  );
};

export default Input;
