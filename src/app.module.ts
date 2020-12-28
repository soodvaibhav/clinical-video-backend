import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoInfoModule } from './video-info/video-info.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/clinical-video'),
    VideoInfoModule,
  ],
})
export class AppModule {}
