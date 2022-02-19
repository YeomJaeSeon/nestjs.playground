import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';

/**
 * ParseIntPipe 구현해보기
 */

@Injectable()
export class PassThroughPipe implements PipeTransform<string, string> { //Pipetransform은 지네릭이다. 첫번째는 요청 타입, 두번재는 응답 타입
  transform(value: string, metadata: ArgumentMetadata): any {
    //value: 현재 처리하려는 인자 입력값
    //metadata: 입력값에 대한 정보

    return '변경!'
  }
}
