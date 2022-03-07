import {IsInt, IsString} from "class-validator";

export class CreateCatDto{
    @IsString()
    name: string;
    @IsInt()
    age: number;
    @IsString()
    breed: string;
}

export interface Cat{
    name: string;
    age: number;
    breed: string
}

export class CreateUserDto{
    @IsString()
    name: string;
    @IsInt()
    age: number;
}