import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PgService } from '../pg/pg.service';
import { ResponseInterface } from '../../interfaces/responseInterfaces';

@Injectable()
export class TasksService {
  constructor(private readonly pgService: PgService) {}

  @Cron('0 */5 * * * *')
  async handleCron() {
    console.log('Cron running tasks');
    const ids: ResponseInterface[] = await this.pgService.findExpiredEntries(
      'secret_table',
      'id',
    );
    const deletedEntries: ResponseInterface[] = [];
    for (let i = 0; i < ids.length; i++) {
      const deletedEntrie = await this.pgService.delete(
        'secret_table',
        'id',
        ids[i].id,
      );
      deletedEntries.push(deletedEntrie);
    }
    console.log('Deleted entries:', deletedEntries);
  }
}
