import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CONNECTION } from '../../constants/constansts';
import { Pool } from 'pg';

/**
 * Сервис модуля pg.module для взаимодействия с базой данных Postgres
 * */
@Injectable()
export class PgService {
  constructor(@Inject(CONNECTION) private connection: Pool) {}

  /**
   * Функция используется для упрощения взаимодействия с базой данных Postgres
   * Функция находит нужную запись в базе данных, удаляет ее и возвращает некоторые поля удаленной записи
   *
   * @param{string} table - строка с названием таблицы, из которой нужно удалить запись
   * @param{string} where - строка с названием поля, по которому идет поиск
   * @param{string} what - значение для сопоставления и поиска в таблице
   * @param{string} returning - строка с полями, которые функция должна вернуть
   *
   * @throws HttpException с кодом 500, если возникли проблемы во время взаимодействия с базой данных
   * @returns Promise<Returning> - объект с полями которые были указаны агрументом при вызове
   * */
  async delete<Returning>(
    table: string,
    where: string,
    what: unknown,
    returning: string,
  ): Promise<Returning> {
    const client = await this.connection.connect();
    try {
      const queryText = `DELETE FROM ${table} WHERE ${where} = $1 RETURNING ${returning}`;
      const result = await client.query(queryText, [what]);
      console.log(result);
      return result.rows[0];
    } catch (err) {
      throw new HttpException(
        'failed to delete entry',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      client.release();
    }
  }

  /**
   * Функция используется для упрощения взаимодействия с базой данных Postgres
   * Функция находит нужную запись в базе данных, обновляет ее и возвращает число обновленных полей
   *
   * @param{string} table - строка с названием таблицы, в которой нужно обновить запись
   * @param{string} where - строка с названием поля, по которому идет поиск
   * @param{string} what - значение для сопоставления и поиска в таблице
   * @param{string} field - строка с полями, которые функция должна обновить
   * @param{any} newValue - массив с новыми значениями полей, которые должны быть установлены
   *
   * @throws HttpException с кодом 500, если возникли проблемы во время взаимодействия с базой данных
   * @returns Promise<Number> - число (количество) обновленных полей
   * */
  async update(
    table: string,
    field: string,
    newValue: any,
    where: string,
    what: unknown,
  ): Promise<number> {
    const client = await this.connection.connect();
    try {
      const updateQueryText = `UPDATE ${table} SET ${field} = $1 WHERE ${where} = $2`;
      const result = await client.query(updateQueryText, [newValue, what]);
      return result.rowCount;
    } catch (error) {
      throw new HttpException(
        'failed to Update entry',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      client.release();
    }
  }

  /**
   * Функция используется для упрощения взаимодействия с базой данных Postgres
   * Функция находит истекшие записи в базе данных, сравнивая их поле expires_at с текущим моментом времени
   * И возвращает нужные поля этих записей в виде массива объектов
   *
   * @param{string} table - строка с названием таблицы, в которой нужно найти истекшие записи
   * @param{string} field - строка с полями, которые функция должна вернуть после нахождения
   *
   * @throws HttpException с кодом 500, если возникли проблемы во время взаимодействия с базой данных
   * @returns Promise<Field[]> - массив объектов с выбранными полями истекших записей
   * */
  async findExpiredEntries<Field>(
    table: string,
    field: string,
  ): Promise<Field[]> {
    const client = await this.connection.connect();
    try {
      const queryText = `SELECT ${field} FROM ${table} WHERE expires_at < NOW()`;
      const result = await client.query(queryText);
      return result.rows as Field[];
    } catch (err) {
      throw new HttpException(
        'failed to find expired entries entry',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      client.release();
    }
  }

  /**
   * Функция используется для упрощения взаимодействия с базой данных Postgres
   * Функция находит нужную запись в базе данных, и возвращает нужные поля этой записи
   *
   * @param{string} table - строка с названием таблицы, в которой нужно найти запись
   * @param{string} where - строка с названием поля, по которому идет поиск
   * @param{string} what - значение для сопоставления и поиска в таблице
   * @param{string} field - строка с полями, которые функция должна вернуть
   *
   * @throws HttpException с кодом 500, если возникли проблемы во время взаимодействия с базой данных
   * @returns Promise<Fields> - объект с полями найденной записи, указанными при вызове функции
   * */
  async find<Fields>(
    table: string,
    field: string = '*',
    where: string,
    what: string,
  ): Promise<Fields> {
    const client = await this.connection.connect();
    try {
      const queryText = `SELECT ${field} FROM ${table} WHERE ${where} = $1`;
      const result = await client.query(queryText, [what]);
      return result.rows[0] as Fields;
    } catch (error) {
      throw new HttpException(
        'failed to Update entry',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      client.release();
    }
  }

  /**
   * Функция используется для упрощения взаимодействия с базой данных Postgres
   * Функция принимает параметром объект с нужными для записи полями и создает в базе данных новую запись на основе этих данных,
   * Затем функция возвращает выбранные поля
   *
   * @param{string} table - строка с названием таблицы, в которой нужно найти запись
   * @param{Record<string, any>} insertValues - объект, где ключи - это названия полей таблицы, а значения - это значения для записи
   * @param{string} returning - строка с полями, которые функция должна вернуть
   *
   * @throws HttpException с кодом 500, если возникли проблемы во время взаимодействия с базой данных
   * @returns Promise<Returning> - объект с полями созданной записи, указанными при вызове функции
   * */
  async insert<Returning>(
    table: string,
    insertValues: Record<string, any>,
    returning: string = '*',
  ): Promise<Returning> {
    const client = await this.connection.connect();
    try {
      const fields = Object.keys(insertValues);
      const values = Object.values(insertValues);

      const placeholders$ = values.map((_, i) => `$${i + 1}`).join(', ');
      const queryText = `INSERT INTO ${table}(${fields.join(', ')}) VALUES (${placeholders$}) RETURNING ${returning}`;

      const result = await client.query(queryText, values);
      await client.query('COMMIT');
      return result.rows[0] as Returning;
    } catch (error) {
      await client.query('ROLLBACK');
      throw new HttpException(
        'failed to Update entry',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      client.release();
    }
  }
}
