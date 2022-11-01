import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {Items} from '../../constants/DataBase';
import styles from './styles';

interface ICartProps {
  navigation: any;
}

const MyCart = ({navigation}: ICartProps) => {
  const [products, setProducts] = useState<any[]>([]);

  const getItemsIDStored = async () => {
    const productsID = await AsyncStorage.getItem('cartItems');

    console.log('products ================> ', products);
  };

  useEffect(() => {
    console.log(
      'Items ===================================> ',
      Items[0]?.accessories,
    );
    setProducts(prev => [prev, ...Items[0]?.accessories]);
    setProducts(prev => [prev, ...Items[0]?.products]);

    getItemsIDStored();
  }, []);

  return (
    <View style={styles.container}>
      <Text>MyCart</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default MyCart;
