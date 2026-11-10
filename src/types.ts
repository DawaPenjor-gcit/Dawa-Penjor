/**
 * Certificate Types and Constants for Bhutan Election Commission Certificate Generator
 */

export interface CertificateData {
  dzongkhag: string;        // ཆུ་ཁ (Chukha)
  constituency: string;     // ཕུན་ཚོགས་གླིང་ (Phuentsholing)
  cid: string;              // ༡༠༢༡༢༠༠༠༢༥༧ (10212000257)
  candidateName: string;    // དི་པིན་ ག་ལེ་ (Dipin Ghalley)
  electionDate: string;     // ༡༥/༧/༢༠༢༦ (15/7/2026)
  designation: string;      // ཁྲོམ་དཔོན་གྱི་ (Thrompon / Mayor)
  issueDate: string;        // ༢༠/༠༧/༢༠༢༦ (20/07/2026)
  candidatePhoto?: string;  // Image URL or base64 data URL (changeable passport photo)
  photoScalePercent?: number; // Scale percent (default 100 = 35x45mm official size)
  qrCodeData?: string;      // Image URL, base64 data URL, or verification text/URL (changeable QR code)
  qrCodeScalePercent?: number; // Scale percent (default 100)
}

export const ORIGINAL_SAMPLE_CERTIFICATE: CertificateData = {
  dzongkhag: 'ཆུ་ཁ',
  constituency: 'ཕུན་ཚོགས་གླིང་',
  cid: '༡༠༢༡༢༠༠༠༢༥༧',
  candidateName: 'དི་པིན་ ག་ལེ་',
  electionDate: '༡༥/༧/༢༠༢༦',
  designation: 'ཁྲོམ་དཔོན་གྱི་',
  issueDate: '༢༠/༠༧/༢༠༢༦',
  candidatePhoto: '/photo_final.png',
  photoScalePercent: 100,
  qrCodeData: '/qr_crop.png',
  qrCodeScalePercent: 100,
};

export interface SpacingConfig {
  fontSizePercent: number;    // default 100 (100% = 14px calibrated paragraph font size)
  lineSpacingDelta: number;   // default 5.10 (% between line baselines = exact original PDF layout)
  wordSpacing: number;        // default 0 (px)
  verticalOffset: number;     // default 0 (% fine-tune)
}

export const DEFAULT_SPACING_CONFIG: SpacingConfig = {
  fontSizePercent: 100,
  lineSpacingDelta: 5.10,
  wordSpacing: 0,
  verticalOffset: 0,
};

export interface DzongkhagPreset {
  dzongkha: string;
  english: string;
  thromdeOrDemkhongs: string[];
}

