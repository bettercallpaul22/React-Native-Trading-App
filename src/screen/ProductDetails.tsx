import { Dimensions, Image, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useCallback, useState } from 'react'
import { color } from '../../assets/misc/colors';
import Animated from 'react-native-reanimated';
import { fontSize } from '../../assets/misc/others';
import Slider from '@react-native-community/slider';
import CustoButton from '../components/CustoButton';
import { useRoute } from "@react-navigation/native";
import { Product } from '../../model';
import { Header } from '../components/Header';



const { width } = Dimensions.get('screen');
interface DataProp { title: string, location: string, data: string, poster: string, params: any }

const ITEM_WIDTH = width * 0.82;
const ITEM_HEIGHT = ITEM_WIDTH * 1.1;


const ProductDetails: React.FC = () => {
  const { params } = useRoute()
  const product: Product = params['data']
  const { images } = params['data']
  const [offeredPrice, setofferedPrice] = useState(0)

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const percentage = (offeredPrice / 3800) * 100

  


  const img: {
    _id: number;
    image: string;
  }[] = images



  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      {/* <Header title={product.product_name} /> */}
      <Animated.FlatList
        contentContainerStyle={{}}
        style={{ height: ITEM_HEIGHT + 20, flexGrow: 0, marginTop:20 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={img}
        keyExtractor={(item, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
          const outputRange = [-width * 0.7, .0, width * 0.7]

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange
          })


          return <View style={{ width, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={styles.image_frame_container}
            >
              <View style={styles.image_container}>
                <Animated.Image
                  resizeMode='cover'
                  source={{ uri: item.image }}
                  style={[styles.image, { transform: [{ translateX }] }]}
                />

               {product.product_condition === 'Fairy Used' && (<Image
                  resizeMode='cover'
                  source={require('../../assets/images/used.jpg')}
                  style={{height:40, width:80, position:'absolute', right:3, top:3}}
                />)}

               {product.product_condition === 'New With Tag' && (<Image
                  // resizeMode='contain'
                  source={require('../../assets/images/new-tag.jpg')}
                  style={{height:35, width:50, position:'absolute', right:3, top:3}}
                />)}

               {product.product_condition === 'New' && (<Image
                  resizeMode='contain'
                  source={require('../../assets/images/new.png')}
                  style={{height:50, width:50, position:'absolute', right:3, top:3}}
                />)}

              </View>
            </View>
          </View>
        }}
      />

      <View style={styles.product_details}>
        <Text style={styles.product_title}>{product.product_name}</Text>
        <Text style={styles.product_desc}>{product.product_desc}</Text>
        <View style={styles.other_details}>
          <Text style={styles.left}>Product Value</Text>
          <Text style={styles.right}>₦{product.product_price}</Text>
        </View>

        <View style={styles.other_details}>
          <Text style={styles.left}>Product Condition</Text>
          <Text style={styles.right}>{product.product_condition}</Text>
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
      <View style={{ paddingHorizontal: 30, width, marginTop: 20 }}>

        <CustoButton
          onPress={() => { }}
          title={`Send Offer ${offeredPrice}`}
          color='purple'
        />
      </View>
    </View>

  )
}

export default ProductDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.NEW_BACKGROUND_COLOR,
    alignItems: 'center'
  },
  image_frame_container: {
    borderWidth: 5,
    borderColor: 'purple',
    elevation: 10,
    shadowColor: 'purple',
    shadowOffset: { height: 20, width: 0 },
    shadowOpacity: 2,
    shadowRadius: 20,
  },
  image_container: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
    overflow: 'hidden',
    alignItems: 'center'
  },
  image: {

    height: ITEM_HEIGHT,
    width: ITEM_WIDTH * 1.4,
    position: 'absolute',

  },


  product_details: {
    // backgroundColor: 'plum',
    height: 200,
    width,
    padding: 30,
    gap: 5,
    marginBottom: 20
  },
  product_title: {
    // backgroundColor: 'yellow',
    fontWeight: '700',
    fontSize: fontSize.lg
  },
  product_desc: {
    fontWeight: '700',
    fontSize: fontSize.sm,
    color: 'gray'
  },

  other_details: {
    // backgroundColor: 'plum',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth:1,
    borderBottomColor: 'purple',
    borderBottomWidth: 2,
    marginBottom: 5
  },
  left: {
    fontWeight: '500',
    fontSize: fontSize.sm
  },
  right: {
    fontWeight: '500',
    fontSize: fontSize.lg
  }



})