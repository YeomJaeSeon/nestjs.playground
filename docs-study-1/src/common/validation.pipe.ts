import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

// customm validation pipe
@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
