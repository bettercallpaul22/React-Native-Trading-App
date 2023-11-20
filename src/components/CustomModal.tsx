import { StyleSheet, Text, Modal, Image, View } from 'react-native'
import React from 'react'
import CustoButton from './CustoButton';
import { fontSize } from '../../assets/misc/others';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { replace } from 'formik';

interface ModalProps{
    route:string;
    visibility:boolean;
}


const CustomModal:React.FC<ModalProps> = ({route, visibility}) => {
    const navigator = useNavigation<NavigationProp<any>>()

    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visibility}
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
                            navigator.navigate(`${route}`, {replace:true})
                            setModalVisible(!modalVisible)
                        }}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default CustomModal

const styles = StyleSheet.create({
    
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

})