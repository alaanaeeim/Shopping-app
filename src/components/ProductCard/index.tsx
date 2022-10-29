/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
interface IProductCard {
  item: any;
  type: string;
  navigation: any;
}

const ProductCard = ({item, navigation, type}: IProductCard) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductInfo', {productID: item.id, type: type})
      }
      style={styles.container}>
      <View style={styles.containerCard}>
        {item.isOff ? (
          <View style={styles.percentage}>
            <Text style={styles.percentageText}>{item.offPercentage}%</Text>
          </View>
        ) : null}
        <Image source={item.productImage} style={styles.image} />
      </View>
      <Text style={styles.productName}>{item.productName}</Text>
      {type === 'accessories' && (
        <View style={styles.containerStatus}>
          <FontAwesome
            name="circle"
            style={{
              fontSize: 12,
              marginRight: 6,
              color: item.isAvailable ? COLORS.green : COLORS.red,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              color: item.isAvailable ? COLORS.green : COLORS.red,
            }}>
            Available
          </Text>
        </View>
      )}
      <Text>$ {item.productPrice}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.44,
    marginVertical: 14,
    marginEnd: 10,
  },
  containerCard: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    backgroundColor: COLORS.backgroundLight,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  percentage: {
    position: 'absolute',
    width: '20%',
    height: '24%',
    backgroundColor: COLORS.green,
    top: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 2,
  },
  containerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
});
