import { ApiProperty } from '@nestjs/swagger';

export class DeleteAnnotation {
  @ApiProperty({ type: String })
  procedureId: string;

  @ApiProperty({ type: String })
  videoId: string;

  @ApiProperty({ type: String })
  annotationId: string;
}
