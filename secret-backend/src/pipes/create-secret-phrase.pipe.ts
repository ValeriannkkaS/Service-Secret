import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import type { ObjectSchema } from 'joi';

@Injectable()
export class CreateSecretPhrasePipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any): any {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException(error.details[0].message);
    }

    return value;
  }
}
