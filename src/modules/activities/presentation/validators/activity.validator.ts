import * as yup from 'yup';

import InputMessages from '@/shared/presentation/constants/inputMessages';

const activityValidator = yup.object({
  time: yup.string().required(InputMessages.RequiredFiel),
  date: yup.string().required(InputMessages.RequiredFiel),
  type: yup.string().required(InputMessages.RequiredFiel),
});

export default activityValidator;
