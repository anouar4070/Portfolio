import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
//import { diskStorage } from 'multer';

@Controller('file')
export class FileController {
  @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './upload',
  //     }),
  //   }),
  // )
  @UseInterceptors(FileInterceptor('file'))
  //uploadFile(@UploadedFile() file: Express.Multer.File) {
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /.(png|jpg|jpeg)$/ }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1000 }), // 1MB
        ],
        exceptionFactory: () => {
          return new BadRequestException('Invalid request', {
            cause: [
              {
                property: 'file',
                constraints: {
                  message:
                    'Uploaded file can only be JPEG or PNG and must be less than 1MB',
                },
              },
            ],
          });
        },
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      filename: file.filename,
    };
  }
}
