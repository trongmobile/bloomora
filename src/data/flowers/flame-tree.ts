import type { FlowerData } from '../types';

export const flameTree: FlowerData = {
  id: 'flame-tree',
  slugs: { vi: 'hoa-phuong', en: 'flame-tree' },
  scientificName: 'Delonix regia',
  scientificAliases: ['Poinciana regia', 'royal poinciana', 'flamboyant', 'flame of the forest', 'phượng vĩ', 'hoa học trò'],
  family: 'Fabaceae',
  group: 'shrub-tree',
  colors: ['red', 'orange'],
  bloomSeasons: ['spring', 'summer'],
  daysToBloom: [1095, 3650],
  speedBand: 'slow',
  startMaterial: 'seed',
  confidence: 'low',
  featured: false,
  isNew: true,
  stages: [
    { id: 'seed', days: [1, 7] },
    { id: 'germination', days: [7, 21] },
    { id: 'seedling', days: [90, 150] },
    { id: 'vegetative', days: [919, 3315] },
    { id: 'bud-formation', days: [45, 90] },
    { id: 'bud-development', days: [30, 60] },
    { id: 'blooming', days: [3, 7] },
    { id: 'full-bloom', days: [21, 56] },
    { id: 'wilting', days: [150, 210] },
  ],
  visual: {
    archetype: 'flame-tree',
    palette: {
      petal: '#e8431f',
      petalDeep: '#b3200f',
      petalTip: '#fbe8c8',
      center: '#f2b230',
      centerDeep: '#a85a10',
      leaf: '#6aa94a',
      leafDeep: '#2f6a2a',
      stem: '#6a5240',
    },
  },
  related: ['bougainvillea', 'mai', 'peach-blossom'],
  sources: [
    {
      title: 'Delonix regia (Hook.) Raf. — Agroforestry Database 4.0',
      publisher: 'World Agroforestry Centre (Orwa et al. 2009)',
      url: 'https://apps.worldagroforestry.org/treedb/AFTPDFS/Delonix_regia.PDF',
      supports: 'The tree starts flowering in its 4th or 5th year; woody pods 30–75 cm long hang on for most of the year; it needs light and flowers less in shade.',
    },
    {
      title: 'Delonix regia (Bojer ex Hook.) Raf.',
      publisher: 'National Parks Board (NParks), Singapore — Flora & Fauna Web',
      url: 'https://www.nparks.gov.sg/florafaunaweb/flora/2/8/2838',
      supports: 'Flowering may begin after 5–10 years of growth; seeds germinate better after a 10-second boiling-water dip and a 24-hour soak; the tree is deciduous where there is a dry season.',
    },
    {
      title: 'Delonix regia: Royal Poinciana (ENH387)',
      publisher: 'UF/IFAS Extension, University of Florida',
      url: 'https://ask.ifas.ufl.edu/publication/ST228/pdf',
      supports: 'Fast growth, full sun, well-watered until established, propagation by seed, and a red-orange bloom from May to July in Florida.',
    },
    {
      title: 'Delonix regia (Bojer ex Hook.) Raf. — Tropical Tree Seed Manual',
      publisher: 'USDA Forest Service, Southern Research Station (J.A. Vozzo)',
      url: 'https://npn.rngr.net/publications/ttsm/species/PDF.2004-01-12.1452/at_download/file',
      supports: 'Mature, flowering trees may be grown in 3 to 5 years on good sites; seeds need scarification; pods mature after about 6 months.',
    },
    {
      title: 'Phượng vĩ',
      publisher: 'Wikipedia tiếng Việt',
      url: 'https://vi.wikipedia.org/wiki/Ph%C6%B0%E1%BB%A3ng_v%C4%A9',
      supports: 'In Vietnam the tree is tied to school days (“hoa học trò”) and blooms around May–July; Hải Phòng is called the red flame-tree city; the French brought it from Madagascar in the late 19th century.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa phượng',
      aliases: ['phượng', 'phượng vĩ', 'phượng đỏ', 'hoa học trò', 'flamboyant', 'royal poinciana', 'flame tree'],
      tagline: 'Cây gỗ tán ô nở đỏ rực mỗi mùa hè, gắn với những ngày bế giảng của tuổi học trò.',
      metaDescription:
        'Xem hoa phượng lớn lên từ hạt đến lúc nở đỏ rực mùa hè qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách trồng và những điều thú vị.',
      intro: [
        'Hoa phượng (Delonix regia, còn gọi là phượng vĩ) là cây gỗ thuộc họ Đậu (Fabaceae), có nguồn gốc từ Madagascar. Cây có tán rộng hình ô, lá kép lông chim hai lần mịn như lông vũ, và hoa đỏ hoặc đỏ cam mọc thành chùm ở đầu cành. Mỗi hoa có năm cánh, trong đó một cánh đứng thẳng có vệt trắng hoặc vàng.',
        'Ở Việt Nam, phượng nở rộ khoảng tháng 5 đến tháng 7, trùng với cuối năm học nên được gọi là “hoa học trò”. Hải Phòng nổi tiếng với những hàng phượng và còn được gọi là thành phố hoa phượng đỏ. Các nguồn cho số năm từ hạt đến lúc nở rất khác nhau, từ 3–5 năm đến 5–10 năm, nên mọi mốc thời gian dưới đây chỉ là ước tính thô.',
      ],
      stages: {
        seed: {
          description:
            'Hạt phượng có vỏ cứng, hạt trong quả đậu thường được ngâm nước nóng rồi ngâm nước thường khoảng một ngày để vỏ thấm nước và dễ nảy mầm.',
        },
        vegetative: {
          description:
            'Giai đoạn dài nhất: cây lớn nhanh, thân hóa gỗ, tán rộng dần ra thành hình ô với lá kép mịn. Cây cần nhiều nắng và chưa ra hoa trong nhiều năm.',
        },
        wilting: {
          description:
            'Cánh hoa rụng, để lại các quả đậu dẹt dài. Quả treo trên cây gần như quanh năm, chín và nứt sau khoảng sáu tháng.',
        },
      },
      care: {
        light: 'Cần nắng đầy đủ; ở chỗ rợp cây lớn chậm và ra hoa ít.',
        water: 'Tưới đều cho đến khi cây bén rễ, sau đó chịu hạn khá tốt.',
        soil: 'Chịu được nhiều loại đất, thích đất cát pha thoát nước.',
        temperature: 'Là cây vùng nhiệt đới, không chịu sương giá.',
        extra: 'Ngâm hạt vào nước sôi khoảng 10 giây rồi ngâm 24 giờ trong nước nguội hoặc âm ấm để tăng tỷ lệ nảy mầm.',
      },
      facts: [
        'Ở Việt Nam, người Pháp đưa phượng từ Madagascar vào trồng vào khoảng cuối thế kỷ 19.',
        'Phượng nhạy với ánh sáng: cây mọc cạnh đèn đường có thể giữ lá xanh quanh năm và ra hoa kém.',
        'Quả đậu của phượng có thể dài tới 30–75 cm và treo trên cây gần như quanh năm.',
        'Ở nơi có mùa khô rõ rệt, phượng rụng lá trong mùa khô rồi ra hoa khi cây gần như trụi lá.',
      ],
      keywords: [
        'hoa phượng',
        'quá trình phát triển của hoa phượng',
        'các giai đoạn phát triển của hoa phượng',
        'time-lapse hoa phượng',
        'hoa phượng nở tháng mấy',
        'trồng phượng từ hạt mấy năm ra hoa',
      ],
      altText:
        'Minh họa cây phượng với thân gỗ, tán rộng hình ô gồm lá kép mịn như lông vũ và những chùm hoa đỏ cam ở đầu cành, sau đó là các quả đậu dài treo xuống.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính thô. Nguồn cho biết cây ra hoa sau 3–5, 4–5 hoặc 5–10 năm tùy nguồn và điều kiện; độ dài từng giai đoạn là suy đoán.',
      startNote: 'Mô phỏng bắt đầu từ một hạt phượng đã được xử lý cho nảy mầm.',
    },
    en: {
      name: 'Flame tree',
      aliases: ['royal poinciana', 'flamboyant', 'flame of the forest', 'phượng', 'phượng vĩ', 'hoa phượng'],
      tagline: 'An umbrella-crowned tree that blazes red each summer.',
      metaDescription:
        'Watch a flame tree grow from seed to blazing summer bloom in an interactive time-lapse: growth stages, estimated timing, how to grow it and plant facts.',
      intro: [
        'The flame tree (Delonix regia), also called royal poinciana, is a tree in the pea family (Fabaceae) native to Madagascar. It has a broad umbrella crown, feathery twice-compound leaves, and red or red-orange flowers in clusters at the branch tips. Each flower has five petals, one of them an upright petal marked with white or yellow.',
        'In Vietnam it blooms around May to July, just as the school year ends, so it is called “hoa học trò” (the students’ flower). Hải Phòng is known for its flame trees and is nicknamed the red flame-tree city. Sources give very different times from seed to first bloom, from 3–5 years to 5–10 years, so every timing below is only a rough estimate.',
      ],
      stages: {
        seed: {
          description:
            'Flame-tree seeds have a hard coat, so they are usually dipped in hot water and then soaked for about a day to let water in and help them germinate.',
        },
        vegetative: {
          description:
            'The longest stage: the tree grows fast, the trunk turns woody and the crown spreads into its umbrella shape of feathery leaves. It needs plenty of sun and does not flower for several years.',
        },
        wilting: {
          description:
            'The petals fall, leaving long flat pods. The pods hang on the tree for most of the year and split open after roughly six months.',
        },
      },
      care: {
        light: 'Full sun; in shade it grows weakly and flowers less.',
        water: 'Water regularly until established, then it tolerates drought fairly well.',
        soil: 'Tolerates many soils but prefers well-drained, sandy ones.',
        temperature: 'A tropical tree that does not tolerate frost.',
        extra: 'Dip the seeds in boiling water for about 10 seconds, then soak them for 24 hours in cool or lukewarm water to improve germination.',
      },
      facts: [
        'The French brought the flame tree to Vietnam from Madagascar in the late 19th century.',
        'It is sensitive to light: trees beside street lamps can stay green all year and flower poorly.',
        'Its pods can reach 30–75 cm long and hang on the tree for most of the year.',
        'Where there is a clear dry season, the tree sheds its leaves in the dry months and flowers while almost bare.',
      ],
      keywords: [
        'flame tree growth stages',
        'Delonix regia life cycle',
        'time-lapse flame tree',
        'when does the flame tree bloom in Vietnam',
        'how long does a flame tree take to flower from seed',
      ],
      altText:
        'Illustration of a flame tree with a woody trunk, a broad umbrella crown of feathery leaves and clusters of red-orange flowers at the branch tips, followed by long hanging pods.',
      timeNote:
        'Timings are rough estimates. Sources say first flowering comes after 3–5, 4–5 or 5–10 years depending on the source and conditions; the length of each stage is a guess.',
      startNote: 'The simulation starts from a flame-tree seed that has been treated to germinate.',
    },
  },
};
