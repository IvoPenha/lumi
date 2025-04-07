import type { Request, Response, NextFunction } from 'express';
import type { BaseEntity } from './base.entity';
import type { BaseService } from './base.service';
import { HttpException } from '../exceptions';
import { EMsgError } from '../exceptions/error.enum';

export class BaseController<T extends BaseEntity> {
  constructor(protected readonly service: BaseService<T>) {}

  async findAll(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const entities = await this.service.findAll();
    res.status(200).json(entities);
  }

  async findOne(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const entity = await this.service.findOne(Number(id));
    if (!entity) {
      throw new HttpException(400, EMsgError.NOT_FOUND);
    }
    res.status(200).json(entity);
  }

  async create(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const entity = await this.service.create(req.body);
    res.status(201).json(entity);
  }

  async update(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const updatedEntity = await this.service.update(Number(id), req.body);
    if (!updatedEntity) {
      throw new HttpException(400, EMsgError.UPDATE_FAILED);
    }
    res.status(200).json(updatedEntity);
  }

  async delete(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const deleted = await this.service.delete(Number(id));
    if (!deleted) {
      res.status(404).json({ message: 'Entity not found' });
      return;
    }
    res.status(204).send();
  }

  async paginate(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const { size, page, order, orderby, ...customFilter } = req.query;
    const paginationOptions = {
      size: size ? Number(size) : 10,
      page: page ? Number(page) : 0,
      order: (order as 'ASC' | 'DESC') || 'DESC',
      orderby: (orderby as string) || 'id',
    };
    const result = await this.service.paginate(
      paginationOptions,
      customFilter as Partial<T>
    );
    res.status(200).json({ ...result, ...paginationOptions });
  }
}
