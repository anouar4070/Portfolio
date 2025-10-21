import { Module, OnModuleInit } from '@nestjs/common';
import { FileController } from './file.controller';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const getUploadPath = (folderName: string) => {
  return join(__dirname, '..', '..', '..', folderName);
};

@Module({
  controllers: [FileController],
  imports: [
    MulterModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const folder = configService.get<string>('UPLOAD_FOLDER') || 'uploads';
        const destination = getUploadPath(folder);

        if (!existsSync(destination)) {
          mkdirSync(destination, { recursive: true });
        }

        return {
          storage: diskStorage({
            destination,
          }),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class FileModule implements OnModuleInit {
  constructor(private configService: ConfigService) {}
  onModuleInit() {
    const folderName =
      this.configService.get<string>('UPLOAD_FOLDER') || 'uploads';
    const uploadFolder = getUploadPath(folderName);
    if (!existsSync(uploadFolder)) {
      mkdirSync(uploadFolder);
    }
  }
}
