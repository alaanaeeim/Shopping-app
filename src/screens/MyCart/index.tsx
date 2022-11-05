/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../../constants/Colors';
import {allProducts} from '../../constants/DataBase';

interface ICart {
  navigation: any;
}

const MyCart = ({navigation}: ICart) => {
  const [product, setProduct] = useState<any>();
  const [total, setTotal] = useState<any>();

  useEffect(() => {
    getDataFromDB();
  }, [navigation]);

  //get data from local DB by ID
  const getDataFromDB = async () => {
    let items: any = await AsyncStorage.getItem('cartItems');
    let cartProducts: any = await AsyncStorage.getItem('cartProducts');

    items = JSON.parse(items) || [];
    cartProducts = JSON.parse(cartProducts) || [];

    let productData: any[] = [];
    if (items) {
      allProducts.forEach((data: any) => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setProduct(cartProducts);
      getTotal(cartProducts);
    } else {
      setProduct(false);
      getTotal(false);
    }
  };

  const increaseDecreaseProcutCount = async (
    prod: any,
    index: number,
    action: boolean,
  ) => {
    let items: any = await AsyncStorage.getItem('cartItems');
    let cartProducts: any = await AsyncStorage.getItem('cartProducts');
    items = JSON.parse(items) || [];
    cartProducts = JSON.parse(cartProducts) || [];

    if (action) {
      cartProducts[index].count += 1;
    } else {
      if (prod.count <= 1) {
        cartProducts.splice(index, 1);
      } else {
        cartProducts[index].count -= 1;
      }
    }

    await AsyncStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    let cartProductsAfterUpdates: any = await AsyncStorage.getItem(
      'cartProducts',
    );
    cartProductsAfterUpdates = JSON.parse(cartProductsAfterUpdates) || [];
    setProduct(cartProductsAfterUpdates);
    getTotal(cartProductsAfterUpdates);
  };

  //get total price of all items in the cart
  const getTotal = (productsData: any) => {
    let totalAmount = 0;
    for (var i = 0; i < productsData.length; i++) {
      let productPrice = productsData[i].productPrice;
      totalAmount = totalAmount + productPrice * productsData[i].count;
    }
    setTotal(totalAmount);
  };

  //remove data from Cart
  const removeItemFromCart = async (id: any) => {
    let itemArray: any = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);

    let cartProducts: any = await AsyncStorage.getItem('cartProducts');
    cartProducts = JSON.parse(cartProducts) || [];

    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] === id) {
          array.splice(index, 1);
          cartProducts.splice(index, 1);
        }

        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        await AsyncStorage.setItem(
          'cartProducts',
          JSON.stringify(cartProducts),
        );

        getDataFromDB();
      }
    }
  };

  //checkout
  const checkOut = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      return error;
    }
    navigation.navigate('Home');
  };

  const renderProducts = (data: any, index: number) => {
    return (
      <TouchableOpacity
        key={data.id.toString()}
        onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}
        style={{
          width: '100%',
          height: 100,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '30%',
            height: 100,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
          }}>
          <Image
            source={data.productImage}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <View>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: COLORS.black,
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              {data.productName}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                }}>
                ${data.productPrice}
              </Text>
              <Text>
                (~$
                {data.productPrice + data.productPrice / 20})
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => increaseDecreaseProcutCount(data, index, false)}
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLORS.backgroundMedium,
                  opacity: 0.5,
                }}>
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: COLORS.backgroundDark,
                  }}
                />
              </TouchableOpacity>
              <Text>{data?.count}</Text>
              <TouchableOpacity
                onPress={() => increaseDecreaseProcutCount(data, index, true)}
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLORS.backgroundMedium,
                  opacity: 0.5,
                }}>
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLORS.backgroundDark,
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.backgroundLight,
                borderRadius: 100,
              }}
              onPress={() => removeItemFromCart(data.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLORS.backgroundDark,
                  padding: 8,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.white,
        position: 'relative',
      }}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingTop: 16,
              paddingHorizontal: 16,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.backgroundLight,
                borderRadius: 12,
              }}
              onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLORS.backgroundDark,
                  padding: 12,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.black,
                fontWeight: '500',
              }}>
              Order Details
            </Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              color: COLORS.black,
              fontWeight: '500',
              letterSpacing: 1,
              paddingTop: 20,
              paddingLeft: 16,
              marginBottom: 10,
            }}>
            My Cart
          </Text>
          <View style={{paddingHorizontal: 16}}>
            {product ? product.map(renderProducts) : null}
            {total === 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  backgroundColor: COLORS.backgroundLight,
                  borderRadius: 10,
                  padding: 10,
                }}>
                <View
                  style={{
                    borderRadius: 100,
                    overflow: 'hidden',
                    padding: 25,
                    backgroundColor: COLORS.white,
                  }}>
                  <MaterialCommunityIcons
                    name="cart-outline"
                    style={{fontSize: 50, color: COLORS.red}}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: COLORS.backgroundDark,
                      fontWeight: '500',
                      marginBottom: 10,
                    }}>
                    Your Shopping Cart Is Empty
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '500',
                        color: COLORS.blue,
                      }}>
                      See Recommendation
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          <View>
            <View
              style={{
                paddingHorizontal: 16,
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                  marginBottom: 20,
                }}>
                Delivery Location
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
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
                      borderRadius: 10,
                      marginRight: 18,
                    }}>
                    <MaterialCommunityIcons
                      name="truck-delivery-outline"
                      style={{
                        fontSize: 18,
                        color: COLORS.blue,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: COLORS.black,
                        fontWeight: '500',
                      }}>
                      2 Petre Melikishvili St.
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: COLORS.black,
                        fontWeight: '400',
                        lineHeight: 20,
                        opacity: 0.5,
                      }}>
                      0162, Tbilisi
                    </Text>
                  </View>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  style={{fontSize: 22, color: COLORS.black}}
                />
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                  marginBottom: 20,
                }}>
                Payment Method
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
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
                      borderRadius: 10,
                      marginRight: 18,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '900',
                        color: COLORS.blue,
                        letterSpacing: 1,
                      }}>
                      VISA
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: COLORS.black,
                        fontWeight: '500',
                      }}>
                      Visa Classic
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: COLORS.black,
                        fontWeight: '400',
                        lineHeight: 20,
                        opacity: 0.5,
                      }}>
                      ****-9092
                    </Text>
                  </View>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  style={{fontSize: 22, color: COLORS.black}}
                />
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                marginTop: 40,
                marginBottom: 80,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                  marginBottom: 20,
                }}>
                Order Info
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: COLORS.black,
                    opacity: 0.5,
                  }}>
                  Subtotal
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: COLORS.black,
                    opacity: 0.8,
                  }}>
                  ${total}.00
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 22,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: COLORS.black,
                    opacity: 0.5,
                  }}>
                  Shipping Tax
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: COLORS.black,
                    opacity: 0.8,
                  }}>
                  ${total / 20}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: COLORS.black,
                    opacity: 0.5,
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: COLORS.black,
                  }}>
                  ${total + total / 20}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            bottom: 10,
            height: '6%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => (total !== 0 ? checkOut() : null)}
            style={{
              width: '86%',
              height: '90%',
              backgroundColor:
                total !== 0 ? COLORS.blue : COLORS.backgroundLight,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLORS.backgroundMedium,
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                letterSpacing: 1,
                color: total !== 0 ? COLORS.white : COLORS.black,
              }}>
              CHECKOUT (${total + total / 20} )
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MyCart;
