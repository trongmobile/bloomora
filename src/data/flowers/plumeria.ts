import type { FlowerData } from '../types';

export const plumeria: FlowerData = {
  id: 'plumeria',
  slugs: { vi: 'hoa-su', en: 'plumeria' },
  scientificName: 'Plumeria rubra',
  scientificAliases: ['Plumeria', 'frangipani', 'pagoda tree', 'temple tree', 'hoa đại', 'bông sứ'],
  family: 'Apocynaceae',
  group: 'shrub-tree',
  colors: ['white', 'yellow', 'pink', 'red'],
  bloomSeasons: ['summer', 'autumn'],
  daysToBloom: [365, 1095],
  speedBand: 'slow',
  startMaterial: 'seed-or-cutting',
  confidence: 'low',
  featured: false,
  stages: [
    { id: 'seed', days: [2, 14] },
    { id: 'germination', days: [28, 56] },
    { id: 'seedling', days: [60, 120] },
    { id: 'vegetative', days: [228, 808] },
    { id: 'bud-formation', days: [30, 60] },
    { id: 'bud-development', days: [14, 30] },
    { id: 'blooming', days: [3, 7] },
    { id: 'full-bloom', days: [30, 150] },
    { id: 'wilting', days: [60, 120] },
  ],
  visual: {
    archetype: 'plumeria',
    palette: {
      petal: '#fdf6ee',
      petalDeep: '#e9a3b6',
      petalTip: '#ffffff',
      center: '#f6c53a',
      centerDeep: '#b8841a',
      leaf: '#3f8a45',
      leafDeep: '#1f5a2c',
      stem: '#a39a78',
    },
  },
  related: ['mai', 'lotus', 'bougainvillea'],
  sources: [
    {
      title: 'Plumeria',
      publisher: 'Wisconsin Horticulture, Division of Extension, University of Wisconsin–Madison',
      url: 'https://hort.extension.wisc.edu/articles/plumeria/',
      supports: 'Take 12–18 inch cuttings of leafless stem tips in spring and let the cut end dry; cuttings take one to three years to bloom and seed-grown plants three or more; over-watering may cause root rot; the milky sap can irritate eyes and skin.',
    },
    {
      title: 'Plumeria (OF-24)',
      publisher: 'College of Tropical Agriculture and Human Resources, University of Hawaiʻi at Mānoa',
      url: 'https://www3.ctahr.hawaii.edu/oc/freepubs/pdf/OF-24.pdf',
      supports: 'Flowers are a pinwheel of five petals in white, red, yellow, pink or multiple colours, highly fragrant, blooming March to October; deciduous types drop their leaves in winter; seeds germinate in about two weeks and seedlings take three years or more to flower.',
    },
    {
      title: 'Plumeria rubra — Flora & Fauna Web',
      publisher: 'National Parks Board (NParks), Singapore',
      url: 'https://www.nparks.gov.sg/florafaunaweb/flora/3/0/3074',
      supports: 'Fragrant flowers that attract sphinx moths but offer no nectar; deciduous; full sun, drought tolerant; cut surfaces produce a poisonous milky sap; common names include Pagoda Tree.',
    },
    {
      title: 'Plumeria rubra | frangipani',
      publisher: 'Royal Horticultural Society (RHS) — Plant Finder',
      url: 'https://www.rhs.org.uk/plants/94126/plumeria-rubra/details',
      supports: 'A deciduous shrub with few succulent branches and oblong leaves to 40 cm; yellow-centred rose-pink flowers up to 9 cm across; harmful if eaten, skin and eye irritant.',
    },
    {
      title: 'Frangipani growing guide',
      publisher: 'Royal Horticultural Society (RHS) — Advice',
      url: 'https://www.rhs.org.uk/plants/frangipani/growing-guide',
      supports: 'Cuttings root under good conditions in around four to six weeks; keep the rooting medium fairly dry, as wet cuttings can rot.',
    },
    {
      title: 'Chi Đại',
      publisher: 'Wikipedia tiếng Việt',
      url: 'https://vi.wikipedia.org/wiki/Chi_%C4%90%E1%BA%A1i',
      supports: 'Vietnamese names (cây đại, bông sứ, hoa sứ, chăm pa); the flowers give off scent mostly at night to attract sphinx moths and have no nectar; the genus is associated with temples and pagodas.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa sứ',
      aliases: ['sứ', 'hoa đại', 'bông sứ', 'cây đại', 'chăm pa', 'frangipani', 'plumeria', 'hoa sứ chùa'],
      tagline: 'Cành mập nở chùm hoa năm cánh xoay như chong chóng, thơm nhất về đêm, quen thuộc nơi sân chùa.',
      metaDescription:
        'Xem hoa sứ lớn lên từ cành giâm đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách chăm và những điều thú vị về hoa đại.',
      intro: [
        'Hoa sứ (Plumeria rubra), còn gọi là hoa đại hay bông sứ, là cây bụi hoặc cây gỗ nhỏ thuộc họ La bố ma (Apocynaceae). Cây có ít cành mập, lá dài hình bầu dục và chùm hoa thơm. Mỗi hoa có năm cánh xếp xoay như chong chóng, thường trắng, vàng, hồng hoặc đỏ.',
        'Ở Việt Nam, hoa sứ gắn với đền chùa. Đừng nhầm với sứ Thái (Adenium), là một loài khác, hoa không thơm. Các nguồn cho biết cây giâm cành ra hoa sau 1–3 năm và cây trồng từ hạt thường từ 3 năm trở lên, nên các mốc thời gian dưới đây chỉ là ước tính thô.',
      ],
      stages: {
        seed: {
          name: 'Cành giâm',
          description:
            'Hoa sứ thường được nhân giống bằng cành giâm. Người trồng cắt đoạn ngọn cành trụi lá dài khoảng 30–45 cm vào mùa xuân, để vết cắt khô rồi mới cắm vào đất thoát nước tốt.',
        },
        germination: {
          name: 'Ra rễ',
          description:
            'Cành giâm ra rễ trong khoảng bốn đến sáu tuần nếu điều kiện tốt. Giữ giá thể hơi khô vì cành ẩm quá dễ thối.',
        },
        'full-bloom': {
          description:
            'Chùm hoa năm cánh xoay như chong chóng nở rộ, rất thơm và thơm nhất về đêm để thu hút bướm nhân sư, dù hoa không có mật.',
        },
        wilting: {
          description:
            'Hoa tàn và rụng. Ở các giống rụng lá, cây thường rụng lá vào mùa lạnh và nghỉ cho đến khi ra lá mới.',
        },
      },
      care: {
        light: 'Cần nắng đầy đủ.',
        water: 'Để đất khô bớt giữa hai lần tưới; tưới quá nhiều có thể làm thối rễ.',
        soil: 'Đất thoát nước rất tốt, hơi chua nhẹ.',
        temperature: 'Là cây vùng nóng; RHS khuyên giữ không dưới khoảng 10 °C.',
        extra: 'Nhựa trắng đục của cây có thể gây kích ứng da và mắt, nên đeo găng khi cắt cành.',
      },
      facts: [
        'Hoa sứ thơm nhất về đêm để thu hút bướm nhân sư, nhưng hoa không có mật nên bướm thụ phấn trong lúc tìm mật.',
        'Cây có nhựa trắng đục có thể gây kích ứng da và mắt, và gây hại nếu ăn phải.',
        'Chi Plumeria gắn với đền, chùa, miếu mạo; tên “hoa sứ” và “hoa đại” cùng chỉ cây này.',
        'Sứ Thái (Adenium) là cây khác họ hàng xa, hoa không thơm.',
      ],
      keywords: [
        'hoa sứ',
        'quá trình phát triển của hoa sứ',
        'giâm cành hoa sứ',
        'time-lapse hoa sứ',
        'hoa sứ hoa đại khác nhau',
        'hoa sứ ra rễ mấy tuần',
      ],
      altText:
        'Minh họa cây hoa sứ với thân mập màu xám xanh ít cành, lá dài hình bầu dục và những chùm hoa trắng năm cánh xoay như chong chóng, tâm vàng.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính thô. Nguồn cho biết cây giâm cành ra hoa sau 1–3 năm, cành ra rễ sau khoảng 4–6 tuần; độ dài từng giai đoạn còn lại là suy đoán.',
      startNote: 'Mô phỏng bắt đầu từ một đoạn cành giâm cắm vào đất, vì hoa sứ thường được nhân giống bằng cành.',
    },
    en: {
      name: 'Plumeria',
      aliases: ['frangipani', 'pagoda tree', 'temple tree', 'hoa sứ', 'hoa đại', 'bông sứ'],
      tagline: 'Fleshy branches and pinwheel flowers that smell strongest at night.',
      metaDescription:
        'Watch plumeria (frangipani) grow from a cutting to full bloom in an interactive time-lapse: growth stages, estimated timing, care tips and plant facts.',
      intro: [
        'Plumeria (Plumeria rubra), also called frangipani, is a shrub or small tree in the dogbane family (Apocynaceae). It has a few fleshy branches, long oblong leaves and clusters of fragrant flowers. Each flower has five petals arranged like a pinwheel, usually white, yellow, pink or red.',
        'In Vietnam it is tied to temples and pagodas; it is called hoa sứ or hoa đại. Do not confuse it with sứ Thái (Adenium), a different plant with unscented flowers. Sources say cuttings flower in 1–3 years and seed-grown plants usually take three or more, so every timing below is only a rough estimate.',
      ],
      stages: {
        seed: {
          name: 'Cutting',
          description:
            'Plumeria is usually propagated by cuttings. Growers take 12–18 inch (about 30–45 cm) leafless stem tips in spring, let the cut end dry, then plant them in free-draining soil.',
        },
        germination: {
          name: 'Rooting',
          description:
            'Under good conditions a cutting roots in around four to six weeks. Keep the rooting medium fairly dry, since wet cuttings rot easily.',
        },
        'full-bloom': {
          description:
            'The pinwheel flowers open in clusters. They are very fragrant, strongest at night to attract sphinx moths, though the flowers offer no nectar.',
        },
        wilting: {
          description:
            'The flowers fade and fall. In deciduous types the tree usually drops its leaves in the cool season and rests until new leaves appear.',
        },
      },
      care: {
        light: 'Full sun.',
        water: 'Let the soil dry out between waterings; too much water can cause root rot.',
        soil: 'Very well-drained, slightly acidic soil.',
        temperature: 'A warm-climate plant; the RHS advises keeping it above about 10 °C.',
        extra: 'The milky sap can irritate skin and eyes, so wear gloves when taking cuttings.',
      },
      facts: [
        'Plumeria flowers smell strongest at night to attract sphinx moths, but they offer no nectar, so the moths pollinate while searching for it.',
        'The milky sap can irritate skin and eyes, and the plant is harmful if eaten.',
        'The genus is associated with temples and shrines; hoa sứ and hoa đại both name this plant.',
        'Sứ Thái (Adenium) is a different, distantly related plant with unscented flowers.',
      ],
      keywords: [
        'plumeria growth stages',
        'frangipani life cycle',
        'time-lapse plumeria',
        'how long does a plumeria cutting take to bloom',
        'hoa sứ hoa đại difference',
      ],
      altText:
        'Illustration of a plumeria with a thick grey-green trunk and few branches, long oblong leaves and clusters of white five-petalled pinwheel flowers with yellow centres.',
      timeNote:
        'Timings are rough estimates. Sources say cuttings flower in 1–3 years and root in about 4–6 weeks; the length of each remaining stage is a guess.',
      startNote: 'The simulation starts from a stem cutting planted in soil, since plumeria is usually propagated by cuttings.',
    },
  },
};
