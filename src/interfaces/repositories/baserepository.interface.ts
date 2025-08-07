import { FilterQuery, UpdateQuery } from "mongoose";

export interface IBaseRepository<T> {
    create(data: Partial<T>): Promise<T>;
    findAll(filter?: FilterQuery<T>): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    findOne(filter: FilterQuery<T>): Promise<T | null>;
    update(id: string, updateData: UpdateQuery<T>): Promise<T | null>;
    findOneAndUpdate(filter: FilterQuery<T>, updateData: UpdateQuery<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    countDocuments(filter: FilterQuery<T>): Promise<number>
}