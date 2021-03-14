import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErros(error: ValidationError): Errors {
  const validationErros: Errors = {};

  error.inner.forEach(err => {
    validationErros[err.path as string] = err.message;
  });

  return validationErros;
}
