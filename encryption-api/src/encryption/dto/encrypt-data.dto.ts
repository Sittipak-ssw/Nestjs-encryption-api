import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EncryptDataDto {
  @ApiProperty({
    example: 'Hello, this is a secret message!',
    description: 'ข้อความที่ต้องการเข้ารหัส (0-2000 ตัวอักษร)',
    minLength: 1,
    maxLength: 2000,
    required: true,
  })
  @IsString()
  @Length(1, 2000)
  payload: string;
}