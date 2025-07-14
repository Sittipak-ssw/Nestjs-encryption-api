import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { PUBLIC_KEY, PRIVATE_KEY } from '../common/rsa-keys';

@Injectable()
export class EncryptionService {
  generateAesKey(): string {
    return crypto.randomBytes(32).toString('base64');
  }

  encryptWithAes(payload: string, key: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'base64'), iv);
    let encrypted = cipher.update(payload, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return iv.toString('base64') + ':' + encrypted;
  }

  decryptWithAes(data: string, key: string): string {
    const [iv, encrypted] = data.split(':');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'base64'), Buffer.from(iv, 'base64'));
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  encryptKeyWithPrivateKey(key: string): string {
    return crypto.privateEncrypt(PRIVATE_KEY, Buffer.from(key, 'base64')).toString('base64');
  }

  decryptKeyWithPublicKey(data: string): string {
    return crypto.publicDecrypt(PUBLIC_KEY, Buffer.from(data, 'base64')).toString('base64');
  }
}