import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateVideoInfoDto } from 'src/video-info/dtos/video-info.dto';
import { VideoInfo } from 'src/video-info/schemas/video-info.schema';
import { VideoInfoService } from 'src/video-info/service/video-info/video-info.service';

@Controller('video-info')
export class VideoInfoController {
  constructor(private videoInfoService: VideoInfoService) {}

  @Get()
  findAllVideoInfo(): Promise<VideoInfo[]> {
    return this.videoInfoService.findAllVideoInfo();
  }

  @Post()
  createVideoInfo(
    @Body() createVideoInfoDto: CreateVideoInfoDto,
  ): Promise<VideoInfo> {
    console.log(createVideoInfoDto);
    return this.videoInfoService.createVideoInfo(createVideoInfoDto);
  }
}
