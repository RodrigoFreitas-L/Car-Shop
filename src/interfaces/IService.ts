export interface IService<T> {
  create(obj: unknown):Promise<T>,
  readOne(_id: string):Promise<T | null>,
  read():Promise<T[]>,
  update(_id: string, obj: unknown):Promise<T | null>,
  delete(_id: string):Promise<T | null>,
}