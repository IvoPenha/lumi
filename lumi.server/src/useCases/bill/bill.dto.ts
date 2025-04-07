import type { BillEntity } from './bill.entity';

export type BillDto = Partial<BillEntity>;

export type BillClientCreateDto = {
  name?: string;
  number: string;
  address?: string;
  document?: string;
};

export type BillInstallationCreateDto = {
  number: string;
  city?: string;
};

export type BillCreateDto = Partial<BillDto> & {
  client: BillClientCreateDto;
  installation: BillInstallationCreateDto;
};
