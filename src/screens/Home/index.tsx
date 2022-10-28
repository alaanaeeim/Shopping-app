import React from 'react';
import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native';
import Banner from '../../components/Banner';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import {COLORS} from '../../constants/Colors';
import {Items} from '../../constants/DataBase';

interface IHomeProps {
  navigation: any;
}

const Home = ({navigation}: IHomeProps) => {
  return (
    <>
      <View style={styles.statusBar} />
      <StatusBar backgroundColor={COLORS.black} barStyle="dark-content" />
      <View style={styles.container}>
        <Header navigation={navigation} />
        <View>
          <View style={styles.continerTitle}>
            <Text style={styles.title1}>Hi-Fi Shop &amp; Service</Text>
            <Text style={styles.desc}>
              Audio shop on Rustaveli Ave 57.
              {'\n'}This shop offers both products and services
            </Text>
          </View>
        </View>
        <View>
          <Banner title="Products" count={41} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Items[0]?.products}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ProductCard item={item} navigation={navigation} type="product" />
            )}
          />
        </View>
        <View style={{flex: 1}}>
          <Banner title="Accessories" count={21} />
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={Items[0]?.accessories}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ProductCard
                item={item}
                navigation={navigation}
                type="accessories"
              />
            )}
          />
        </View>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17,
    backgroundColor: COLORS.white,
  },
  statusBar: {
    height: 50,
    backgroundColor: COLORS.white,
  },
  continerTitle: {
    paddingVertical: 16,
  },
  title1: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '400',
    letterSpacing: 1,
    lineHeight: 20,
  },
});