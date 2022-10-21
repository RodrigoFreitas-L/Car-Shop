import { ICar } from '../../../src/interfaces/ICar';

const testCar: ICar = {
  model: 'Fiat Uno',
  year: 2002,
  color: 'White',
  buyValue: 10000,
  seatsQty: 5,
  doorsQty: 2,
};


const testCarWithId:ICar & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Fiat Uno',
  year: 2002,
  color: 'White',
  buyValue: 10000,
  seatsQty: 5,
  doorsQty: 2,
}

const testCarUpdating:ICar & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Not a Ferrari',
  year: 2022,
  color: 'Black',
  buyValue: 100000000,
  seatsQty: 2,
  doorsQty: 2,
};

const carUpdate:Partial<ICar> = {
  model: 'Not a Ferrari',
  year: 2022,
  color: 'Black',
  buyValue: 100000000,
  seatsQty: 2,
  doorsQty: 2,
};

export { testCar, testCarWithId, testCarUpdating, carUpdate };