import type { FlowerData } from '../types';

export const mexicanSunflower: FlowerData = {
  id: 'mexican-sunflower',
  slugs: { vi: 'hoa-da-quy', en: 'mexican-sunflower' },
  scientificName: 'Tithonia diversifolia',
  scientificAliases: ['Tithonia', 'tree marigold', 'wild sunflower', 'quỳ dại'],
  family: 'Asteraceae',
  group: 'perennial',
  colors: ['yellow', 'orange'],
  bloomSeasons: ['autumn', 'winter'],
  daysToBloom: [112, 224],
  speedBand: 'medium',
  startMaterial: 'seed-or-cutting',
  confidence: 'low',
  featured: false,
  isNew: true,
  stages: [
    { id: 'seed', days: [5, 10] },
    { id: 'germination', days: [7, 14] },
    { id: 'seedling', days: [14, 28] },
    { id: 'vegetative', days: [60, 120] },
    { id: 'bud-formation', days: [14, 28] },
    { id: 'bud-development', days: [10, 20] },
    { id: 'blooming', days: [2, 4] },
    { id: 'full-bloom', days: [30, 60] },
    { id: 'wilting', days: [20, 40] },
  ],
  visual: {
    archetype: 'da-quy',
    palette: {
      petal: '#f5a31a',
      petalDeep: '#d9780b',
      petalTip: '#ffd36b',
      center: '#d98f1a',
      centerDeep: '#8a4f0a',
      leaf: '#5f9a3e',
      leafDeep: '#2f6a2a',
      stem: '#6e8a3a',
    },
  },
  related: ['sunflower', 'cosmos', 'marigold'],
  sources: [
    {
      title: 'Tithonia diversifolia',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Tithonia_diversifolia',
      supports: 'Tithonia diversifolia is a plant in the daisy family Asteraceae, native to Mexico and Central America and now naturalised in many warm regions, with large yellow to orange daisy-like flower heads.',
    },
    {
      title: 'Tithonia diversifolia',
      publisher: 'Wikipedia (tiếng Việt)',
      url: 'https://vi.wikipedia.org/wiki/D%C3%A3_qu%E1%BB%B3',
      supports: 'Trang tiếng Việt về cây dã quỳ, dùng để đối chiếu tên gọi tiếng Việt và vùng nở hoa.',
    },
    {
      title: 'Tithonia diversifolia',
      publisher: 'Useful Tropical Plants',
      url: 'https://tropical.theferns.info/viewtropical.php?id=Tithonia+diversifolia',
      supports: 'Mô tả cây bụi thân thảo cao, nhân giống bằng hạt hoặc cành giâm, và công dụng làm phân xanh.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa dã quỳ',
      aliases: ['dã quỳ', 'quỳ dại', 'cúc quỳ'],
      tagline: 'Những mảng vàng cam rực cả sườn đồi vào cuối thu: hoa của Đà Lạt và các vùng núi Việt Nam mỗi độ gió heo may.',
      metaDescription: 'Xem hoa dã quỳ lớn lên từ hạt đến lúc nở vàng rực cuối thu qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách chăm và điều thú vị.',
      intro: [
        'Hoa dã quỳ (Tithonia diversifolia) là cây thân thảo cao thuộc họ Cúc (Asteraceae), nguyên sản ở Mexico và Trung Mỹ rồi mọc hoang ở nhiều vùng ấm. Ở Việt Nam, loài này nở rộ vào cuối thu và đầu đông ở Đà Lạt, Tây Nguyên và nhiều vùng núi.',
        'Các mốc thời gian dưới đây là ước tính thô cho một cây trồng từ hạt hoặc cành giâm, dựa trên mô tả chung về loài; chưa có nguồn nào nêu số ngày chính xác cho từng giai đoạn nên con số thực tế có thể lệch nhiều.',
      ],
      stages: {
        seed: {
          description: 'Hạt dẹt, nhỏ, có đầu nhọn, thường được gieo thẳng xuống đất ẩm ngoài nắng.',
        },
        'full-bloom': {
          description: 'Cả bụi phủ đầy những đầu hoa vàng cam to như bông cúc, thu hút ong và bướm.',
        },
        wilting: {
          description: 'Cánh hoa rụng dần, đầu hoa chuyển nâu và kết hạt; cây thường được cắt tỉa sau mùa hoa.',
        },
      },
      care: {
        light: 'Nắng đầy đủ.',
        water: 'Chịu hạn khá tốt; tưới vừa phải khi cây còn nhỏ.',
        soil: 'Đất thoát nước tốt, không cần quá giàu dinh dưỡng.',
        temperature: 'Ưa khí hậu mát đến ấm; hợp vùng cao nguyên và miền núi.',
        extra: 'Cắt tỉa sau mùa hoa để cây ra chồi mới; cây có thể giâm cành.',
      },
      facts: [
        'Dã quỳ có nguồn gốc từ Mexico và Trung Mỹ, không phải loài bản địa của Việt Nam.',
        'Đầu hoa to như hoa cúc, màu vàng đến cam, nên trông như một bông hướng dương nhỏ.',
        'Ở Việt Nam, hoa nở rộ vào cuối thu và đầu đông.',
        'Lá và cành non được dùng làm phân xanh trong nông nghiệp.',
      ],
      keywords: [
        'hoa dã quỳ',
        'quá trình phát triển của hoa dã quỳ',
        'time-lapse hoa dã quỳ',
        'vòng đời hoa dã quỳ',
        'cách trồng hoa dã quỳ',
      ],
      altText: 'Minh họa một bụi dã quỳ cao với nhiều đầu hoa vàng cam như hoa cúc, lớn lên từ một hạt nhỏ trong đất.',
      timeNote: 'Các mốc thời gian chỉ là ước tính thô từ mô tả chung về loài; nguồn không nêu số ngày cho từng giai đoạn.',
      startNote: 'Mô phỏng bắt đầu từ một hạt dã quỳ gieo vào đất; trong thực tế cây cũng được giâm cành.',
    },
    en: {
      name: 'Mexican sunflower',
      aliases: ['Tithonia diversifolia', 'tree marigold', 'wild sunflower', 'hoa dã quỳ'],
      tagline: 'Hillsides of orange-gold daisies in late autumn: the flower of Da Lat and the Vietnamese highlands when the cool wind arrives.',
      metaDescription: 'Watch a Mexican sunflower grow from seed to a golden autumn bloom in an interactive time-lapse: growth stages, estimated timing, care tips and fun facts.',
      intro: [
        'Mexican sunflower (Tithonia diversifolia) is a tall herbaceous plant in the daisy family (Asteraceae), native to Mexico and Central America and naturalised in many warm regions. In Vietnam it blooms in late autumn and early winter around Da Lat, the Central Highlands and many mountain areas.',
        'The timings below are rough estimates for a plant grown from seed or a cutting, based on general descriptions of the species; no source gives exact day counts for each stage, so real figures may differ a lot.',
      ],
      stages: {
        seed: {
          description: 'The seeds are small, flat and pointed, and are usually sown straight into damp soil in full sun.',
        },
        'full-bloom': {
          description: 'The whole shrub is covered in large orange-yellow daisy-like heads that draw bees and butterflies.',
        },
        wilting: {
          description: 'Petals drop, the flower heads turn brown and set seed; the plant is usually cut back after flowering.',
        },
      },
      care: {
        light: 'Full sun.',
        water: 'Fairly drought tolerant; water moderately while young.',
        soil: 'Well-drained soil; it does not need rich ground.',
        temperature: 'Likes cool to warm weather; suited to highlands and mountain areas.',
        extra: 'Cut back after flowering to encourage new shoots; it also grows from cuttings.',
      },
      facts: [
        'Mexican sunflower comes from Mexico and Central America and is not native to Vietnam.',
        'Its large heads are yellow to orange and look like a big daisy, hence “wild sunflower”.',
        'In Vietnam it flowers in late autumn and early winter.',
        'The leaves and young stems are used as green manure in farming.',
      ],
      keywords: [
        'Mexican sunflower growth stages',
        'Tithonia diversifolia life cycle',
        'time-lapse Mexican sunflower',
        'tree marigold growth',
      ],
      altText: 'Illustration of a tall Mexican sunflower shrub with many orange-yellow daisy-like heads, growing from a small seed in the soil.',
      timeNote: 'Timings are rough estimates from general descriptions of the species; the sources give no day counts for each stage.',
      startNote: 'The simulation starts from a single Mexican sunflower seed sown in soil; in practice it is also grown from cuttings.',
    },
  },
};
