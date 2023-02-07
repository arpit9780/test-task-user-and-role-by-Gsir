import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is Require'),
  username: Yup.string()
    .required('User Name is Require'),
  mobile: Yup.string()
    .required('Mobile No. is Require'),
  password: Yup.string()
    .required('Password is Require'),
  rolelabel: Yup.string()
    .required('Role Label is Require'),
  email: Yup.string().email('Invalid email').required('Email is Require'),
});

export const roleSchema = Yup.object().shape({
  roleLabel: Yup.string()
    .required('Role Label is Require'),
  roleKey: Yup.string()
    .required('Role Key is Require')
})