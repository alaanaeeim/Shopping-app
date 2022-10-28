import React from 'react';
import {View, Text, Button} from 'react-native';
import styles from './styles';

interface IProductInfo {
  navigation: any;
}

const ProductInfo = ({navigation}: IProductInfo) => {
  return (
    <View style={styles.container}>
      <Text>ProductInfo</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default ProductInfo;
