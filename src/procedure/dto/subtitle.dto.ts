import { ApiProperty } from '@nestjs/swagger';

export class Subtitle {
  @ApiProperty({ type: String })
  startTime: string;

  @ApiProperty({ type: String })
  endTime: string;

  @ApiProperty({ type: String })
  comment: string;
}
