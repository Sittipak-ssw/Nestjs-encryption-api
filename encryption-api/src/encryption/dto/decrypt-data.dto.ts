import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecryptDataDto {
  @ApiProperty({
    example: 'base64-encoded-key',
    description: 'ข้อมูล key ที่ถูกเข้ารหัส (data1)',
    required: true,
  })
  @IsString()
  data1: string;

  @ApiProperty({
    example: 'base64-encoded-payload',
    description: 'ข้อมูล payload ที่ถูกเข้ารหัส (data2)',
    required: true,
  })
  @IsString()
  data2: string;
}