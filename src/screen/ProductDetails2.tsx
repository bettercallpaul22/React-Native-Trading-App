import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../../model';
import { color } from '../../assets/misc/colors';
import { fontSize } from '../../assets/misc/others';
import Slider from '@react-native-community/slider';
import CustoButton from '../components/CustoButton';



const { width } = Dimensions.get('screen')


const ProductDetails2 = () => {
  const navigator = useNavigation<NavigationProp<any>>()
  const { params } = useRoute()
  const product: Product = params['data']
  const { images } = params['data']
  const [offeredPrice, setofferedPrice] = useState(0)
  const percentage = (offeredPrice / 3800) * 100

  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  const img: {
    _id: number;
    image: string;
  }[] = images


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ], { useNativeDriver: false })}
          scrollEventThrottle={1}>
          {img.map((image, imageIndex) => {
            return (
              <View style={{ width: windowWidth, height: 250 }} key={imageIndex}>
                <ImageBackground source={{ uri: image.image }} style={styles.card}>
                  <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {product.product_condition.toUpperCase()}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { width }]}
              />
            );
          })}
        </View>
      </View>
      <View style={{
        width,
        paddingHorizontal: 20,
        flexDirection: 'row',
        gap: 10,
        borderBottomWidth: 1,
        borderColor: 'purple',
        alignItems: 'center',
        paddingBottom: 5
      }}
      >
        <TouchableOpacity
          onPress={() => {
            navigator.navigate('Profile')
          }}
          style={{
            height: 50, width: 50, backgroundColor: 'purple',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50
          }}>
          <Image
            style={{ height: '95%', width: '95%', borderRadius: 50 }}
            source={require('../../assets/images/profile.png')}
          />
        </TouchableOpacity>

        <View>
          <Text style={{ fontWeight: '600', fontSize: 12 }}>John doe</Text>
          <Text style={{ fontWeight: '600', fontSize: 12, color: 'gray' }}>lagos Nigeria</Text>
        </View>

        <TouchableOpacity style={{
          backgroundColor: 'rgb(216,191,216)',
          padding: 5, borderRadius: 10,
          height: 30,
          position: 'absolute',
          right: 20,
          top: 10,
          alignItems:'center',
          justifyContent:'center'

        }}>
          <Text style={{ fontSize: 12, fontWeight: '700', letterSpacing: 1 }}>FOLLOW SELLER</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.product_details}>
        <Text style={styles.product_title}>{product.product_name}</Text>
        <Text style={styles.product_desc}>{product.product_desc}</Text>
        <View style={styles.other_details}>
          <Text style={styles.left}>Product Value</Text>
          <Text style={styles.right}>₦{product.product_price}</Text>
        </View>

        <View style={styles.other_details}>
          <Text style={styles.left}>Product Condition</Text>
          <Text style={styles.right}>{product.product_condition.toUpperCase()}</Text>
        </View>
      </View>

      <View style={{ width, paddingHorizontal: 15, marginTop: 0 }}>
        <Text style={{ fontSize: fontSize.xm, paddingHorizontal: 15, fontWeight: '600', color: 'gray' }}>
          Move the slider to make an offer
        </Text>
        <Slider

          style={{ width: '100%' }}
          minimumValue={0}
          maximumValue={product.product_price * 2}
          minimumTrackTintColor="purple"
          maximumTrackTintColor="#000"
          focusable
          // lowerLimit={20}
          step={10}
          thumbTintColor='purple'
          onValueChange={(e) => {
            setofferedPrice(e)
          }}
        />
        {/* <Text
          style={[{
            left: `${percentage.toString()}%`,
            position: 'absolute',
            top: 10
          }, styles.left]}
        >
          {offeredPrice}
        </Text> */}
      </View>
      <View style={{ paddingHorizontal: 30, width, position: 'absolute', bottom: 20 }}>

        <CustoButton
          onPress={() => { }}
          title={`Send Offer ${offeredPrice}`}
          color='purple'
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',

    backgroundColor: color.NEW_BACKGROUND_COLOR,
    paddingTop: 20,
  },
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    position: 'absolute',
    right: 5,
    top: 5
  },
  infoText: {
    color: 'white',
    fontSize: fontSize.xm,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },



  product_details: {
    // backgroundColor: 'lightblue',
    height: 200,
    width: '100%',
    padding: 20,
    gap: 5,
    // marginBottom: 20
  },
  product_title: {
    // backgroundColor: 'yellow',
    fontWeight: '700',
    fontSize: fontSize.lg
  },
  product_desc: {
    fontWeight: '700',
    fontSize: fontSize.sm,
    color: 'gray',
    marginBottom: 10
  },

  other_details: {
    // backgroundColor: 'plum',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth:1,
    borderBottomColor: 'purple',
    borderBottomWidth: 0.8,
    marginBottom: 10
  },
  left: {
    fontWeight: '500',
    fontSize: fontSize.xm
  },
  right: {
    fontWeight: '500',
    fontSize: fontSize.xm
  }
});

export default ProductDetails2;