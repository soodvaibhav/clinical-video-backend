import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProcedureDto } from '../dto/procedure.dto';
import { Procedure, ProcedureDocument } from '../schema/procedure.schema';
import { DeleteAnnotation } from '../dto/delete-annotation-response.dto';
import { Annotation } from '../dto/annotation.dto';
import * as fs from 'fs';
import { join } from 'path';
import env from '../../environment/environment.local';
import { mkdirSync } from 'fs';
import environment from '../../environment/environment.local';

@Injectable()
export class ProcedureService {
  constructor(
    @InjectModel('procedure') private procedureModel: Model<ProcedureDocument>,
  ) {}

  /**
   * finds and returns `Procedure` by ID
   * @param id : procedure id
   */
  async getProcedure(id: string): Promise<Procedure> {
    const procedure = await this.procedureModel.findById(id).exec();
    if (!procedure) {
      throw new NotFoundException();
    }
    return procedure;
  }

  getAllProcedure(): Promise<Procedure[]> {
    return this.procedureModel.find().exec();
  }

  /**
   * @param procedure: Procedure object that will be created and stored in DB
   */
  async createProcedure(procedure: ProcedureDto): Promise<Procedure> {
    const procedureModel = new this.procedureModel(procedure);
    return procedureModel.save();
  }

  /**
   * overwrites annotation list by user provided annotation list
   * @param videoId : id of video object
   * @param procedureId : id of procedure
   * @param annotationList : annotation list that will overwrite  current list
   */
  async updateAnnotations(
    videoId: string,
    procedureId: string,
    annotationList: Annotation[],
  ): Promise<ProcedureDto> {
    const annotation = annotationList;

    const procedure = await this.getProcedure(procedureId);

    for (const iterator of procedure.video) {
      if (iterator.videoId === videoId) {
        try {
          const allAnnotation = iterator.annotations.concat(annotation);

          // const path = join(__dirname, '..', '..', '..', 'assets');
          const path = join(environment.staticFilesPath, 'annotations');
          mkdirSync(path, { recursive: true });
          const filename = procedureId + '-' + videoId + '-annotaion' + '.vtt';
          const fileContents = this.generateAnnotationTemplate(allAnnotation);
          /// write file
          fs.writeFileSync(join(path, filename), fileContents);
          const index = procedure.video.indexOf(iterator);
          iterator.annotations = allAnnotation;
          iterator.subtitles = filename;
          procedure.video[index] = iterator;
          const procedureModel = new this.procedureModel(procedure);
          return procedureModel.save();
        } catch (e) {
          throw new NotFoundException({
            status: 404,
            description: 'Error while saving file',
          });
        }
      }
    }
    throw new NotFoundException({
      status: 404,
      description: 'procedure id/video id not found',
    });
  }

  private generateAnnotationTemplate(annotationList: Annotation[]): string {
    const annotationHeader = 'WEBVTT\n';

    let annotationString = '';
    for (const iterator of annotationList) {
      annotationString =
        annotationString +
        this.createAnnotation(
          iterator.time,
          iterator.endtime,
          iterator.comments,
        );
    }

    const fileContents = annotationHeader + annotationString + '\n';
    return fileContents;
  }

  private createAnnotation(startTime, endTime, comments) {
    const annotation = `\n${startTime}.000 --> ${endTime}.000\n${comments}\n`;
    return annotation;
  }

  /**
   * deletes annotation from procedure
   * @param procedureId : id of procedure
   * @param videoId : id of video
   * @param annotationId : annotation id to be deleted
   */
  async deleteAnnotation(
    procedureId: string,
    videoId: string,
    annotationId: string,
  ): Promise<DeleteAnnotation> {
    const procedure = await this.getProcedure(procedureId);

    for (const iterator of procedure.video) {
      if (iterator.videoId === videoId) {
        const updatedAnnotationList = iterator.annotations.filter(
          (annotation) => annotation.id !== annotationId,
        );
        iterator.annotations = updatedAnnotationList;
        const fileContents = this.generateAnnotationTemplate(
          updatedAnnotationList,
        );

        // const path = join(environment.staticFilesPath, 'annotations');
        // mkdirSync(path, { recursive: true });
        // const filename = procedureId + '-' + videoId + '-annotaion' + '.vtt';
        // /// write file
        // fs.writeFileSync(join(path, filename), fileContents);
        const updatedProcedure = new this.procedureModel(procedure);
        await updatedProcedure.save();
        const temp: DeleteAnnotation = {
          procedureId,
          videoId,
          annotationId,
        };
        return temp;
      }
    }
    throw new NotFoundException({
      status: 404,
      description: 'invalid values',
    });
  }

  /**
   * get file stream to download file
   */
async getVideoFile(path: string) {
    return await new Promise<Buffer>((resolve, reject) => {
      fs.readFile(path, {}, (err, data) => {
        if (err) {
          console.log(err);

          reject(err);
        } else {
          console.log(data);

          resolve(data);
        }
      });
    });
  }
}
