import type { Lang } from "@/data/site";

export const COPY = {
  en: {
    brand: "IA-CRC",
    fullName: "Indonesia–Australia Collaborative Research in Construction",
    tagline: "Empowering the Future of Construction",
    nav: {
      about: "About",
      news: "News",
      research: "Research",
      publications: "Publications",
      activities: "Activities",
      members: "Members",
      resources: "Resources",
      contact: "Contact",
      join: "Join us",
      signIn: "Sign in",
    },
    hero: {
      kicker: "A bilateral research forum · est. 2023",
      lead: "A place for Indonesian and Australian academics to collaborate on the construction industry’s hardest problems — productivity, safety, resilience, and the next generation of infrastructure.",
      ctaPrimary: "Become a member",
      ctaSecondary: "Explore research",
    },
    aboutPreview: {
      kicker: "About the forum",
      title: "A living research community, not a grant office.",
      body: "IA-CRC was founded at the ITB Jakarta Campus on 4 November 2023, after a two-day workshop on 1 and 4 November. It began as AI-CRC and took its present name after the Charter Meeting of 9 December 2023.",
      more: "Read the story",
    },
    vision: {
      kicker: "Vision",
      title: "Sustainable infrastructure, jointly researched.",
      body: "To create a dynamic research group dedicated to advancing the construction industry’s capabilities in delivering sustainable infrastructure in Indonesia, Australia, and the surrounding region. Through research, innovation, and collaboration, every project should become a beacon of environmental stewardship, social responsibility, and long-term resilience.",
    },
    objectivesTitle: "What we exist to do",
    objectives: [
      {
        title: "Facilitate networking",
        body: "Give researchers from member universities a place to meet, form personal connections, and share expertise.",
      },
      {
        title: "Identify common themes",
        body: "Find research areas where institutions already share interests and can collaborate with real intent.",
      },
      {
        title: "Foster interdisciplinarity",
        body: "Open discussions across fields so new perspectives can reshape construction problems.",
      },
      {
        title: "Initiate joint projects",
        body: "Help teams form projects that lead to publications, grant applications, and other scholarly outputs.",
      },
      {
        title: "Exchange knowledge",
        body: "Move methods and practices between members so every institution becomes more capable.",
      },
    ],
    rwgTitle: "Eight working groups",
    rwgLead: "Each Research Working Group has a coordinator, members, topics, and projects. Themes can change as the industry’s questions change.",
    viewAllRwg: "See all groups & projects",
    projectsTitle: "Current research",
    viewAllProjects: "Full project list",
    status: {
      ongoing: "On-going",
      proposal: "Proposal",
      finished: "Finished",
    },
    activitiesTitle: "Recent activity",
    viewAllActivities: "All activities",
    newsTitle: "News",
    viewAllNews: "All news",
    readMore: "Read more",
    newsPage: {
      title: "News",
      intro: "Announcements from the forum — conferences, seminars, new papers, and calls to members.",
      back: "All news",
      visit: "Open the conference site",
      notFound: "That article is not on this site.",
    },
    publicationsPage: {
      title: "Publications",
      intro:
        "Papers that began in IA-CRC conversations — a seminar question, a working-group exchange, a chance meeting. They do not have to be formal IA-CRC projects. Members add a paper with its DOI or URL; the citation is built automatically and announced in News.",
      formKicker: "For members",
      formTitle: "Add a paper",
      formLead: "Paste a DOI or the paper’s URL. We fetch the title, authors, and venue, then list it and post a short news item.",
      sourceLabel: "DOI or URL",
      sourceHint: "Example: 10.1061/JCEMD4.COENG-13821 or https://doi.org/…",
      nameLabel: "Your name",
      emailLabel: "Email",
      institutionLabel: "Institution",
      noteLabel: "How it relates to IA-CRC",
      noteHint: "Optional. A sentence on the conversation or group that started the work.",
      lookup: "Look up citation",
      looking: "Looking up…",
      submit: "Add to the list",
      saving: "Adding…",
      preview: "Citation",
      lookupError: "That DOI or URL could not be read.",
      submitError: "The paper could not be added. Try again.",
      success: "Added to the list and posted in News.",
      duplicate: "That paper is already on the list.",
      listTitle: "The list",
      empty: "No papers yet. The first DOI from a member will appear here.",
      one: "paper",
      many: "papers",
      open: "Open the paper",
      viewNews: "News item",
      addedBy: "Added by",
    },
    kind: {
      talk: "Virtual talk",
      workshop: "Workshop",
      seminar: "Seminar",
      conference: "Conference",
      meeting: "Meeting",
    },
    galleryTitle: "From the field",
    joinBanner: {
      title: "Membership is free.",
      body: "Open to students and lecturers at Australian and Indonesian universities. Industry partners join as supporters.",
      member: "Join as a member",
      supporter: "Join as a supporter",
    },
    footer: {
      secretariat: "Secretariat",
      address:
        "Construction and Infrastructure Management Research Group\nFaculty of Civil and Environmental Engineering\nInstitut Teknologi Bandung\nCIBE Building, 6th Floor\nJl. Ganesha No. 10, Bandung, Indonesia",
      contact: "Contact",
      links: "Navigate",
      rights: "Indonesia–Australia Collaborative Research in Construction.",
    },
    aboutPage: {
      title: "About IA-CRC",
      intro:
        "IA-CRC — Indonesia–Australia Collaborative Research in Construction — is a forum for academics from both countries to work on construction-industry challenges. It was initiated by colleagues at La Trobe University, the University of Melbourne, Deakin University, and Institut Teknologi Bandung, as a continuation of five years of research with the Indonesian construction industry as its context.",
      extension:
        "The forum now widens that context to Indonesia, Australia, and the surrounding region, and invites more academics from both sides to join.",
      timelineTitle: "How it began",
      timeline: [
        {
          date: "1 & 4 Nov 2023",
          title: "Two-day founding workshop",
          body: "Held online and on site at the ITB Jakarta Campus. The workshop established the Australia–Indonesia Collaborative Research in Construction.",
        },
        {
          date: "4 Nov 2023",
          title: "Forum established",
          body: "IA-CRC was established at the ITB Jakarta Campus, originally under the name AI-CRC.",
        },
        {
          date: "9 Dec 2023",
          title: "Charter Meeting",
          body: "The Charter Meeting renamed the forum IA-CRC and agreed the terms by which members walk together.",
        },
        {
          date: "First week of November",
          title: "Annual meeting",
          body: "Held each year to commemorate the founding — preferably on the campus of the elected host, with an annual evaluation and at least one auxiliary activity.",
        },
      ],
      walkTitle: "The way we walk",
      walkIntro: "Terms and procedures agreed by members for achieving the objectives.",
      walk: [
        {
          title: "Members",
          body: "Academics from Australia and Indonesia who want to advance construction research. A member belongs to at least one Research Working Group and contributes actively. Membership is free and open to students and lecturers.",
        },
        {
          title: "Research themes",
          body: "Broad, current, and important areas of construction research that are shared by Australia, Indonesia, and the surrounding region. New themes must be agreed by members.",
        },
        {
          title: "Research Working Groups",
          body: "A group of members around one theme. Each RWG has a coordinator, members, topics, teams, and projects. Groups can form by push or pull as research needs change.",
        },
        {
          title: "Coordinator",
          body: "Guarantees the relevance and quality of projects under a theme: reviews proposals, decides, then monitors and evaluates the work.",
        },
        {
          title: "Research topics & projects",
          body: "A topic is a cluster of problems in a specific context. A project is based on a proposal from a team, led by a team leader, and coordinated by the RWG coordinator.",
        },
        {
          title: "Research team & team leader",
          body: "A team works on one project. The leader submits the proposal, finds funding, manages the work, and reports to the RWG when the project is complete.",
        },
        {
          title: "Proposals",
          body: "Any member may submit. A proposal names the theme or RWG, team members (must include both Australian and Indonesian academics), team leader, potential partners and funders, and a 500-word synopsis.",
        },
        {
          title: "Funding",
          body: "Provided by a member’s institution or by third parties (supporters or sponsors). IA-CRC itself does not hold or manage money.",
        },
        {
          title: "Partners & supporters",
          body: "Partners are the institutions or people whose questions the research answers. Supporters provide needs, expertise, data, laboratory or field access, and funding.",
        },
        {
          title: "Communication",
          body: "Microsoft Teams, a mailing list, online meetings, and a WhatsApp group.",
        },
        {
          title: "Finance",
          body: "No finance is managed by IA-CRC. Host institutions take care of any activity they run.",
        },
        {
          title: "Code of conduct",
          body: "Academic ethics apply. Materials belonging to IA-CRC may be used by members who took part in the associated project; others need written permission from the RWG coordinator. Intellectual property and personal information are protected.",
        },
      ],
      auxiliaryTitle: "Auxiliary activities",
      auxiliary:
        "Members may run short talks, courses, workshops, seminars, or conferences related to an RWG theme. Activities are self-supported and must be agreed by the coordinator.",
      vit: {
        title: "Virtual International Talk",
        body: "An online talk by an RWG or project team as part of its discussion or literature study. Speakers are members or invited scholars. Open to members and to the public.",
      },
      vic: {
        title: "Virtual International Course",
        body: "A follow-up online course based on research results. Hosted by a member institution and formally recognised as part of that institution’s programme. Aimed at students, practitioners, or government officers.",
      },
    },
    researchPage: {
      title: "Research",
      intro:
        "Work is organised into Research Working Groups. Projects are proposed by mixed Indonesian–Australian teams, reviewed by the group coordinator, and funded by member institutions or supporters.",
      groups: "Working groups",
      projects: "Projects",
      proposeTitle: "Propose or join a project",
      propose:
        "Members submit a proposal in Microsoft Teams or with the template, then send it to the RWG coordinator. To join an existing project, fill in the Teams form and contact the team leader directly.",
      downloadTemplate: "Proposal template",
    },
    activitiesPage: {
      title: "Activities",
      intro:
        "Seminars, workshops, virtual talks, and an annual meeting in the first week of November. Auxiliary activities are proposed by members and agreed by the relevant coordinator.",
      all: "All",
      seminarCta: "Seminar 2025 on Teams",
    },
    membersPage: {
      title: "Members",
      intro:
        "Initiated by academics from La Trobe University, the University of Melbourne, Deakin University, and Institut Teknologi Bandung. Membership is now open across both countries.",
      search: "Search people or institutions",
      au: "Australia",
      id: "Indonesia",
      industry: "Industry",
      people: "researchers",
      empty: "No members match that search.",
    },
    joinPage: {
      title: "Join IA-CRC",
      intro:
        "Membership is free. Join a Research Working Group as an academic member, or support a project as an institution.",
      memberTitle: "Member",
      memberBody:
        "For students and lecturers at Australian and Indonesian universities. Choose at least one Research Working Group and contribute actively. You may change groups at any time, unless you are on an active project.",
      memberCta: "Open the member form",
      supporterTitle: "Supporter",
      supporterBody:
        "For institutions that can offer research needs, expertise, data, laboratory or field access, or funding. Supporters sit alongside — not inside — the academic membership.",
      supporterCta: "Open the supporter form",
      note: "Forms open in Microsoft Forms. After you submit, the secretariat will place you in the relevant working group and communication channels.",
    },
    resourcesPage: {
      title: "Resources",
      intro: "Presentations, policy notes, and shared documents from IA-CRC activities.",
      items: [
        {
          title: "IA-CRC Seminar 2024 presentations",
          meta: "5 November 2024",
          hrefKey: "seminar2024Presentations" as const,
        },
        {
          title: "Policy brief (Ringkasan Kebijakan)",
          meta: "Document",
          hrefKey: "policyBrief" as const,
        },
        {
          title: "Notes on the UUJK revision discussion",
          meta: "T.K. Chan",
          hrefKey: "uujkNotes" as const,
        },
        {
          title: "Findings of the UUJK survey by ICF",
          meta: "Survey",
          hrefKey: "uujkSurvey" as const,
        },
        {
          title: "Research proposal template",
          meta: "Members",
          hrefKey: "proposalTemplate" as const,
        },
        {
          title: "All links on Linktree",
          meta: "linktr.ee/IACRC",
          hrefKey: "linktree" as const,
        },
      ],
    },
    contactPage: {
      title: "Secretariat",
      intro:
        "The secretariat sits with the Construction and Infrastructure Management Research Group at Institut Teknologi Bandung.",
      person: "Contact person",
      name: "Muhamad Abduh",
      role: "Professor of Civil Engineering, ITB · Coordinator, RWG-01",
      write: "Write to us",
      map: "Open in Maps",
    },
    login: {
      title: "Member sign-in",
      body: "Sign in to access member-only tools on this site. Research proposals and Teams channels remain on Microsoft 365.",
      disabled: "Sign-in is currently disabled.",
    },
    notFound: {
      title: "Page not found",
      body: "That address is not on this site.",
      back: "Back to home",
    },
  },
  id: {
    brand: "IA-CRC",
    fullName: "Penelitian Kolaboratif Indonesia–Australia di Bidang Konstruksi",
    tagline: "Memberdayakan Masa Depan Konstruksi",
    nav: {
      about: "Tentang",
      news: "Berita",
      research: "Riset",
      publications: "Publikasi",
      activities: "Kegiatan",
      members: "Anggota",
      resources: "Sumber daya",
      contact: "Kontak",
      join: "Bergabung",
      signIn: "Masuk",
    },
    hero: {
      kicker: "Forum riset bilateral · berdiri 2023",
      lead: "Tempat akademisi Indonesia dan Australia berkolaborasi menjawab tantangan industri konstruksi — produktivitas, keselamatan, resiliensi, dan infrastruktur generasi berikutnya.",
      ctaPrimary: "Menjadi anggota",
      ctaSecondary: "Jelajahi riset",
    },
    aboutPreview: {
      kicker: "Tentang forum",
      title: "Komunitas riset yang hidup, bukan kantor hibah.",
      body: "IA-CRC didirikan di Kampus ITB Jakarta pada 4 November 2023, setelah lokakarya dua hari pada 1 dan 4 November. Awalnya bernama AI-CRC, lalu menjadi IA-CRC setelah Rapat Piagam 9 Desember 2023.",
      more: "Baca kisahnya",
    },
    vision: {
      kicker: "Visi",
      title: "Infrastruktur berkelanjutan, diteliti bersama.",
      body: "Membangun kelompok riset yang dinamis untuk memajukan kemampuan industri konstruksi dalam menghadirkan infrastruktur berkelanjutan di Indonesia, Australia, dan kawasan sekitar. Melalui riset, inovasi, dan kolaborasi, setiap proyek menjadi teladan pengelolaan lingkungan, tanggung jawab sosial, dan ketahanan jangka panjang.",
    },
    objectivesTitle: "Tujuan kami",
    objectives: [
      {
        title: "Memfasilitasi jejaring",
        body: "Memberi peneliti dari perguruan tinggi anggota ruang untuk bertemu, membangun relasi, dan berbagi keahlian.",
      },
      {
        title: "Menemukan tema bersama",
        body: "Mengidentifikasi minat riset yang sudah beririsan agar kolaborasi berjalan dengan niat yang jelas.",
      },
      {
        title: "Mendorong interdisiplin",
        body: "Membuka diskusi lintas bidang agar persoalan konstruksi dilihat dari sudut yang baru.",
      },
      {
        title: "Memulai proyek bersama",
        body: "Membantu tim membentuk proyek yang berujung pada publikasi, proposal hibah, dan luaran ilmiah lain.",
      },
      {
        title: "Saling bertukar pengetahuan",
        body: "Mengalirkan metode dan praktik antar anggota agar setiap institusi semakin cakap.",
      },
    ],
    rwgTitle: "Delapan kelompok kerja",
    rwgLead:
      "Setiap Research Working Group memiliki koordinator, anggota, topik, dan proyek. Tema dapat berubah mengikuti kebutuhan riset.",
    viewAllRwg: "Lihat semua kelompok & proyek",
    projectsTitle: "Riset berjalan",
    viewAllProjects: "Daftar proyek lengkap",
    status: {
      ongoing: "Berjalan",
      proposal: "Proposal",
      finished: "Selesai",
    },
    activitiesTitle: "Kegiatan terkini",
    viewAllActivities: "Semua kegiatan",
    newsTitle: "Berita",
    viewAllNews: "Semua berita",
    readMore: "Baca selengkapnya",
    newsPage: {
      title: "Berita",
      intro: "Pengumuman forum — konferensi, seminar, publikasi baru, dan undangan kepada anggota.",
      back: "Semua berita",
      visit: "Buka situs konferensi",
      notFound: "Artikel itu tidak ada di situs ini.",
    },
    publicationsPage: {
      title: "Publikasi",
      intro:
        "Makalah yang berawal dari percakapan di IA-CRC. Tidak harus menjadi proyek formal forum. Anggota menambahkan DOI atau URL; sitasi disusun otomatis dan diumumkan di Berita.",
      formKicker: "Untuk anggota",
      formTitle: "Tambah makalah",
      formLead: "Tempel DOI atau URL. Kami mengambil judul, penulis, dan penerbit, lalu menampilkannya dan membuat berita singkat.",
      sourceLabel: "DOI atau URL",
      sourceHint: "Contoh: 10.1061/JCEMD4.COENG-13821 atau https://doi.org/…",
      nameLabel: "Nama Anda",
      emailLabel: "Email",
      institutionLabel: "Institusi",
      noteLabel: "Kaitannya dengan IA-CRC",
      noteHint: "Opsional. Satu kalimat tentang percakapan atau kelompok yang memulai pekerjaan ini.",
      lookup: "Cari sitasi",
      looking: "Mencari…",
      submit: "Tambahkan ke daftar",
      saving: "Menambahkan…",
      preview: "Sitasi",
      lookupError: "DOI atau URL itu tidak dapat dibaca.",
      submitError: "Makalah tidak dapat ditambahkan. Coba lagi.",
      success: "Sudah masuk daftar dan diumumkan di Berita.",
      duplicate: "Makalah itu sudah ada di daftar.",
      listTitle: "Daftar",
      empty: "Belum ada makalah. DOI pertama dari anggota akan muncul di sini.",
      one: "makalah",
      many: "makalah",
      open: "Buka makalah",
      viewNews: "Berita",
      addedBy: "Ditambahkan oleh",
    },
    kind: {
      talk: "Kuliah virtual",
      workshop: "Lokakarya",
      seminar: "Seminar",
      conference: "Konferensi",
      meeting: "Rapat",
    },
    galleryTitle: "Dari lapangan",
    joinBanner: {
      title: "Keanggotaan gratis.",
      body: "Terbuka bagi mahasiswa dan dosen di perguruan tinggi Australia dan Indonesia. Mitra industri bergabung sebagai pendukung.",
      member: "Daftar sebagai anggota",
      supporter: "Daftar sebagai pendukung",
    },
    footer: {
      secretariat: "Sekretariat",
      address:
        "Kelompok Keahlian Manajemen Konstruksi dan Infrastruktur\nFakultas Teknik Sipil dan Lingkungan\nInstitut Teknologi Bandung\nGedung CIBE, Lantai 6\nJl. Ganesha No. 10, Bandung, Indonesia",
      contact: "Kontak",
      links: "Navigasi",
      rights: "Indonesia–Australia Collaborative Research in Construction.",
    },
    aboutPage: {
      title: "Tentang IA-CRC",
      intro:
        "IA-CRC — Indonesia–Australia Collaborative Research in Construction — adalah forum bagi akademisi kedua negara untuk menjawab tantangan industri konstruksi. Forum ini diprakarsai kolega di La Trobe University, University of Melbourne, Deakin University, dan Institut Teknologi Bandung, sebagai kelanjutan kolaborasi riset lima tahun dengan industri konstruksi Indonesia sebagai konteksnya.",
      extension:
        "Kini konteksnya diperluas ke Indonesia, Australia, dan kawasan sekitar, serta mengundang lebih banyak akademisi dari kedua belah pihak.",
      timelineTitle: "Awal mula",
      timeline: [
        {
          date: "1 & 4 Nov 2023",
          title: "Lokakarya pendirian dua hari",
          body: "Diselenggarakan daring dan luring di Kampus ITB Jakarta. Lokakarya ini membentuk Australia–Indonesia Collaborative Research in Construction.",
        },
        {
          date: "4 Nov 2023",
          title: "Forum berdiri",
          body: "IA-CRC didirikan di Kampus ITB Jakarta, semula dengan nama AI-CRC.",
        },
        {
          date: "9 Des 2023",
          title: "Rapat Piagam",
          body: "Rapat Piagam menamai ulang forum menjadi IA-CRC dan menyepakati cara anggota berjalan bersama.",
        },
        {
          date: "Pekan pertama November",
          title: "Rapat tahunan",
          body: "Diadakan setiap tahun untuk memperingati pendirian — sedapat mungkin di kampus tuan rumah terpilih, dengan evaluasi tahunan dan setidaknya satu kegiatan pendukung.",
        },
      ],
      walkTitle: "Cara kami berjalan",
      walkIntro: "Ketentuan dan prosedur yang disepakati anggota untuk mencapai tujuan.",
      walk: [
        {
          title: "Anggota",
          body: "Akademisi Australia dan Indonesia yang ingin memajukan riset konstruksi. Setiap anggota tergabung dalam setidaknya satu Research Working Group dan berkontribusi aktif. Keanggotaan gratis, terbuka bagi mahasiswa dan dosen.",
        },
        {
          title: "Tema riset",
          body: "Wilayah riset konstruksi yang luas, aktual, dan penting bagi Australia, Indonesia, dan kawasan sekitar. Tema baru harus disepakati anggota.",
        },
        {
          title: "Research Working Group",
          body: "Kelompok anggota di sekitar satu tema. Setiap RWG punya koordinator, anggota, topik, tim, dan proyek. Kelompok dapat terbentuk secara push atau pull sesuai kebutuhan.",
        },
        {
          title: "Koordinator",
          body: "Menjamin relevansi dan mutu proyek dalam suatu tema: menelaah proposal, memutuskan, lalu memantau dan mengevaluasi pekerjaan.",
        },
        {
          title: "Topik & proyek riset",
          body: "Topik adalah kumpulan persoalan dalam konteks tertentu. Proyek disusun dari proposal tim, dipimpin ketua tim, dan dikoordinasikan oleh koordinator RWG.",
        },
        {
          title: "Tim riset & ketua tim",
          body: "Tim mengerjakan satu proyek. Ketua mengajukan proposal, mencari pendanaan, mengelola pekerjaan, dan melapor ke RWG saat proyek selesai.",
        },
        {
          title: "Proposal",
          body: "Setiap anggota boleh mengajukan. Proposal memuat tema atau RWG, anggota tim (wajib mencakup akademisi Australia dan Indonesia), ketua tim, calon mitra dan sumber dana, serta sinopsis maksimal 500 kata.",
        },
        {
          title: "Pendanaan",
          body: "Disediakan institusi anggota atau pihak ketiga (pendukung atau sponsor). IA-CRC sendiri tidak memegang atau mengelola dana.",
        },
        {
          title: "Mitra & pendukung",
          body: "Mitra adalah institusi atau individu yang persoalannya dijawab riset. Pendukung menyediakan kebutuhan riset, keahlian, data, akses laboratorium atau lapangan, dan dana.",
        },
        {
          title: "Komunikasi",
          body: "Microsoft Teams, milis, rapat daring, dan grup WhatsApp.",
        },
        {
          title: "Keuangan",
          body: "Tidak ada aktivitas keuangan yang dikelola IA-CRC. Institusi tuan rumah mengurus kegiatan yang diselenggarakannya.",
        },
        {
          title: "Kode etik",
          body: "Etika akademik berlaku. Materi milik IA-CRC boleh dipakai anggota yang terlibat dalam proyek terkait; anggota lain memerlukan izin tertulis koordinator RWG. Hak kekayaan intelektual dan data pribadi dilindungi.",
        },
      ],
      auxiliaryTitle: "Kegiatan pendukung",
      auxiliary:
        "Anggota dapat menyelenggarakan kuliah singkat, kursus, lokakarya, seminar, atau konferensi terkait tema RWG. Kegiatan dibiayai sendiri dan harus disetujui koordinator.",
      vit: {
        title: "Virtual International Talk",
        body: "Kuliah daring oleh RWG atau tim proyek sebagai bagian diskusi atau studi literatur. Narasumber adalah anggota atau undangan. Terbuka bagi anggota dan publik.",
      },
      vic: {
        title: "Virtual International Course",
        body: "Kursus daring lanjutan berdasarkan hasil riset. Diselenggarakan institusi anggota dan diakui secara formal sebagai bagian program institusi. Ditujukan bagi mahasiswa, praktisi, atau aparat pemerintah.",
      },
    },
    researchPage: {
      title: "Riset",
      intro:
        "Pekerjaan diorganisasi dalam Research Working Group. Proyek diusulkan tim campuran Indonesia–Australia, ditelaah koordinator kelompok, dan didanai institusi anggota atau pendukung.",
      groups: "Kelompok kerja",
      projects: "Proyek",
      proposeTitle: "Mengusulkan atau bergabung dalam proyek",
      propose:
        "Anggota mengirim proposal di Microsoft Teams atau memakai templat, lalu menyampaikannya kepada koordinator RWG. Untuk bergabung ke proyek yang sudah ada, isi formulir di Teams dan hubungi ketua tim secara langsung.",
      downloadTemplate: "Templat proposal",
    },
    activitiesPage: {
      title: "Kegiatan",
      intro:
        "Seminar, lokakarya, kuliah virtual, dan rapat tahunan pada pekan pertama November. Kegiatan pendukung diusulkan anggota dan disetujui koordinator terkait.",
      all: "Semua",
      seminarCta: "Seminar 2025 di Teams",
    },
    membersPage: {
      title: "Anggota",
      intro:
        "Diprakarsai akademisi La Trobe University, University of Melbourne, Deakin University, dan Institut Teknologi Bandung. Kini keanggotaan terbuka di kedua negara.",
      search: "Cari nama atau institusi",
      au: "Australia",
      id: "Indonesia",
      industry: "Industri",
      people: "peneliti",
      empty: "Tidak ada anggota yang cocok.",
    },
    joinPage: {
      title: "Bergabung dengan IA-CRC",
      intro:
        "Keanggotaan gratis. Bergabunglah ke Research Working Group sebagai anggota akademik, atau dukung sebuah proyek sebagai institusi.",
      memberTitle: "Anggota",
      memberBody:
        "Bagi mahasiswa dan dosen di perguruan tinggi Australia dan Indonesia. Pilih setidaknya satu Research Working Group dan berkontribusi aktif. Anda dapat pindah kelompok kapan saja, kecuali sedang terlibat dalam proyek berjalan.",
      memberCta: "Buka formulir anggota",
      supporterTitle: "Pendukung",
      supporterBody:
        "Bagi institusi yang dapat menyediakan kebutuhan riset, keahlian, data, akses laboratorium atau lapangan, atau pendanaan. Pendukung berdiri di samping — bukan di dalam — keanggotaan akademik.",
      supporterCta: "Buka formulir pendukung",
      note: "Formulir terbuka di Microsoft Forms. Setelah Anda mengirim, sekretariat akan menempatkan Anda di kelompok kerja dan kanal komunikasi yang sesuai.",
    },
    resourcesPage: {
      title: "Sumber daya",
      intro: "Presentasi, catatan kebijakan, dan dokumen bersama dari kegiatan IA-CRC.",
      items: [
        {
          title: "Presentasi Seminar IA-CRC 2024",
          meta: "5 November 2024",
          hrefKey: "seminar2024Presentations" as const,
        },
        {
          title: "Ringkasan Kebijakan",
          meta: "Dokumen",
          hrefKey: "policyBrief" as const,
        },
        {
          title: "Catatan diskusi revisi UUJK",
          meta: "T.K. Chan",
          hrefKey: "uujkNotes" as const,
        },
        {
          title: "Temuan survei UUJK oleh ICF",
          meta: "Survei",
          hrefKey: "uujkSurvey" as const,
        },
        {
          title: "Templat proposal riset",
          meta: "Anggota",
          hrefKey: "proposalTemplate" as const,
        },
        {
          title: "Semua tautan di Linktree",
          meta: "linktr.ee/IACRC",
          hrefKey: "linktree" as const,
        },
      ],
    },
    contactPage: {
      title: "Sekretariat",
      intro:
        "Sekretariat berada di Kelompok Keahlian Manajemen Konstruksi dan Infrastruktur, Institut Teknologi Bandung.",
      person: "Narahubung",
      name: "Muhamad Abduh",
      role: "Guru Besar Teknik Sipil, ITB · Koordinator RWG-01",
      write: "Kirim surel",
      map: "Buka di Peta",
    },
    login: {
      title: "Masuk anggota",
      body: "Masuk untuk mengakses perkakas anggota di situs ini. Proposal riset dan kanal Teams tetap berada di Microsoft 365.",
      disabled: "Masuk sedang dinonaktifkan.",
    },
    notFound: {
      title: "Halaman tidak ditemukan",
      body: "Alamat itu tidak ada di situs ini.",
      back: "Kembali ke beranda",
    },
  },
} as const;

export type Copy = (typeof COPY)[Lang];
