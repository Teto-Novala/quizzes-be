import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoalEntity } from '../models/soal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SoalService {
  constructor(
    @InjectRepository(SoalEntity)
    private readonly soalRepository: Repository<SoalEntity>,
  ) {}
}
