import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/commons/dto/pagination.dto';

export class SearchDto extends PaginationDto {
  @IsOptional()
  name: string;
}
