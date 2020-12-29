import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProcedureController } from './controllers/procedure.controller';
import { ProcedureService } from './services/procedure.service';
import { ProcedureSchema } from './schema/procedure.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'procedure', schema: ProcedureSchema }]),
  ],
  controllers: [ProcedureController],
  providers: [ProcedureService],
})
export class ProcedureModule {}
