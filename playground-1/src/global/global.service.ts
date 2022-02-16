import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
    global(){
        return 'global service'
    }
}
