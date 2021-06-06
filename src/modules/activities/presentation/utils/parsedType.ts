export const parsedType = (type: 'run' | 'bike' | 'swimming') => {
  const types = {
    bike: 'Bicicleta',
    run: 'Corrida',
    swimming: 'Natação',
  };

  return types[type];
};
