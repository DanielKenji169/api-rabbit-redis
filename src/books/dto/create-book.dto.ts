import { IsNotEmpty, IsString, MaxLength, IsOptional,Max } from "class-validator";

export class CreateBookDto {
    
    @MaxLength(128)
    @IsString()
    @IsNotEmpty()
    title:  string;

    genre:   string;
    author: string;
    forSale: boolean;
    
    @IsOptional()
    @Max(30)
    rentedDays?: number;
}
