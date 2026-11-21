import type { FlowerData } from '../types';

export const orchidTree: FlowerData = {
  id: 'orchid-tree',
  slugs: { vi: 'hoa-ban', en: 'orchid-tree' },
  scientificName: 'Bauhinia variegata',
  scientificAliases: ['Bauhinia', 'mountain ebony', 'butterfly tree', 'hoa ban trắng', 'ban Tây Bắc'],
  family: 'Fabaceae',
  group: 'shrub-tree',
  colors: ['white', 'pink'],
  bloomSeasons: ['spring'],
  daysToBloom: [887, 1782],
  speedBand: 'slow',
  startMaterial: 'seed-or-cutting',
  confidence: 'low',
  featured: false,
  isNew: true,
  stages: [
    { id: 'seed', days: [7, 14] },
    { id: 'germination', days: [7, 21] },
    { id: 'seedling', days: [90, 180] },
    { id: 'vegetative', days: [730, 1460] },
    { id: 'bud-formation', days: [30, 60] },
    { id: 'bud-development', days: [20, 40] },
    { id: 'blooming', days: [3, 7] },
    { id: 'full-bloom', days: [20, 40] },
    { id: 'wilting', days: [60, 120] },
  ],
  visual: {
    archetype: 'ban',
    palette: {
      petal: '#fbf6f8',
      petalDeep: '#d9a6c2',
      petalTip: '#ffffff',
      center: '#e9b44c',
      centerDeep: '#a8326a',
      leaf: '#6fa04a',
      leafDeep: '#3d7436',
      stem: '#5a4a3e',
    },
  },
  related: ['peach-blossom', 'cherry-blossom', 'mai'],
  sources: [
    {
      title: 'Bauhinia variegata',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Bauhinia_variegata',
      supports: 'Bauhinia variegata is a small deciduous tree in the pea family Fabaceae, native to Southeast Asia and the Indian subcontinent, flowering in spring with white to pink orchid-like flowers and bearing long seed pods.',
    },
    {
      title: 'Bauhinia variegata',
      publisher: 'Wikipedia (tiếng Việt)',
      url: 'https://vi.wikipedia.org/wiki/Bauhinia_variegata',
      supports: 'Trang tiếng Việt về cây hoa ban, dùng để đối chiếu tên gọi, màu hoa trắng và mùa nở đầu xuân ở vùng núi.',
    },
    {
      title: 'Bauhinia variegata',
      publisher: 'Useful Tropical Plants',
      url: 'https://tropical.theferns.info/viewtropical.php?id=Bauhinia+variegata',
      supports: 'Mô tả cây gỗ nhỏ rụng lá, nhân giống bằng hạt, hoa nụ có thể dùng làm thực phẩm.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa ban',
      aliases: ['ban', 'ban trắng', 'hoa ban trắng', 'ban Tây Bắc'],
      tagline: 'Những cánh ban trắng nở rộ đầu xuân trên núi rừng Tây Bắc: tín hiệu của mùa xuân và của bản làng người Thái.',
      metaDescription: 'Xem hoa ban lớn lên từ hạt đến lúc nở trắng đầu xuân qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách chăm và những điều thú vị.',
      intro: [
        'Hoa ban (Bauhinia variegata) là cây gỗ nhỏ rụng lá thuộc họ Đậu (Fabaceae), có nguồn gốc ở Đông Nam Á và Ấn Độ. Hoa trắng đến hồng nhạt, trông như hoa lan, nở vào đầu xuân ở vùng núi Tây Bắc khi cây còn ít lá.',
        'Cây cần vài năm mới ra hoa. Các mốc thời gian dưới đây là ước tính thô cho cây trồng từ hạt; nguồn không nêu số ngày cho từng giai đoạn nên con số thực tế có thể khác nhiều.',
      ],
      stages: {
        seed: {
          description: 'Quả đậu dài chứa nhiều hạt dẹt; hạt được gieo vào đất ẩm sau khi ngâm để dễ nảy mầm.',
        },
        'full-bloom': {
          description: 'Những đóa hoa năm cánh trắng, đôi khi điểm hồng ở gốc cánh, phủ kín cành giữa núi rừng đầu xuân.',
        },
        wilting: {
          description: 'Cánh hoa rụng rồi cây ra lá non và kết quả đậu dài, treo lủng lẳng trên cành.',
        },
      },
      care: {
        light: 'Nắng đầy đủ đến hơi râm.',
        water: 'Tưới vừa phải; cây trưởng thành chịu hạn khá tốt.',
        soil: 'Đất thoát nước tốt.',
        temperature: 'Ưa khí hậu ôn hòa; hợp vùng núi và cao nguyên.',
      },
      facts: [
        'Hoa ban nở vào đầu xuân ở vùng núi Tây Bắc.',
        'Hoa có năm cánh, màu trắng đến hồng nhạt, trông như hoa lan.',
        'Ở một số vùng núi, nụ và hoa ban được dùng làm thực phẩm.',
        'Cây rụng lá theo mùa và kết quả đậu dài.',
      ],
      keywords: [
        'hoa ban',
        'quá trình phát triển của hoa ban',
        'time-lapse hoa ban',
        'vòng đời hoa ban',
        'mùa hoa ban Tây Bắc',
      ],
      altText: 'Minh họa cây ban với thân nâu và nhiều cành phủ kín hoa năm cánh màu trắng, lớn lên từ một hạt trong đất.',
      timeNote: 'Các mốc thời gian chỉ là ước tính thô cho cây trồng từ hạt; nguồn không nêu số ngày cho từng giai đoạn.',
      startNote: 'Mô phỏng bắt đầu từ một hạt ban gieo vào đất ẩm.',
    },
    en: {
      name: 'Orchid tree',
      aliases: ['Bauhinia variegata', 'mountain ebony', 'butterfly tree', 'hoa ban'],
      tagline: 'White ban blossoms opening in early spring on the northwestern mountains: the sign of the season and of Thai villages.',
      metaDescription: 'Watch an orchid tree (hoa ban) grow from seed to white spring bloom in an interactive time-lapse: growth stages, estimated timing, care tips and fun facts.',
      intro: [
        'The orchid tree (Bauhinia variegata) is a small deciduous tree in the pea family (Fabaceae), native to Southeast Asia and the Indian subcontinent. Its white to pale pink flowers look like orchids and open in early spring in the mountains of northwest Vietnam while the tree carries few leaves.',
        'The tree needs a few years before it flowers. The timings below are rough estimates for a tree grown from seed; the sources give no day counts for each stage, so real figures may differ a lot.',
      ],
      stages: {
        seed: {
          description: 'The long pod holds many flat seeds; they are sown in damp soil, often after soaking to help them sprout.',
        },
        'full-bloom': {
          description: 'White five-petalled flowers, sometimes tinged pink at the base, cover the branches in the early spring hills.',
        },
        wilting: {
          description: 'The petals fall, then fresh leaves appear and long pods hang from the branches.',
        },
      },
      care: {
        light: 'Full sun to light shade.',
        water: 'Water moderately; a mature tree is fairly drought tolerant.',
        soil: 'Well-drained soil.',
        temperature: 'Likes mild weather; suited to mountains and highlands.',
      },
      facts: [
        'Hoa ban blooms in early spring in the mountains of northwest Vietnam.',
        'The flowers have five petals, white to pale pink, and look like orchids.',
        'In some mountain areas the buds and flowers are eaten as food.',
        'The tree is deciduous and sets long seed pods.',
      ],
      keywords: [
        'orchid tree growth stages',
        'Bauhinia variegata life cycle',
        'time-lapse hoa ban',
        'mountain ebony growth',
      ],
      altText: 'Illustration of an orchid tree with a brown trunk and many branches covered in white five-petalled flowers, growing from a seed in the soil.',
      timeNote: 'Timings are rough estimates for a tree grown from seed; the sources give no day counts for each stage.',
      startNote: 'The simulation starts from a single seed sown in damp soil.',
    },
  },
};
