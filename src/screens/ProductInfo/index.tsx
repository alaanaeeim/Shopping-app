/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
  Text,
  Platform,
} from 'react-native';
import {COLORS} from '../../constants/Colors';
import {allProducts, Items} from '../../constants/DataBase';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {addNewProduct} from '../../store/actions/ProductAction';
interface IProductInfo {
  navigation?: any;
  route?: any;
}

const ProductInfo = ({navigation, route}: IProductInfo) => {
  const [product, setProduct] = useState<any>();
  let dataSet = new Set<any>();

  const {height, width} = Dimensions.get('window');
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const dispatch = useDispatch();

  const productsStore = useSelector((state: any) => state.product);

  const getProductDetails = () => {
    const filteredArr = allProducts;
    const selectedProduct: any = filteredArr?.filter(
      (prod: any) => prod.id === route.params.productID,
    );
    setProduct(selectedProduct[0]);
  };

  const addToCart = async (prod: any) => {
    let itemArray: any = await AsyncStorage.getItem('cartItems');
    let cartProducts: any = await AsyncStorage.getItem('cartProducts');
    itemArray = JSON.parse(itemArray) || [];
    cartProducts = JSON.parse(cartProducts) || [];

    if (!itemArray.includes(prod?.id)) {
      itemArray.push(prod?.id);
      prod.count = 1;
      cartProducts.push(prod);
      await AsyncStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      dispatch(addNewProduct([...productsStore?.products, prod]));
    }

    await AsyncStorage.setItem('cartItems', JSON.stringify(itemArray));
    Toast.showWithGravity(
      'Item Added Successfully to cart',
      Toast.SHORT,
      Toast.TOP,
    );
    navigation.navigate('Home');
  };

  useEffect(() => {
    getProductDetails();
  });

  const generateGallery = () => {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              paddingTop: Platform.OS === 'ios' ? 50 : 10,
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
              keyExtractor={item => item}
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
                  key={item}
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
                marginTop: 25,
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
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 6,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 14,
              }}>
              <Entypo
                name="shopping-cart"
                style={{
                  fontSize: 18,
                  color: COLORS.blue,
                  marginRight: 6,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.black,
                }}>
                Shopping
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 4,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  letterSpacing: 0.5,
                  marginVertical: 4,
                  color: COLORS.black,
                  maxWidth: '84%',
                }}>
                {product?.productName}
              </Text>
              <TouchableOpacity style={{borderRadius: 100, overflow: 'hidden'}}>
                <Ionicons
                  name="link-outline"
                  style={{
                    fontSize: 24,
                    color: COLORS.blue,
                    backgroundColor: COLORS.blue + 10,
                    padding: 8,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: COLORS.black,
                fontWeight: '400',
                letterSpacing: 1,
                opacity: 0.5,
                lineHeight: 20,
                maxWidth: '85%',
                maxHeight: 44,
                marginBottom: 18,
              }}>
              {product?.description}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 14,
                borderBottomColor: COLORS.backgroundLight,
                borderBottomWidth: 1,
                paddingBottom: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: COLORS.backgroundLight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 12,
                    borderRadius: 100,
                    marginRight: 10,
                  }}>
                  <Entypo
                    name="location-pin"
                    style={{
                      fontSize: 16,
                      color: COLORS.blue,
                    }}
                  />
                </View>
                <Text> Rustaveli Ave 57,{'\n'}17-001, Batume</Text>
              </View>
              <Entypo
                name="chevron-right"
                style={{
                  fontSize: 22,
                  color: COLORS.backgroundDark,
                }}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 16,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  maxWidth: '85%',
                  color: COLORS.black,
                  marginBottom: 4,
                }}>
                $ {product?.productPrice}.00
              </Text>
              <Text>
                Tax Rate 2%~ ${product?.productPrice / 20} ($
                {product?.productPrice + product?.productPrice / 20})
              </Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            left: '10%',
            height: '6%',
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => (product?.isAvailable ? addToCart(product) : null)}
            style={{
              width: '100%',
              height: '90%',
              backgroundColor: COLORS.blue,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '700',
                letterSpacing: 1,
                color: COLORS.white,
                textTransform: 'uppercase',
              }}>
              {product?.isAvailable ? 'Add to cart' : 'Not Avialable'}
            </Text>
          </TouchableOpacity>
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
