import type { BaseEntity } from './base.entity';
import type { BaseRepository } from './base.repository';

export class BaseService<T extends BaseEntity> {
  constructor(protected readonly repository: BaseRepository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async create(entity: Partial<T>): Promise<T> {
    return this.repository.create(entity);
  }

  async findOne(id: number): Promise<T | null> {
    return this.repository.findById(id);
  }

  async findOneByFilter(filter: Partial<T>): Promise<T | null> {
    return this.repository.findOneByFilter(filter);
  }

  async update(id: number, entity: Partial<T>): Promise<T | null> {
    return this.repository.update(id, entity);
  }

  async delete(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }

  async paginate(
    options: {
      size?: number;
      page?: number;
      order?: 'ASC' | 'DESC';
      orderby?: string;
    },
    customFilter: Partial<T> = {}
  ): Promise<{ data: T[]; total: number }> {
    return this.repository.paginate(options, customFilter);
  }
}
