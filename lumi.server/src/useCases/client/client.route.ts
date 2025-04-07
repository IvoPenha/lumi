import { Router } from 'express';
import { ClientRepository } from './client.repository';
import { dataSource } from '#/infra';
import { ClientEntity } from './client.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

const ClientRouter = Router();

const clientRepository = new ClientRepository(dataSource, ClientEntity);
const clientService = new ClientService(clientRepository);
const clientController = new ClientController(clientService);

ClientRouter.post('/', (...n) => clientController.create(...n));
ClientRouter.put('/:id', (...n) => clientController.update(...n));
ClientRouter.get('/', (...n) => clientController.paginate(...n));
ClientRouter.delete('/:id', (...n) => clientController.delete(...n));
ClientRouter.get('/:id', (...n) => clientController.findOne(...n));
ClientRouter.get('/all', (...n) => clientController.findAll(...n));

export { ClientRouter, clientService };
