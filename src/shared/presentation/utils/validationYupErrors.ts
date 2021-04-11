import { ValidationError } from 'yup';

interface Errors {
  [key: string]: ValidationError;
}

export default function validationYupErrors(error: ValidationError): Errors {
  const validationErros: Errors = {};

  error.inner.forEach(err => {
    validationErros[err.path as string] = err;
  });

  return validationErros;
}
