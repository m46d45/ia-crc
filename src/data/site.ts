export const LINKS = {
  memberForm:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=gxFu22VMXECCznzVP6bp3GNItEHSPX5Os8c_U2BUyEtUMDdGNDBMS0U4UDlFREJFM1A5VlozSDNFRS4u",
  supporterForm:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=gxFu22VMXECCznzVP6bp3GNItEHSPX5Os8c_U2BUyEtUM0U4QVZQMU1ZQjRXRzlUQUc1Q1lYOFlLVy4u",
  proposalTemplate:
    "https://itbdsti.sharepoint.com/:w:/s/AI-CRC/EbVvQIGJ9sRIhPJtaHbtpoQBIvESnnnOuYIOEqCmiKO56A?e=U40p5Z",
  seminar2025Teams: "https://bit.ly/MS-Teams-Link-IA-CRC-Seminar-2025",
  seminar2025Register: "https://bit.ly/Seminar-IA-CRC-2025",
  seminar2024Presentations:
    "https://drive.google.com/drive/folders/19hF8-mve1OCljesMneeg1HRGTFkI8hl5?usp=sharing",
  policyBrief:
    "https://itbdsti-my.sharepoint.com/:b:/g/personal/abduh_itb_ac_id/ERQlnfSMAM1NmbJz4j7wK8cB_7p8aXVzWRBXeupZsCFTDQ?e=JciO3c",
  uujkNotes:
    "https://itbdsti-my.sharepoint.com/:b:/g/personal/abduh_itb_ac_id/EQ4cTNn8-JRFjWcWMV69hqEBkuhne2gPL4IDpp5oK2TQcQ?e=CqQvVP",
  uujkSurvey:
    "https://itbdsti-my.sharepoint.com/:b:/g/personal/abduh_itb_ac_id/EUDNQ4lrn5RLlt4XHWMcsTMBcalFxJP1NdJRa9bavUaRgQ?e=v06Iiz",
  linktree: "https://linktr.ee/IACRC",
  email: "abduh@itb.ac.id",
  maps: "https://www.google.com/maps/search/?api=1&query=CIBE+Building+ITB+Jl.+Ganesha+No.+10+Bandung",
} as const;

export type Lang = "en" | "id";

export const RWGS = [
  {
    id: "01",
    code: "RWG-01",
    title: { en: "Productivity & Lean Construction", id: "Produktivitas & Lean Construction" },
    lead: "M. Abduh",
    org: "ITB",
  },
  {
    id: "02",
    code: "RWG-02",
    title: { en: "Construction Industry Development", id: "Pengembangan Industri Konstruksi" },
    lead: "T.K. Chan",
    org: "La Trobe",
  },
  {
    id: "03",
    code: "RWG-03",
    title: { en: "Women in Construction", id: "Perempuan di Konstruksi" },
    lead: "W. Weningtyas",
    org: "ITB",
  },
  {
    id: "04",
    code: "RWG-04",
    title: { en: "International Construction", id: "Konstruksi Internasional" },
    lead: "I. Martek",
    org: "Deakin",
  },
  {
    id: "05",
    code: "RWG-05",
    title: { en: "Project Delivery Management", id: "Manajemen Pelaksanaan Proyek" },
    lead: "R.Z. Tamin",
    org: "ITB",
  },
  {
    id: "06",
    code: "RWG-06",
    title: { en: "Quality, Health, Safety & Wellbeing", id: "Mutu, Kesehatan, Keselamatan & Kesejahteraan" },
    lead: "A. Suraji",
    org: "Andalas",
  },
  {
    id: "07",
    code: "RWG-07",
    title: { en: "Resilience & Sustainability", id: "Resiliensi & Keberlanjutan" },
    lead: "K.S. Pribadi",
    org: "ITB",
  },
  {
    id: "08",
    code: "RWG-08",
    title: { en: "Construction Technology & Innovation", id: "Teknologi & Inovasi Konstruksi" },
    lead: "B.W. Soemardi",
    org: "ITB",
  },
] as const;

