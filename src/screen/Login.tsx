import {
    Text,
    View,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Button,
    BackHandler,
    Alert,
    StatusBar,
} from "react-native";
import Animated, {
    Easing,
    useSharedValue,
    FadeInUp
}
    from "react-native-reanimated";
import { AuthResponse } from "../../model";
import { fontSize } from "../../assets/misc/others";
import { color } from "../../assets/misc/colors";
import { Formik, FormikErrors } from "formik";
import { login_schema } from "../utilities/schema";
import { useLoginMutation, useRegisterMutation } from "../services/api/authApiSlice";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from 'react'
import CustoButton from "../components/CustoButton";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser, setCredientials } from "../services/features/userSlice";
import { AuthService } from "../services/authServices";

interface InputType {
    email: string;
    password: string;
}

interface LocationResponse {
    address: {
        city: string;
        county: string;
        road: string;
        postcode: string;
        state: string;
        country: string;
        country_code: string;
    }
}

interface LocRes {
    data: LocationResponse
}



const Login: React.FC = () => {
    const token = useSelector(selectCurrentToken) as string
    const authService = new AuthService()
    const dispatch = useDispatch()
    const navigator = useNavigation<NavigationProp<any>>()
    const [login_user, { isLoading }] = useLoginMutation()
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [serverErr, setServerErr] = useState('')
    const [errorMsg, setErrorMsg] = useState(null);






    const handle_login = async (value: InputType, errors: FormikErrors<InputType>) => {
        if (errors.email || errors.password) return
        try {
            const res: AuthResponse = await login_user(value).unwrap()
            if (res.success) {
                dispatch(setCredientials(res))
                authService.setUser(res.user)
                authService.setUserToken(res.token)
                authService.setUserId(res._id)
                navigator.navigate('Home')
            }
            // console.log("res", res)
        } catch (error) {
            if (error.data === "Email doesn't exist" && error.status === 404) {
                setEmailErr(error.data)
            } else if (error.data === "Password is incorrect" && error.status === 401) {
                setPasswordErr(error.data)
            } else {
                setServerErr(error.data)
            }



        }
    }

 
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {

                Alert.alert('Hold on!', 'Are you sure you want to exit?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    { text: 'YES', onPress: () => BackHandler.exitApp() },
                ]);
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, []),
    );

 


   
    return (
        <Formik
            initialValues={{ email: '', password: '', }}
            validationSchema={login_schema}
            onSubmit={(values, actions) => {
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <ScrollView style={[styles.main,]}>
                <StatusBar backgroundColor={color.NEW_BACKGROUND_COLOR} />

                    <View style={styles.image_light_container}>
                        <Animated.Image
                            entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
                            style={{ height: 160, width: 120, }} source={require('../../assets/lamp.png')}
                        />
                        <Animated.Image
                            entering={FadeInUp.delay(300).duration(1000).springify().damping(3)}

                            style={{ height: 120, width: 100, }}
                            source={require('../../assets/lamp.png')}
                        />
                    </View>

                    <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 80 }}>
                        <Text style={{ fontWeight: '600', fontSize: fontSize.xxl }}>LOGIN</Text>
                    </View>

                    <View style={styles.input_btn_wrapper}>

                        <View style={errors.email && touched.email ? styles.input_wrapper_error : styles.input_wrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={() => {
                                    handleBlur('email')
                                    setEmailErr('')
                                    setPasswordErr('')
                                    setServerErr('')

                                }}
                                value={values.email}
                                inputMode="email"
                            />
                            {errors.email && touched.email ? <Text style={styles.error_text}>{errors.email}</Text> : ''}
                            {emailErr ? <Text style={styles.error_text}>{emailErr}</Text> : ''}

                        </View>

                        <View style={errors.password && touched.password ? styles.input_wrapper_error : styles.input_wrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                onChangeText={handleChange('password')}
                                onBlur={() => {
                                    handleBlur('password')
                                    setEmailErr('')
                                    setPasswordErr('')
                                    setServerErr('')

                                }}
                                value={values.password}
                                inputMode="text"
                            />
                            {errors.password && touched.password ? <Text style={styles.error_text}>{errors.password}</Text> : ''}
                            {passwordErr ? <Text style={styles.error_text}>{passwordErr}</Text> : ''}

                        </View>



                        {serverErr ? <Text style={styles.error_text}>{serverErr}</Text> : ''}

                        <View style={styles.btn_wrapper} >
                            <CustoButton
                            disabled={isLoading}
                                title={isLoading ? 'Submitting...' : 'login'}
                                onPress={() => {
                                    handleSubmit()
                                    handle_login(values, errors)
                                }}
                                color="purple"
                            />
                        </View>

                        <View style={{ flexDirection: 'row', gap: 30, }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                Dont't have an account ?
                            </Text>
                            <TouchableOpacity onPress={() => navigator.navigate("Register")}>
                                <Text style={{ fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' }}>
                                    Register
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
            
                </ScrollView>
            )}
        </Formik>


    );
}

export default Login

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: color.NEW_BACKGROUND_COLOR,
        paddingHorizontal: 20
    },
    image_bg: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    },

    image_light_container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },

    input_btn_wrapper: {
        alignItems: 'center',
        //   paddingHorizontal: 20,
        //   backgroundColor:'teal'
    },

    input_wrapper: {
        borderWidth: 1,
        borderColor: color.BORDER_COLOR,
        backgroundColor: color.INPUT_BG,
        height: 50,
        width: '100%',
        borderRadius: 5,
        marginBottom: 30
    },
    input_wrapper_error: {
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: color.INPUT_BG,
        height: 50,
        width: '100%',
        borderRadius: 5,
        marginBottom: 30
    },
    input: {
        height: '100%', width: '100%', fontSize: 16, paddingHorizontal: 10
    },
    btn_wrapper: {
        width: '100%',
        marginBottom: 30,
        marginTop: 30,
        height: 40,
    },
    error_text: {
        color: 'red', marginTop: 2, fontWeight: '600'
    }

})