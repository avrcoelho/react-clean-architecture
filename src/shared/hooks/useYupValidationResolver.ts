import { useCallback } from 'react';
import * as Yup from 'yup';

import getValidationYupErrors from '../utils/getValidationYupErros';

interface IResponse {
  errors: {
    [key: string]: string;
  };
  values: any;
}

type Hook = <TData = any>(
  validationSchema: Yup.ObjectSchema<any>,
) => {
  resolver(data: TData): Promise<IResponse>;
};

export const useYupValidationResolver: Hook = validationSchema => {
  const resolver = useCallback(
    async <TData = any>(data: TData): Promise<IResponse> => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        let parsedErrors = errors;
        if (errors instanceof Yup.ValidationError) {
          parsedErrors = getValidationYupErrors(errors);
        }

        return {
          values: {},
          errors: parsedErrors,
        };
      }
    },
    [validationSchema],
  );

  return { resolver };
};
