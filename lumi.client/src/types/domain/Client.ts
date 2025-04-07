export type Client = {
  id: number;
  createdAt: Date;
  deletedAt: Date | null;
  name: string;
  clientNumber: string;
  document: string | null;
  address: string | null;
};
