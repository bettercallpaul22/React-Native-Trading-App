import { Button, Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { color } from '../../assets/misc/colors'
import { fontSize } from '../../assets/misc/others'
import { Entypo } from '@expo/vector-icons';
import ProductCardList from '../components/ProductCardList';
import { ScrollView } from 'react-native-virtualized-view'
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../services/features/userSlice';
import { User } from '../../model';
import UserProductCard from '../components/UserProductCard';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'
import { manipulateAsync, ActionResize, SaveFormat } from 'expo-image-manipulator';
import CustoButton from '../components/CustoButton';

const { width } = Dimensions.get('screen')

const EditProfile = () => {
  const user: User = useSelector(selectCurrentUser)
  const [bio, seTbio] = useState(user.lastName)
  const [image, setImage] = useState(user.avatar);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const compressedImage: any = await manipulateAsync(result.assets[0].uri, [],
      { compress: 0.5, format: SaveFormat.JPEG },)
    setImage(compressedImage)
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

  };









  return (
    <View style={styles.container}>
      {/* {<View style={styles.follow_container} >
        <TouchableOpacity style={{ backgroundColor: 'rgb(216,191,216)', padding: 5, borderRadius: 10 }}>
          <Text style={{ fontSize: 12, fontWeight: '600', letterSpacing: 1 }}>FOLLOWING</Text>
        </TouchableOpacity>
        <Entypo name="mail" size={24} color="black" />
      </View>} */}

      <View style={{ alignItems: 'center', gap: 5, padding: 20 }}>
        <View style={styles.image_container}>
          {
            image ? <Image style={styles.image} source={{ uri: image }} />
              :
              <Image style={styles.image} source={require('../../assets/images/profile.png')} />
          }

          <TouchableOpacity
            onPress={pickImage}
            style={{
              position: 'absolute',
              right: -16,
              bottom: 30

            }}
          >
            <FontAwesome name="edit" size={36} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profile_name}>{user.firstName.toUpperCase()} {user.lastName.toUpperCase()}</Text>

        <View style={styles.location_container}>
          <Entypo name="location-pin" size={24} color="gray" />
          <Text style={{ fontWeight: '600', color: 'gray' }}>{user.city} {user.state} {user.country}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 20, width: '100%', }}>

          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={{ fontWeight: '600' }}>1,200</Text>
            <Text style={{ fontWeight: '600', color: 'gray' }}>Following</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={{ fontWeight: '600' }}>500</Text>
            <Text style={{ fontWeight: '600', color: 'gray' }}>Followers</Text>
          </View>
        </View>
        <TextInput
          style={{
            // backgroundColor: 'gray',
            height: 80,
            width: '100%',
            borderWidth: 1,
            borderColor: 'gray',
            fontSize: fontSize.xm,
            letterSpacing: 1,
            fontWeight: '500',
            paddingHorizontal: 10
          }}
          // placeholder='Write something about your item'
          onChangeText={(e) => {
            seTbio(e)
          }}
          cursorColor={'gray'}
          multiline
          maxLength={160}
          inputMode="text"
          value={bio}
        >

        </TextInput>
      </View>
        <View
          style={{ width: '100%', position: 'absolute', bottom: 20, paddingHorizontal:20 }}
        >
          <Button
            title='Save'
            color={'purple'}
            onPress={() => {

            }}
          />
        </View>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.NEW_BACKGROUND_COLOR,
    flex: 1,
    // alignItems: 'center',
    // padding: 20,
    gap: 5
  },
  image_container: {
    backgroundColor: 'purple',
    height: 130,
    width: 130,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'

  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 100
  },
  profile_name: {
    fontSize: fontSize.lg,
    letterSpacing: 2,
    fontWeight: '500'

  },
  bio: {
    fontSize: fontSize.xm,
    letterSpacing: 1,
    fontWeight: '500'

  },
  location_container: {
    // backgroundColor: 'plum',
    flexDirection: 'row',
    width: '100%',
    // height:30,
    alignItems: 'center',
  },
  edit_follow_container: {
    backgroundColor: 'rgb(216,191,216)',
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
    zIndex: 1
  },

  follow_container: {

    position: 'absolute',
    top: 20,
    right: 20,
    // flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
    zIndex: 1
  }
})