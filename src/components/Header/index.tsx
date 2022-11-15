import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {COLORS} from '../../constants/Colors';

interface IHomeProps {
  navigation: any;
}

const Header = ({navigation}: IHomeProps) => {
  const productsStore = useSelector((state: any) => state.product);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconsContainer}>
        <Entypo name="shopping-bag" style={styles.icons} />
      </TouchableOpacity>
      <View style={styles.cartContainer}>
        <TouchableOpacity
          style={styles.iconsContainer}
          onPress={() => navigation.navigate('MyCart')}>
          <MaterialCommunityIcons name="cart" style={styles.icons} />
          <View style={styles.cartCount}>
            <Text style={styles.count}>{productsStore?.products?.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconsContainer: {
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1.2,
    borderColor: COLORS.backgroundLight,
  },
  icons: {
    fontSize: 18,
    color: COLORS.backgroundMedium,
    padding: 12,
  },
  cartContainer: {
    position: 'relative',
  },
  cartCount: {
    position: 'absolute',
    top: -5,
    left: -8,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});
