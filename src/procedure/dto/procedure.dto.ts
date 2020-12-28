/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Video } from './video.dto';

export class ProcedureDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  patientId: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ type: Date })
  procedureDate: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ type: Date })
  patientDob: Date;

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
  procedureType: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  conductingSurgeon: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  surgicalDeviceLiaison: string;

  // @IsString()
  // @ApiProperty({ type: String })
  // implant: string;

  // @IsString()
  // @ApiProperty({ type: String })
  // procedureId: string;

  // @IsString()
  // @ApiProperty({ type: String })
  // status: string;

  // @IsString()
  // @ApiProperty({ type: String })
  // procedureLength: string;

  @ApiProperty({ type: [Video] })
  video: Video[];
}