export const DZONGKHAG_PRESETS: DzongkhagPreset[] = [
  {
    dzongkha: 'ཆུ་ཁ',
    english: 'Chukha',
    thromdeOrDemkhongs: ['ཕུན་ཚོགས་གླིང་', 'ཆུ་ཁ་', 'བོན་གོ་', 'གདུང་ན་', 'བྱག་ཆུ་'],
  },
  {
    dzongkha: 'ཐིམ་ཕུག་',
    english: 'Thimphu',
    thromdeOrDemkhongs: ['ཐིམ་ཕུག་ཁྲོམ་སྡེ་', 'ཀ་ཝང་', 'ལྕང་', 'དར་དཀར་ལ་', 'སྨད་ཝང་', 'གླིང་བཞི་'],
  },
  {
    dzongkha: 'སྤ་རོ་',
    english: 'Paro',
    thromdeOrDemkhongs: ['སྤ་རོ་ཁྲོམ་སྡེ་', 'དོ་ཤར་', 'དོ་ཐེབ་', 'ཧཱུྃ་རལ་', 'ལམ་གོང་', 'ལུང་ཉིས་'],
  },
  {
    dzongkha: 'སྤུངས་ཁ་',
    english: 'Punakha',
    thromdeOrDemkhongs: ['ཁུར་ཐང་', 'གུ་མ་', 'དགོན་ཤར་', 'དགོན་གླིང་', 'འབྲས་སྟག་'],
  },
  {
    dzongkha: 'དབང་འདུས་ཕོ་བྲང་',
    english: 'Wangdue Phodrang',
    thromdeOrDemkhongs: ['བ་རྫི་', 'གཤར་', 'དྭངས་ཆུ་', 'ཉི་ཤོ་', 'ཕྱི་སྒྲུབ་'],
  },
  {
    dzongkha: 'བསམ་རྩེ་',
    english: 'Samtse',
    thromdeOrDemkhongs: ['བསམ་རྩེ་ཁྲོམ་སྡེ་', 'གདོང་དགའ་', 'ནོར་བུ་སྒང་', 'རྟ་ནག་'],
  },
  {
    dzongkha: 'གསར་སྤང་',
    english: 'Sarpang',
    thromdeOrDemkhongs: ['དགེ་ལེགས་ཕུག་ཁྲོམ་སྡེ་', 'གསར་སྤང་ཁྲོམ་སྡེ་', 'ཆུ་འཛོམས་', 'ཤིང་མཁར་'],
  },
  {
    dzongkha: 'བཀྲིས་སྒང་',
    english: 'Trashigang',
    thromdeOrDemkhongs: ['བཀྲིས་སྒང་ཁྲོམ་སྡེ་', 'རྐང་ལུང་', 'བར་མཚོ་', 'བི་དུང་', 'མཁར་ཕུག་'],
  },
  {
    dzongkha: 'བུམ་ཐང་',
    english: 'Bumthang',
    thromdeOrDemkhongs: ['ཆོས་འཁོར་', 'ཆུ་མིག་', 'སྟང་', 'ཨུ་ར་'],
  },
  {
    dzongkha: 'མོང་སྒར་',
    english: 'Mongar',
    thromdeOrDemkhongs: ['མོང་སྒར་ཁྲོམ་སྡེ་', 'ཀེ་རོང་', 'དགེ་ལེགས་ཕུག་', 'ན་རང་'],
  },
];

export const DESIGNATION_PRESETS = [
  { dzongkha: 'ཁྲོམ་དཔོན་གྱི་', english: 'Thrompon (Mayor)' },
  { dzongkha: 'རྒཔོའི་', english: 'Gup (Head of Gewog)' },
  { dzongkha: 'དམངས་མིའི་', english: 'Mangmi (Deputy Head)' },
  { dzongkha: 'ཚོགས་པའི་', english: 'Tshogpa (Representative)' },
  { dzongkha: 'ཁྲོམ་སྡེ་འཐུས་མིའི་', english: 'Thromde Thuemi (Municipality Council Member)' },
];

export const SAMPLE_CANDIDATE_PRESETS: { name: string; desc: string; data: CertificateData }[] = [
  {
    name: 'Sample Certificate (Original PDF)',
    desc: 'Dipin Ghalley · Phuentsholing, Chukha · Thrompon',
    data: ORIGINAL_SAMPLE_CERTIFICATE,
  },
  {
    name: 'Thimphu Thromde Example',
    desc: 'Karma Dorji · Thimphu Thromde · Thrompon',
    data: {
      dzongkhag: 'ཐིམ་ཕུག་',
      constituency: 'ཐིམ་ཕུག་ཁྲོམ་སྡེ་',
      cid: '༡༡༥༠༡༠༠༡༢༣༤',
      candidateName: 'ཀརྨ་ རྡོ་རྗེ་',
      electionDate: '༡༥/༧/༢༠༢༦',
      designation: 'ཁྲོམ་དཔོན་གྱི་',
      issueDate: '༢༠/༠༧/༢༠༢༦',
    },
  },
  {
    name: 'Gelephu Thromde Example',
    desc: 'Tshering Pelden · Gelephu Thromde · Thromde Thuemi',
    data: {
      dzongkhag: 'གསར་སྤང་',
      constituency: 'དགེ་ལེགས་ཕུག་ཁྲོམ་སྡེ་',
      cid: '༡༠༨༠༢༠༠༤༥༦༧',
      candidateName: 'ཚེ་རིང་ དཔལ་ལྡན་',
      electionDate: '༡༥/༧/༢༠༢༦',
      designation: 'ཁྲོམ་སྡེ་འཐུས་མིའི་',
      issueDate: '༢༠/༠༧/༢༠༢༦',
    },
  },
];
