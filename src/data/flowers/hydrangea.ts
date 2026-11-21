import type { FlowerData } from '../types';

export const hydrangea: FlowerData = {
  id: 'hydrangea',
  slugs: { vi: 'hoa-cam-tu-cau', en: 'hydrangea' },
  scientificName: 'Hydrangea macrophylla',
  scientificAliases: ['Hydrangea', 'bigleaf hydrangea', 'French hydrangea', 'cẩm tú cầu', 'tú cầu'],
  family: 'Hydrangeaceae',
  group: 'shrub-tree',
  colors: ['blue', 'pink', 'purple', 'white'],
  bloomSeasons: ['summer'],
  daysToBloom: [501, 1002],
  speedBand: 'slow',
  startMaterial: 'seed-or-cutting',
  confidence: 'low',
  featured: false,
  isNew: true,
  stages: [
    { id: 'seed', days: [7, 14] },
    { id: 'germination', days: [14, 28] },
    { id: 'seedling', days: [60, 120] },
    { id: 'vegetative', days: [365, 730] },
    { id: 'bud-formation', days: [30, 60] },
    { id: 'bud-development', days: [20, 40] },
    { id: 'blooming', days: [5, 10] },
    { id: 'full-bloom', days: [30, 60] },
    { id: 'wilting', days: [30, 90] },
  ],
  visual: {
    archetype: 'hydrangea',
    palette: {
      petal: '#6f8fe8',
      petalDeep: '#3a55b5',
      petalTip: '#b9c9ff',
      center: '#e9e4a0',
      centerDeep: '#8a8a3a',
      leaf: '#4f9a4a',
      leafDeep: '#27622c',
      stem: '#6a7a4a',
    },
  },
  related: ['chrysanthemum', 'dahlia', 'lavender'],
  sources: [
    {
      title: 'Hydrangea macrophylla',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Hydrangea_macrophylla',
      supports: 'Hydrangea macrophylla is a deciduous shrub of the family Hydrangeaceae native to Japan, grown for its large rounded flower heads whose colour depends on soil acidity and aluminium availability.',
    },
    {
      title: 'Hydrangea macrophylla',
      publisher: 'Wikipedia (tiếng Việt)',
      url: 'https://vi.wikipedia.org/wiki/C%E1%BA%A9m_t%C3%BA_c%E1%BA%A7u',
      supports: 'Trang tiếng Việt về cẩm tú cầu, dùng để đối chiếu tên gọi, đặc điểm cụm hoa tròn và màu hoa thay đổi theo đất.',
    },
    {
      title: 'Hydrangea macrophylla',
      publisher: 'Useful Tropical Plants',
      url: 'https://tropical.theferns.info/viewtropical.php?id=Hydrangea+macrophylla',
      supports: 'Mô tả cây bụi rụng lá ưa mát, thường nhân giống bằng cành giâm và có hoa đổi màu theo độ chua của đất.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa cẩm tú cầu',
      aliases: ['cẩm tú cầu', 'tú cầu', 'hoa tú cầu', 'hoa cẩm tú cầu xanh'],
      tagline: 'Những quả cầu hoa xanh, hồng, tím tròn xoe nở rộ vào mùa hè mát ở Đà Lạt, Sa Pa và Tam Đảo.',
      metaDescription: 'Xem hoa cẩm tú cầu lớn lên từ hạt hoặc cành giâm đến lúc nở những cụm hoa tròn qua time-lapse tương tác: các giai đoạn, cách chăm và điều thú vị.',
      intro: [
        'Cẩm tú cầu (Hydrangea macrophylla) là cây bụi rụng lá thuộc họ Cẩm tú cầu (Hydrangeaceae), có nguồn gốc ở Nhật Bản và được trồng nhiều ở vùng mát của Việt Nam như Đà Lạt, Sa Pa. Cụm hoa tròn lớn, màu thay đổi theo độ chua của đất.',
        'Phần “cánh hoa” thực ra là các lá đài lớn bao quanh những hoa thật rất nhỏ. Các mốc thời gian dưới đây là ước tính thô; nguồn không nêu số ngày cho từng giai đoạn nên con số thực tế có thể khác nhiều.',
      ],
      stages: {
        seed: {
          description: 'Hạt rất nhỏ như bụi, thường chỉ gieo khi lai tạo; cây thường được nhân giống bằng cành giâm.',
        },
        'full-bloom': {
          description: 'Cả cây phủ đầy cụm hoa tròn lớn, màu từ xanh lam đến hồng hoặc tím tùy đất.',
        },
        wilting: {
          description: 'Cụm hoa phai dần sang màu xanh nhạt rồi nâu; người trồng thường cắt tỉa sau mùa hoa.',
        },
      },
      care: {
        light: 'Nắng sáng và bóng râm buổi chiều.',
        water: 'Giữ đất ẩm đều, không để khô hạn kéo dài.',
        soil: 'Đất tơi xốp giàu mùn; đất chua cho hoa xanh, đất trung tính đến kiềm cho hoa hồng.',
        temperature: 'Ưa khí hậu mát; hợp vùng cao nguyên và miền núi.',
        extra: 'Tỉa cành sau mùa hoa để cây ra chồi mới cho năm sau.',
      },
      facts: [
        'Màu hoa cẩm tú cầu thay đổi theo độ chua của đất.',
        'Phần “cánh hoa” thực ra là các lá đài lớn.',
        'Cây có nguồn gốc từ Nhật Bản và ưa khí hậu mát.',
        'Cây thường được nhân giống bằng cành giâm.',
      ],
      keywords: [
        'hoa cẩm tú cầu',
        'quá trình phát triển của cẩm tú cầu',
        'time-lapse hoa cẩm tú cầu',
        'cách trồng hoa cẩm tú cầu',
        'vòng đời cẩm tú cầu',
      ],
      altText: 'Minh họa một bụi cẩm tú cầu với nhiều cụm hoa tròn màu xanh lam trên cành lá xanh, lớn lên từ một cành giâm trong đất.',
      timeNote: 'Các mốc thời gian chỉ là ước tính thô; nguồn không nêu số ngày cho từng giai đoạn và tốc độ phụ thuộc giống và khí hậu.',
      startNote: 'Mô phỏng bắt đầu từ một hạt nhỏ; trong thực tế cẩm tú cầu thường được trồng từ cành giâm.',
    },
    en: {
      name: 'Hydrangea',
      aliases: ['Hydrangea macrophylla', 'bigleaf hydrangea', 'French hydrangea', 'hoa cẩm tú cầu'],
      tagline: 'Round balls of blue, pink and purple flowers opening in the cool summers of Da Lat, Sa Pa and Tam Dao.',
      metaDescription: 'Watch a hydrangea grow from seed or cutting to round flower heads in an interactive time-lapse: growth stages, estimated timing, care tips and fun facts.',
      intro: [
        'Hydrangea (Hydrangea macrophylla) is a deciduous shrub in the family Hydrangeaceae, native to Japan and widely grown in the cool parts of Vietnam such as Da Lat and Sa Pa. The big round flower heads change colour with the acidity of the soil.',
        'The showy “petals” are really large sepals around tiny true flowers. The timings below are rough estimates; the sources give no day counts for each stage, so real figures may differ a lot.',
      ],
      stages: {
        seed: {
          description: 'The seeds are dust-fine and are mostly sown for breeding; the plant is normally propagated from cuttings.',
        },
        'full-bloom': {
          description: 'The whole shrub is covered in large round heads, from blue to pink or purple depending on the soil.',
        },
        wilting: {
          description: 'The heads slowly fade to pale green and then brown; growers usually prune after flowering.',
        },
      },
      care: {
        light: 'Morning sun and afternoon shade.',
        water: 'Keep the soil evenly moist and never let it dry out for long.',
        soil: 'Loose, humus-rich soil; acid soil gives blue flowers, neutral to alkaline soil gives pink.',
        temperature: 'Likes cool weather; suited to highlands and mountain areas.',
        extra: 'Prune after flowering so the plant makes new shoots for next year.',
      },
      facts: [
        'The colour of hydrangea flowers changes with the acidity of the soil.',
        'The showy “petals” are really large sepals.',
        'The plant is native to Japan and likes cool weather.',
        'It is usually propagated from cuttings.',
      ],
      keywords: [
        'hydrangea growth stages',
        'Hydrangea macrophylla life cycle',
        'time-lapse hydrangea',
        'how to grow hydrangea',
      ],
      altText: 'Illustration of a hydrangea shrub with several round blue flower heads on green leafy stems, growing from a cutting in the soil.',
      timeNote: 'Timings are rough estimates; the sources give no day counts for each stage and speed depends on variety and climate.',
      startNote: 'The simulation starts from a single small seed; in practice hydrangea is usually grown from cuttings.',
    },
  },
};
