import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { TrackerEntity } from './entities/tracker.entity';

@Injectable()
export class AppService {
  constructor(private readonly csvParser: CsvParser) {}

  async getAllTracks() {
    const stream = createReadStream('./src/store/tracker.csv');
    const data: ParsedData<TrackerEntity> = await this.csvParser.parse(
      stream,
      TrackerEntity,
      undefined,
      0,
      {
        strict: true,
        separator: ',',
      },
    );
    return data.list;
  }
}
