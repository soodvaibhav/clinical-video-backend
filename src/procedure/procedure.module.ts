import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProcedureController } from './procedure.controller';
import { ProcedureService } from './procedure.service';
import { ProcedureSchema } from './dto/schema/procedure.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'procedure', schema: ProcedureSchema }]),
  ],
  controllers: [ProcedureController],
  providers: [ProcedureService],
})
export class ProcedureModule {}
