import { useCallback } from 'react';
import { ResolverError, ResolverSuccess } from 'react-hook-form';
import * as Yup from 'yup';

import validationYupErrorsMapper from '../mappers/validationYupErrors.mapper';

export const useYupValidationResolver = <TData = any>(
  validationSchema: Yup.ObjectSchema<any>,
) =>
  useCallback(
    async (data: TData): Promise<ResolverSuccess | ResolverError> => {
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
          parsedErrors = validationYupErrorsMapper(errors);
        }

        return {
          values: {},
          errors: parsedErrors,
        };
      }
    },
    [validationSchema],
  );
