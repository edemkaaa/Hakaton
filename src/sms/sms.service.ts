import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios  from 'axios';


@Injectable()
export class SmsService {
  private readonly login: string;
  private readonly password: string;
  private readonly sender: string;
  private readonly isTestMode: boolean;
  private readonly logger = new Logger(SmsService.name);

  constructor(private configService: ConfigService) {
    this.logger.debug('Initializing SMS Service...');
    
    this.login = this.configService.get<string>('smsc.login') ?? 'test';
    this.password = this.configService.get<string>('smsc.password') ?? 'test';
    this.sender = this.configService.get<string>('smsc.sender') ?? 'DEFAULT';
    this.isTestMode = this.configService.get<boolean>('smsc.test') ?? true;

    this.logger.debug(`SMS Configuration: 
      Login: ${this.login}
      Sender: ${this.sender}
      Test Mode: ${this.isTestMode}
    `);

    if (this.login === 'edemkaaa' || this.password === 'Asanov123') {
      this.logger.warn('Using test credentials for SMSC service');
      this.isTestMode = true;
    }
  }

  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendSms(phone: string, message: string): Promise<boolean> {
    try {
      const formattedPhone = phone.replace(/\D/g, '');
      
      const params = {
        login: this.login,
        psw: this.password,
        phones: formattedPhone,
        mes: message,
        sender: this.sender,
        fmt: 3,
        charset: 'utf-8',
        translit: 1,
      };

      if (this.isTestMode) {
        params['test'] = 1;
      }

      const response = await axios.get('https://smsc.ru/sys/send.php', { params });

      if (response.data.error) {
        this.logger.error(`SMSC Error: ${response.data.error}`);
        return false;
      }

      return true;
    } catch (error) {
      this.logger.error('SMS sending error:', error);
      return false;
    }
  }

  async checkBalance(): Promise<number> {
    try {
      const params = {
        login: this.login,
        psw: this.password,
        fmt: 3,
      };

      const response = await axios.get('https://smsc.ru/sys/balance.php', { params });

      if (response.data.error) {
        this.logger.error(`SMSC Error: ${response.data.error}`);
        return 0;
      }

      return response.data.balance;
    } catch (error) {
      this.logger.error('Balance check error:', error);
      return 0;
    }
  }
}
