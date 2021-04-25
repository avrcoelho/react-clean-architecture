import * as yup from 'yup';

import InputMessages from '@/shared/presentation/constants/inputMessages';

const signUpValidator = yup.object({
  fullname: yup.string().required(InputMessages.RequiredFiel),
  email: yup
    .string()
    .email(InputMessages.InvalidEmail)
    .required(InputMessages.RequiredFiel),
  password: yup
    .string()
    .min(6, InputMessages.MinPassword)
    .required(InputMessages.RequiredFiel),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], InputMessages.PasswordsDontMatch)
    .required(InputMessages.RequiredFiel),
});

export default signUpValidator;
