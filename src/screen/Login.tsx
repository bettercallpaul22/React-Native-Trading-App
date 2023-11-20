import {
    Text,
    View,
    TextInput,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import Animated, {
    Easing, useAnimatedStyle,
    useSharedValue,
    withTiming,
    FadeInUp
}
    from "react-native-reanimated";
import { AuthResponse, LoginValues } from "../../model";
import { fontSize } from "../../assets/misc/others";
import { color } from "../../assets/misc/colors";
import { Formik } from "formik";
import { login_schema } from "../utilities/schema";
import { useLoginMutation } from "../services/api/authApiSlice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from 'react'
import CustoButton from "../components/CustoButton";
import { Header } from "../components/Header";




const Login: React.FC = () => {
    const navigator = useNavigation<NavigationProp<any>>()
    const [login, { isLoading }] = useLoginMutation()
    const initialValues: LoginValues = { email: '', password: '', };
    const random_width = useSharedValue(40)
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [serverErr, setServerErr] = useState('')

    const config = {
        duration: 200,
        easing: Easing.bezier(0.5, 0.01, 0.1, 0.05)
    }
    const style = useAnimatedStyle(() => {
        return {
            width: withTiming(random_width.value, config)
        }
    })



    const handle_login = async (value: LoginValues) => {
        try {
            const res: AuthResponse = await login(value).unwrap()
            console.log("res", res.success)
        } catch (error) {
            setServerErr(error.data)

        }
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={login_schema}
            onSubmit={(values, actions) => {
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <ScrollView style={[styles.main,]}>
                    {/* <Header title="Login" /> */}
                    <View style={styles.image_light_container}>
                        <Animated.Image
                            entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
                            style={{ height: 200, width: 150, }} source={require('../../assets/lamp.png')}
                        />
                        <Animated.Image
                            entering={FadeInUp.delay(300).duration(1000).springify().damping(3)}

                            style={{ height: 160, width: 150, }}
                            source={require('../../assets/lamp.png')}
                        />
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ fontWeight: '600', fontSize: fontSize.xxl }}>LOGIN</Text>
                    </View>

                    <View style={styles.input_btn_wrapper}>
                        <View style={errors.email && touched.email ? styles.input_wrapper_error : styles.input_wrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter email address"
                                onChangeText={handleChange('email')}
                                onBlur={() => {
                                    handleBlur('email')
                                    setEmailErr('')
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
                                placeholder="Enter Password"
                                onChangeText={handleChange('password')}
                                onBlur={() => {
                                    setPasswordErr('')
                                    handleBlur('password')
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
                                title={isLoading ? 'Submitting...' : 'Login'}
                                onPress={() => {
                                    handleSubmit()
                                    if (
                                        errors.email
                                        || errors.password
                                        || values.email.length < 1
                                        || values.password.length < 1) return
                                    handle_login(values)

                                }}
                                color="purple"
                            />
                        </View>

                        <View style={{ flexDirection: 'row', gap: 30, }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                Don't have an account ?
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
        backgroundColor: color.NEW_BACKGROUND_COLOR
    },
    image_bg: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    image_light_container: {
        flexDirection: 'row', width: '100%', justifyContent: 'space-around',
    },
    input_btn_wrapper: {
        alignItems: 'center', marginTop: 50, paddingHorizontal: 20
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