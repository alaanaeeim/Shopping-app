import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants/Colors';

interface IHomeProps {
  navigation: any;
}

const Header = ({navigation}: IHomeProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconsContainer}>
        <Entypo name="shopping-bag" style={styles.icons} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconsContainer}
        onPress={() => navigation.navigate('MyCart')}>
        <MaterialCommunityIcons name="cart" style={styles.icons} />
      </TouchableOpacity>
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
});
