import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InstallationEntity } from '../installations/installations.entity';
import { BaseEntity } from '#/core/base/base.entity';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 20, unique: true, name: 'client_number' })
  clientNumber: string; // Nº DO CLIENTE

  @Column({ type: 'varchar', length: 20 })
  document: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @OneToMany(() => InstallationEntity, installation => installation.client)
  installations: InstallationEntity[];
}
