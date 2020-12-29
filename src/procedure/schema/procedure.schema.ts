/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ProcedureDocument = Procedure & Document;

@Schema()
class Video {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: false })
  public subtitles: string;

  @Prop({ required: false })
  public videoId: string;

  @Prop({ required: false })
  public formats: string[];

  @Prop({ required: false })
  public annotations: Annotation[];

}

@Schema()
class Annotation {
  @Prop({ required: true })
  public id: string;

  @Prop({ required: true })
  public time: string;

  @Prop({ required: true })
  public comments: string;

  @Prop({ required: true })
  public videoPlayerTime: string;
}

@Schema()
export class Procedure {
  @Prop()
  patientId: string;

  @Prop()
  procedureDate: Date;

  @Prop()
  patientDob: Date;

  @Prop()
  study: string;

  @Prop()
  site: string;

  @Prop()
  procedureType: string;

  @Prop()
  conductingSurgeon: string;

  @Prop()
  surgicalDeviceLiaison: string;

  // @Prop({ required: false })
  // implant: string;

  // @Prop({ required: false })
  // procedureId: string;

  // @Prop({ required: false })
  // status: string;

  // @Prop({ required: false })
  // procedureLength: string;

  @ApiProperty({ required: true })
  @Prop([Video])
  video: Video[];
}

export const ProcedureSchema = SchemaFactory.createForClass(Procedure);
