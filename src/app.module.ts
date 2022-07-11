import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, ConfigModule.forRoot({ 
    ignoreEnvFile: true,
    isGlobal: true,
    load: [getConfig] 
  })],
})
export class AppModule {}
