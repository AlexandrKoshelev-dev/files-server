import { Controller, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get()
  async getList(@Res() res) {
    res.send({ files: await this.filesService.getList() });
  }

  @Get(':filename')
  async get(@Res() res, @Param('filename') filename: string) {
    let file = await this.filesService.get(filename);
    res.contentType(file.contentType);
    res.send(file.data);
  }
}
