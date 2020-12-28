import { Module } from '@nestjs/common';
import { VideoInfoController } from './controllers/video-info/video-info.controller';
import { VideoInfoService } from './service/video-info/video-info.service';
import { VideoInfo, VideoInfoSchema } from './schemas/video-info.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VideoInfo.name, schema: VideoInfoSchema },
    ]),
  ],
  controllers: [VideoInfoController],
  providers: [VideoInfoService],
})
export class VideoInfoModule {}
