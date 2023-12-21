import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef, useState, useCallback, useMemo, } from 'react';
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
  Alert,
} from 'react-native';
import { Offer, Product, User } from '../../model';
import { color } from '../../assets/misc/colors';
import { fontSize } from '../../assets/misc/others';
import Slider from '@react-native-community/slider';
import CustoButton from '../components/CustoButton';
import { useGet_productQuery } from '../services/api/productApiSlice';
import { useSend_cash_offerMutation } from '../services/api/offerSlice';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomModal from '../components/BottomModal';
// import TradeListItem from './TradeListItem';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../services/features/userSlice';



const { width, height } = Dimensions.get('screen')


const ProductDetails2 = () => {
  const user: User = useSelector(selectCurrentUser)
  const navigator = useNavigation<NavigationProp<any>>()
  const { params } = useRoute()
  const product: Product = params['data']
  const [send_cash_offer, { isLoading: is_loadingOffer, data }] = useSend_cash_offerMutation()
  const { isLoading, data: product_data, isError, error } = useGet_productQuery({ product_id: product._id, owner_id: product.owner_id })
  const [offeredPrice, setofferedPrice] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  // const percentage = (offeredPrice / 3800) * 100
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '95%',], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index < 1) { setIsOpen(false) }
  }, []);

  if (isLoading) {
    return <View style={{
      backgroundColor: color.NEW_BACKGROUND_COLOR,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text
        style={{
          backgroundColor: 'rgba(0,0,0, 0.7)',
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 5,
          color: '#fff'
        }}
      >
        Getting Product Details
      </Text>
    </View>
  }

  if (isError) {
    return <View style={{
      backgroundColor: color.NEW_BACKGROUND_COLOR,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text
        style={{
          backgroundColor: 'rgba(0,0,0, 0.7)',
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 5,
          color: '#fff'
        }}
      >Something went wrong</Text>
    </View>
  }
  const { product_owner, product: product_ } = product_data

  const img: {
    _id: number;
    image: string;
  }[] = product_.images as any



  const handle_cash_offer = async () => {
    if (offeredPrice < 1) return Alert.alert('Please swipe to increase offer')
    const offered_data = {
      price_offered: offeredPrice,
      product_id: product_data.product._id
    }
    try {
      const res: Offer = await send_cash_offer(offered_data).unwrap()
      if (res.success) {
        // console.log(res)
      }
    } catch (error) {
      console.log("error", error)
    }
  }
  const handle_swap_offer = async () => {
    // if(offeredPrice < 1) return Alert.alert('Please swipe to increase offer')
    // const offered_data = {
    //   price_offered: offeredPrice,
    //   product_id: product_data.product._id
    // }
    // try {
    //   const res: Offer = await send_cash_offer(offered_data).unwrap()
    //   if (res.success) {
    //     // console.log(res)
    //   }
    // } catch (error) {
    //   console.log("error", error)
    // }
  }

  return (
    <>
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
                        {product_.product_condition.toUpperCase()}
                      </Text>
                    </View>

                    {user._id === product_data.product_owner._id &&
                      (<TouchableOpacity
                        onPress={() => {
                          navigator.navigate('EditProduct')
                        }}
                        style={styles.editContainer}
                      >
                        <Text style={styles.infoText}>
                          Edit Product
                        </Text>
                      </TouchableOpacity>)}

                  </ImageBackground>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {img.map((image, imageIndex) => {
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
              navigator.navigate('SellerProfile', { data: product_data?.product_owner })
            }}
            style={{
              height: 50, width: 50, backgroundColor: 'purple',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50
            }}>
            {!product_data?.product_owner.avatar ?
              <Image
                style={{ height: '95%', width: '95%', borderRadius: 50 }}
                source={require('../../assets/images/profile.png')}
              />
              :
              <Image
                style={{ height: '95%', width: '95%', borderRadius: 50 }}
                source={{ uri: product_data?.product_owner.avatar }}
              />
            }
          </TouchableOpacity>

          <View>
            <Text style={{ fontWeight: '600', fontSize: 12 }}>{product_owner?.firstName} {product_owner?.lastName}</Text>
            <Text style={{ fontWeight: '600', fontSize: 12, color: 'gray' }}>{product_owner?.city} {product_owner?.state}</Text>
          </View>

          <TouchableOpacity style={{
            backgroundColor: 'rgb(216,191,216)',
            padding: 5, borderRadius: 10,
            height: 30,
            position: 'absolute',
            right: 20,
            top: 10,
            alignItems: 'center',
            justifyContent: 'center'

          }}>
            <Text style={{ fontSize: 12, fontWeight: '700', letterSpacing: 1 }}>FOLLOW SELLER</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.product_details}>
          <Text style={styles.product_title}>{product_.product_name}</Text>
          <Text style={styles.product_desc}>{product_.product_desc}</Text>
          <View style={styles.other_details}>
            <Text style={styles.left}>Product Value</Text>
            <Text style={styles.right}>₦{product_.product_price}</Text>
          </View>

          <View style={styles.other_details}>
            <Text style={styles.left}>Product Condition</Text>
            <Text style={styles.right}>{product_.product_condition.toUpperCase()}</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{fontWeight:'600', fontSize:14, textAlign:'center'}}>
            This {product_.product_name}is available for
             Trade with another Item
          </Text>
        </View>


        {product_data.product.deal_type === 'cash sale' && user._id !== product_data.product_owner._id &&
          (<View style={{ width, paddingHorizontal: 15, marginTop: 0 }}>
            <Text style={{ fontSize: fontSize.xm, paddingHorizontal: 15, fontWeight: '600', color: 'gray' }}>
              Move the slider to make an offer
            </Text>
            <Slider

              style={{ width: '100%' }}
              minimumValue={0}
              maximumValue={product_.product_price * 2}
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
          </View>)}

        <View style={{ paddingHorizontal: 30, width, position: 'absolute', bottom: 20 }}>

          {product_data.product.deal_type === 'cash sale' && user._id !== product_data.product_owner._id &&
            (<CustoButton
              disabled={is_loadingOffer}
              onPress={() => { handle_cash_offer() }}
              title={is_loadingOffer ? 'Sending offer...' : `Send Offer ${offeredPrice}`}
              color='purple'
            />)}

          {product_data.product.deal_type !== 'cash sale' && user._id !== product_data.product_owner._id &&
            (<CustoButton
              disabled={is_loadingOffer}
              onPress={() => {
                navigator.navigate('TradeListItem', { product_id: product_._id })
              }}
              title='Enter your item for trade'
              color='purple'
            />)}

        </View>
      </SafeAreaView>

      {/* {isOpen && (<GestureHandlerRootView style={{ backgroundColor: 'rgba(0,0,0, 0.5)', width, height, }}>
        <BottomSheet
          enablePanDownToClose
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"

        >
          <BottomSheetScrollView
          keyboardDismissMode={'interactive'}
          >
            <TradeListItem />
          </BottomSheetScrollView>

        </BottomSheet>
      </GestureHandlerRootView>)} */}
    </>
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
  editContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    padding: 50,
    paddingVertical: 8,
    borderRadius: 5,
    position: 'absolute',
    // right: 5,
    // top: 5
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