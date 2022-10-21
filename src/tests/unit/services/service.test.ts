import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import { carUpdate, testCar, testCarUpdating, testCarWithId } from '../../mocks/carMock';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Car Service testing', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'create')
      .resolves(testCarWithId);
    sinon
      .stub(carModel, 'readOne')
      .onCall(0)
      .resolves(testCarWithId)
      .onCall(1)
      .resolves(null);
    sinon
      .stub(carModel, 'update')
      .onCall(0)
      .resolves(testCarUpdating)
      .onCall(1)
      .resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a Car', () => {
    it('creates a car successfully', async () => {
      const createdCar = await carService.create(testCar);
      expect(createdCar).to.be.deep.equal(testCarWithId);
    });

    it('tries to create a car', async () => {
      let error;
      try {
        await carService.create({});
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.eq(ErrorTypes.InvalidBody);
    });
  });

  describe('Searching for a car', () => {
    it('finds a car successfully', async () => {
      const searchingCar = await carService.readOne(testCarWithId._id);
      
      expect(searchingCar).to.be.deep.eq(testCarWithId);
    });

    it('fails searching for a car', async () => {
      let error;
      try {
        await carService.readOne('a98sd4as4d8');
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.eq(ErrorTypes.ObjectNotFound);
    });
  });

  describe('Updating a car', () => {
    it('updates a car successfully', async () => {
      const updatingCar = await carService.update(testCarWithId._id, carUpdate);

      expect(updatingCar).to.be.deep.eq(testCarUpdating);
    });

    it('fails to update', async () => {
      let error;
      try {
        await carService.update(testCarWithId._id, '')
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.deep.eq(ErrorTypes.InvalidBody);
    });
  });
});