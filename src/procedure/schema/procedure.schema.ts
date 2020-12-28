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

  @Prop({ required: true })
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
  // @Prop()
  // _id: string;

  @Prop()
  patient_id: string;

  @Prop()
  procedure_date: Date;

  @Prop()
  patient_dob: Date;

  @Prop()
  study: string;

  @Prop()
  site: string;

  @Prop()
  procedure_type: string;

  @Prop()
  conducting_surgeon: string;

  @Prop()
  surgical_device_liaison: string;

  @Prop()
  total_videos: number;

  @Prop({ required: false })
  implant: string;

  @Prop({ required: false })
  procedureId: string;

  @Prop({ required: false })
  status: string;

  @Prop({ required: false })
  procedureLength: string;

  @ApiProperty({ required: true })
  @Prop([Video])
  video: Video[];
}

export const ProcedureSchema = SchemaFactory.createForClass(Procedure);
