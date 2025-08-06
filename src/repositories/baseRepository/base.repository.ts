import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';
import { IBaseRepository } from '../../interfaces/repositories/baserepository.interface';

export default class BaseRepository<T extends Document> implements IBaseRepository<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
        return this.model.find(filter).exec();
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        return this.model.findOne(filter).exec();
    }

    async update(id: string, updateData: UpdateQuery<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