export type ProjectStatus = "ongoing" | "proposal" | "finished";

export const PROJECTS: {
  title: { en: string; id: string };
  rwg: string;
  lead: string;
  status: ProjectStatus;
}[] = [
  {
    title: {
      en: "Fundamental Issues of Construction Safety in Design",
      id: "Isu Fundamental Keselamatan Konstruksi dalam Desain",
    },
    rwg: "RWG-06",
    lead: "A. Suraji",
    status: "ongoing",
  },
  {
    title: {
      en: "Lessons Learned from IKN: Design–Build Implementation in Indonesia",
      id: "Pembelajaran dari IKN: Implementasi Design–Build di Indonesia",
    },
    rwg: "RWG-05",
    lead: "K.S. Pribadi",
    status: "ongoing",
  },
  {
    title: {
      en: "Construction Industry Development Review",
      id: "Tinjauan Pengembangan Industri Konstruksi",
    },
    rwg: "RWG-02",
    lead: "T.K. Chan",
    status: "proposal",
  },
  {
    title: {
      en: "Lessons Learned from IKN: Development of Competitive Advantages in Construction",
      id: "Pembelajaran dari IKN: Pengembangan Keunggulan Kompetitif Konstruksi",
    },
    rwg: "RWG-04",
    lead: "K.S. Pribadi",
    status: "proposal",
  },
  {
    title: {
      en: "PPP Project Performance in Indonesia",
      id: "Kinerja Proyek KPBU di Indonesia",
    },
    rwg: "RWG-05",
    lead: "K.S. Pribadi",
    status: "proposal",
  },
  {
    title: {
      en: "Procurement practices contributing to safety in design assurance, aligned with SDG 12 and ISO 20400",
      id: "Praktik pengadaan yang mendukung jaminan keselamatan dalam desain, selaras SDG 12 dan ISO 20400",
    },
    rwg: "RWG-06",
    lead: "A. Suraji",
    status: "proposal",
  },
  {
    title: {
      en: "Lessons Learned from IKN: Sustainability Philosophy, Initiatives, and Outcomes",
      id: "Pembelajaran dari IKN: Filosofi, Inisiatif, dan Hasil Keberlanjutan",
    },
    rwg: "RWG-07",
    lead: "A. Indraprasta",
    status: "proposal",
  },
  {
    title: {
      en: "Book: Sustainable Construction (target 2025)",
      id: "Buku: Konstruksi Berkelanjutan (target 2025)",
    },
    rwg: "All",
    lead: "B.W. Soemardi",
    status: "proposal",
  },
  {
    title: {
      en: "Adoption Strategy for Implementing Lean Construction by Australian and Indonesian Contractors",
      id: "Strategi Adopsi Lean Construction oleh Kontraktor Australia dan Indonesia",
    },
    rwg: "RWG-01",
    lead: "M. Abduh & G. Shang",
    status: "finished",
  },
  {
    title: {
      en: "Lessons Learned from IKN: Construction Innovations and Their Impact",
      id: "Pembelajaran dari IKN: Inovasi Konstruksi dan Dampaknya",
    },
    rwg: "RWG-08",
    lead: "B.W. Soemardi, T.K. Chan, I. Martek",
    status: "finished",
  },
];

export type ActivityKind = "talk" | "workshop" | "seminar" | "conference" | "meeting";

