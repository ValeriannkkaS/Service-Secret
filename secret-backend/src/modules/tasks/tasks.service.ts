import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PgService } from '../pg/pg.service';
import { IdResponse } from '../secret/interfaces/id-response.interface';

@Injectable()
export class TasksService {
  constructor(private readonly pgService: PgService) {}

  @Cron('0 */5 * * * *')
  async handleCron(): Promise<void> {
    console.log('Cron running tasks');
    const ids: IdResponse[] =
      await this.pgService.findExpiredEntries<IdResponse>('secret_table', 'id');
    const deletedEntries: IdResponse[] = [];
    for (let i = 0; i < ids.length; i++) {
      const deletedEntrie = await this.pgService.delete<{ id: string }>(
        'secret_table',
        'id',
        ids[i].id,
        'id',
      );
      deletedEntries.push(deletedEntrie);
    }
    console.log('Deleted entries:', deletedEntries);
  }
}
