import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ProcedureDto } from './dto2/procedure.dto';
import { DeleteAnnotation } from '../dto/delete-annotation-response.dto';
import { Annotation } from '../dto/annotation.dto';
import { ProcedureService } from '../services/procedure.service';

@ApiTags('Procedure')
@Controller('procedure')
export class ProcedureController {
  constructor(private readonly procedureService: ProcedureService) {}

  @Get()
  @ApiCreatedResponse({
    type: [ProcedureDto],
  })
  getAllProcedure(): Promise<ProcedureDto[]> {
    return this.procedureService.getAllProcedure();
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: ProcedureDto,
  })
  getProcedureById(@Param('id') id: string): Promise<ProcedureDto> {
    return this.procedureService.getProcedure(id);
  }

  @Post()
  @ApiCreatedResponse()
  @ApiBody({ type: ProcedureDto })
  createProcedure(@Body() procedure: ProcedureDto): Promise<ProcedureDto> {
    return this.procedureService.createProcedure(procedure);
  }

  @Patch('/updateAnnotation/:videoId/:procedureId')
  @ApiCreatedResponse({
    type: ProcedureDto,
  })
  @ApiBody({ type: [Annotation] })
  updateAnnotations(
    @Param('videoId') videoID: string,
    @Param('procedureId') procedureId: string,
    @Body() annotationList: Annotation[],
  ): Promise<ProcedureDto> {
    return this.procedureService.updateAnnotations(
      videoID,
      procedureId,
      annotationList,
    );
  }

  @Delete('/deleteAnnotation/:procedureId/:videoId/:annotationId')
  @ApiCreatedResponse({ type: DeleteAnnotation })
  deleteAnnotation(
    @Param('procedureId') procedureId: string,
    @Param('videoId') videoId: string,
    @Param('annotationId') annotationId: string,
  ): Promise<DeleteAnnotation> {
    return this.procedureService.deleteAnnotation(
      procedureId,
      videoId,
      annotationId,
    );
  }
}
