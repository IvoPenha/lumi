import { BaseService } from '#/core/base/base.service';
import type { ClientDto } from '../client/client.dto';
import type { ClientService } from '../client/client.service';
import type { InstallationDto } from '../installations';
import type { InstallationService } from '../installations/installation.service';
import type {
  BillClientCreateDto,
  BillCreateDto,
  BillDto,
  BillInstallationCreateDto,
} from './bill.dto';
import type { BillEntity } from './bill.entity';
import type { BillRepository } from './bill.repository';

export class BillService extends BaseService<BillEntity> {
  constructor(
    billRepository: BillRepository,
    private readonly clientService: ClientService,
    private readonly installationService: InstallationService
  ) {
    super(billRepository);
  }

  private async createClient({
    name,
    number,
    document,
    address,
  }: BillClientCreateDto): Promise<ClientDto> {
    const exists = await this.clientService.findOneByFilter({
      clientNumber: number,
    });

    if (exists) {
      const didntHaveAddress = !exists.address && address;
      const didntHaveDocument = !exists.document && document;
      const didntHaveName = !exists.name && name;

      if (didntHaveAddress || didntHaveDocument || didntHaveName) {
        await this.clientService.update(exists.id, {
          address: address || exists.address,
          document: document || exists.document,
          name: name || exists.name,
        });
      }

      return exists;
    }

    const client = await this.clientService.create({
      name,
      clientNumber: number,
    });

    return client;
  }

  private async createInstallation(
    installation: BillInstallationCreateDto,
    client: ClientDto
  ): Promise<InstallationDto> {
    const exists = await this.installationService.findOneByFilter({
      installationNumber: installation.number,
    });

    if (exists) return exists;

    const installationEntity = await this.installationService.create({
      installationNumber: installation.number,
      clientId: client.id,
    });

    return installationEntity;
  }

  async create(bill: BillCreateDto): Promise<BillEntity> {
    const client = await this.createClient(bill.client);

    const installation = await this.createInstallation(
      bill.installation,
      client
    );

    bill.installationId = installation.id;

    delete bill.installation;
    delete bill.client;

    return this.repository.create(bill as unknown as BillDto);
  }

  async paginate(
    options: {
      size?: number;
      page?: number;
      order?: 'ASC' | 'DESC';
      orderby?: string;
    },
    customFilter?: Partial<BillEntity>
  ): Promise<{ data: BillEntity[]; total: number }> {
    const { size = 10, page, order = 'DESC', orderby = 'id' } = options;
    const { installationId, ...filter } = customFilter || {};

    const paginationOptions = {
      size,
      page,
      order,
      orderby,
      relations: ['installation', 'installation.client'],
    };

    const customFilterOptions = {
      ...(installationId && { installationId }),
      ...filter,
    };

    return this.repository.paginate(paginationOptions, customFilterOptions);
  }
}
