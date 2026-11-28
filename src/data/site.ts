export const LINKS = {
  memberForm:
    "https://docs.google.com/forms/d/e/1FAIpQLSfoUmPrOpR3mf0J30MFdnWhcB-vOScWs8rKHwlQY5-7_F29pA/viewform",
  supporterForm:
    "https://docs.google.com/forms/d/e/1FAIpQLScOxClus0j96ui3cLimxdKlcK27TcvfLASORzuDnM0ObrEKVQ/viewform",
  proposalTemplate:
    "https://itbdsti.sharepoint.com/:w:/s/AI-CRC/EbVvQIGJ9sRIhPJtaHbtpoQBIvESnnnOuYIOEqCmiKO56A?e=U40p5Z",
  seminar2025Register: "https://bit.ly/Seminar-IA-CRC-2025",
  seminar2026Register: "https://bit.ly/Seminar-IA-CRC-2026",
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
  goBuild: "https://sciforum.net/event/GOBUILD2026",
  concern: "https://concern.itb.ac.id/",
  whatsapp: "https://chat.whatsapp.com/DSJXg9MzE87GTsn9lfURXO",
  feedbackForm:
    "https://docs.google.com/forms/d/e/1FAIpQLSem1O7vBKoNrucFY3xIZ-Nwdr6Wu_RDMxdOXbkYUy-giUQgfw/viewform",
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

export type ActivityKind = "talk" | "workshop" | "seminar" | "conference" | "meeting" | "booklaunch";

export const ACTIVITIES: {
  kind: ActivityKind;
  title: { en: string; id: string };
  date: string;
  dateSort: string;
  place?: { en: string; id: string };
  rwg?: string;
  href?: string;
}[] = [
  {
    kind: "seminar",
    title: { en: "IA-CRC Seminar 2026", id: "Seminar IA-CRC 2026" },
    date: "28 November 2026",
    dateSort: "2026-11-28",
    place: { en: "Mercure Resort Sanur, Bali (hybrid)", id: "Mercure Resort Sanur, Bali (hibrida)" },
    href: "/news/ia-crc-seminar-2026-bali",
  },
  {
    kind: "conference",
    title: {
      en: "ConCERN 2026 — 3rd International Conference for Civil Engineering Research Network",
      id: "ConCERN 2026 — 3rd International Conference for Civil Engineering Research Network",
    },
    date: "25–26 November 2026",
    dateSort: "2026-11-25",
    place: { en: "Aula Barat, ITB Ganesha Campus, Bandung", id: "Aula Barat, Kampus ITB Ganesha, Bandung" },
    href: "https://concern.itb.ac.id/",
  },
  {
    kind: "conference",
    title: {
      en: "GO BUILD 2026 — 1st International Online Conference on Sustainable Construction",
      id: "GO BUILD 2026 — 1st International Online Conference on Sustainable Construction",
    },
    date: "18–20 November 2026",
    dateSort: "2026-11-18",
    place: { en: "Online (CET)", id: "Daring (CET)" },
    href: "https://sciforum.net/event/GOBUILD2026",
  },
  {
    kind: "booklaunch",
    title: {
      en: "Book launch: Construction and Infrastructure Management in Indonesia (ITB Press)",
      id: "Peluncuran buku: Construction and Infrastructure Management in Indonesia (ITB Press)",
    },
    date: "22 October 2026",
    dateSort: "2026-10-22",
    href: "https://www.itbpress.id/buku-gratis/#flipbook-df_50498/1/",
  },
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

export const NEWS: {
  slug: string;
  date: { en: string; id: string };
  dateSort: string;
  category: "conference" | "publication" | "announcement";
  title: { en: string; id: string };
  excerpt: { en: string; id: string };
  body: { en: string[]; id: string[] };
  href?: string;
  hrefLabel?: { en: string; id: string };
  image?: {
    src: string;
    alt: { en: string; id: string };
    caption?: { en: string; id: string };
  };
  /** First item is the lead photo. Append later photos to grow the gallery. */
  gallery?: {
    src: string;
    alt: { en: string; id: string };
    caption?: { en: string; id: string };
  }[];
}[] = [
  {
    slug: "ia-crc-seminar-2026-bali",
    date: { en: "28 November 2026", id: "28 November 2026" },
    dateSort: "2026-11-28",
    category: "announcement",
    title: {
      en: "IA-CRC Seminar 2026 held in Bali",
      id: "Seminar IA-CRC 2026 telah berlangsung di Bali",
    },
    excerpt: {
      en: "The seminar was held on Saturday, 28 November 2026, at Mercure Resort Sanur, Bali, in a hybrid format. Members reviewed the past year and discussed joint research for 2027.",
      id: "Seminar telah berlangsung pada Sabtu, 28 November 2026, di Mercure Resort Sanur, Bali, secara hibrida. Anggota meninjau setahun terakhir dan membahas riset bersama untuk 2027.",
    },
    body: {
      en: [
        "The IA-CRC Seminar 2026 was held on Saturday, 28 November 2026, at Mercure Resort Sanur, Bali, in a hybrid format.",
        "All members of KK KMI ITB attended, together with Toong Khuan Chan (La Trobe University) and Igor Martek (Deakin University) in person, colleagues from Universitas Udayana, and further participants online.",
        "The seminar reviewed IA-CRC activities over the past year, received reports from the research working groups (RWGs), and discussed joint research directions for 2027.",
        "Reini D. Wirahadikusumah presented a research agenda on disaster-resilient infrastructure in Indonesia. The agenda covers 15 research areas. The largest gaps are design compliance, governance and procurement, financing, and research–industry links.",
        "Toong Khuan Chan and Igor Martek presented issues facing the Indonesian construction industry: contractor registration and compliance, governance, the financial condition of state-owned contractors, and research with tangible benefit to industry and education.",
        "RWG-01 Productivity and Lean Construction (coordinator Muhamad Abduh) reported a bibliometric study of lean construction publications and the position of AI in relation to lean, with Gao Shang (University of Melbourne). The work is planned for IGLC 35, Munich, July 2027.",
        "Muh Abdhy Gazali HS presented a proposed input–output analysis of the construction sector.",
        "The closing discussion, chaired by Muhamad Abduh, recorded these outcomes. The number of RWGs will be reduced from eight to fewer, possibly five, and merger proposals are awaited from members. A Construction Education stream has been proposed. New coordinators will be appointed for the new RWGs. Each new RWG will prepare its own research roadmap with new and existing research topics.",
        "Members are to submit RWG merger proposals and 2027 research topics. An AII 2027–2028 grant application, led by La Trobe University with ITB, Deakin University and the University of Melbourne, is in preparation.",
      ],
      id: [
        "Seminar IA-CRC 2026 telah berlangsung pada Sabtu, 28 November 2026, di Mercure Resort Sanur, Bali, secara hibrida.",
        "Hadir seluruh anggota KK KMI ITB, Toong Khuan Chan (La Trobe University) dan Igor Martek (Deakin University) secara luring, kolega dari Universitas Udayana, serta peserta lain secara daring.",
        "Seminar meninjau kegiatan IA-CRC setahun terakhir, menerima laporan kelompok kerja riset (RWG), dan membahas arah riset bersama untuk 2027.",
        "Reini D. Wirahadikusumah menyajikan agenda riset infrastruktur yang tangguh terhadap bencana di Indonesia. Agenda ini mencakup 15 bidang riset. Kesenjangan terbesar ada pada kepatuhan desain, tata kelola dan pengadaan, pembiayaan, serta tautan riset–industri.",
        "Toong Khuan Chan dan Igor Martek menyajikan isu industri konstruksi Indonesia: registrasi dan kepatuhan kontraktor, tata kelola, kondisi keuangan kontraktor milik negara, serta riset yang memberi manfaat nyata bagi industri dan pendidikan.",
        "RWG-01 Productivity and Lean Construction (koordinator Muhamad Abduh) melaporkan studi bibliometrik publikasi lean construction dan posisi AI terhadap lean, bersama Gao Shang (University of Melbourne). Pekerjaan ini direncanakan untuk IGLC 35, Munich, Juli 2027.",
        "Muh Abdhy Gazali HS menyajikan usulan analisis input–output sektor konstruksi.",
        "Diskusi penutup, dipimpin Muhamad Abduh, mencatat hasil ini. Jumlah RWG akan dikurangi dari delapan menjadi lebih sedikit, mungkin lima, dan usulan penggabungan ditunggu dari anggota. Sebuah jalur Construction Education telah diusulkan. Koordinator baru akan ditunjuk untuk RWG yang baru. Setiap RWG baru akan menyusun peta jalan risetnya sendiri, dengan topik riset baru dan yang sudah ada.",
        "Anggota diminta mengirim usulan penggabungan RWG dan topik riset 2027. Proposal hibah AII 2027–2028, dipimpin La Trobe University bersama ITB, Deakin University, dan University of Melbourne, sedang disiapkan.",
      ],
    },
    gallery: [
      {
        src: "/images/seminar-2026-group.jpg",
        alt: {
          en: "Participants of the IA-CRC Seminar 2026 in Sanur, Bali",
          id: "Peserta Seminar IA-CRC 2026 di Sanur, Bali",
        },
      },
    ],
    image: {
      src: "/images/ia-crc-seminar-2026-poster.jpg",
      alt: { en: "IA-CRC Seminar 2026 poster", id: "Poster Seminar IA-CRC 2026" },
      caption: {
        en: "Held on 28 November 2026 at Mercure Resort Sanur, Bali.",
        id: "Telah berlangsung pada 28 November 2026 di Mercure Resort Sanur, Bali.",
      },
    },
  },
  {
    slug: "ia-crc-supports-concern-2026",
    date: { en: "17 August 2026", id: "17 Agustus 2026" },
    dateSort: "2026-08-17",
    category: "conference",
    title: {
      en: "IA-CRC supports ConCERN 2026 — Australian members will take part in Bandung",
      id: "IA-CRC mendukung ConCERN 2026 — anggota Australia akan hadir di Bandung",
    },
    excerpt: {
      en: "The forum endorses the 3rd International Conference for Civil Engineering Research Network at ITB. Members from Australia will join colleagues in Indonesia.",
      id: "Forum mendukung 3rd International Conference for Civil Engineering Research Network di ITB. Anggota dari Australia akan bergabung dengan kolega di Indonesia.",
    },
    body: {
      en: [
        "IA-CRC is pleased to support ConCERN 2026 — the 3rd International Conference for Civil Engineering Research Network. The two-day meeting will be held on 25–26 November 2026 at Aula Barat, Institut Teknologi Bandung (Ganesha Campus), Bandung, Indonesia.",
        "ConCERN is organised by the Civil Engineering Programme of Institut Teknologi Bandung. This year’s theme is “Beyond Civil Engineering: Multidisciplinary Research Networks for Resilient & Sustainable Infrastructure.” Tracks include construction and infrastructure management, structural and geotechnical engineering, water resources, transportation, integrated civil systems, multidisciplinary engineering for infrastructure, and the socio-technical, policy, and governance of infrastructure.",
        "Members from Australia will take part alongside Indonesian colleagues — presenting, chairing, and helping to host a meeting that sits close to the work of several IA-CRC research groups, especially International Construction, Resilience & Sustainability, and Construction Technology & Innovation.",
        "Accepted papers may appear in IOP Conference Series: Earth and Environmental Science (Scopus) and the ITB Civil Engineering Journal (SINTA). Full papers are due by 13 September 2026. Registration and payment close on 25 October 2026. Members in both countries are encouraged to submit, attend, and connect in Bandung.",
        "Details, the call for papers, and registration are on the conference website.",
      ],
      id: [
        "IA-CRC dengan senang hati mendukung ConCERN 2026 — 3rd International Conference for Civil Engineering Research Network. Pertemuan dua hari ini akan digelar pada 25–26 November 2026 di Aula Barat, Institut Teknologi Bandung (Kampus Ganesha), Bandung, Indonesia.",
        "ConCERN diselenggarakan oleh Program Studi Teknik Sipil Institut Teknologi Bandung. Tema tahun ini adalah “Beyond Civil Engineering: Multidisciplinary Research Networks for Resilient & Sustainable Infrastructure.” Topik mencakup manajemen konstruksi dan infrastruktur, struktur dan geoteknik, sumber daya air, transportasi, sistem sipil terpadu, teknik multidisiplin untuk infrastruktur, serta aspek sosio-teknis, kebijakan, dan tata kelola infrastruktur.",
        "Anggota dari Australia akan berpartisipasi bersama kolega Indonesia — menyajikan makalah, memimpin sesi, dan membantu menyelenggarakan pertemuan yang dekat dengan kerja beberapa kelompok riset IA-CRC, terutama International Construction, Resilience & Sustainability, dan Construction Technology & Innovation.",
        "Makalah yang diterima dapat terbit di IOP Conference Series: Earth and Environmental Science (Scopus) dan ITB Civil Engineering Journal (SINTA). Batas makalah lengkap 13 September 2026. Registrasi dan pembayaran ditutup 25 Oktober 2026. Anggota di kedua negara diundang untuk mengirim makalah, hadir, dan bertemu di Bandung.",
        "Rincian, call for papers, dan registrasi tersedia di situs konferensi.",
      ],
    },
    href: "https://concern.itb.ac.id/",
    hrefLabel: { en: "ConCERN 2026 website", id: "Situs ConCERN 2026" },
  },
  {
    slug: "ia-crc-supports-go-build-2026",
    date: { en: "17 August 2026", id: "17 Agustus 2026" },
    dateSort: "2026-08-17",
    category: "conference",
    title: {
      en: "IA-CRC supports GO BUILD 2026 and encourages members to take part",
      id: "IA-CRC mendukung GO BUILD 2026 dan mengajak anggota berpartisipasi",
    },
    excerpt: {
      en: "The forum endorses the 1st International Online Conference on Sustainable Construction and invites members to present, attend, and connect.",
      id: "Forum mendukung 1st International Online Conference on Sustainable Construction dan mengundang anggota untuk menyajikan, hadir, dan berjejaring.",
    },
    body: {
      en: [
        "IA-CRC is pleased to support GO BUILD 2026 — the 1st International Online Conference on Sustainable Construction: Globalize, Organize, Build, Unite, Innovate, Lead, Develop. The three-day virtual meeting will be held on 18–20 November 2026.",
        "The conference is hosted by the MDPI journals Sustainability and Designs. It is chaired by Dr Igor Martek of Deakin University, coordinator of IA-CRC’s International Construction working group, together with Dr Mehdi Amirkhani of Adelaide University.",
        "GO BUILD brings together researchers, educators, students, industry professionals, and policymakers on sustainable building in the Global South, workforce development, resilient infrastructure, emerging technologies, regulation, and built-environment education. These themes sit close to the work of several IA-CRC research groups.",
        "Members are encouraged to take part — as presenters, session chairs, or delegates. Regular registration remains open until 13 November 2026. Early-bird registration closes on 22 August 2026.",
        "Details, the programme, and registration are on the conference website.",
      ],
      id: [
        "IA-CRC dengan senang hati mendukung GO BUILD 2026 — 1st International Online Conference on Sustainable Construction: Globalize, Organize, Build, Unite, Innovate, Lead, Develop. Pertemuan daring tiga hari ini digelar pada 18–20 November 2026.",
        "Konferensi ini diampu jurnal MDPI Sustainability dan Designs. Dipimpin Dr Igor Martek dari Deakin University, koordinator kelompok International Construction IA-CRC, bersama Dr Mehdi Amirkhani dari Adelaide University.",
        "GO BUILD mempertemukan peneliti, pendidik, mahasiswa, profesional industri, dan pembuat kebijakan mengenai bangunan berkelanjutan di Global South, pengembangan tenaga kerja, infrastruktur tangguh, teknologi baru, regulasi, dan pendidikan lingkungan binaan. Tema-tema ini dekat dengan kerja beberapa kelompok riset IA-CRC.",
        "Anggota diundang berpartisipasi — sebagai penyaji, ketua sesi, atau peserta. Registrasi reguler dibuka hingga 13 November 2026. Early-bird ditutup 22 Agustus 2026.",
        "Rincian, program, dan registrasi tersedia di situs konferensi.",
      ],
    },
    href: "https://sciforum.net/event/GOBUILD2026",
    hrefLabel: { en: "GO BUILD 2026 website", id: "Situs GO BUILD 2026" },
  },
];

export function newsByDate() {
  return [...NEWS].sort((a, b) => b.dateSort.localeCompare(a.dateSort));
}

export function newsBySlug(slug: string) {
  return NEWS.find((item) => item.slug === slug);
}

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
  { org: "Victoria University", country: "au", people: ["Melissa Chan"] },
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
    people: ["Tantri Handayani", "Kartika Nur Rahma", "Angga T. Yudhistira"],
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
  { org: "Calvin Institute of Technology", country: "id", people: ["Yongki Alexander Tanne"] },
  {
    org: "PT Pembangunan Perumahan",
    country: "industry",
    people: ["Pundjung Setya Brata", "Wawan Setiawan", "Rina Asri Aisyah"],
  },
  { org: "PT Aditya EC", country: "industry", people: ["Herryan Kendra Kaharudin"] },
];

export type SupportOffer = "needs" | "experts" | "data" | "labs" | "funding";

export const SUPPORTERS: {
  org: string;
  country: "id";
  kind: "university" | "industry";
  contacts: string[];
  offers: SupportOffer[];
  rwgs: string[];
}[] = [
  {
    org: "Universitas Singaperbangsa Karawang",
    country: "id",
    kind: "university",
    contacts: ["Amalia Rizka Sugiarto"],
    offers: ["needs"],
    rwgs: ["RWG-01", "RWG-02", "RWG-04", "RWG-08"],
  },
  {
    org: "Universitas Sriwijaya",
    country: "id",
    kind: "university",
    contacts: ["Nyimas Siti Yuliani Saptaprima"],
    offers: ["needs", "experts", "data", "labs", "funding"],
    rwgs: ["RWG-02", "RWG-03", "RWG-04", "RWG-06", "RWG-07", "RWG-08"],
  },
  {
    org: "PT PP (Persero) Tbk",
    country: "id",
    kind: "industry",
    contacts: ["Sari Ria Indah", "Rangga Hidayat Gobel"],
    offers: ["needs", "data"],
    rwgs: ["RWG-02", "RWG-04"],
  },
];

export function memberCount() {
  return MEMBER_GROUPS.reduce((n, g) => n + g.people.length, 0);
}

export function universityCount() {
  return MEMBER_GROUPS.filter((g) => g.country !== "industry").length;
}

export function supporterCount() {
  return SUPPORTERS.length;
}

/** Forum established at the ITB Jakarta Campus. The public snapshot runs through the third anniversary, November 2026. */
export const FOUNDED_ON = "2023-11-04";
export const NUMBERS_THROUGH = "2026-11";

/**
 * Universities named as the founders in the about page. The count is this list
 * filtered to institutions that are still on the member roster.
 */
export const FOUNDING_UNIVERSITIES = [
  { org: "La Trobe University", short: { en: "La Trobe", id: "La Trobe" } },
  { org: "University of Melbourne", short: { en: "University of Melbourne", id: "University of Melbourne" } },
  { org: "Deakin University", short: { en: "Deakin", id: "Deakin" } },
  { org: "Institut Teknologi Bandung", short: { en: "ITB", id: "ITB" } },
] as const;
