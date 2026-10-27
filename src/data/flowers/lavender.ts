import type { FlowerData } from '../types';

export const lavender: FlowerData = {
  id: 'lavender',
  slugs: { vi: 'hoa-oai-huong', en: 'lavender' },
  scientificName: 'Lavandula angustifolia',
  scientificAliases: ['Lavandula officinalis', 'Lavandula vera', 'Lavandula', 'English lavender', 'true lavender'],
  family: 'Lamiaceae',
  group: 'shrub-tree',
  colors: ['purple', 'blue', 'pink', 'white'],
  bloomSeasons: ['summer'],
  daysToBloom: [200, 540],
  speedBand: 'slow',
  startMaterial: 'seed-or-cutting',
  confidence: 'low',
  featured: false,
  stages: [
    { id: 'seed', days: [1, 7] },
    { id: 'germination', days: [14, 21] },
    { id: 'seedling', days: [90, 180] },
    { id: 'vegetative', days: [60, 270] },
    { id: 'bud-formation', days: [14, 30] },
    { id: 'bud-development', days: [14, 30] },
    { id: 'blooming', days: [7, 14] },
    { id: 'full-bloom', days: [14, 28] },
    { id: 'wilting', days: [30, 60] },
  ],
  visual: {
    archetype: 'lavender',
    palette: {
      petal: '#9b7fd1',
      petalDeep: '#6a4aa8',
      petalTip: '#c4b0ec',
      center: '#7a5fb8',
      centerDeep: '#4a3280',
      leaf: '#8aa58a',
      leafDeep: '#556f5a',
      stem: '#6f8f6a',
    },
  },
  related: ['rose', 'carnation', 'tulip'],
  sources: [
    {
      title: 'Lavandula angustifolia Mill. — accepted name and native range',
      publisher: 'Kew — Plants of the World Online',
      url: 'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:449008-1',
      supports: 'Accepted name, family Lamiaceae, native range NE Spain to Italy, subshrub; Lavandula officinalis and L. vera listed as synonyms of subsp. angustifolia.',
    },
    {
      title: 'Lavandula angustifolia — RHS plant profile',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/91398/lavandula-angustifolia/details',
      supports: 'Evergreen bushy shrub, 0.5–1 m tall, grey-green aromatic leaves, pale to deep purple spikes in mid to late summer, full sun, well-drained neutral to alkaline soil, hardiness H5, sowing in a cold frame or summer cuttings, deadheading and trimming after flowering.',
    },
    {
      title: 'Lavandula angustifolia',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Lavandula_angustifolia',
      supports: 'Former name L. officinalis, “narrow leaf” meaning, not native to England, flower spikes 2–8 cm on leafless stems 10–30 cm, cultivar flower colours.',
    },
    {
      title: 'How to grow English lavender in your garden',
      publisher: 'Utah State University Extension',
      url: 'https://extension.usu.edu/yardandgarden/research/english-lavender-in-the-garden',
      supports: 'Sowing depth, germination in 14–21 days, 100–200 days from seed to transplant, cuttings rooting in 30–40 days, spacing, pH, watering, clipping in the first year, pruning after flowering, lifespan.',
    },
    {
      title: 'Lavender: a must-have plant for all gardens',
      publisher: 'University of Illinois Extension',
      url: 'https://extension.illinois.edu/node/21429',
      supports: 'At least 8 hours of sun, drainage, drought tolerance once established, effect of fertiliser, pruning after flowering and a possible second bloom, pollinator visits.',
    },
    {
      title: 'Lavandula angustifolia — English lavender (FP337)',
      publisher: 'University of Florida IFAS Extension',
      url: 'https://ask.ifas.ufl.edu/publication/FP337',
      supports: 'Summer flowering, purple flowers with pink, blue, lavender or white cultivars, hardiness zones 5B–8, may decline in summer heat.',
    },
    {
      title: 'Lavandula (lavender) — Plant Toolbox',
      publisher: 'NC State Extension',
      url: 'https://plants.ces.ncsu.edu/plants/lavandula/common-name/lavender/',
      supports: 'Very well-drained soil, prefers cool summers, leaf spot and root rot when soil stays wet.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa oải hương',
      aliases: ['oải hương', 'hoa lavender', 'lavender', 'oải hương Anh'],
      tagline: 'Từ hạt gieo trong khay đến những bông hoa tím thơm ngát, nơi ong bướm tìm đến.',
      metaDescription:
        'Xem hoa oải hương lớn lên từ hạt giống đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách trồng và kiến thức thú vị.',
      intro: [
        'Oải hương (Lavandula angustifolia) là cây bụi nhỏ thường xanh thuộc họ Hoa môi (Lamiaceae), có lá hẹp màu xanh xám và mùi thơm đặc trưng. Kew ghi vùng bản địa của loài này kéo dài từ đông bắc Tây Ban Nha đến Ý. Dù hay được gọi là “English lavender”, theo Wikipedia nó không phải cây bản địa của nước Anh. Hội Làm vườn Hoàng gia Anh (RHS) ghi cây cao tối đa khoảng 0,5–1 m và rộng khoảng 1–1,5 m.',
        'Hoa oải hương rất nhỏ và xếp thành bông dài khoảng 2–8 cm ở đầu những cành dài không lá, màu từ tím nhạt đến tím đậm; một số giống có hoa hồng, xanh hoặc trắng. Cây nở hoa vào mùa hè, và mùi thơm cùng mật hoa thu hút ong cùng nhiều loài thụ phấn khác. Gieo từ hạt khá chậm và không có con số “chuẩn” cho số ngày đến lúc ra hoa, nên các mốc thời gian dưới đây chỉ là ước tính thô.',
      ],
      stages: {
        seed: {
          description:
            'Khuyến nông Utah State gợi ý gieo hạt nông, khoảng 3 mm (1/8 inch), trong giá thể không đất và phủ một lớp perlite mỏng; họ không khuyên gieo thẳng ra vườn. Hạt nảy mầm tốt nhất ở khoảng 21°C (70°F), nên người ta thường dùng thảm sưởi cho khay hạt.',
        },
        germination: {
          description:
            'Theo USU, hạt thường bắt đầu nảy mầm sau khoảng 14–21 ngày ở nhiệt độ ấm. Rễ mầm chui ra trước, rồi chồi nhỏ với đôi lá đầu tiên nhô lên khỏi giá thể.',
        },
        seedling: {
          description:
            'Cây con lớn chậm trong khay hoặc chậu: USU nêu khoảng 100–200 ngày từ lúc gieo đến lúc đem trồng. Cây được trồng ra ngoài sau đợt sương giá cuối mùa xuân, cách nhau khoảng 45–60 cm (18–24 inch), ở nơi nắng và thoát nước tốt.',
        },
        vegetative: {
          description:
            'Cây phát triển thành bụi thấp với lá hẹp màu xanh xám, có mùi thơm. Trong năm đầu, USU khuyên cắt bớt các cành để cây chưa ra hoa mà đẻ nhiều nhánh bên hơn, và cho biết cây cần khoảng ba năm mới đạt kích thước đầy đủ. Đất phải thoát nước tốt vì rễ không chịu úng.',
        },
        'bud-formation': {
          description:
            'Trên đầu các cành dài không lá xuất hiện nụ nhỏ xếp thành bông. Cây chuyển từ lớn lá sang chuẩn bị ra hoa; bón nhiều phân đạm lúc này chỉ làm cây xum xuê lá mà ít hoa hơn, theo cả USU và Illinois Extension.',
        },
        'bud-development': {
          description:
            'Các bông nụ dài ra và nhô cao hơn tán lá. Cây cần nhiều nắng và đất khô ráo; khi đất ẩm quá lâu, cây dễ bị thối rễ và đốm lá, theo NC State Extension.',
        },
        blooming: {
          description:
            'Những hoa nhỏ đầu tiên trên bông bắt đầu hé, màu tím nhạt đến tím đậm theo giống. Mùi thơm và mật hoa thu hút ong. USU khuyên cắt hoa tươi khi hoa vừa bắt đầu nở, còn muốn phơi khô thì cắt khi hai hoa đầu tiên trên bông đã nở.',
        },
        'full-bloom': {
          description:
            'Các bông hoa tím thơm nở rộ vào giữa đến cuối mùa hè theo mô tả của RHS. Dầu thơm nằm trong cả hoa lẫn lá, nên chỉ cần chạm nhẹ vào cây là mùi hương lan ra.',
        },
        wilting: {
          name: 'Hoa tàn, cắt tỉa',
          description:
            'Hoa phai màu và khô dần trên bông. Các nguồn khuyên cắt tỉa sau khi ra hoa: Illinois Extension nói cắt bớt khoảng một phần ba đến một nửa cây, USU nói cắt còn khoảng một nửa, RHS nói ngắt hoa tàn và tỉa vào cuối hè để cây không xơ xác. Đừng cắt sâu vào phần thân gỗ trụi lá vì thân sẽ không mọc lại; cây có thể nở thêm một đợt nữa.',
        },
      },
      care: {
        light: 'Nắng trực tiếp, ít nhất khoảng 8 giờ mỗi ngày (theo Illinois Extension).',
        water:
          'Tưới đều trong năm đầu. Cây đã bén rễ chịu hạn tốt, chỉ cần tưới khi đất khô; tránh để nước đọng quanh gốc vì cây không chịu úng.',
        soil: 'Đất cát, khô ráo, thoát nước tốt; USU nêu pH khoảng 6,5–7,5, RHS ghi cây thích đất trung tính đến kiềm nhưng vẫn chịu được đất chua.',
        temperature:
          'Hạt nảy mầm tốt ở khoảng 21°C (70°F). Cây chịu lạnh khá (RHS xếp H5, tức khoảng −15 đến −10°C), nhưng UF/IFAS và NC State ghi cây ưa nơi mùa hè mát và có thể yếu đi khi mùa hè quá nóng.',
        extra:
          'Hạn chế bón phân: nhiều phân sẽ cho nhiều lá và ít hoa. Có thể nhân giống bằng cành giâm mùa hè từ chồi bên; USU cho biết rễ hình thành sau khoảng 30–40 ngày.',
      },
      facts: [
        'Tên loài “angustifolia” là tiếng Latin có nghĩa “lá hẹp”. Tên cũ của loài là Lavandula officinalis.',
        'Ong và nhiều loài thụ phấn bị thu hút bởi mùi hương và lượng mật cao của hoa oải hương, vì thế cây thường được trồng trong vườn thụ phấn.',
        'Bón thêm phân có thể phản tác dụng: cây nhiều lá hơn nhưng ít hoa, và USU còn cảnh báo nguy cơ bệnh và tổn thương do lạnh tăng lên.',
        'Với chăm sóc tốt, một cây oải hương có thể sống khoảng 10–15 năm theo USU, dù phải mất khoảng ba năm mới đạt kích thước đầy đủ.',
      ],
      keywords: [
        'hoa oải hương',
        'cách trồng hoa oải hương',
        'các giai đoạn phát triển của hoa oải hương',
        'vòng đời hoa oải hương',
        'time-lapse hoa oải hương',
        'trồng oải hương từ hạt',
      ],
      altText:
        'Minh họa cây oải hương với lá hẹp màu xanh xám và nhiều bông hoa tím mọc thẳng trên những cành dài, lớn lên từ hạt giống trong đất.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính với độ tin cậy thấp: chúng được ghép từ vài số liệu rời của khuyến nông (nảy mầm khoảng 14–21 ngày, khoảng 100–200 ngày từ gieo đến lúc đem trồng) cộng thêm một phần mùa sinh trưởng sau đó. Không có nguồn nào ghi số ngày từ hạt đến hoa, và thực tế phụ thuộc giống, thời điểm gieo, nhiệt độ và nắng.',
      startNote:
        'Mô phỏng bắt đầu từ một hạt gieo nông khoảng 3 mm trong khay; cách nhanh hơn thường dùng là giâm cành bên vào mùa hè.',
    },
    en: {
      name: 'Lavender',
      aliases: ['English lavender', 'common lavender', 'true lavender'],
      tagline: 'From a seed sown in a tray to fragrant purple spikes humming with bees.',
      metaDescription:
        'Watch lavender grow from seed to full bloom in an interactive time-lapse: growth stages, estimated timing, planting tips and surprising plant facts.',
      intro: [
        'Lavender (Lavandula angustifolia) is a small evergreen shrub in the mint family (Lamiaceae), with narrow grey-green leaves and a strong, unmistakable scent. Kew gives its native range as north-east Spain to Italy, and although it is often called English lavender, Wikipedia notes it is not native to England. The Royal Horticultural Society (RHS) lists a mature plant at up to about 0.5–1 m tall and 1–1.5 m wide.',
        'The flowers are small and packed into spikes roughly 2–8 cm long at the tips of long, leafless stems, ranging from pale to deep purple, with pink, blue and white cultivars also grown. They open in summer, and the scent and nectar draw in bees and other pollinators. Growing from seed is slow, and no source gives a standard number of days to first flower, so the timings below are rough estimates.',
      ],
      stages: {
        seed: {
          description:
            'Utah State University (USU) Extension suggests sowing shallowly, about 3 mm (1/8 inch) deep, in a soilless mix lightly covered with perlite, and advises against sowing straight into the garden. Seed germinates best at around 21 °C (70 °F), which is why a heat mat is often used under the seed tray.',
        },
        germination: {
          description:
            'According to USU, germination usually begins within about 14–21 days in warm conditions. The root emerges first, then a small shoot with its first leaves pushes up through the mix.',
        },
        seedling: {
          description:
            'Seedlings grow slowly in their tray or pot: USU quotes roughly 100–200 days from sowing to transplanting. Plants go out after the last spring frost, about 45–60 cm (18–24 inches) apart, in a sunny, well-drained spot.',
        },
        vegetative: {
          description:
            'The plant fills out into a low, bushy mound of narrow, aromatic grey-green leaves. In the first year USU recommends clipping the stems so the plant does not flower yet and instead branches more, and notes that it takes about three years to reach full size. Drainage matters: the roots do not tolerate waterlogging.',
        },
        'bud-formation': {
          description:
            'Buds appear in spikes at the tips of the long, leafless stems. The plant is switching from making leaves to preparing to flower; heavy feeding at this point only produces more foliage and fewer flowers, according to both USU and Illinois Extension.',
        },
        'bud-development': {
          description:
            'The flower spikes lengthen and rise above the foliage. The plant wants plenty of sun and dry-ish soil; where soil stays wet it is prone to root rot and leaf spot, says NC State Extension.',
        },
        blooming: {
          description:
            'The first tiny flowers on each spike begin to open, pale to deep purple depending on the cultivar. Scent and nectar attract bees. USU suggests cutting stems for fresh use as the flowers start to open, and for drying once the first two flowers on the spike have opened.',
        },
        'full-bloom': {
          description:
            'Fragrant purple spikes are at their fullest in mid to late summer, as described by the RHS. The scented oil sits in both the flowers and the foliage, so brushing past the plant releases the fragrance.',
        },
        wilting: {
          name: 'Fading and pruning',
          description:
            'The flowers fade and dry on the spike. Guides recommend pruning once flowering is over: Illinois Extension says to remove about a third to a half of the plant, USU says to shear back to about half its size, and the RHS says to deadhead and trim in late summer to stop it turning straggly. Avoid cutting back into bare, leafless old wood, which will not regrow; the plant may even flower a second time.',
        },
      },
      care: {
        light: 'Full sun — at least about 8 hours a day (Illinois Extension).',
        water:
          'Water regularly during the first year. Established plants tolerate drought well and only need water when the soil dries out; avoid standing water around the base, as lavender does not cope with waterlogging.',
        soil: 'Dry, sandy, well-drained soil; USU gives a pH of about 6.5–7.5, and the RHS says it prefers neutral to alkaline soil but tolerates acidic conditions.',
        temperature:
          'Seed germinates best at around 21 °C (70 °F). The plant is quite hardy (RHS rates it H5, roughly −15 to −10 °C), but UF/IFAS and NC State note it prefers cool summers and may decline in hot ones.',
        extra:
          'Go easy on fertiliser: too much gives leaves instead of flowers. Summer cuttings from side shoots also work, and USU reports roots forming in about 30–40 days.',
      },
      facts: [
        'The species name “angustifolia” is Latin for “narrow leaf”. The plant was formerly known as Lavandula officinalis.',
        'Bees and other pollinators are drawn to lavender’s scent and high nectar levels, which is why it is a staple of pollinator gardens.',
        'Feeding can backfire: extra fertiliser gives more foliage but fewer flowers, and USU also warns it raises the risk of disease and cold injury.',
        'With good care a lavender plant can live around 10–15 years according to USU, even though it takes about three years to reach full size.',
      ],
      keywords: [
        'lavender growth stages',
        'lavender life cycle',
        'time-lapse lavender growth',
        'how to grow lavender from seed',
        'how long does lavender take to bloom',
        'how to grow lavender',
      ],
      altText:
        'Illustration of a lavender plant with narrow grey-green leaves and several upright purple flower spikes on long stems, growing from a seed in the soil.',
      timeNote:
        'Timings are rough, low-confidence estimates: they combine a few separate extension figures (germination in about 14–21 days, about 100–200 days from sowing to transplanting) with part of a further growing season. No source gives days from seed to first flower, and the real schedule depends on cultivar, sowing date, temperature and sun.',
      startNote:
        'The simulation starts from a single seed sown about 3 mm deep in a tray; taking summer cuttings from side shoots is the common faster route.',
    },
  },
};
