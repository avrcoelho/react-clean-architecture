import * as yup from 'yup';

import InputMessages from '@/shared/presentation/constants/inputMessages';

const activityValidator = yup.object({
  time: yup
    .string()
    .matches(/^\d{2}:\d{2}$/, InputMessages.RequiredFiel)
    .required(InputMessages.RequiredFiel),
  date: yup
    .string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/,
      InputMessages.RequiredFiel,
    )
    .required(InputMessages.RequiredFiel),
  type: yup.string().required(InputMessages.RequiredFiel),
});

export default activityValidator;
