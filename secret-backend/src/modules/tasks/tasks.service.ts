import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PgService } from '../pg/pg.service';
import { IdResponse } from '../secret/interfaces/id-response.interface';

/**
 * Сервис модуля tasks.module для периодического удаления истекших фраз из базы данных,
 * использует методы из модуля pg.module
 * */
@Injectable()
export class TasksService {
  constructor(private readonly pgService: PgService) {}

  /**
   * Cron задача сервера, которая выполняется каждые 5 минут
   * Функция находит истекшие записи секретных фраз в базе данных с помощью функции из другого модуля,
   * а затем удаляет их все из базы данных с помощью функции из другого модуля,
   * а затем выводит массив объектов с полем id удаленных записей в логи сервера
   * */
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
