import { Router } from 'express';
import { InstallationRepository } from './installation.repository';
import { dataSource } from '#/infra';
import { InstallationService } from './installation.service';
import { InstallationController } from './installation.controller';
import { InstallationEntity } from './installations.entity';

const InstallationRouter = Router();

const installationRepository = new InstallationRepository(
  dataSource,
  InstallationEntity
);
const installationService = new InstallationService(installationRepository);
const installationController = new InstallationController(installationService);

InstallationRouter.post('/', (...n) => installationController.create(...n));
InstallationRouter.put('/:id', (...n) => installationController.update(...n));
InstallationRouter.get('/', (...n) => installationController.paginate(...n));
InstallationRouter.delete('/:id', (...n) =>
  installationController.delete(...n)
);
InstallationRouter.get('/:id', (...n) => installationController.findOne(...n));
InstallationRouter.get('/all', (...n) => installationController.findAll(...n));

export { InstallationRouter, installationService };
