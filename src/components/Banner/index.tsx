//import liraries
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/Colors';

interface IHeaderProps {
  title: string;
  count: number;
  onPress?: () => {};
}

const Banner = ({title, count, onPress}: IHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.rightSideText}>
        <Text style={styles.productTitle}>{title}</Text>
        <Text style={styles.productsCount}>{count}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.seeAllProducts}>See All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  rightSideText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  productsCount: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '600',
    opacity: 0.5,
    marginLeft: 5,
    marginTop: 2,
    backgroundColor: COLORS.blue,
    padding: 2,
    borderRadius: 5,
    overflow: 'hidden',
  },
  seeAllProducts: {
    fontSize: 14,
    color: COLORS.blue,
    fontWeight: '500',
  },
});

export default Banner;
