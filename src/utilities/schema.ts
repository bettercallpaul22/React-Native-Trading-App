import { Text, View, TextInput, Button, Alert, Dimensions } from "react-native";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
    useFormik,
} from 'formik';


const password_validation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const login_schema = yup.object().shape({
    email: yup.string().email('Plese enter a valid email').required(),
    password:yup.string()
    .min(6)
    // .matches(password_validation, {message:'Please create a strong password'})
    .required(),
})

export const register_schema = yup.object().shape({
    first_name: yup.string().min(3,'minimum of 3 characters long').required(),
    last_name: yup.string().min(3,'minimum of 3 characters long').required(),
    email: yup.string().email('Plese enter a valid email').required(),
    password:yup.string()
    .min(6)
    .matches(password_validation, {message:'Please create a strong password'})
    .required(),
    comfirm_password:yup.string().oneOf([yup.ref('password'), ], 'Password must match').required()
})


export const item_schema = yup.object().shape({
    item_name: yup.string().min(3,'minimum of 3 characters long').required(),
    item_price: yup.string().min(3,'minimum of 3 characters long').required(),
    item_desc: yup.string().min(3,'minimum of 3 characters long')
})