export const ACTIVITIES: {
  kind: ActivityKind;
  title: { en: string; id: string };
  date: string;
  dateSort: string;
  place: { en: string; id: string };
  rwg?: string;
}[] = [
  {
    kind: "seminar",
    title: { en: "IA-CRC Seminar 2025", id: "Seminar IA-CRC 2025" },
    date: "28 November 2025",
    dateSort: "2025-11-28",
    place: { en: "Online from ITB Bandung Campus", id: "Daring dari Kampus ITB Bandung" },
  },
  {
    kind: "workshop",
    title: {
      en: "Framework for Construction Management Education in Indonesia",
      id: "Kerangka Pengembangan Pendidikan Manajemen Konstruksi di Indonesia",
    },
    date: "12 November 2025",
    dateSort: "2025-11-12",
    place: { en: "Online & on site, ITB Jakarta Campus", id: "Daring & luring, Kampus ITB Jakarta" },
    rwg: "RWG-04",
  },
  {
    kind: "conference",
    title: {
      en: "Infrastructure and Construction Innovation Conference (ICONIC)",
      id: "Infrastructure and Construction Innovation Conference (ICONIC)",
    },
    date: "21–22 April 2025",
    dateSort: "2025-04-21",
    place: { en: "UGM, Yogyakarta", id: "UGM, Yogyakarta" },
  },
  {
    kind: "workshop",
    title: {
      en: "Building Resilient and Inclusive Infrastructure in Indonesia",
      id: "Membangun Infrastruktur yang Tangguh dan Inklusif di Indonesia",
    },
    date: "22 April 2025",
    dateSort: "2025-04-22",
    place: { en: "ICONIC, UGM, Yogyakarta", id: "ICONIC, UGM, Yogyakarta" },
    rwg: "RWG-01, 07, 08",
  },
  {
    kind: "talk",
    title: {
      en: "Safety, Health & Wellbeing Issues: a Lean Construction Perspective",
      id: "Isu Keselamatan, Kesehatan & Kesejahteraan: Perspektif Lean Construction",
    },
    date: "8 July 2025",
    dateSort: "2025-07-08",
    place: { en: "Virtual International Talk", id: "Virtual International Talk" },
    rwg: "RWG-01 & 06",
  },
  {
    kind: "talk",
    title: {
      en: "Limited discussions with George Ofori on developing the construction industry in Indonesia",
      id: "Diskusi terbatas bersama George Ofori tentang pengembangan industri konstruksi Indonesia",
    },
    date: "8 April & 1 May 2025",
    dateSort: "2025-04-08",
    place: { en: "Virtual International Talk", id: "Virtual International Talk" },
    rwg: "RWG-02",
  },
  {
    kind: "talk",
    title: {
      en: "What do we need for regulating our construction industry effectively?",
      id: "Apa yang dibutuhkan untuk mengatur industri konstruksi secara efektif?",
    },
    date: "13 February 2025",
    dateSort: "2025-02-13",
    place: { en: "Virtual International Talk", id: "Virtual International Talk" },
    rwg: "RWG-02",
  },
  {
    kind: "talk",
    title: {
      en: "Construction Safety in Design: Research Findings & Recommended Practices",
      id: "Keselamatan Konstruksi dalam Desain: Temuan Penelitian & Praktik yang Direkomendasikan",
    },
    date: "27 February 2025",
    dateSort: "2025-02-27",
    place: { en: "Virtual International Talk", id: "Virtual International Talk" },
    rwg: "RWG-06",
  },
  {
    kind: "workshop",
    title: {
      en: "Harnessing the Potential Roles of the Private Sector for Infrastructure Development",
      id: "Mengoptimalkan Peran Sektor Swasta untuk Pembangunan Infrastruktur",
    },
    date: "7 November 2024",
    dateSort: "2024-11-07",
    place: { en: "Konstruksi Indonesia 2024, ICE BSD Tangerang", id: "Konstruksi Indonesia 2024, ICE BSD Tangerang" },
    rwg: "RWG-02",
  },
  {
    kind: "seminar",
    title: { en: "IA-CRC Seminar 2024", id: "Seminar IA-CRC 2024" },
    date: "5 November 2024",
    dateSort: "2024-11-05",
    place: { en: "Online & on site, ITB Bandung Campus", id: "Daring & luring, Kampus ITB Bandung" },
  },
  {
    kind: "talk",
    title: {
      en: "Adoption Strategies of Lean Construction",
      id: "Strategi Adopsi Lean Construction",
    },
    date: "13 December 2023",
    dateSort: "2023-12-13",
    place: { en: "Virtual International Talk", id: "Virtual International Talk" },
    rwg: "RWG-01",
  },
  {
    kind: "meeting",
    title: { en: "AI-CRC Charter Meeting", id: "Rapat Piagam AI-CRC" },
    date: "9 December 2023",
    dateSort: "2023-12-09",
    place: { en: "Online, 08.30–10.00 Jakarta time", id: "Daring, 08.30–10.00 WIB" },
  },
  {
    kind: "talk",
    title: {
      en: "Construction Safety in Design",
      id: "Keselamatan Konstruksi dalam Desain",
    },
    date: "15 November 2023",
    dateSort: "2023-11-15",
    place: { en: "Virtual International Talk", id: "Virtual International Talk" },
    rwg: "RWG-06",
  },
  {
    kind: "workshop",
    title: {
      en: "Two-Day Research Workshop — founding of IA-CRC",
      id: "Lokakarya Penelitian Dua Hari — pendirian IA-CRC",
    },
    date: "1 & 4 November 2023",
    dateSort: "2023-11-01",
    place: { en: "Online & on site, ITB Jakarta Campus", id: "Daring & luring, Kampus ITB Jakarta" },
  },
];

