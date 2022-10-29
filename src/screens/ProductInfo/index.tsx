/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {COLORS} from '../../constants/Colors';
import {Items} from '../../constants/DataBase';
import Entypo from 'react-native-vector-icons/Entypo';
interface IProductInfo {
  navigation?: any;
  route?: any;
}

const ProductInfo = ({navigation, route}: IProductInfo) => {
  const [product, setProduct] = useState<any>();
  const products = Items[0]?.products;
  const accessories = Items[0]?.accessories;

  const {height, width} = Dimensions.get('window');
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);

  const getProductDetails = () => {
    const filteredArr =
      route?.params?.type === 'product' ? products : accessories;
    const selectedProduct: any = filteredArr?.filter(
      (prod: any) => prod.id === route.params.productID,
    );
    setProduct(selectedProduct[0]);
  };

  useEffect(() => {
    getProductDetails();
  });

  const generateGallery = () => {
    return (
      <View
        style={{
          paddingTop: 50,
          width: width,
          backgroundColor: COLORS.backgroundLight,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 4,
        }}>
        <View
          style={{
            width: width,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <View style={{borderRadius: 10, overflow: 'hidden'}}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 22,
                  color: COLORS.blue,
                  backgroundColor: COLORS.white,
                  padding: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          horizontal
          data={product?.productImageList}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.8}
          snapToInterval={width}
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          renderItem={({item}) => (
            <View
              style={{
                width: width,
                height: 240,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={item}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                }}
              />
            </View>
          )}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            marginTop: 32,
          }}>
          {product?.productImageList
            ? product?.productImageList.map((data: any, index: any) => {
                let opacity = position.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [0.2, 1, 0.2],
                  extrapolate: 'clamp',
                });
                return (
                  <Animated.View
                    key={index}
                    style={{
                      width: '16%',
                      height: 2.4,
                      backgroundColor: COLORS.black,
                      opacity,
                      marginHorizontal: 4,
                      borderRadius: 100,
                    }}></Animated.View>
                );
              })
            : null}
        </View>
      </View>
    );
  };

  return <View style={styles.container}>{generateGallery()}</View>;
};

export default ProductInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
