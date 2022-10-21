import * as sinon from 'sinon';
import chai from 'chai';
import { NextFunction, Request, Response } from 'express';
import { carUpdate, testCar, testCarUpdating, testCarWithId, invalidCar } from '../../mocks/carMock';
import CarController from '../../../controllers/Car.controller';
import CarService from '../../../services/Car.service';
import CarModel from '../../../models/Car.model';
const { expect } = chai;

describe('Car Controller testing', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon
      .stub(carService, 'create')
      .onCall(0)
      .resolves(testCar);
    sinon
      .stub(carService, 'readOne')
      .onCall(0)
      .resolves(testCarWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creates a car', () => {
    it('creates a car successfully', async () => {
      req.body = testCar;
      await carController.create(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(testCar)).to.be.true;
    });
  });

  describe('Searching for a car', () => {
    it('searching for a car successfully', async () => {
      req.params = { id: testCarWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(testCarWithId)).to.be.true;
    });
  });
});