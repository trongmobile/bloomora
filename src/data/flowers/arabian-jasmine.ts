import type { FlowerData } from '../types';

export const arabianJasmine: FlowerData = {
  id: 'arabian-jasmine',
  slugs: { vi: 'hoa-nhai', en: 'arabian-jasmine' },
  scientificName: 'Jasminum sambac',
  scientificAliases: ['Jasminum', 'jasmine', 'sampaguita', 'hoa lài', 'hoa nhài', 'lài'],
  family: 'Oleaceae',
  group: 'shrub-tree',
  colors: ['white'],
  bloomSeasons: ['spring', 'summer', 'autumn'],
  daysToBloom: [286, 579],
  speedBand: 'slow',
  startMaterial: 'seed-or-cutting',
  confidence: 'low',
  featured: false,
  isNew: true,
  stages: [
    { id: 'seed', days: [7, 14] },
    { id: 'germination', days: [14, 28] },
    { id: 'seedling', days: [60, 120] },
    { id: 'vegetative', days: [180, 365] },
    { id: 'bud-formation', days: [14, 30] },
    { id: 'bud-development', days: [10, 20] },
    { id: 'blooming', days: [1, 2] },
    { id: 'full-bloom', days: [90, 180] },
    { id: 'wilting', days: [14, 30] },
  ],
  visual: {
    archetype: 'jasmine',
    palette: {
      petal: '#ffffff',
      petalDeep: '#d8d2b8',
      petalTip: '#ffffff',
      center: '#f2e08a',
      centerDeep: '#b89a2a',
      leaf: '#3f8a45',
      leafDeep: '#1f5a2c',
      stem: '#7a6a48',
    },
  },
  related: ['plumeria', 'narcissus', 'bougainvillea'],
  sources: [
    {
      title: 'Jasminum sambac',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Jasminum_sambac',
      supports: 'Jasminum sambac is an evergreen shrub or vine of the olive family Oleaceae, native to South Asia, grown for its intensely fragrant white flowers, used for scenting tea and as the national flower of the Philippines.',
    },
    {
      title: 'Jasminum sambac',
      publisher: 'Wikipedia (tiếng Việt)',
      url: 'https://vi.wikipedia.org/wiki/Jasminum_sambac',
      supports: 'Trang tiếng Việt về hoa nhài, dùng để đối chiếu tên gọi (nhài, lài), hoa trắng thơm và việc ướp trà.',
    },
    {
      title: 'Jasminum sambac',
      publisher: 'Useful Tropical Plants',
      url: 'https://tropical.theferns.info/viewtropical.php?id=Jasminum+sambac',
      supports: 'Mô tả cây bụi thường xanh hoa thơm, nhân giống bằng cành giâm hoặc chiết cành.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa nhài',
      aliases: ['nhài', 'hoa lài', 'lài', 'nhài ta', 'hoa nhài trắng'],
      tagline: 'Những đóa hoa trắng nhỏ thơm ngát về chiều: hương của tách trà, của giàn hiên nhà và của làng quê Việt.',
      metaDescription: 'Xem hoa nhài lớn lên từ hạt hoặc cành giâm đến lúc nở hoa trắng thơm qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách chăm và điều thú vị.',
      intro: [
        'Hoa nhài (Jasminum sambac) là cây bụi thường xanh thuộc họ Ô liu (Oleaceae), có nguồn gốc ở Nam Á và được trồng khắp Việt Nam. Hoa trắng nhỏ, rất thơm và thường được dùng để ướp trà.',
        'Ở nhiều nơi cây được nhân giống bằng cành giâm hoặc chiết cành thay vì gieo hạt. Các mốc thời gian dưới đây là ước tính thô; nguồn không nêu số ngày cho từng giai đoạn nên con số thực tế có thể khác nhiều.',
      ],
      stages: {
        seed: {
          description: 'Cây ít khi kết hạt nên trong thực tế thường được nhân giống bằng cành giâm hoặc chiết cành.',
        },
        'full-bloom': {
          description: 'Từng chùm hoa trắng nhỏ nở rộ, thơm nhất vào chiều tối và ban đêm, nở nhiều đợt trong mùa ấm.',
        },
        wilting: {
          description: 'Hoa nở một đêm rồi chuyển vàng và rụng; cây liên tục ra nụ mới trong mùa ấm.',
        },
      },
      care: {
        light: 'Nắng đầy đủ để ra nhiều hoa.',
        water: 'Tưới đều, giữ đất ẩm nhưng không úng.',
        soil: 'Đất tơi xốp, giàu mùn, thoát nước tốt.',
        temperature: 'Ưa nóng ẩm; hợp khí hậu nhiệt đới.',
        extra: 'Tỉa cành và bón phân sau mỗi đợt hoa để cây ra nụ đều.',
      },
      facts: [
        'Hoa nhài có nguồn gốc ở Nam Á, thuộc họ Ô liu.',
        'Hoa trắng nhỏ, rất thơm và thường được dùng để ướp trà.',
        'Hoa thơm nhất vào chiều tối và ban đêm.',
        'Nhài là quốc hoa của Philippines, nơi nó được gọi là sampaguita.',
      ],
      keywords: [
        'hoa nhài',
        'quá trình phát triển của hoa nhài',
        'time-lapse hoa nhài',
        'cách trồng hoa nhài',
        'vòng đời hoa nhài',
      ],
      altText: 'Minh họa một bụi nhài với những chùm hoa trắng nhỏ giữa lá xanh bóng, lớn lên từ một cành giâm trong đất.',
      timeNote: 'Các mốc thời gian chỉ là ước tính thô; nguồn không nêu số ngày cho từng giai đoạn và tốc độ phụ thuộc cách nhân giống.',
      startNote: 'Mô phỏng bắt đầu từ một cành giâm nhài cắm vào đất; trong thực tế cây ít khi gieo từ hạt.',
    },
    en: {
      name: 'Arabian jasmine',
      aliases: ['Jasminum sambac', 'sampaguita', 'jasmine', 'hoa nhài', 'hoa lài'],
      tagline: 'Small white flowers whose scent fills the evening: the fragrance of a cup of tea, a porch trellis and the Vietnamese countryside.',
      metaDescription: 'Watch Arabian jasmine (hoa nhài) grow from seed or cutting to fragrant white bloom in an interactive time-lapse: growth stages, timing, care tips and facts.',
      intro: [
        'Arabian jasmine (Jasminum sambac) is an evergreen shrub in the olive family (Oleaceae), native to South Asia and grown across Vietnam. The small white flowers are intensely fragrant and are commonly used to scent tea.',
        'In many places the plant is propagated from cuttings or layering rather than seed. The timings below are rough estimates; the sources give no day counts for each stage, so real figures may differ a lot.',
      ],
      stages: {
        seed: {
          description: 'The plant seldom sets seed, so in practice it is usually propagated from cuttings or layering.',
        },
        'full-bloom': {
          description: 'Clusters of small white flowers open, most fragrant in the evening and at night, in several flushes through the warm season.',
        },
        wilting: {
          description: 'Each flower lasts a night, then turns yellow and drops; the plant keeps making new buds through the warm season.',
        },
      },
      care: {
        light: 'Full sun for plenty of flowers.',
        water: 'Water regularly and keep the soil moist but not soggy.',
        soil: 'Loose, humus-rich, well-drained soil.',
        temperature: 'Loves warm, humid conditions; suited to a tropical climate.',
        extra: 'Prune and feed after each flush of flowers so buds keep coming.',
      },
      facts: [
        'Arabian jasmine is native to South Asia and belongs to the olive family.',
        'The small white flowers are very fragrant and are widely used to scent tea.',
        'The scent is strongest in the evening and at night.',
        'It is the national flower of the Philippines, where it is called sampaguita.',
      ],
      keywords: [
        'Arabian jasmine growth stages',
        'Jasminum sambac life cycle',
        'time-lapse jasmine',
        'how to grow jasmine',
      ],
      altText: 'Illustration of a jasmine shrub with clusters of small white flowers among glossy green leaves, growing from a cutting in the soil.',
      timeNote: 'Timings are rough estimates; the sources give no day counts for each stage and speed depends on how the plant is propagated.',
      startNote: 'The simulation starts from a single jasmine cutting pushed into soil; in practice the plant is seldom grown from seed.',
    },
  },
};
