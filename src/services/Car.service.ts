import { IService } from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _car:IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }
  
  public async create(obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw Error(ErrorTypes.InvalidBody);
    }

    return this._car.create(parsed.data);
  }
  public async readOne(_id: string): Promise<ICar | null> {
    const car = await this._car.readOne(_id);

    if (!car) throw Error(ErrorTypes.EntityNotFound);

    return car;
  }
  public async read(): Promise<ICar[]> {
    const cars = await this._car.read();

    if (!cars) throw Error(ErrorTypes.EntityNotFound);

    return cars;
  }
  public async update(_id: string, obj: unknown): Promise<ICar | null> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const updatedCar = await this._car.update(_id, parsed.data);

    if (!updatedCar) throw Error(ErrorTypes.EntityNotFound);

    return updatedCar;
  }
  public async delete(_id: string): Promise<ICar | null> {
    const carToDelete = await this._car.delete(_id);

    if (!carToDelete) throw Error(ErrorTypes.EntityNotFound);

    return carToDelete;
  }
}

export default CarService;