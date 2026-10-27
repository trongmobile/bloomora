import type { FlowerData } from '../types';

export const carnation: FlowerData = {
  id: 'carnation',
  slugs: { vi: 'hoa-cam-chuong', en: 'carnation' },
  scientificName: 'Dianthus caryophyllus',
  scientificAliases: ['Dianthus', 'clove pink', 'border carnation'],
  family: 'Caryophyllaceae',
  group: 'perennial',
  colors: ['pink', 'red', 'white', 'yellow', 'orange', 'purple'],
  bloomSeasons: ['summer'],
  daysToBloom: [110, 160],
  speedBand: 'medium',
  startMaterial: 'seed-or-cutting',
  confidence: 'low',
  featured: false,
  stages: [
    { id: 'seed', days: [1, 3] },
    { id: 'germination', days: [7, 14] },
    { id: 'seedling', days: [20, 35] },
    { id: 'vegetative', days: [50, 60] },
    { id: 'bud-formation', days: [14, 21] },
    { id: 'bud-development', days: [14, 21] },
    { id: 'blooming', days: [3, 7] },
    { id: 'full-bloom', days: [14, 42] },
    { id: 'wilting', days: [14, 30] },
  ],
  visual: {
    archetype: 'carnation',
    palette: {
      petal: '#f2789f',
      petalDeep: '#c93a6c',
      petalTip: '#ffb3cc',
      center: '#c93a6c',
      centerDeep: '#8a2048',
      leaf: '#6a9a8a',
      leafDeep: '#3e6a5e',
      stem: '#5f8f7c',
    },
  },
  related: ['rose', 'chrysanthemum', 'lavender'],
  sources: [
    {
      title: 'Dianthus caryophyllus L.',
      publisher: 'International Plant Names Index (IPNI)',
      url: 'https://www.ipni.org/n/153205-1',
      supports: 'Name and author (L.), family Caryophyllaceae, first published in Species Plantarum (1753), original distribution remark “Europ.; As. occ”.',
    },
    {
      title: 'Dianthus caryophyllus',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Dianthus_caryophyllus',
      supports: 'Herbaceous perennial up to 80 cm, blue-green leaves, 3–5 cm scented flowers, natural and cultivar colours, no natural blue, clove scent and “clove pink” name, uses, Greek origin of “dianthus”.',
    },
    {
      title: 'Dianthus caryophyllus (border carnation)',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/5707/dianthus-caryophyllus-border-carnation-carnadine/details',
      supports: 'Herbaceous perennial, full sun, well-drained neutral-to-alkaline soil, clove-scented single flowers, softwood cuttings from non-flowering shoots in summer, deadheading.',
    },
    {
      title: 'Dianthus caryophyllus (Wild Carnation)',
      publisher: 'NC State Extension Plant Toolbox',
      url: 'https://plants.ces.ncsu.edu/plants/dianthus-caryophyllus/common-name/wild-carnation/',
      supports: 'Perennial that can be grown as an annual, midsummer bloom, flower colour range, full sun (6+ hours) or part shade, moist well-drained neutral-to-slightly-alkaline soil, propagation by seed and stem cutting, USDA zones 6–9.',
    },
    {
      title: 'Chabaud Picotee Double Mix Dianthus Seed',
      publisher: 'Johnny’s Selected Seeds',
      url: 'https://www.johnnyseeds.com/flowers/dianthus-sweet-william/chabaud-picotee-double-mix-dianthus-seed-3708.html',
      supports: 'Seed-company growing data for one carnation seed strain: 7–14 days to germinate at 18–22 °C, 130–140 days to maturity, transplant timing, cool-temperature advice, sandy slightly alkaline soil, cut-flower harvest stage.',
    },
    {
      title: 'Horticulture — Flower crops: Carnation',
      publisher: 'Tamil Nadu Agricultural University (TNAU Agritech Portal)',
      url: 'https://agritech.tnau.ac.in/horticulture/horti_flower%20crops_carnation.html',
      supports: 'Cut-flower production guide: terminal cuttings rooting in about 21 days, flowering about 110–120 days after planting, pinching, and disbudding of standard versus spray types.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa cẩm chướng',
      aliases: ['cẩm chướng', 'dianthus'],
      tagline: 'Từ một hạt nhỏ đến đóa hoa nhiều lớp cánh, thơm mùi đinh hương.',
      metaDescription:
        'Xem hoa cẩm chướng lớn lên từ hạt hoặc cành giâm đến lúc nở rộ qua time-lapse: các giai đoạn, thời gian ước tính, cách trồng và kiến thức thú vị.',
      intro: [
        'Hoa cẩm chướng (Dianthus caryophyllus) là cây thân thảo sống lâu năm thuộc họ Cẩm chướng (Caryophyllaceae), cao tới khoảng 80 cm. Lá hẹp, xanh xám đến xanh lam, dài tới khoảng 15 cm; hoa rộng chừng 3–5 cm, mọc đơn hoặc thành chùm tối đa năm hoa và có mùi thơm ngọt, thường được so với mùi đinh hương. Vùng phân bố tự nhiên không còn rõ vì cây đã được trồng hàng thế kỷ, nhưng cẩm chướng hoang dại thường gặp nhất quanh Địa Trung Hải.',
        'Cẩm chướng được trồng làm hoa cắt cành và hoa cài áo, và nhiều người trồng như cây một năm dù nó là cây lâu năm. Ngành hoa cắt phân biệt hai kiểu: loại một hoa lớn trên mỗi cành (standard) và loại nhiều hoa nhỏ trên một cành (spray). Mô phỏng dưới đây bắt đầu từ hạt; ngoài thực tế, cẩm chướng cũng thường được nhân bằng cành giâm.',
      ],
      stages: {
        seed: {
          name: 'Hạt hoặc cành giâm',
          description:
            'Nhà cung cấp hạt giống khuyên chỉ ấn nhẹ hạt vào giá thể gieo và giữ ẩm đều cho đến khi nảy mầm. Cẩm chướng cũng có thể bắt đầu từ cành giâm: RHS khuyên lấy đoạn thân chưa ra hoa vào mùa hè, còn hướng dẫn trồng hoa cắt của TNAU dùng cành giâm ngọn dài 5–10 cm.',
        },
        germination: {
          description:
            'Ở khoảng 18–22°C, hạt thường nảy mầm sau 7–14 ngày, theo dữ liệu của một nhà cung cấp hạt giống. Rễ mầm nhú ra, rồi hai lá mầm nhỏ vươn lên khỏi giá thể. Nếu dùng cành giâm, bước tương ứng là ra rễ: TNAU nêu khoảng 21 ngày để cành giâm có bộ rễ tốt.',
        },
        seedling: {
          description:
            'Cây con được chuyển sang khay nhiều ô hoặc chậu nhỏ khoảng 20–25 ngày sau khi gieo, rồi tập làm quen với ngoài trời và trồng ra vườn sau khoảng 6–8 tuần. Giai đoạn này cây ưa mát: nhiệt độ khoảng 10–13°C giúp cây thấp, gọn và đâm nhánh từ gốc.',
        },
        vegetative: {
          description:
            'Thân và lá xanh xám mảnh vươn lên. Người trồng hoa cắt thường bấm ngọn: theo TNAU, bấm một lần ở đốt thứ năm sẽ cho khoảng sáu chồi bên. Đêm quá ấm (trên khoảng 18°C) làm cây mọc mềm yếu, nên cẩm chướng hợp với khí hậu mát hơn là nóng kéo dài.',
        },
        'bud-formation': {
          description:
            'Nụ xuất hiện ở đầu thân. Một cành có thể mang một hoa hoặc một chùm tối đa khoảng năm hoa. Cây thích nắng đầy đủ (RHS).',
        },
        'bud-development': {
          description:
            'Nụ phình to dần. Với hoa cắt, người trồng tỉa nụ: loại bông lớn (standard) được bỏ các nụ bên để dồn sức cho nụ ngọn, còn loại chùm (spray) thì bỏ nụ ngọn để các nụ bên cùng phát triển (theo TNAU).',
        },
        blooming: {
          description:
            'Cánh hoa bung ra từ nụ, màu sắc dần lộ rõ. Hoa tự nhiên có màu hồng tím sáng; các giống trồng có đủ sắc đỏ, hồng, vàng, trắng và cả xanh lục. Nhà cung cấp hạt khuyên cắt cành khi khoảng 10–20% số hoa trong chùm đã nở.',
        },
        'full-bloom': {
          description:
            'Hoa nở đầy đặn, rộng khoảng 3–5 cm và thơm. NC State ghi cẩm chướng nở vào giữa mùa hè; RHS khuyên cắt bỏ hoa tàn thường xuyên để kéo dài thời gian ra hoa.',
        },
        wilting: {
          name: 'Hoa tàn',
          description:
            'Cánh hoa héo dần và ngả màu. Vì là cây lâu năm, cẩm chướng trồng vườn có thể được tỉa nhẹ sau khi ra hoa hoặc vào đầu xuân (RHS) để cây tiếp tục cho mùa hoa sau.',
        },
      },
      care: {
        light: 'Nắng đầy đủ (từ khoảng 6 giờ nắng trực tiếp mỗi ngày); chịu được bóng râm một phần.',
        water: 'Giữ đất ẩm nhưng thoát nước tốt; giữ ẩm đều khi hạt đang nảy mầm.',
        soil: 'Đất tơi, thoát nước tốt, trung tính đến hơi kiềm (RHS và NC State); một nhà cung cấp hạt giống khuyên đất cát pha giàu dinh dưỡng, hơi kiềm.',
        temperature: 'Hạt nảy mầm tốt ở khoảng 18–22°C. Cây ưa mát: 10–13°C giữ cây gọn, còn đêm trên khoảng 18°C dễ làm cây mềm yếu.',
        extra:
          'Cắt bỏ hoa tàn đều đặn để kéo dài mùa hoa (RHS). Có thể nhân giống bằng cành giâm từ chồi chưa ra hoa vào mùa hè (RHS). Hướng dẫn trồng hoa cắt thương mại của TNAU nêu pH đất 5,5–6,5, thấp hơn mức hơi kiềm ở trên — giống và điều kiện trồng khác nhau thì khuyến nghị cũng khác.',
      },
      facts: [
        'Cẩm chướng tự nhiên có màu hồng tím sáng; các giống trồng có đỏ, hồng, vàng, trắng và xanh lục, nhưng chưa có giống nào tự nhiên cho hoa xanh dương thật sự.',
        'Cẩm chướng không tự tạo được sắc tố delphinidin nên hoa xanh lam phải nhờ công nghệ biến đổi gen: giống ‘Moondust’ được thương mại hóa vào khoảng năm 1996.',
        'Mùi thơm của hoa thường được tả là cay, giống đinh hương, nên tiếng Anh còn gọi cây là “clove pink”.',
        'Tên chi Dianthus do Theophrastus đặt, ghép từ các từ Hy Lạp nghĩa là “thần thánh” và “hoa”; cẩm chướng đã xuất hiện trong văn chương Hy Lạp khoảng 2.000 năm trước.',
        'Cẩm chướng là quốc hoa của Tây Ban Nha, Monaco và Slovenia.',
      ],
      keywords: [
        'hoa cẩm chướng',
        'quá trình phát triển của hoa cẩm chướng',
        'các giai đoạn phát triển của hoa cẩm chướng',
        'vòng đời hoa cẩm chướng',
        'time-lapse hoa cẩm chướng',
        'cách trồng hoa cẩm chướng',
      ],
      altText:
        'Minh họa hoa cẩm chướng với thân mảnh có đốt, lá hẹp xanh xám và đóa hoa hồng nhiều lớp cánh, cây lớn lên từ hạt giống trong đất.',
      timeNote:
        'Các mốc thời gian là ước tính, độ tin cậy thấp. Một nhà cung cấp hạt giống nêu khoảng 130–140 ngày từ lúc gieo đến khi cây trưởng thành với dòng Chabaud, còn hướng dẫn trồng hoa cắt của TNAU nêu khoảng 110–120 ngày từ lúc trồng cây giâm đến khi ra hoa. Thực tế còn phụ thuộc giống, nhiệt độ và cách trồng; độ dài từng giai đoạn chỉ là cách chia gần đúng.',
      startNote: 'Mô phỏng bắt đầu từ hạt gieo vào khay; ngoài thực tế, cẩm chướng cũng được nhân bằng cành giâm từ chồi chưa ra hoa.',
    },
    en: {
      name: 'Carnation',
      aliases: ['clove pink', 'border carnation', 'Dianthus'],
      tagline: 'From a tiny seed to a layered, clove-scented flower in a few months.',
      metaDescription:
        'Watch a carnation grow from seed or cutting to full bloom in an interactive time-lapse: growth stages, estimated timing, growing tips and surprising facts.',
      intro: [
        'The carnation (Dianthus caryophyllus) is a herbaceous perennial in the pink family (Caryophyllaceae), growing up to about 80 cm tall. Its slender leaves are grey-green to blue-green and up to roughly 15 cm long; the sweetly scented flowers are about 3–5 cm across and are borne singly or in clusters of up to five. Centuries of cultivation have blurred its natural range, but wild carnations are most common around the Mediterranean.',
        'Carnations are grown for cut flowers and buttonholes, and many gardeners treat them as annuals even though the plant is a perennial. Cut-flower growers distinguish two types: standard carnations with one large bloom per stem and spray carnations with several smaller blooms. The simulation below starts from seed; in practice carnations are also propagated from cuttings.',
      ],
      stages: {
        seed: {
          name: 'Seed or cutting',
          description:
            'A seed supplier advises pressing the seed only lightly into the sowing mix and keeping it evenly moist until it sprouts. A carnation can also start from a cutting: the RHS recommends taking softwood cuttings from non-flowering shoots in summer, and TNAU’s cut-flower guide uses 5–10 cm terminal cuttings.',
        },
        germination: {
          description:
            'At roughly 18–22 °C, seed typically germinates within 7–14 days, according to one seed company’s growing data. The root emerges first, then two small seed leaves lift out of the mix. For a cutting the equivalent step is rooting: TNAU says cuttings develop a good root system in about 21 days.',
        },
        seedling: {
          description:
            'Seedlings are moved into cell packs or small pots about 20–25 days after sowing, then hardened off and planted out roughly 6–8 weeks after sowing. This is a cool-loving stage: temperatures of about 10–13 °C keep young plants low, compact and branching from the base.',
        },
        vegetative: {
          description:
            'Slender grey-green stems and leaves push upward. Cut-flower growers usually pinch out the growing tip: per TNAU, one pinch at the fifth node gives about six side shoots. Warm nights (above roughly 18 °C) make growth soft and leggy, which is why carnations favour cool rather than hot weather.',
        },
        'bud-formation': {
          description:
            'Buds appear at the tips of the stems. A stem can carry one flower or a cluster of up to about five. The plant likes full sun (RHS).',
        },
        'bud-development': {
          description:
            'The buds swell. For cut flowers growers disbud: standard carnations lose their side buds so the terminal bud gets all the energy, while spray carnations lose the terminal bud so the side buds develop together (per TNAU).',
        },
        blooming: {
          description:
            'Petals push out of the bud and the colour starts to show. The wild flower is a bright pinkish-purple; cultivated forms come in red, pink, yellow, white and even green. One seed supplier advises cutting stems when about 10–20% of the flowers in a cluster are open.',
        },
        'full-bloom': {
          description:
            'The flower is fully open, about 3–5 cm across and fragrant. NC State lists carnations as blooming in midsummer; the RHS advises deadheading regularly to prolong flowering.',
        },
        wilting: {
          name: 'Fading flowers',
          description:
            'Petals slowly wilt and lose colour. Because it is a perennial, a garden carnation can be trimmed lightly after flowering or in spring (RHS) so it carries on to flower again the next season.',
        },
      },
      care: {
        light: 'Full sun (about 6 or more hours of direct sun a day); tolerates part shade.',
        water: 'Keep the soil moist but well drained; keep it evenly moist while the seed is germinating.',
        soil: 'Loose, well-drained, neutral to slightly alkaline soil (RHS, NC State); one seed supplier suggests rich, sandy, slightly alkaline soil.',
        temperature: 'Seed germinates well at about 18–22 °C. Plants like it cool: 10–13 °C keeps them compact, while nights above about 18 °C encourage soft growth.',
        extra:
          'Deadhead regularly to prolong flowering (RHS). Propagate from cuttings of non-flowering shoots in summer (RHS). TNAU’s commercial cut-flower guide gives a soil pH of 5.5–6.5, lower than the slightly alkaline range above — recommendations differ with cultivar and growing system.',
      },
      facts: [
        'The wild flower is a bright pinkish-purple; cultivars come in red, pink, yellow, white and green, but no cultivar naturally produces a true blue.',
        'Carnations do not make the pigment delphinidin on their own, so blue-mauve flowers needed genetic engineering: the cultivar ‘Moondust’ was commercialised around 1996.',
        'The scent is often described as spicy and clove-like, which is why the plant is also called the “clove pink”.',
        'The genus name Dianthus was coined by Theophrastus from Greek words meaning “divine” and “flower”; carnations appear in Greek literature about 2,000 years ago.',
        'The carnation is the national flower of Spain, Monaco and Slovenia.',
      ],
      keywords: [
        'carnation growth stages',
        'carnation life cycle',
        'time-lapse carnation growth',
        'how carnations grow from seed',
        'how long does a carnation take to bloom',
        'how to grow carnations',
      ],
      altText:
        'Illustration of a carnation with a slender jointed stem, narrow grey-green leaves and a layered pink flower, growing from a seed in the soil.',
      timeNote:
        'Timings are rough estimates with low confidence. One seed company quotes about 130–140 days from sowing to maturity for its Chabaud strain, and TNAU’s cut-flower guide gives about 110–120 days from planting a cutting to flowering. Real schedules depend on cultivar, temperature and growing method; the split between stages is approximate.',
      startNote: 'The simulation starts from a seed sown in a tray; in practice carnations are also propagated from cuttings of non-flowering shoots.',
    },
  },
};
