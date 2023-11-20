/* eslint-disable no-undef */
import React from 'react';
import { View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, Image } from 'react-native';
const { width } = Dimensions.get('window');
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { Header } from '../components/Header';
import { fontSize } from '../../assets/misc/others';
import { color } from '../../assets/misc/colors';


interface item {
    image: any;
}
interface SelectProps {
    itemsData: item[];
    onSelect: (selectedItem: any, index: number) => void;
    title: any;
    error: string;

}


const SelectDropDown: React.FC<SelectProps> = ({ itemsData, onSelect, title, error }) => {


    return (
        <View style={{marginBottom:error ? 0 : 20 }}>
            <SelectDropdown
                data={itemsData}
                // defaultValueByIndex={1}
                // defaultValue={{
                //   title: 'England',
                //   image: require('./Images/England.jpg'),
                // }}
                onSelect={onSelect}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                        <View style={styles.dropdown3BtnChildStyle}>
                            {selectedItem ? (
                                <Image source={selectedItem.image} style={styles.dropdown3BtnImage} />
                            ) : (
                                <MaterialIcons name="category" size={24} color="black" />

                            )}
                            <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem.title : title}</Text>
                            <Ionicons name="md-chevron-down" size={24} color="black" />
                        </View>
                    );
                }}
                dropdownStyle={styles.dropdown3DropdownStyle}
                rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={(item, index) => {
                    return (
                        <View style={styles.dropdown3RowChildStyle}>
                            <Image source={item.image} style={styles.dropdownRowImage} />
                            <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
                        </View>
                    );
                }}
            />
            {error && (<Text style={styles.error_text}>{error}</Text>)}
        </View>


    );
};
export default SelectDropDown





const styles = StyleSheet.create({



    dropdown3BtnStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        paddingHorizontal: 0,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#444',
    },

    dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    dropdown3BtnImage: { width: 45, height: 45, resizeMode: 'cover', borderRadius: 100 },
    dropdown3BtnTxt: {
        color: '#444',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: fontSize.lg,
        marginHorizontal: 12,
    },
    dropdown3DropdownStyle: { backgroundColor: 'slategray' },
    dropdown3RowStyle: {
        backgroundColor: color.DROPDOWN_COLOR,
        borderBottomColor: '#444',
        height: 50,
        // marginBottom:3
    },
    dropdown3RowChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    dropdownRowImage: { width: 45, height: 45, resizeMode: 'cover', borderRadius: 50 },
    dropdown3RowTxt: {
        color: '#444',

        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: fontSize.lg,
        marginHorizontal: 12,
    },
    error_text: {
        color: 'red', marginBottom: 10, fontWeight: '600'
    },


});