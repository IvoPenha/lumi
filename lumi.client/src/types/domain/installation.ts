import type { Client } from './Client';

export type Installation = {
  id: number;
  createdAt: Date;
  deletedAt: Date | null;
  installationNumber: string;
  clientId: number;
  label: string | null;
  client: Client;
};
