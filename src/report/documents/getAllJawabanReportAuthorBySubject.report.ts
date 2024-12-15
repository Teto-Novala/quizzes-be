import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { Jawaban } from 'src/jawaban/models/dto/jawaban.dto';
import { JawabanFormated } from 'src/jawaban/models/dto/jawabanFormated.dto';

const logo: Content = {
  image: 'src/assets/logo.png',
  fit: [130, 110],
  margin: [-10, 0],
};

const style: StyleDictionary = {
  h1: {
    fontSize: 20,
    bold: true,
    margin: [0, 5],
  },
  h2: {
    fontSize: 16,
    bold: true,
  },
  h3: {
    fontSize: 14,
    bold: true,
  },
};

const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const getAllJawabanAuthorBySubject = (
  jawaban: JawabanFormated[],
  subject: string,
): TDocumentDefinitions => {
  return {
    pageSize: 'A4',
    header: { text: 'Laporan Nilai', alignment: 'right', margin: [10, 10] },
    content: [
      logo,
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 1,
          },
        ],
      },
      {
        text: 'Quizz App',
        style: 'h1',
      },

      {
        columns: [
          {
            text: [
              {
                text: 'Jl. Surya Kencana No. 1 Pamulang\n',
                style: 'h3',
              },
              'Kota Tangerang Selatan\nProvinsi Banten\nEmail: quizApp@mail.com\n',
              {
                link: 'http://localhost:3000',
                text: 'Website: quizapp.com',
              },
            ],
          },
          {
            text: `Tanggal : ${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getFullYear()}`,
            alignment: 'right',
          },
        ],
      },
      {
        qr: 'https://google.com',
        fit: 100,
        alignment: 'right',
      },
      {
        text: `Laporan Nilai ${subject}`,
        alignment: 'center',
        style: 'h2',
      },
      {
        text: `Nama: ${jawaban[0].namaUser}`,
      },
      {
        margin: [0, 20],
        table: {
          widths: ['auto', '*', 'auto', 'auto', 'auto'],
          headerRows: 1,
          body: [
            [
              { text: 'No', alignment: 'center' },
              { text: 'Tanggal', alignment: 'center' },
              { text: 'Benar', alignment: 'center' },
              { text: 'Salah', alignment: 'center' },
              { text: 'Nilai', alignment: 'center' },
            ],
            ...jawaban.map((item, index) => [
              {
                text: index + 1,
                alignment: 'center',
              },
              item.createdAt,
              item.benar,
              item.salah,
              { text: item.nilai, alignment: 'center' },
            ]),
          ],
        },
      },
    ],
    styles: style,
  };
};
