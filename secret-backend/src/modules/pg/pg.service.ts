import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CONNECTION } from '../../constants/constansts';
import { Pool } from 'pg';

@Injectable()
export class PgService {
  constructor(@Inject(CONNECTION) private connection: Pool) {}

  async delete<Returning>(
    table: string,
    where: string,
    what: string,
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
