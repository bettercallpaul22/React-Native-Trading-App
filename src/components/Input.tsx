import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { Formik } from 'formik';
import { item_schema } from '../utilities/schema';
import { color } from '../../assets/misc/colors';


interface InputProps {
    placeholder?: string;
    onChangeText?: (e:any) => any;
    onBlur?: () => void;
    value?: any;
    inputMode?: string | any;
    borderError?: boolean;
    errorMessage?: string;


}

const Input: React.FC<InputProps> = ({ placeholder, value, borderError, onChangeText, onBlur, inputMode, errorMessage }) => {

    // const initialValues = { name: '',  };


    return (
        <View style={{ paddingHorizontal: 20, width: '100%',  }}>

            <View style={borderError ? styles.input_wrapper_error : styles.input_wrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    onBlur={(onBlur)}
                    value={value}
                    inputMode={inputMode}
                />
                {errorMessage && <Text style={styles.error_text}>{errorMessage}</Text>}

            </View>
        </View>

    )
}

export default Input

const styles = StyleSheet.create({

    input_wrapper: {
        borderWidth: 1,
        borderColor: color.BORDER_COLOR,
        backgroundColor: color.BACKGROUND_COLOR,
        height: 50,
        width: '100%',
        borderRadius: 5,
        // marginBottom: 30,
        // marginHorizontal:30
    },

    input_wrapper_error: {
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: color.BACKGROUND_COLOR,
        height: 50,
        width: '100%',
        borderRadius: 5,
        // marginBottom: 30
    },
    input: {
        height: '100%', width: '100%', fontSize: 16, paddingHorizontal: 10, backgroundColor:color.NEW_BACKGROUND_COLOR
    },
    error_text: {
        color: 'red', marginTop: 2, fontWeight: '600'
    }
})