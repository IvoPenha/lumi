import { BaseController } from '#/core/base/base.controller';
import type { NextFunction, Response, Request } from 'express';
import type { ClientEntity } from './client.entity';
import type { ClientService } from './client.service';

export class ClientController extends BaseController<ClientEntity> {
  constructor(private readonly clientService: ClientService) {
    super(clientService);
  }

  async paginate(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const { size, page, order, orderby, ...customFilter } = req.query;
    const paginationOptions = {
      size: size ? Number(size) : undefined,
      page: page ? Number(page) : undefined,
      order: order as 'ASC' | 'DESC',
      orderby: orderby as string,
    };
    const result = await this.clientService.paginate(
      paginationOptions,
      customFilter as Partial<ClientEntity>
    );
    res.status(200).json({ result });
  }
}
