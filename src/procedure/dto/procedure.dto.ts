/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Video } from './video.dto';

export class ProcedureDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  patient_id: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ type: Date })
  procedure_date: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ type: Date })
  patient_dob: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  study: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  site: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  procedure_type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  conducting_surgeon: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  surgical_device_liaison: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  total_videos: number;

  @IsString()
  @ApiProperty({ type: String })
  implant: string;

  @IsString()
  @ApiProperty({ type: String })
  procedureId: string;

  @IsString()
  @ApiProperty({ type: String })
  status: string;

  @IsString()
  @ApiProperty({ type: String })
  procedureLength: string;

  @ArrayNotEmpty()
  @ApiProperty({ type: [Video] })
  video: Video[];
}
