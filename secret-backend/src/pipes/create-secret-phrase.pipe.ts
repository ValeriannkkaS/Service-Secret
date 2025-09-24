import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CreateSecretPhrasePipe implements PipeTransform {
  transform(value: any): any {
    if (
      !value.secretPhrase ||
      typeof value.secretPhrase !== 'string' ||
      value.secretPhrase.length === ''
    ) {
      throw new BadRequestException(
        `Invalid secret phrase: ${value.secretPhrase}`,
      );
    }
    if (
      (value.availableViews !== 1 &&
        value.availableViews !== 3 &&
        value.availableViews !== 5 &&
        value.availableViews !== 10) ||
      typeof value.availableViews !== 'number'
    ) {
      throw new BadRequestException(
        `Invalid available views count: ${value.availableViews}`,
      );
    }
    if (typeof value.expiresInTimestamp !== 'number') {
      throw new BadRequestException(
        `Invalid available views count: ${value.expiresInTimestamp}`,
      );
    }
    return value;
  }
}
