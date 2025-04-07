import type {
  DataSource,
  DeepPartial,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import type { BaseEntity } from './base.entity';

export type PaginationOptions<T> = {
  size?: number;
  page?: number;
  order?: 'ASC' | 'DESC';
  orderby?: keyof T;
};

export type CustomFilter<T> = {
  [key in keyof T]?: T[key] | null;
};

export abstract class BaseRepository<T extends BaseEntity> {
  protected repo: Repository<T>;

  constructor(
    protected readonly dataSource: DataSource,
    entity: new () => T
  ) {
    this.repo = this.dataSource.getRepository(entity);
  }

  getRepository(): Repository<T> {
    return this.repo;
  }

  async create(data: Partial<T>): Promise<T> {
    const created = this.repo.create(data as DeepPartial<T>);
    await this.repo.save(created);
    return created;
  }

  async findById(id: number): Promise<T | null> {
    return await this.repo.findOne({ where: { id } as FindOptionsWhere<T> });
  }

  async findOneByFilter(filter: CustomFilter<T> = {}): Promise<T | null> {
    return await this.repo.findOne({ where: filter as FindOptionsWhere<T> });
  }

  async findAll(): Promise<T[]> {
    return await this.repo.find();
  }

  async update(id: number, data: Partial<T>): Promise<T | null> {
    const found = await this.repo.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
    if (!found) return null;
    const merged = this.repo.merge(found, data as DeepPartial<T>);
    return await this.repo.save(merged);
  }

  async delete(id: number): Promise<boolean> {
    const found = await this.repo.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
    if (!found) return false;
    await this.repo.softDelete(found.id);
    return true;
  }

  async hardDelete(id: number): Promise<boolean> {
    const found = await this.repo.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
    if (!found) return false;
    await this.repo.delete(found.id);
    return true;
  }

  async paginate(
    { size = 10, page = 0, order = 'DESC', orderby = 'id', relations = [] },
    customFilter: CustomFilter<T> = {}
  ): Promise<{ data: T[]; total: number }> {
    const [data, total] = await this.repo.findAndCount({
      where: customFilter as FindOptionsWhere<T>,
      take: size,
      skip: page * size,
      relations: relations,
      order: {
        [orderby]: order,
      } as any,
    });

    return { data, total };
  }
}
