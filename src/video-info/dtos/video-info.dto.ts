import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateVideoInfoDto {
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @IsNotEmpty()
  @IsString()
  patient_id: string;

  @IsNotEmpty()
  @IsDateString()
  procedure_date: Date;

  @IsNotEmpty()
  @IsDateString()
  patient_dob: Date;

  @IsNotEmpty()
  @IsString()
  study: string;

  @IsNotEmpty()
  @IsString()
  site: string;

  @IsNotEmpty()
  @IsString()
  procedure_type: string;

  @IsNotEmpty()
  @IsString()
  conducting_surgeon: string;

  @IsNotEmpty()
  @IsString()
  surgical_device_liaison: string;

  @IsNotEmpty()
  @IsNumber()
  total_videos: number;
}
