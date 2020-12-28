import { ApiProperty } from '@nestjs/swagger';
import { Annotation } from './annotation.dto';
export class Video {
  @ApiProperty({ type: String })
  videoId: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  subtitles: string;

  @ApiProperty({ type: [Annotation] })
  annotations: Annotation[];

  @ApiProperty({ type: [String] })
  formats: string[];
}