export const PHOTOS = [
  {
    src: "/images/workshop-2023.jpg",
    alt: { en: "Founding workshop, ITB Jakarta Campus, November 2023", id: "Lokakarya pendirian, Kampus ITB Jakarta, November 2023" },
    caption: { en: "Workshop 2023", id: "Lokakarya 2023" },
  },
  {
    src: "/images/konstruksi-indonesia.jpg",
    alt: { en: "Konstruksi Indonesia 2024, ICE BSD Tangerang", id: "Konstruksi Indonesia 2024, ICE BSD Tangerang" },
    caption: { en: "Konstruksi Indonesia 2024", id: "Konstruksi Indonesia 2024" },
  },
  {
    src: "/images/seminar-2024.jpg",
    alt: { en: "IA-CRC Seminar 2024 at ITB Bandung", id: "Seminar IA-CRC 2024 di ITB Bandung" },
    caption: { en: "Seminar 2024", id: "Seminar 2024" },
  },
  {
    src: "/images/iconic-2025.jpg",
    alt: { en: "ICONIC 2025 at UGM Yogyakarta", id: "ICONIC 2025 di UGM Yogyakarta" },
    caption: { en: "ICONIC 2025", id: "ICONIC 2025" },
  },
  {
    src: "/images/fgd-cem.jpg",
    alt: { en: "Focus group on construction management education", id: "FGD kerangka pendidikan manajemen konstruksi" },
    caption: { en: "FGD Construction Education", id: "FGD Pendidikan Konstruksi" },
  },
];

export type MemberGroup = {
  org: string;
  country: "au" | "id" | "industry";
  people: string[];
};

