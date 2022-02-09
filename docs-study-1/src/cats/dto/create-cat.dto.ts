export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
// dto는 typescript의 interface보단 class로 작성하는 것이 좋다
// dto는 data transfer object로 단순히 요청오는 데이터를 컨트롤러로 받는데 사용하는 객체가 아닌 layer간 이동할때 사용하는 객체로 알구있는데 아닌감?
