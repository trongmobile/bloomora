import type { FlowerData } from '../types';

export const marigold: FlowerData = {
  id: 'marigold',
  slugs: { vi: 'hoa-cuc-van-tho', en: 'marigold' },
  scientificName: 'Tagetes erecta',
  scientificAliases: ['Tagetes patula', 'Tagetes', 'French marigold', 'African marigold', 'Mexican marigold'],
  family: 'Asteraceae',
  group: 'annual',
  colors: ['orange', 'yellow'],
  bloomSeasons: ['summer', 'autumn'],
  daysToBloom: [50, 100],
  speedBand: 'fast',
  startMaterial: 'seed',
  confidence: 'moderate',
  featured: false,
  stages: [
    { id: 'seed', days: [1, 2] },
    { id: 'germination', days: [5, 7] },
    { id: 'seedling', days: [10, 21] },
    { id: 'vegetative', days: [20, 40] },
    { id: 'bud-formation', days: [7, 14] },
    { id: 'bud-development', days: [7, 14] },
    { id: 'blooming', days: [2, 4] },
    { id: 'full-bloom', days: [30, 90] },
    { id: 'wilting', days: [30, 60] },
  ],
  visual: {
    archetype: 'marigold',
    palette: {
      petal: '#f4901c',
      petalDeep: '#cf5a0a',
      petalTip: '#ffc247',
      center: '#e08a10',
      centerDeep: '#9a4a06',
      leaf: '#4a8a3a',
      leafDeep: '#2c5e29',
      stem: '#4b7d34',
    },
  },
  related: ['chrysanthemum', 'sunflower', 'morning-glory'],
  sources: [
    {
      title: 'Tagetes erecta — accepted name',
      publisher: 'Kew — Plants of the World Online',
      url: 'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:252092-1',
      supports: 'Accepted name, family Asteraceae, native from Mexico to Guatemala, annual.',
    },
    {
      title: 'Tagetes patula — taxonomic note',
      publisher: 'Kew — Plants of the World Online',
      url: 'https://powo.science.kew.org/taxon/252146-1',
      supports: 'Lists T. patula as a synonym of T. erecta (other sources keep French marigold separate).',
    },
    {
      title: 'Tagetes erecta',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Tagetes_erecta',
      supports: 'Height, achene fruit, Day of the Dead use, lutein.',
    },
    {
      title: 'Tagetes patula',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Tagetes_patula',
      supports: 'French marigold habit, uses.',
    },
    {
      title: 'Tagetes',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Tagetes',
      supports: 'Etymology, food colour E161b, root thiophenes.',
    },
    {
      title: 'Marigold (HGIC 1168)',
      publisher: 'Clemson Home & Garden Information Center',
      url: 'https://hgic.clemson.edu/?p=2117',
      supports: 'Germination in 5–7 days, sun, soil, water, heights, deadheading, starting seed indoors.',
    },
    {
      title: 'Tagetes erecta',
      publisher: 'NC State Extension Plant Toolbox',
      url: 'https://plants.ces.ncsu.edu/plants/tagetes-erecta/',
      supports: 'Bloom time, black achene, deadheading.',
    },
    {
      title: 'Tagetes erecta Discovery Series',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/106253/tagetes-erecta-discovery-series/details',
      supports: 'Annual habit, hardiness H2, care, skin irritation warning.',
    },
    {
      title: 'The effects of photoperiodism on growth and flowering of marigold (Tagetes erecta)',
      publisher: 'Turkish Journal of Agriculture – Food Science and Technology',
      url: 'https://agrifoodscience.com/index.php/TURJAF/article/view/1341',
      supports: 'Short days brought flowering earlier in two cultivars of T. erecta (cultivar-dependent).',
    },
    {
      title: 'Plant marigold seeds',
      publisher: 'Gardener’s Path (gardening site)',
      url: 'https://gardenerspath.com/plants/flowers/plant-marigold-seeds/',
      supports: 'Days to bloom of about 50–60 (French) and 70–100 (African marigolds) — a non-institutional source.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa cúc vạn thọ',
      aliases: ['vạn thọ', 'cúc vạn thọ', 'cúc vạn thọ Pháp', 'cúc vạn thọ Phi', 'marigold'],
      tagline: 'Nở từ đầu hè đến khi sương giá — loài hoa dễ trồng nhất cho người mới bắt đầu.',
      metaDescription:
        'Time-lapse hoa cúc vạn thọ (Tagetes): từ hạt đến nụ và nở rộ trong vài tuần. Thời gian ước tính, cách trồng, cách giữ hoa nở lâu và kiến thức thú vị.',
      intro: [
        'Cúc vạn thọ (chi Tagetes, họ Cúc — Asteraceae) là cây một năm có nguồn gốc ở Mexico và Trung Mỹ; Kew ghi vùng bản địa của Tagetes erecta là từ Mexico đến Guatemala. Hai nhóm phổ biến là cúc vạn thọ Phi, cao đến khoảng 90 cm, và cúc vạn thọ Pháp, thấp hơn nhiều.',
        'Cúc vạn thọ nổi tiếng dễ trồng: hạt nảy mầm chỉ sau khoảng 5–7 ngày và cây ra hoa sau vài tuần (Clemson HGIC). Về mặt phân loại, Kew xếp Tagetes patula (cúc vạn thọ Pháp) là tên đồng nghĩa của T. erecta, trong khi nhiều nguồn khác vẫn xem là hai loài riêng; mô phỏng này dùng hình ảnh chung của cả nhóm.',
      ],
      stages: {
        seed: {
          name: 'Hạt',
          description:
            'Có thể gieo trực tiếp ngoài trời sau sương giá, hoặc gieo trong nhà trước khi trồng ra khoảng 4–6 tuần (Clemson HGIC).',
        },
        germination: {
          description:
            'Ở khoảng 21–24°C (70–75°F), hạt nảy mầm trong khoảng 5–7 ngày (Clemson HGIC). Chồi nhú ra cùng hai lá mầm.',
        },
        seedling: {
          description:
            'Những lá thật xẻ lông chim, lần lượt xuất hiện. Cây con lớn nhanh khi gặp nắng.',
        },
        vegetative: {
          description:
            'Cây tạo bụi xanh với nhiều cành. Cần nắng ít nhất khoảng 6 giờ mỗi ngày; các giống Phi cao có thể cần cọc đỡ (Clemson HGIC).',
        },
        'bud-formation': {
          description:
            'Nụ hoa xuất hiện ở đầu cành. Một nghiên cứu trên hai giống T. erecta cho thấy ngày ngắn làm cây ra hoa sớm hơn từ 5 đến 13 ngày so với ngày dài — phản ứng với độ dài ngày khác nhau tùy giống.',
        },
        'bud-development': {
          description:
            'Nụ tròn phình to, đài xanh ôm lấy lớp cánh vàng cam xếp chặt bên trong.',
        },
        blooming: {
          description:
            'Đài tách ra và những cánh hoa ngoài cùng xòe ra, để lộ màu vàng cam rực rỡ.',
        },
        'full-bloom': {
          name: 'Nở rộ liên tục',
          description:
            'Cây ra hoa liên tục từ đầu hè đến sương giá. Cắt bỏ hoa tàn thường xuyên giúp cây ra hoa lâu hơn (Clemson HGIC, NC State). Thời gian sống của từng bông chưa có nguồn nêu, nên mốc ở đây là cả giai đoạn cây ra hoa.',
        },
        wilting: {
          name: 'Hoa tàn, kết hạt',
          description:
            'Cụm hoa khô lại; quả bế màu đen dài khoảng 7–10 mm chín bên trong. Muốn giữ hạt, hãy chọn giống thụ phấn tự do, vì hạt của giống lai có thể không giống cây mẹ (Clemson HGIC).',
        },
      },
      care: {
        light: 'Nắng đầy đủ, ít nhất khoảng 6 giờ mỗi ngày (Clemson HGIC).',
        water: 'Giữ đất ẩm đều trong vài tuần đầu, sau đó khoảng 2,5 cm nước mỗi tuần (Clemson HGIC).',
        soil: 'Đất tơi xốp, thoát nước tốt, pH khoảng 5,5–7,0 (Clemson HGIC).',
        temperature: 'Không chịu sương giá — RHS xếp hạng H2 (chịu được khoảng 1–5°C).',
        extra:
          'Cắt bỏ hoa tàn để cây ra hoa lâu. Lá có thể gây kích ứng da ở người nhạy cảm (RHS).',
      },
      facts: [
        'Ở Mexico, Tagetes erecta được dùng để trang trí bàn thờ và mộ trong Ngày của người chết (2/11); sắc tố chính trong hoa là lutein.',
        'Cánh hoa Tagetes erecta được phê duyệt làm phụ gia tạo màu thực phẩm E161b ở EU.',
        'Tên chi Tagetes bắt nguồn từ Tages, một nhân vật thần thoại Etruscan được cho là sinh ra từ đất cày.',
        'Rễ cúc vạn thọ tiết ra các hợp chất thiophene kháng khuẩn, nên không nên trồng gần các cây họ đậu.',
      ],
      keywords: [
        'hoa cúc vạn thọ',
        'quá trình phát triển của hoa cúc vạn thọ',
        'vòng đời của hoa cúc vạn thọ',
        'cách trồng cúc vạn thọ từ hạt',
        'cúc vạn thọ nở bao lâu',
        'time-lapse hoa cúc vạn thọ',
      ],
      altText:
        'Minh họa một bụi cúc vạn thọ với lá xẻ lông chim xanh đậm và những bông hoa tròn nhiều lớp cánh màu cam, lớn lên từ hạt trong đất.',
      timeNote:
        'Số ngày từ hạt đến hoa (khoảng 50–100 ngày) lấy từ một trang làm vườn, không phải nguồn học thuật; các trang khuyến nông chỉ nêu thời gian nảy mầm 5–7 ngày và việc gieo trong nhà 4–6 tuần trước khi trồng ra. Đây là ước tính.',
      startNote: 'Mô phỏng bắt đầu từ hạt gieo khi trời đã ấm.',
    },
    en: {
      name: 'Marigold',
      aliases: ['African marigold', 'French marigold', 'Mexican marigold'],
      tagline: 'Blooming from early summer to the first frost — one of the easiest flowers for a beginner.',
      metaDescription:
        'Marigold (Tagetes) time-lapse: from seed to bud and full bloom in weeks. Estimated timing, how to grow it, how to keep it blooming and fun facts.',
      intro: [
        'Marigolds (genus Tagetes, in the daisy family Asteraceae) are annuals from Mexico and Central America; Kew gives the native range of Tagetes erecta as Mexico to Guatemala. Two common groups are the African marigolds, up to about 90 cm tall, and the much shorter French marigolds.',
        'Marigolds are known for being easy: seed germinates in about 5–7 days and plants flower within weeks (Clemson HGIC). A taxonomic note: Kew lists Tagetes patula (French marigold) as a synonym of T. erecta, while many other sources keep them as separate species; this simulation uses a general look for the group.',
      ],
      stages: {
        seed: {
          name: 'Seed',
          description:
            'Sow outdoors after frost, or indoors about 4–6 weeks before planting out (Clemson HGIC).',
        },
        germination: {
          description:
            'At about 21–24 °C (70–75 °F), seed germinates in roughly 5–7 days (Clemson HGIC). The shoot emerges with two seed leaves.',
        },
        seedling: {
          description:
            'Feathery divided true leaves appear one after another. Seedlings grow quickly in the sun.',
        },
        vegetative: {
          description:
            'The plant builds a green, many-branched bush. It needs at least about 6 hours of sun a day; tall African types may need staking (Clemson HGIC).',
        },
        'bud-formation': {
          description:
            'Flower buds appear at the shoot tips. A study of two T. erecta cultivars found short days brought flowering earlier by 5 to 13 days than long days — the response differs by cultivar.',
        },
        'bud-development': {
          description:
            'The round bud swells, its green sepals hugging the tightly packed yellow-orange petals inside.',
        },
        blooming: {
          description:
            'The sepals split and the outer petals unfold, showing bright yellow-orange.',
        },
        'full-bloom': {
          name: 'Continuous bloom',
          description:
            'The plant keeps flowering from early summer until frost. Regular deadheading helps it bloom for longer (Clemson HGIC, NC State). No source gave the life of a single flower, so this milestone covers the plant’s whole flowering period.',
        },
        wilting: {
          name: 'Wilting and seed',
          description:
            'The flower head dries; black achenes about 7–10 mm long ripen inside. To save seed, choose open-pollinated varieties, because seed from hybrids may not come true (Clemson HGIC).',
        },
      },
      care: {
        light: 'Full sun, at least about 6 hours a day (Clemson HGIC).',
        water: 'Keep the soil evenly moist for the first couple of weeks, then about 1 inch of water a week (Clemson HGIC).',
        soil: 'Loose, well-drained soil with a pH of about 5.5–7.0 (Clemson HGIC).',
        temperature: 'Not frost-tolerant — the RHS rates it H2 (tolerates about 1–5 °C).',
        extra: 'Deadhead to keep it flowering. The foliage can irritate sensitive skin (RHS).',
      },
      facts: [
        'In Mexico, Tagetes erecta decorates altars and graves for Day of the Dead (2 November); the main pigment in the flowers is lutein.',
        'Tagetes erecta petals are approved as the food colour E161b in the EU.',
        'The genus name Tagetes comes from Tages, an Etruscan mythological figure said to have been born from the plowed earth.',
        'Marigold roots release antibacterial thiophenes, so it is best not planted close to legumes.',
      ],
      keywords: [
        'marigold growth stages',
        'marigold life cycle',
        'time-lapse marigold flower',
        'how to grow marigolds from seed',
        'how long do marigolds bloom',
        'marigold facts',
      ],
      altText:
        'Illustration of a marigold plant with feathery dark green leaves and round, many-petalled orange flowers, grown from a seed in the soil.',
      timeNote:
        'The seed-to-flower span (about 50–100 days) comes from a gardening site, not an academic source; the extension pages we read only give 5–7 days to germinate and starting seed indoors 4–6 weeks before planting out. Treat it as an estimate.',
      startNote: 'The simulation starts from a seed sown once the weather is warm.',
    },
  },
};
