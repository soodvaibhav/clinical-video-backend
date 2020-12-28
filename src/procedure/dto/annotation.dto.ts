import { ApiProperty } from '@nestjs/swagger';

export class Annotation {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  time: string;

  @ApiProperty({ type: String })
  comments: string;

  @ApiProperty({ type: String })
  videoPlayerTime: string;

  @ApiProperty({ type: String, required: false })
  endtime?: string;
}
