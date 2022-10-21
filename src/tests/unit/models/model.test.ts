import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import Car from '../../../models/Car.model';
import { Model } from 'mongoose';
import { carUpdate, testCar, testCarUpdating, testCarWithId } from '../../mocks/carMock';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Model testing', () => {
  const carModel = new Car();

  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(testCarWithId);
    sinon
      .stub(Model, 'findOne')
      .resolves(testCarWithId);
    sinon
      .stub(Model, 'findByIdAndUpdate')
      .onCall(0)
      .resolves(testCarUpdating)
      .onCall(1)
      .resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  it('creates a Car successfully', async () => {
    const newCar = await carModel.create(testCar);
    expect(newCar).to.be.deep.equal(testCarWithId);
  });

  it('search for a car', async () => {
    const carFound = await carModel.readOne(testCarWithId._id);
    expect(carFound).to.be.deep.equal(testCarWithId);
  });

  it('_id not found', async () => {
    try {
      await carModel.readOne('398473489');
    } catch (error: any) {
      expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
    }
  });

  it('updates a car', async () => {
    const updatingCar = await carModel.update(testCarWithId._id, carUpdate);
    expect(updatingCar).to.be.deep.equal(testCarUpdating);
  });
});