import {
    Text,
    View,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    RefreshControl
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
import { register_schema } from "../utilities/schema";
import { useRegisterMutation } from "../services/api/authApiSlice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from 'react'
import CustoButton from "../components/CustoButton";
import * as Location from 'expo-location';
import axios from 'axios'
import { setCredientials } from "../services/features/userSlice";
import { AuthService } from "../services/authServices";
import { useDispatch } from "react-redux";

interface InputType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    comfirmPassword: string;
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



const Register: React.FC = () => {
    const authService = new AuthService()
    const dispatch = useDispatch()
    const navigator = useNavigation<NavigationProp<any>>()
    const [signin, { isLoading }] = useRegisterMutation()
    const [serverErr, setServerErr] = useState('')
    const [location, setLocation] = useState(null);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [locationErr, setLocationErr] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const write_location = async (lat: number, long: number) => {
        const res = await axios.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${long}`) as LocRes
        setCity(res.data.address.county)
        setState(res.data.address.state)
        setCountry(res.data.address.country)

    }

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            if (!location) return
            write_location(location.coords.latitude, location.coords.longitude) as any

            setLocation(location.coords.latitude);
        })();
    }, []);



  

    const validate_input = (errors: FormikErrors<InputType>) => {
        if (
            errors.firstName ||
            errors.lastName ||
            errors.email ||
            errors.password ||
            errors.comfirmPassword
        ) return true

    }

    const handle_register = async (value: InputType, errors: FormikErrors<InputType>) => {
        if (!city || !state) return setLocationErr('turn on location service and pull down to refresh')
        if (validate_input(errors)) return
        const { firstName, lastName, email, password } = value
        try {
            const res: AuthResponse = await signin({ firstName, lastName, email, password, city, state, country }).unwrap()
            if (res.success) {
                dispatch(setCredientials(res))
                authService.setUser(res.user)
                authService.setUserToken(res.token)
                authService.setUserId(res._id)
                navigator.navigate('Home')
            }
        } catch (error) {
            setServerErr(error.data)
            console.log("error res", error)


        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            if (!location) return
            write_location(location.coords.latitude, location.coords.longitude) as any
            setRefreshing(false);

        })();
        // fetch_products()
        // setTimeout(() => {
        //     // setRefreshing(lasyLoading);
        // }, 5000);
    }, []);



    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '', comfirmPassword: '' }}
            validationSchema={register_schema}
            onSubmit={(values, actions) => {
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <ScrollView style={[styles.main,]}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

                >
                    <View style={styles.image_light_container}>
                        <Animated.Image
                            entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
                            style={{ height: 130, width: 100, }} source={require('../../assets/lamp.png')}
                        />
                        <Animated.Image
                            entering={FadeInUp.delay(300).duration(1000).springify().damping(3)}

                            style={{ height: 120, width: 100, }}
                            source={require('../../assets/lamp.png')}
                        />
                    </View>

                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontWeight: '600', fontSize: fontSize.xxl }}>REGISTER</Text>
                    </View>

                    <View style={styles.input_btn_wrapper}>

                        <View style={errors.firstName && touched.firstName ? styles.input_wrapper_error : styles.input_wrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="First name"
                                onChangeText={handleChange('firstName')}
                                onBlur={() => {
                                    handleBlur('firstName')
                                    // setEmailErr('')
                                    setServerErr('')

                                }}
                                value={values.firstName}
                                inputMode="text"
                            />
                            {errors.firstName && touched.firstName ? <Text style={styles.error_text}>{errors.firstName}</Text> : ''}

                        </View>

                        <View style={errors.lastName && touched.lastName ? styles.input_wrapper_error : styles.input_wrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Last name"
                                onChangeText={handleChange('lastName')}
                                onBlur={() => {
                                    handleBlur('lastName')
                                    // setEmailErr('')
                                    setServerErr('')

                                }}
                                value={values.lastName}
                                inputMode="text"
                            />
                            {errors.lastName && touched.lastName ? <Text style={styles.error_text}>{errors.lastName}</Text> : ''}

                        </View>
                        <View style={errors.email && touched.email ? styles.input_wrapper_error : styles.input_wrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={() => {
                                    handleBlur('email')
                                    // setEmailErr('')
                                    setServerErr('')

                                }}
                                value={values.email}
                                inputMode="email"
                            />
                            {errors.email && touched.email ? <Text style={styles.error_text}>{errors.email}</Text> : ''}

                        </View>

                        <View style={errors.password && touched.password ? styles.input_wrapper_error : styles.input_wrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                onChangeText={handleChange('password')}
                                onBlur={() => {
                                    handleBlur('password')
                                    // setEmailErr('')
                                    setServerErr('')

                                }}
                                value={values.password}
                                inputMode="text"
                            />
                            {errors.password && touched.password ? <Text style={styles.error_text}>{errors.password}</Text> : ''}
                            {/* {emailErr ? <Text style={styles.error_text}>{emailErr}</Text> : ''} */}

                        </View>
                        <View style={errors.comfirmPassword && touched.comfirmPassword ? styles.input_wrapper_error : styles.input_wrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Comfirm Password"
                                onChangeText={handleChange('comfirmPassword')}
                                onBlur={() => {
                                    handleBlur('comfirmPassword')
                                    // setEmailErr('')
                                    setServerErr('')

                                }}
                                value={values.comfirmPassword}
                                inputMode="text"
                            />
                            {errors.comfirmPassword && touched.comfirmPassword ? <Text style={styles.error_text}>{errors.comfirmPassword}</Text> : ''}
                            {/* {emailErr ? <Text style={styles.error_text}>{emailErr}</Text> : ''} */}

                        </View>


                        {serverErr ? <Text style={styles.error_text}>{serverErr}</Text> : ''}
                        {locationErr ? <Text style={styles.error_text}>{locationErr}</Text> : ''}

                        <View style={styles.btn_wrapper} >
                            <CustoButton
                                // disabled={!values.firstName || !values.lastName || !values.email || !values.password || !values.comfirmPassword}
                                title={isLoading ? 'Submitting...' : 'Register'}
                                onPress={() => {
                                    handleSubmit()
                                    handle_register(values, errors)
                                }}
                                color="purple"
                            />
                        </View>

                        <View style={{ flexDirection: 'row', gap: 30, }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                Allready have an account ?
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