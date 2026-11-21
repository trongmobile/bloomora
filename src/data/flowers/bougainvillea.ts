import type { FlowerData } from '../types';

export const bougainvillea: FlowerData = {
  id: 'bougainvillea',
  slugs: { vi: 'hoa-giay', en: 'bougainvillea' },
  scientificName: 'Bougainvillea spp.',
  scientificAliases: ['Bougainvillea', 'Bougainvillea glabra', 'Bougainvillea spectabilis', 'bông giấy', 'paper flower'],
  family: 'Nyctaginaceae',
  group: 'vine',
  colors: ['pink', 'purple', 'red', 'orange'],
  bloomSeasons: ['spring', 'summer', 'autumn'],
  daysToBloom: [730, 1095],
  speedBand: 'slow',
  startMaterial: 'seed-or-cutting',
  confidence: 'low',
  featured: false,
  stages: [
    { id: 'seed', days: [3, 7] },
    { id: 'germination', days: [28, 42] },
    { id: 'seedling', days: [90, 150] },
    { id: 'vegetative', days: [562, 799] },
    { id: 'bud-formation', days: [30, 60] },
    { id: 'bud-development', days: [14, 30] },
    { id: 'blooming', days: [3, 7] },
    { id: 'full-bloom', days: [30, 75] },
    { id: 'wilting', days: [14, 45] },
  ],
  visual: {
    archetype: 'bougainvillea',
    palette: {
      petal: '#e0408f',
      petalDeep: '#b0186a',
      petalTip: '#f27ab8',
      center: '#fbf3dc',
      centerDeep: '#9a8a60',
      leaf: '#4c9a48',
      leafDeep: '#276a30',
      stem: '#7a5a3a',
    },
  },
  related: ['hibiscus', 'morning-glory', 'flame-tree'],
  sources: [
    {
      title: 'Bougainvillea — North Carolina Extension Gardener Plant Toolbox',
      publisher: 'NC State Extension (North Carolina State University)',
      url: 'https://plants.ces.ncsu.edu/plants/bougainvillea',
      supports: 'Family Nyctaginaceae; the true flower is small, tubular and generally white, each cluster of three surrounded by three to six brightly coloured bracts; thorny stems, blooming on new growth, propagated from stem cuttings.',
    },
    {
      title: 'Bougainvillea Care Tips',
      publisher: 'Royal Horticultural Society (RHS)',
      url: 'https://www.rhs.org.uk/plants/bougainvillea/growing-guide',
      supports: 'Semi-ripe cuttings root in 4–6 weeks, hardwood winter cuttings may take three months; layered plants flower in 2–3 years; flowers on the current season’s growth; cooler conditions help the bracts persist.',
    },
    {
      title: 'Bougainvillea, Factsheet HGIC 1553',
      publisher: 'Clemson Cooperative Extension, Home & Garden Information Center',
      url: 'https://hgic.clemson.edu/factsheet/Bougainvillea-2/',
      supports: 'The colourful “petals” are bracts around small white tubular flowers; full sun, well-drained soil and drought resistance; it flowers sooner with high light and longer nights.',
    },
    {
      title: 'Chi Hoa giấy',
      publisher: 'Wikipedia tiếng Việt',
      url: 'https://vi.wikipedia.org/wiki/Hoa_gi%E1%BA%A5y',
      supports: 'Thorny woody climbers or shrubs, often planted as hedges in Vietnam; bract colours; photo captions from Đà Lạt and Hồ Chí Minh City.',
    },
    {
      title: 'Ngẩn ngơ Hội An tím màu hoa giấy',
      publisher: 'Tuổi Trẻ Online',
      url: 'https://tuoitre.vn/ngan-ngo-hoi-an-tim-mau-hoa-giay-20240306145209951.htm',
      supports: 'In Hội An the bougainvillea season peaks from after Tết to around mid-year; most plants there are velvet purple, a few red.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa giấy',
      aliases: ['bông giấy', 'hoa giấy', 'bougainvillea', 'hoa giấy tím', 'hoa giấy đỏ'],
      tagline: 'Dây leo có gai nhuộm cả hàng rào bằng những lá bắc mỏng như giấy: màu nằm ở lá bắc chứ không phải cánh hoa.',
      metaDescription:
        'Xem hoa giấy lớn lên từ cành giâm đến lúc rộ màu qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách chăm và những điều thú vị.',
      intro: [
        'Hoa giấy (Bougainvillea) thuộc họ Hoa giấy (Nyctaginaceae), có nguồn gốc từ Nam Mỹ. Cây là loài dây leo hóa gỗ có gai, cũng có thể tạo hình thành bụi. Phần rực rỡ mà ta gọi là “cánh hoa” thật ra là lá bắc, bao quanh ba hoa thật rất nhỏ, hình ống, thường màu trắng.',
        'Ở Việt Nam, hoa giấy hay được trồng làm hàng rào và phủ giàn, như ở Đà Lạt, Thành phố Hồ Chí Minh hay phố cổ Hội An, nơi mùa hoa rộ nhất kéo dài từ sau Tết đến khoảng giữa năm. Nguồn duy nhất cho thời gian ra hoa là của RHS: cây chiết cành ra hoa sau 2–3 năm; chưa có nguồn cho cây giâm cành, nên mọi mốc thời gian dưới đây chỉ là ước tính thô.',
      ],
      stages: {
        seed: {
          name: 'Cành giâm',
          description:
            'Hoa giấy thường được nhân giống bằng cành giâm. Một đoạn cành được cắm vào đất ẩm, thoát nước tốt.',
        },
        germination: {
          name: 'Ra rễ',
          description:
            'Cành giâm bán già vào mùa hè ra rễ trong khoảng 4–6 tuần; cành già giâm vào mùa đông có thể mất tới ba tháng.',
        },
        'full-bloom': {
          description:
            'Các cụm lá bắc đạt màu rực nhất. Hoa thật nhỏ màu trắng nằm giữa ba lá bắc, còn màu sắc bền lâu là nhờ lá bắc mỏng như giấy.',
        },
      },
      care: {
        light: 'Cần nắng đầy đủ, nhiều giờ nắng trực tiếp mỗi ngày.',
        water: 'Rất chịu hạn; không để đất úng nước.',
        soil: 'Đất thoát nước tốt, hơi chua đến gần trung tính.',
        temperature: 'Là cây vùng nóng, không chịu sương giá; RHS khuyên giữ ban đêm không dưới khoảng 10 °C.',
        extra: 'Cây ra hoa trên cành mới của mùa đó và chịu cắt tỉa mạnh; đêm dài cùng ánh sáng mạnh giúp cây ra hoa sớm hơn.',
      },
      facts: [
        'Màu sắc của hoa giấy nằm ở lá bắc, là lá biến dạng, giống như ở cây sơn thù du và cây trạng nguyên.',
        'Mỗi cụm có ba hoa thật nhỏ màu trắng, được bao quanh bởi ba đến sáu lá bắc.',
        'Tên khoa học Bougainvillea nhắc đến Louis Antoine de Bougainville, nhà thám hiểm người Pháp.',
        'Ở Hội An, phần lớn gốc hoa giấy có màu tím nhung, chỉ một số gốc màu đỏ.',
      ],
      keywords: [
        'hoa giấy',
        'quá trình phát triển của hoa giấy',
        'giâm cành hoa giấy',
        'time-lapse hoa giấy',
        'hoa giấy nở tháng mấy',
        'hoa giấy ra rễ mấy tuần',
      ],
      altText:
        'Minh họa cây hoa giấy với thân mảnh có gai, lá hình bầu dục và những cụm lá bắc hồng tím mỏng như giấy ở đầu các cành cong.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính thô. Nguồn chỉ cho biết cành giâm ra rễ sau khoảng 4–6 tuần và cây chiết ra hoa sau 2–3 năm (RHS); chưa có số liệu cho cành giâm, nên các giai đoạn còn lại là suy đoán.',
      startNote: 'Mô phỏng bắt đầu từ một đoạn cành giâm cắm vào đất ẩm, vì hoa giấy thường được nhân giống bằng cành.',
    },
    en: {
      name: 'Bougainvillea',
      aliases: ['paper flower', 'Bougainvillea glabra', 'Bougainvillea spectabilis', 'hoa giấy'],
      tagline: 'A thorny climber whose colour is in its paper-thin bracts.',
      metaDescription:
        'Watch bougainvillea grow from a cutting to a blaze of colour in an interactive time-lapse: growth stages, estimated timing, care tips and plant facts.',
      intro: [
        'Bougainvillea is in the four-o’clock family (Nyctaginaceae) and is native to South America. It is a thorny, woody climber that can also be trained as a shrub. The brilliant parts we call “petals” are really bracts that surround three tiny tubular flowers, usually white.',
        'In Vietnam it is grown as hedges and over trellises, from Đà Lạt to Ho Chi Minh City and the old town of Hội An, where the peak season runs from after Tết to around mid-year. The only first-bloom figure in our sources is from the RHS: layered plants flower in 2–3 years. No source covers rooted cuttings, so every timing below is only a rough estimate.',
      ],
      stages: {
        seed: {
          name: 'Cutting',
          description:
            'Bougainvillea is usually propagated from stem cuttings. A piece of stem is pushed into damp, free-draining soil.',
        },
        germination: {
          name: 'Rooting',
          description:
            'Semi-ripe cuttings taken in summer root in about 4–6 weeks; hardwood cuttings taken in winter may take up to three months.',
        },
        'full-bloom': {
          description:
            'The bract clusters reach their brightest colour. The small white flowers sit between three bracts, and it is the paper-like bracts that keep the colour for so long.',
        },
      },
      care: {
        light: 'Full sun, with many hours of direct sunlight a day.',
        water: 'Very drought tolerant; never leave it waterlogged.',
        soil: 'Well-drained soil, slightly acidic to near neutral.',
        temperature: 'A warm-climate plant that does not tolerate frost; the RHS advises nights no colder than about 10 °C.',
        extra: 'It flowers on the current season’s growth and responds well to hard pruning; long nights with strong light help it flower sooner.',
      },
      facts: [
        'The colour of bougainvillea is in its bracts, which are modified leaves, like those of dogwood and poinsettia.',
        'Each cluster has three small white true flowers surrounded by three to six bracts.',
        'The name Bougainvillea honours Louis Antoine de Bougainville, a French explorer.',
        'In Hội An most bougainvilleas are velvet purple, with only a few red ones.',
      ],
      keywords: [
        'bougainvillea growth stages',
        'bougainvillea cuttings how long to root',
        'time-lapse bougainvillea',
        'when does bougainvillea bloom in Vietnam',
        'hoa giấy bract flower',
      ],
      altText:
        'Illustration of a bougainvillea with slender thorny stems, oval leaves and clusters of paper-thin pink-purple bracts at the ends of arching branches.',
      timeNote:
        'Timings are rough estimates. Sources only say cuttings root in about 4–6 weeks and layered plants flower in 2–3 years (RHS); there is no figure for rooted cuttings, so the other stages are guesses.',
      startNote: 'The simulation starts from a stem cutting pushed into damp soil, since bougainvillea is usually propagated by cuttings.',
    },
  },
};
