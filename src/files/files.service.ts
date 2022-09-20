import { Injectable, NotFoundException } from '@nestjs/common';
import * as mime from 'mime-types';
import * as fs from 'fs';
import { FileDto } from './dto/file.dto';

@Injectable()
export class FilesService {
  private readonly fileDir = 'private/resources';

  //Gets
  async get(filename: string): Promise<FileDto> {
    let path = `${this.fileDir}/${filename}`;
    if (!fs.existsSync(path))
      throw new NotFoundException(`File ${filename} not found`);

    return Object.assign(new FileDto(), {
      contentType: mime.lookup(path),
      data: await this.readResource(path),
    });
  }

  getList(): Promise<string[]> {
    let data: Promise<string[]> = new Promise((res, rej) => {
      fs.readdir(this.fileDir, (err, files) => {
        err ? rej(err) : res(files);
      });
    });
    return data;
  }

  //Methods
  readResource(path: string): Promise<Buffer> {
    let data: Promise<Buffer> = new Promise((res, rej) => {
      fs.readFile(path, (err, dataFile) => {
        err ? rej(err) : res(dataFile);
      });
    });

    return data;
  }
}
