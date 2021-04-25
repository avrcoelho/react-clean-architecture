import * as yup from 'yup';

import InputMessages from '@/shared/presentation/contants/inputMessages';

const signInValidator = yup.object({
  email: yup
    .string()
    .email(InputMessages.InvalidEmail)
    .required(InputMessages.RequiredFiel),
  password: yup.string().required(InputMessages.RequiredFiel),
});

export default signInValidator;
