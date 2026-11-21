import type { FlowerData } from '../types';

export const buckwheat: FlowerData = {
  id: 'buckwheat',
  slugs: { vi: 'hoa-tam-giac-mach', en: 'buckwheat' },
  scientificName: 'Fagopyrum esculentum',
  scientificAliases: ['Fagopyrum', 'common buckwheat', 'tam giác mạch', 'kiều mạch', 'hoa kiều mạch'],
  family: 'Polygonaceae',
  group: 'annual',
  colors: ['pink', 'white'],
  bloomSeasons: ['autumn'],
  daysToBloom: [40, 73],
  speedBand: 'fast',
  startMaterial: 'seed',
  confidence: 'low',
  featured: false,
  isNew: true,
  stages: [
    { id: 'seed', days: [2, 4] },
    { id: 'germination', days: [3, 7] },
    { id: 'seedling', days: [7, 14] },
    { id: 'vegetative', days: [14, 25] },
    { id: 'bud-formation', days: [7, 10] },
    { id: 'bud-development', days: [5, 10] },
    { id: 'blooming', days: [2, 3] },
    { id: 'full-bloom', days: [14, 30] },
    { id: 'wilting', days: [14, 30] },
  ],
  visual: {
    archetype: 'buckwheat',
    palette: {
      petal: '#f7b6cc',
      petalDeep: '#d9507f',
      petalTip: '#fff0f5',
      center: '#f6e3a0',
      centerDeep: '#b8841a',
      leaf: '#5f9a3e',
      leafDeep: '#2f6a2a',
      stem: '#b0506a',
    },
  },
  related: ['lavender', 'cosmos', 'celosia'],
  sources: [
    {
      title: 'Fagopyrum esculentum',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Fagopyrum_esculentum',
      supports: 'Fagopyrum esculentum is a fast-growing annual of the knotweed family Polygonaceae, grown for its triangular seeds; it bears small white to pink flowers that are pollinated by insects.',
    },
    {
      title: 'Fagopyrum esculentum',
      publisher: 'Wikipedia (tiếng Việt)',
      url: 'https://vi.wikipedia.org/wiki/Ki%E1%BB%81u_m%E1%BA%A1ch',
      supports: 'Trang tiếng Việt về kiều mạch (tam giác mạch), dùng để đối chiếu tên gọi và đặc điểm hạt hình tam giác, hoa hồng trắng.',
    },
    {
      title: 'Fagopyrum esculentum',
      publisher: 'Useful Tropical Plants',
      url: 'https://tropical.theferns.info/viewtropical.php?id=Fagopyrum+esculentum',
      supports: 'Mô tả cây một năm mọc nhanh, gieo bằng hạt, thu hoạch sau khoảng hai đến ba tháng.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa tam giác mạch',
      aliases: ['tam giác mạch', 'kiều mạch', 'hoa kiều mạch', 'hoa tam giác mạch Hà Giang'],
      tagline: 'Những thảm hoa hồng tím nhạt nở trên cao nguyên đá mỗi độ thu về: dấu hiệu của mùa hoa Hà Giang.',
      metaDescription: 'Xem hoa tam giác mạch lớn lên từ hạt đến lúc nở thảm hoa hồng trắng qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách chăm và điều thú vị.',
      intro: [
        'Tam giác mạch (Fagopyrum esculentum), còn gọi là kiều mạch, là cây một năm mọc nhanh thuộc họ Rau răm (Polygonaceae). Cây không phải ngũ cốc thật mà cho hạt hình tam giác; hoa nhỏ màu hồng đến trắng nở thành thảm vào mùa thu, nổi tiếng nhất ở cao nguyên đá Hà Giang.',
        'Cây lớn nhanh nên các mốc thời gian dưới đây ngắn hơn nhiều so với các loài khác, nhưng vẫn là ước tính thô; nguồn không nêu số ngày chính xác cho từng giai đoạn nên con số thực tế có thể khác.',
      ],
      stages: {
        seed: {
          description: 'Hạt có ba cạnh nhọn như hình tam giác, màu nâu sẫm; hạt được gieo thẳng xuống đất.',
        },
        'full-bloom': {
          description: 'Những chùm hoa nhỏ màu hồng nhạt đến trắng nở dày, tạo thành thảm màu phủ cả sườn đồi.',
        },
        wilting: {
          description: 'Hoa tàn dần và kết thành hạt tam giác; cây ngả vàng khi hạt chín để thu hoạch.',
        },
      },
      care: {
        light: 'Nắng đầy đủ.',
        water: 'Tưới vừa phải; tránh úng nước.',
        soil: 'Đất tơi xốp, thoát nước tốt, không cần quá giàu dinh dưỡng.',
        temperature: 'Ưa khí hậu mát; hợp vùng cao.',
        extra: 'Gieo dày và đều để hoa phủ thành thảm.',
      },
      facts: [
        'Tên “tam giác mạch” đến từ hình dạng ba cạnh của hạt.',
        'Tam giác mạch không phải lúa mì mà thuộc họ Rau răm.',
        'Hoa nhỏ màu hồng đến trắng và nở thành thảm vào mùa thu.',
        'Hoa được côn trùng thụ phấn, nên thường thu hút ong.',
      ],
      keywords: [
        'hoa tam giác mạch',
        'quá trình phát triển của tam giác mạch',
        'time-lapse hoa tam giác mạch',
        'vòng đời tam giác mạch',
        'mùa hoa tam giác mạch Hà Giang',
      ],
      altText: 'Minh họa một cây tam giác mạch với thân hồng và nhiều chùm hoa nhỏ màu hồng nhạt, lớn lên từ một hạt tam giác trong đất.',
      timeNote: 'Các mốc thời gian chỉ là ước tính thô; nguồn không nêu số ngày chính xác cho từng giai đoạn.',
      startNote: 'Mô phỏng bắt đầu từ một hạt tam giác mạch gieo vào đất.',
    },
    en: {
      name: 'Buckwheat',
      aliases: ['Fagopyrum esculentum', 'common buckwheat', 'hoa tam giác mạch', 'kiều mạch'],
      tagline: 'Soft pink carpets of flowers across the rocky plateau each autumn: the sign of the flower season in Ha Giang.',
      metaDescription: 'Watch buckwheat (hoa tam giác mạch) grow from seed to a pink-white carpet of flowers in an interactive time-lapse: growth stages, timing, care tips and facts.',
      intro: [
        'Buckwheat (Fagopyrum esculentum) is a fast-growing annual in the knotweed family (Polygonaceae). It is not a true cereal but yields triangular seeds; its small pink to white flowers open in carpets in autumn, most famously on the rocky plateau of Ha Giang.',
        'The plant grows fast, so the timings below are much shorter than for other species, but they are still rough estimates; the sources give no exact day counts for each stage, so real figures may differ.',
      ],
      stages: {
        seed: {
          description: 'The dark brown seeds have three sharp edges that make a triangle; they are sown straight into the soil.',
        },
        'full-bloom': {
          description: 'Dense clusters of small pale pink to white flowers form a carpet of colour across the hillside.',
        },
        wilting: {
          description: 'The flowers fade and set triangular seeds; the plant yellows as the seeds ripen for harvest.',
        },
      },
      care: {
        light: 'Full sun.',
        water: 'Water moderately and avoid waterlogging.',
        soil: 'Loose, well-drained soil; it does not need rich ground.',
        temperature: 'Likes cool weather; suited to the highlands.',
        extra: 'Sow thickly and evenly so the flowers form a carpet.',
      },
      facts: [
        'The Vietnamese name “tam giác mạch” (triangle grain) comes from the three-edged seed.',
        'Buckwheat is not wheat; it belongs to the knotweed family.',
        'The small flowers are pink to white and open as a carpet in autumn.',
        'The flowers are pollinated by insects and often attract bees.',
      ],
      keywords: [
        'buckwheat growth stages',
        'Fagopyrum esculentum life cycle',
        'time-lapse buckwheat',
        'buckwheat flower Ha Giang',
      ],
      altText: 'Illustration of a buckwheat plant with a pink stem and many small pale pink flower clusters, growing from a triangular seed in the soil.',
      timeNote: 'Timings are rough estimates; the sources give no exact day counts for each stage.',
      startNote: 'The simulation starts from a single buckwheat seed sown in soil.',
    },
  },
};
