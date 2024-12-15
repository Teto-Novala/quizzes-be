import { TutorEntity } from 'src/auth/models/tutor.entity';

export class JawabanFormated {
  id?: string;

  author?: TutorEntity;

  benar?: number;

  salah?: number;

  nilai?: number;

  subject?: string;

  noModel?: number;

  namaUser?: string;

  createdAt?: string;
}
