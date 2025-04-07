import { BaseEntity } from '#/core/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BillEntity } from '../bill/bill.entity';
import { ClientEntity } from '../client/client.entity';

@Entity('installations')
export class InstallationEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
    name: 'installation_number',
  })
  installationNumber: string;

  @Column({ type: 'int', nullable: true, name: 'client_id' })
  clientId: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  label: string;

  @ManyToOne(() => ClientEntity, client => client.installations)
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @OneToMany(() => BillEntity, bill => bill.installation)
  bills: BillEntity[];
}
