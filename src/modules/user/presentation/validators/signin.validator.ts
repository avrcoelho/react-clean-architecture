import * as yup from 'yup';

import inputMessages from '@/shared/presentation/contants/inputMessages';

const signInValidator = yup.object({
  email: yup
    .string()
    .email(inputMessages.invalidEmail)
    .required(inputMessages.requiredFiel),
  password: yup.string().required(inputMessages.requiredFiel),
});

export default signInValidator;
