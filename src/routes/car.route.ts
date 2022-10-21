import { Router } from 'express';
import CarController from '../controllers/Car.controller';
import Car from '../models/Car.model';
import CarService from '../services/Car.service';

const route = Router();

const car = new Car();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post('/cars', (req, res) => carController.create(req, res));

export default route;