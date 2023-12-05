/* eslint-disable no-undef */
import React, { useState } from 'react';
import {
    View,
    Modal,
    Text,
    SafeAreaView,
    StatusBar,
    Dimensions,
    StyleSheet,
    ScrollView, Image,
    TouchableOpacity, TextInput,
} from 'react-native';

import SelectDropDown from '../components/SelectDropDown';
import { category, condition, deal } from '../../assets/data'
import { Formik } from 'formik';
import { item_schema } from '../utilities/schema';
import { color, } from '../../assets/misc/colors';
import CustoButton from '../components/CustoButton';
import * as ImagePicker from 'expo-image-picker'
import { MaterialIcons } from '@expo/vector-icons';
import { manipulateAsync, ActionResize, SaveFormat } from 'expo-image-manipulator';
import { useCreate_productMutation } from '../services/api/productApiSlice';
import { fontSize } from '../../assets/misc/others';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../services/features/userSlice';
import { User } from '../../model';

const { width } = Dimensions.get('window');
interface ImageType {
    _id: number;
    image: string;
}
interface InputPros {
    item_name: string;
    item_price: string;
    item_desc: string;
}



const ListItem = () => {
    const current_user:User = useSelector(selectCurrentUser)
    const [image, setImage] = useState(null);
    const [categorySelected, setcategorySelected] = useState('')
    const [dealType, setDealType] = useState('')
    const [itemCondition, setItemCondition] = useState('')
    const [itemName, setItemName] = useState('')
    const [itemPrice, setItemPrice] = useState('')
    const [itemDesc, setItemDesc] = useState('')
    const [dealtypeErr, setDealTypeErr] = useState('')
    const [conditionErr, setConditionErr] = useState('')
    const [categoryErr, setCategoryeErr] = useState('')
    const [imageArr, setimageArr] = useState<ImageType[]>([])
    const [post_item, { isLoading }] = useCreate_productMutation()
    const [modalVisible, setModalVisible] = useState(false);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        const compressedImage = await manipulateAsync(result.assets[0].uri, [],
            { compress: 0.5, format: SaveFormat.JPEG },)
        imageArr.push({ image: compressedImage.uri, _id: imageArr.length })

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }

    };



    const deleteImg = (_id: any) => {
        const arr = imageArr.filter((item: ImageType) => item._id !== _id)
        setimageArr(arr)
    }


    const handleSubmitData = async (values: InputPros, errors: any,) => {
        if (!categorySelected) return setCategoryeErr('Please select category type')
        if (!itemCondition) return setConditionErr('Please select item condition')
        if (!dealType) return setDealTypeErr('Please select a deal type')
        if (!values.item_desc) return
        if (
            errors.item_name ||
            errors.item_price ||
            errors.item_desc ||
            !itemCondition ||
            !categorySelected ||
            !dealType ||
            imageArr.length < 1

        ) return
        const item_data = {
            owner_id:current_user._id,
            product_name: values.item_name,
            product_price: parseInt(values.item_price),
            product_category: categorySelected,
            product_condition: itemCondition,
            product_desc: values.item_desc,
            deal_type: dealType,
            images: imageArr

        }
        try {
            const res = await post_item(item_data).unwrap()
            if(res.success){
                values.item_name = ''
                values.item_price = ''
                values.item_desc = ''
                setimageArr([])
                setModalVisible(true)
            }
        }
        catch (error) {
            console.log("product err  res", error)
        }
    }


    return (
        <Formik
            initialValues={{ item_name: '', item_price: '', item_desc: '' }}
            validationSchema={item_schema}
            onSubmit={(values, actions) => {
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <SafeAreaView style={styles.saveAreaViewContainer}>
                    <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
                    <ScrollView style={styles.viewContainer}>
                        {/* <Header title='ListItem' /> */}

                        <View style={{ paddingHorizontal: 20, width: '100%', paddingBottom: 50 }}>
                            <View style={errors.item_name && touched.item_name ? styles.input_wrapper_error : styles.input_wrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Item Name"
                                    onChangeText={handleChange('item_name')}
                                    onBlur={() => {
                                        setItemName('')
                                        handleBlur('item_name')
                                    }}
                                    value={values.item_name}
                                    inputMode="text"
                                />
                                {errors.item_name && touched.item_name ? <Text style={styles.error_text}>{errors.item_name}</Text> : ''}
                            </View>

                            <View style={errors.item_price && touched.item_price ? styles.input_wrapper_error : styles.input_wrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Item Value or Price"
                                    onChangeText={handleChange('item_price')}
                                    onBlur={() => {
                                        setItemPrice('')
                                        handleBlur('item_price')
                                    }}
                                    value={values.item_price}
                                    inputMode="tel"

                                />
                                {errors.item_price && touched.item_price ? <Text style={styles.error_text}>{errors.item_price}</Text> : ''}
                            </View>


                            <SelectDropDown
                                title='Item Category'
                                itemsData={category}
                                onSelect={(selectedItem, index) => {
                                    setCategoryeErr('')
                                    setcategorySelected(selectedItem.title);
                                }}
                                error={categoryErr}
                            />

                            <SelectDropDown
                                title='Item Condition'
                                itemsData={condition}
                                onSelect={(selectedItem, index) => {
                                    setConditionErr('')
                                    setItemCondition(selectedItem.title);
                                }}
                                error={conditionErr}
                            />

                            <SelectDropDown
                                title='Cash or Swap Deal ?'
                                itemsData={deal}
                                onSelect={(selectedItem, index) => {
                                    setDealType(selectedItem.title);
                                    setDealTypeErr('')
                                }}
                                error={dealtypeErr}
                            />


                            <View style={[errors.item_desc && touched.item_desc ? styles.input_wrapper_error_desc : styles.input_wrapper_desc,
                            { height: 80, marginBottom: errors.item_desc ? 0 : 20 }
                            ]}
                            >
                                <TextInput
                                    placeholder='Write something about your item'
                                    style={{ paddingHorizontal: 10, fontWeight: '500', }}
                                    multiline
                                    maxLength={160}
                                    onChangeText={handleChange('item_desc')}
                                    onBlur={() => {
                                        setItemDesc('')
                                        handleBlur('item_desc')
                                    }}
                                    value={values.item_desc}
                                    inputMode="text"
                                />
                                {/* {errors.item_desc && touched.item_desc ? <Text style={styles.error_text}>{errors.item_desc}</Text> : ''} */}
                            </View>
                            {errors.item_desc && (<Text style={[styles.error_text, { marginBottom: 10 }]}>{errors.item_desc}</Text>)}


                            <View>

                            </View>
                            <View style={styles.image_container} >
                                {
                                    imageArr.map(({ image, _id }, index) => (
                                        <>
                                            <Image
                                                key={index}
                                                resizeMode='cover'
                                                style={{ height: 90, width: width / 4, margin: 5 }}
                                                source={{ uri: image }}
                                            />
                                            <TouchableOpacity onPress={() => {
                                                deleteImg(_id)

                                            }}>
                                                <MaterialIcons
                                                    style={{
                                                        position: 'absolute',
                                                        right: 0
                                                    }}

                                                    name="cancel" size={24} color="black" />
                                            </TouchableOpacity>
                                        </>
                                    ))
                                }

                                <TouchableOpacity
                                    onPress={() => {
                                        if (imageArr.length === 6) return
                                        pickImage()
                                    }}
                                >
                                    <Image

                                        resizeMode='cover'
                                        style={{ height: 90, width: width / 4, margin: 5 }}
                                        source={require('../../assets/images/add-image.png')}
                                    />
                                </TouchableOpacity>



                            </View>
                            <CustoButton
                                disabled={isLoading}
                                title={!isLoading ? 'Post Item' : 'Submitting...'}
                                color={'purple'}
                                onPress={() => {
                                    handleSubmit()
                                    handleSubmitData(values, errors)
                                }}
                            />
                        </View>

                    </ScrollView>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, { paddingHorizontal: 20 }]}>
                                <Text style={styles.modalText}>SUCCESS!</Text>
                                <Image
                                    style={{ height: 100, width: 100, marginBottom: 70 }}
                                    source={require('../../assets/images/success-modal.png')}
                                />
                                <CustoButton
                                    title='dismiss'
                                    color={'purple'}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
            )}
        </Formik>
    );
};
export default ListItem
const styles = StyleSheet.create({

    saveAreaViewContainer: { flex: 1, backgroundColor: '#FFF', },
    viewContainer: { flex: 1, width, backgroundColor: color.NEW_BACKGROUND_COLOR, paddingVertical: 20 },




    input_wrapper: {
        borderWidth: 1,
        borderColor: color.BORDER_COLOR,
        backgroundColor: color.INPUT_BG,
        height: 50,
        width: '100%',
        borderRadius: 5,
        marginBottom: 10,
        // marginHorizontal:30
    },

    input_wrapper_error: {
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: color.INPUT_BG,
        height: 50,
        width: '100%',
        borderRadius: 5,
        marginBottom: 24
    },

    input_wrapper_error_desc: {
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: color.INPUT_BG,


        height: 50,
        width: '100%',
        borderRadius: 5,
    },

    input_wrapper_desc: {
        borderWidth: 1,
        borderColor: color.BORDER_COLOR,
        backgroundColor: color.INPUT_BG,

        height: 50,
        width: '100%',
        borderRadius: 5,
        // marginBottom: 10,
        // marginHorizontal:30
    },



    input: {
        height: '100%', width: '100%', fontSize: 16, paddingHorizontal: 10
    },
    error_text: {
        color: 'red', marginTop: 2, fontWeight: '600'
    },

    dropdown1BtnStyle: {
        width: '80%',
        height: 50,
        backgroundColor: color.INPUT_BG,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnTxtStyle: {
        color: '#444',
        textAlign: 'left'
    },
    dropdown1DropdownStyle: {
        backgroundColor: color.INPUT_BG,
    },

    dropdown1RowStyle: {
        backgroundColor: color.INPUT_BG,
        borderBottomColor: '#C5C5C5'
    },
    dropdown1RowTxtStyle: {
        color: '#444',
        textAlign: 'left'
    },
    image_container:{
        height: 210,
        width: '100%',
        backgroundColor: color.INPUT_BG,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: 5,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 8
        // gap:5
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
        backgroundColor: 'rgba(255,255,255,0.8)',

    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 400,
        width: 300
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 60
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: fontSize.lg
    },


});