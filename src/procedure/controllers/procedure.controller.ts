import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ProcedureDto } from '../dto/procedure.dto';
import { DeleteAnnotation } from '../dto/delete-annotation-response.dto';
import { Annotation } from '../dto/annotation.dto';
import { ProcedureService } from '../services/procedure.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { mkdirSync } from 'fs';
import { join } from 'path';
import environment from '../../environment/environment.local';
import { v4 as uuidv4 } from 'uuid';

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
  @UseInterceptors(
    FilesInterceptor('videos', 20, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const path = join(environment.staticFilesPath, 'videos');
          mkdirSync(path, { recursive: true });
          cb(null, path);
        },
        filename: (req, file, cb) => {
          let fileNameArray = file.originalname.split('.');
          const extension = fileNameArray.pop();
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            fileNameArray.join('.') + '-' + uniqueSuffix + '.' + extension,
          );
        },
      }),
    }),
  )
  createProcedure(
    @UploadedFiles() videos,
    @Body() procedure: ProcedureDto,
  ): Promise<ProcedureDto> {
    if (videos && videos.length < 1) {
      throw new BadRequestException('Kindly attach 1 or more videos');
    }
    procedure.video = videos.map((video) => ({
      videoId: uuidv4(),
      name: video.filename,
      formats: ['raw'],
    }));

    return this.procedureService.createProcedure(procedure);
  }

  @Patch('/updateAnnotation/:videoId/:procedureId')
  @ApiCreatedResponse({
    type: ProcedureDto,
  })
  @ApiBody({ type: [Annotation] })
  updateAnnotations(
    @Param('videoId') videoId: string,
    @Param('procedureId') procedureId: string,
    @Body() annotationList: Annotation[],
  ): Promise<ProcedureDto> {
    return this.procedureService.updateAnnotations(
      videoId,
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
