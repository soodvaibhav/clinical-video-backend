import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import environment from './environment/environment.local';
import { ProcedureModule } from './procedure/procedure.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongoURI),
    ProcedureModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
    }),
  ],
})
export class AppModule {}
