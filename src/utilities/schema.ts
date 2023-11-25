import { Text, View, TextInput, Button, Alert, Dimensions } from "react-native";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import z from 'zod';


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
  password: yup.string()
    .min(6)
    // .matches(password_validation, {message:'Please create a strong password'})
    .required(),
})

export const register_schema = yup.object().shape({
  firstName: yup.string().min(3, 'minimum of 3 characters long').required(),
  lastName: yup.string().min(3, 'minimum of 3 characters long').required(),
  email: yup.string().email('Plese enter a valid email').required(),
  password: yup.string()
    .min(6)
    .matches(password_validation, { message: 'Please create a strong password' })
    .required(),
    comfirmPassword: yup.string().oneOf([yup.ref('password'),], 'Password must match').required()
})


export const item_schema = yup.object().shape({
  item_name: yup.string().min(3, 'minimum of 3 characters long').required(),
  item_price: yup.string().min(3, 'minimum of 3 characters long').required(),
  item_desc: yup.string().min(3, 'minimum of 3 characters long')
})


const phoneNumberRegexp = new RegExp(
  /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
);
const FIELD_REQUIRED_STR = 'This field is required';

export const signUpFormSchema = z.object({
  firstName: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: FIELD_REQUIRED_STR,
  })
    .min(3, 'Minimum 3 characters')
    .max(20, 'Maximum 20 characters')
    .trim(),

  // lastName: z
  //   .string({
  //     invalid_type_error: 'Surname must be a string',
  //     required_error: FIELD_REQUIRED_STR,
  //   })
  //   .min(3, 'Minimum 3 characters')
  //   .max(20, 'Maximum 20 characters')
  //   .trim(),

  // email: z.string({
  //   invalid_type_error: 'Email must be a string',
  //   required_error: FIELD_REQUIRED_STR,
  // })
  //   .email('Email is invalid').trim(),

  // password: z.string({
  //   invalid_type_error: 'Password must be a string',
  //   required_error: FIELD_REQUIRED_STR,

  // })
  //   .min(3, 'Minimum 3 characters')
  //   .max(20, 'Maximum 20 characters')
  //   .trim(),

});

export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;