export const MEMBER_GROUPS: MemberGroup[] = [
  { org: "La Trobe University", country: "au", people: ["Toong Khuan Chan"] },
  { org: "Deakin University", country: "au", people: ["Igor Martek", "Anna Leaming"] },
  {
    org: "University of Melbourne",
    country: "au",
    people: ["Gao Shang", "M. Reza Hosseini", "Vidal Paton-Cole"],
  },
  { org: "RMIT University", country: "au", people: ["Bambang Trigunarsyah"] },
  { org: "University of Adelaide", country: "au", people: ["Indra Gunawan"] },
  { org: "University of New South Wales", country: "au", people: ["Riza Yosia Sunindijo"] },
  {
    org: "Institut Teknologi Bandung",
    country: "id",
    people: [
      "Krishna S. Pribadi",
      "Puti Farida",
      "Rizal Tamin",
      "Biemo Soemardi",
      "Reini D. Wirahadikusumah",
      "Muhamad Abduh",
      "Ima Fatima",
      "Iris Mahani",
      "Rani G. Pradoto",
      "Eliza R. Puri",
      "Budi Hasiholan",
      "Meifrinaldi",
      "Widyarini Weningtyas",
      "Aswin Indraprasta",
      "Dewi Larasati",
      "Robby Dwikojuliardi",
      "Aries Firman",
      "Sri Suryani",
    ],
  },
  { org: "Universitas Andalas", country: "id", people: ["Akhmad Suraji"] },
  { org: "Universitas Diponegoro", country: "id", people: ["Jati Utomo"] },
  {
    org: "Universitas Gadjah Mada",
    country: "id",
    people: ["Tantri Handayani", "Kartika Nur Rahma", "Anggga T. Yudhistira"],
  },
  { org: "Universitas Sriwijaya", country: "id", people: ["Heni Fitriani", "Erwin Gunawan"] },
  { org: "Institut Teknologi Sepuluh Nopember", country: "id", people: ["Farida Rachmawati"] },
  {
    org: "Universitas Islam Indonesia",
    country: "id",
    people: ["Fitri Nugraheni", "Vendie Abna", "Albani Musyafa", "Tri N. Sulistyantoro"],
  },
  { org: "Institut Teknologi PLN", country: "id", people: ["Susy Fatena"] },
  { org: "Universitas Persada Indonesia", country: "id", people: ["Arman Jayadi", "Nina Uskas Amin"] },
  { org: "Universitas Katolik Parahyangan", country: "id", people: ["Andreas Wibowo", "Felix Hidayat"] },
  { org: "Universitas Syiah Kuala", country: "id", people: ["Cut Zuchrina"] },
  {
    org: "Universitas Trisakti",
    country: "id",
    people: ["Ulfa Fatmasari Faisal", "M. Sapto Nugroho", "Feby Kartika Sari"],
  },
  {
    org: "Universitas Nusa Cendana",
    country: "id",
    people: ["Yunita Messah", "Putri Ayu Candra Maria Boling"],
  },
  { org: "Universitas Negeri Jakarta", country: "id", people: ["Irika Widiasanti", "Abdhy Gazali"] },
  { org: "Universitas Negeri Manado", country: "id", people: ["Shirly S. Lumeno"] },
  { org: "Universitas Tarumanagara", country: "id", people: ["Arkiyansyah"] },
  { org: "Universitas Tanjungpura", country: "id", people: ["Lusiana Nugraha"] },
  { org: "Universitas Katolik Soegijapranata", country: "id", people: ["Hermawan"] },
  { org: "BINUS Business School", country: "id", people: ["Mohammad Ichsan"] },
  { org: "President University", country: "id", people: ["Christina Liem"] },
  { org: "Universitas Jenderal Soedirman", country: "id", people: ["Redityo Januardi"] },
  {
    org: "Politeknik Pekerjaan Umum",
    country: "id",
    people: ["Agung Bhakti Utama", "Rizky Citra Islami"],
  },
  { org: "Universitas Singaperbangsa Karawang", country: "id", people: ["Amalia Rizka Sugiarto"] },
  { org: "Universitas Muhammadiyah Malang", country: "id", people: ["Moh. Abduh"] },
  { org: "Universitas Katolik Santo Thomas", country: "id", people: ["Rina Firlia Sari"] },
  {
    org: "PT Pembangunan Perumahan",
    country: "industry",
    people: ["Pundjung Setya Brata", "Wawan Setiawan", "Rina Asri Aisyah"],
  },
  { org: "PT Aditya EC", country: "industry", people: ["Herryan Kendra Kaharudin"] },
];

export const STATS = [
  { value: "8", label: { en: "Research working groups", id: "Kelompok kerja riset" } },
  { value: "25+", label: { en: "Universities", id: "Perguruan tinggi" } },
  { value: "70+", label: { en: "Researchers", id: "Peneliti" } },
  { value: "2023", label: { en: "Established", id: "Didirikan" } },
];
