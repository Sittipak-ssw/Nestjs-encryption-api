import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { EncryptionService } from './encryption.service';
import { EncryptDataDto } from './dto/encrypt-data.dto';
import { DecryptDataDto } from './dto/decrypt-data.dto';

@ApiTags('encryption')
@Controller()
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post('get-encrypt-data')
  @ApiBody({ type: EncryptDataDto })
  @ApiResponse({ status: 201, description: 'Encrypted data' })
  async encryptData(@Body() body: EncryptDataDto) {
    const aesKey = this.encryptionService.generateAesKey();
    const data2 = this.encryptionService.encryptWithAes(body.payload, aesKey);
    const data1 = this.encryptionService.encryptKeyWithPrivateKey(aesKey);

    return {
      successful: true,
      error_code: '',
      data: { data1, data2 },
    };
  }

  @Post('get-decrypt-data')
  @ApiBody({ type: DecryptDataDto })
  @ApiResponse({ status: 201, description: 'Decrypted data' })
  async decryptData(@Body() body: DecryptDataDto) {
    try {
      const aesKey = this.encryptionService.decryptKeyWithPublicKey(body.data1);
      const payload = this.encryptionService.decryptWithAes(body.data2, aesKey);
      return {
        successful: true,
        error_code: '',
        data: { payload },
      };
    } catch (e) {
      return {
        successful: false,
        error_code: 'DECRYPTION_ERROR',
        data: null,
      };
    }
  }
}
