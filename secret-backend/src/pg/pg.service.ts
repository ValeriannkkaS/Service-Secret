import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CONNECTION } from '../constants/constansts';

@Injectable()
export class PgService {
  constructor(@Inject(CONNECTION) private connection) {}

  async findOneAndDelete(table: string, where: unknown, what: unknown) {
    const client = await this.connection.connect();
    try {
      const queryText = `DELETE FROM ${table} WHERE ${where} = $1`;
      const result = await client.query(queryText, [what]);
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

  async findOneAndUpdate(
    table: string,
    field: string,
    newValue: any,
    where: string,
    what: unknown,
  ) {
    const client = await this.connection.connect();
    try {
      const updateQueryText = `UPDATE ${table} SET ${field} = $1 WHERE ${where} = $2`;
      const result = await client.query(updateQueryText, [newValue, what]);
      return result.rows[0];
    } catch (error) {
      throw new HttpException(
        'failed to Update entry',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      client.release();
    }
  }

  async findOne(
    table: string,
    field: string = '*',
    where: string,
    what: unknown,
  ) {
    const client = await this.connection.connect();
    try {
      const queryText = `SELECT ${field} FROM ${table} WHERE ${where} = $1`;
      const result = await client.query(queryText, [what]);
      return result.rows[0];
    } catch (error) {
      throw new HttpException(
        'failed to Update entry',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      client.release();
    }
  }
  async insert(table: string, insertValues: object, returning: string = '*') {
    const client = await this.connection.connect();
    try {
      const fields = Object.keys(insertValues);
      const values = Object.values(insertValues);

      const queryText = `INSERT INTO ${table}(${fields.join(', ')}) VALUES ($1, $2, $3, $4, $5) RETURNING ${returning}`;

      const result = await client.query(queryText, values);
      await client.query('COMMIT');
      return result.rows[0];
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
