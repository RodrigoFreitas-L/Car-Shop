import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './Mongo.model';

const carMongooseSchema = new Schema<ICar>(
  {
    model: String,
    year: Number,
    color: String,
    status: {
      type: Boolean,
      required: false,
    },
    buyValue: Number,
    doorsQty: Number,
    seatsQty: Number,
  },
  {
    versionKey: false,
  },
);

class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Car', carMongooseSchema)) {
    super(model);
  }
}

export default CarModel;