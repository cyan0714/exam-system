import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ExamSaveDto {
  @IsNotEmpty({ message: '考试 id 不能为空' })
  @Type(() => Number)
  id: number;

  @IsString()
  content: string;
}
