import React from 'react';
import {View, Text, Button} from 'react-native';
import styles from './styles';

interface ICartProps {
  navigation: any;
}

const MyCart = ({navigation}: ICartProps) => {
  return (
    <View style={styles.container}>
      <Text>MyCart</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default MyCart;
