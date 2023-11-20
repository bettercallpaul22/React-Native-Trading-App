import {
    Text,
    View,
    TextInput,
    ScrollView,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform, StatusBar
} from "react-native";


import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming, FadeIn, FadeOut, FadeInUp } from "react-native-reanimated";
import { RegisterValues } from "../../model";
import { fontSize } from "../../assets/misc/others";
import { color } from "../../assets/misc/colors";
import { Formik } from "formik";
import { login_schema, register_schema } from "../utilities/schema";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useRegisterMutation } from "../services/api/authApiSlice";
import { useState } from 'react'
import CustoButton from "../components/CustoButton";
import { Header } from "../components/Header";

const { height, width } = Dimensions.get('screen')








const Register: React.FC = () => {
    const navigator = useNavigation<NavigationProp<any>>()
    const initialValues: RegisterValues = { first_name: '', last_name: '', email: '', password: '', comfirm_password: '' };
    const [register, { isLoading }] = useRegisterMutation()
    const random_width = useSharedValue(40)
    const [firstNameErr, setfirstNameErr] = useState('')
    const [lastNameErr, setlastNameErr] = useState('')
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


    const handle_register = async (values: {}) => {
        try {
            const res: any = await register(values).unwrap()
        } catch (error) {
            if (error.data.includes('first')) {
                setfirstNameErr(error.data)
            }
            if (error.data.includes('last')) {
                setlastNameErr(error.data)
            }
            if (error.data.includes('Email')) {
                setEmailErr(error.data)
            }

            if (error.data.includes('Password')) {
                setPasswordErr(error.data)
            }

            if (error.status === 500) {
                setServerErr(error.data)

            }

        }
    }

    return (
        <Formik

            initialValues={initialValues}
            validationSchema={register_schema}
            onSubmit={(values, actions) => {
                console.log("values", values.email);
                // alert(JSON.stringify(values, null, 2));
                // actions.setSubmitting(false);
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <ScrollView style={styles.main}>
                    <StatusBar backgroundColor={color.NEW_BACKGROUND_COLOR} />
                    {/* <Header title="Register" /> */}

                    {/* <Image style={styles.image_bg} source={require('../../assets/lg-bg.jpg')} /> */}

                    {/* lights */}
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

                    <View style={{ alignItems: 'center', marginTop:-37 }}>
                        <Text style={{ fontWeight: '600', fontSize: fontSize.xxl }}>REGISTER</Text>
                    </View>

                    <View style={styles.input_btn_wrapper}>
                        <View style={errors.first_name && touched.first_name ? styles.input_wrapper_error : styles.input_wrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter First Name"
                                onChangeText={handleChange('first_name')}
                                onBlur={() => {
                                    handleBlur('first_name')
                                    setfirstNameErr('')
                                }}
                                value={values.first_name}
                                inputMode="text"
                            />
                            {errors.first_name && touched.first_name ? <Text style={styles.error_text}>{errors.first_name}</Text> : ''}
                            {firstNameErr ? <Text style={styles.error_text}>{firstNameErr}</Text> : ''}

                        </View>

                        <View style={errors.last_name && touched.last_name ? styles.input_wrapper_error : styles.input_wrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Last Name"
                                onChangeText={handleChange('last_name')}
                                onBlur={() => {
                                    handleBlur('last_name')
                                    setlastNameErr('')
                                }}
                                value={values.last_name}
                                inputMode="text"
                            />
                            {errors.last_name && touched.last_name ? <Text style={styles.error_text}>{errors.last_name}</Text> : ''}
                            {lastNameErr ? <Text style={styles.error_text}>{lastNameErr}</Text> : ''}

                        </View>

                        <View style={errors.email && touched.email ? styles.input_wrapper_error : styles.input_wrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Email"
                                onChangeText={handleChange('email')}
                                onBlur={() => {
                                    handleBlur('email')
                                    setEmailErr('')
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
                                    setPasswordErr('')
                                }}
                                value={values.password}
                                inputMode="text"
                            />
                            {errors.password && touched.password ? <Text style={styles.error_text}>{errors.password}</Text> : ''}
                            {passwordErr ? <Text style={styles.error_text}>{emailErr}</Text> : ''}

                        </View>

                        <View style={errors.comfirm_password && touched.comfirm_password ? styles.input_wrapper_error : styles.input_wrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Comfirm Password"
                                onChangeText={handleChange('comfirm_password')}
                                onBlur={handleBlur('comfirm_password')}
                                value={values.comfirm_password}
                                inputMode="text"
                            />
                            {errors.comfirm_password && touched.comfirm_password ?
                                <Text style={styles.error_text}>
                                    {errors.comfirm_password}
                                </Text>
                                : ''}

                        </View>

                        <View style={styles.btn_wrapper} >
                            <CustoButton
                                title={isLoading ? 'Submitting' : 'Register'}
                                onPress={() => {

                                    handleSubmit()
                                    if (
                                        errors.first_name
                                        || errors.last_name
                                        || errors.email
                                        || errors.password
                                        || values.first_name.length < 1
                                        || values.last_name.length < 1
                                        || values.email.length < 1
                                        || values.password.length < 1) return
                                    handle_register(values)
                                }}
                                color="purple"
                            />
                        </View>


                        <View style={{ flexDirection: 'row', gap: 30, }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                Already have an account ?
                            </Text>
                            <TouchableOpacity onPress={() => navigator.navigate("Login")}>
                                <Text style={{ fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' }}>
                                    Login
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </ScrollView>
            )}
        </Formik>


    );
}

export default Register

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: color.NEW_BACKGROUND_COLOR
    },
    image_bg: {
        height: height,
        width: width,
        position: 'absolute',
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
        backgroundColor:color.INPUT_BG,
        height: 50,
        width: '100%',
        borderRadius: 5,
        marginBottom: 20
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
        color: 'red', marginTop: 0, fontWeight: '600',
    }

})