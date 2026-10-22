import type { FlowerData } from '../types';

export const lotus: FlowerData = {
  id: 'lotus',
  slugs: { vi: 'hoa-sen', en: 'lotus' },
  scientificName: 'Nelumbo nucifera',
  scientificAliases: ['Nelumbo', 'sacred lotus', 'Indian lotus'],
  family: 'Nelumbonaceae',
  group: 'aquatic',
  colors: ['pink', 'white'],
  bloomSeasons: ['summer'],
  daysToBloom: [110, 365],
  speedBand: 'medium',
  startMaterial: 'seed-or-rhizome',
  confidence: 'low',
  featured: true,
  stages: [
    { id: 'seed', days: [3, 14] },
    { id: 'germination', days: [3, 14] },
    { id: 'seedling', days: [14, 45] },
    { id: 'vegetative', days: [60, 120] },
    { id: 'bud-formation', days: [14, 30] },
    { id: 'bud-development', days: [14, 28] },
    { id: 'blooming', days: [1, 2] },
    { id: 'full-bloom', days: [1, 2] },
    { id: 'wilting', days: [30, 60] },
  ],
  visual: {
    archetype: 'lotus',
    palette: {
      petal: '#f4a7c3',
      petalDeep: '#d9638f',
      petalTip: '#f27aa8',
      center: '#e8d36a',
      centerDeep: '#9a8a2a',
      leaf: '#4a9a78',
      leafDeep: '#1f5a46',
      stem: '#4f8f5f',
    },
  },
  related: ['cherry-blossom', 'rose', 'tulip'],
  sources: [
    {
      title: 'Nelumbo nucifera Gaertn. — accepted name and native range',
      publisher: 'Kew — Plants of the World Online',
      url: 'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:605422-1',
      supports: 'Accepted name, native range, perennial aquatic habit.',
    },
    {
      title: 'Nelumbo nucifera — RHS plant profile',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/11438/nelumbo-nucifera/details',
      supports: 'Size, recommended water depth, hardiness, scarifying seed and sowing at 25 °C.',
    },
    {
      title: 'Sacred lotus',
      publisher: 'Royal Botanic Gardens, Kew',
      url: 'https://www.kew.org/plants/sacred-lotus',
      supports: 'Leaf and flower size, flowering season, seed longevity, flower thermoregulation.',
    },
    {
      title: 'Nelumbo nucifera',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Nelumbo_nucifera',
      supports: 'Rhizome growth, petal counts, thermoregulation, the lotus effect.',
    },
    {
      title: 'Nelumbo nucifera (sacred lotus)',
      publisher: 'NC State Extension Plant Toolbox',
      url: 'https://plants.ces.ncsu.edu/plants/nelumbo-nucifera/',
      supports: 'Bloom time, flowers opening in the morning and lasting about three days.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa sen',
      aliases: ['sen', 'sen hồng', 'sen trắng', 'liên hoa'],
      tagline: 'Mọc lên từ bùn, hoa sen mở cánh mỗi sáng và để lại gương sen đầy hạt.',
      metaDescription:
        'Time-lapse hoa sen (Nelumbo nucifera): từ hạt cứng dưới bùn đến lá nổi, nụ, hoa nở rộ và gương sen. Thời gian ước tính, điều kiện trồng và kiến thức thú vị.',
      intro: [
        'Sen (Nelumbo nucifera) là cây thủy sinh sống lâu năm, có thân rễ vùi trong bùn còn lá và hoa vươn lên khỏi mặt nước. Theo Kew, vùng bản địa của sen trải dài từ Ukraine và Iran qua châu Á nhiệt đới — gồm cả Việt Nam — đến miền bắc nước Úc.',
        'Lá sen lớn có thể rộng tới khoảng 80 cm, bề mặt kỵ nước khiến nước đọng thành giọt rồi lăn đi. Hoa to khoảng 30 cm, theo Kew thường thấy nhất từ tháng 6 đến tháng 9 ở bán cầu bắc; mô phỏng dưới đây là minh họa chung, không phải lịch trình chính xác.',
      ],
      stages: {
        seed: {
          name: 'Hạt sen',
          description:
            'Hạt sen có vỏ rất cứng, nằm trong gương sen chín. Hạt có thể ngủ rất lâu — Kew ghi nhận một hạt hơn 1.000 năm tuổi vẫn nảy mầm. Để nảy mầm, người trồng thường mài hoặc khía nhẹ vỏ rồi gieo trong nước ấm; RHS khuyên khoảng 25°C trở lên.',
        },
        germination: {
          description:
            'Hạt hút nước, rễ mầm và chồi non cuộn tròn nhú ra. Chồi vươn lên phía mặt nước; nước càng ấm, hạt nảy mầm càng nhanh. Thời gian cụ thể thay đổi nhiều theo nhiệt độ.',
        },
        seedling: {
          description:
            'Những chiếc lá đầu tiên nổi trên mặt nước như các đĩa nhỏ, nối xuống bùn bằng cuống mảnh. Thân rễ bắt đầu bò trong bùn và tích trữ tinh bột.',
        },
        vegetative: {
          description:
            'Thân rễ lớn dần và cây đẩy lên những chiếc lá lớn đứng cao hơn mặt nước, trên cuống dài có gai nhỏ. Theo RHS, cây lớn cần nước sâu khoảng 40–60 cm; các giống sen nhỏ chỉ cần khoảng 15–22 cm.',
        },
        'bud-formation': {
          description:
            'Một cuống hoa riêng mọc lên, mang nụ nhỏ hình trứng. Nụ còn gần mặt nước hoặc vừa nhô lên khỏi các lá.',
        },
        'bud-development': {
          description:
            'Nụ lớn dần và vươn cao hơn lá; đầu các cánh hoa ửng hồng khi chuẩn bị nở.',
        },
        blooming: {
          description:
            'Buổi sáng, các cánh hoa hé mở từ ngoài vào trong. Hoa sen theo nhịp ngày: mở vào sáng và khép lại về tối (theo NCSU).',
        },
        'full-bloom': {
          description:
            'Hoa xòe rộng, lộ đài sen vàng xanh ở giữa và vòng nhị vàng xung quanh. Theo NCSU, mỗi bông kéo dài khoảng ba ngày. Hoa sen còn có khả năng tự giữ ấm — nhiệt độ trong hoa có thể quanh 30–35°C dù không khí lạnh hơn nhiều.',
        },
        wilting: {
          name: 'Hoa tàn, gương sen',
          description:
            'Cánh hoa rụng dần xuống mặt nước, để lại đài sen (gương sen) phình to với các hạt chín trong những lỗ nhỏ. Gương sen khô dần, cúi xuống và thả hạt xuống bùn để vòng đời tiếp tục.',
        },
      },
      care: {
        light: 'Ưa nắng; các hướng dẫn trồng sen thường khuyên nhiều giờ nắng trực tiếp mỗi ngày.',
        water: 'Giữ nước ngập gốc: khoảng 40–60 cm cho cây lớn, 15–22 cm cho giống sen nhỏ (RHS).',
        soil: 'Bùn hoặc đất sét giàu dinh dưỡng ở đáy chậu hoặc ao; tránh loại đất tơi dễ nổi lên mặt nước.',
        temperature: 'Gieo hạt ở khoảng 25°C trở lên (RHS). Ở vùng lạnh, sen chỉ nên để ngoài trời vào mùa hè.',
        extra: 'Với hạt: khía hoặc mài nhẹ vỏ cứng trước khi ngâm để nước thấm vào.',
      },
      facts: [
        'Một hạt sen hơn 1.000 năm tuổi từng nảy mầm được (Kew).',
        'Hoa sen có thể giữ nhiệt độ khoảng 30–35°C ngay cả khi không khí chỉ khoảng 10°C nhờ khả năng tự sinh nhiệt.',
        'Lá sen có bề mặt siêu kỵ nước: nước đọng thành giọt và lăn đi, cuốn theo bụi bẩn — “hiệu ứng lá sen”.',
        'Theo Wikipedia, thân rễ sen có thể dài thêm tới khoảng 20 m trong một năm.',
      ],
      keywords: [
        'hoa sen',
        'quá trình phát triển của hoa sen',
        'vòng đời của hoa sen',
        'các giai đoạn phát triển của hoa sen',
        'cách trồng sen',
        'time-lapse hoa sen',
      ],
      altText:
        'Minh họa hoa sen hồng nở trên cuống cao giữa những chiếc lá tròn lớn trong ao, cây lớn lên từ một hạt sen trong bùn.',
      timeNote:
        'Các hướng dẫn tham khảo không đưa ra thời gian “từ hạt đến hoa” chuẩn cho sen. Các mốc ở đây là khoảng ước tính rộng: sen trồng từ hạt thường ra hoa sau một mùa sinh trưởng và có thể sang năm thứ hai.',
      startNote: 'Mô phỏng bắt đầu từ một hạt sen đã được xử lý vỏ và gieo trong bùn.',
    },
    en: {
      name: 'Lotus',
      aliases: ['sacred lotus', 'Indian lotus'],
      tagline: 'Rising out of the mud, the lotus opens its petals each morning and leaves a seed-filled pod.',
      metaDescription:
        'Lotus (Nelumbo nucifera) time-lapse: from a hard-shelled seed in the mud to floating leaves, buds, bloom and the seed pod. Estimated timing and growing needs.',
      intro: [
        'The sacred lotus (Nelumbo nucifera) is a perennial aquatic plant whose rhizome lives in the mud while its leaves and flowers rise above the water. According to Kew its native range stretches from Ukraine and Iran through tropical Asia — including Vietnam — to northern Australia.',
        'Big lotus leaves can reach about 80 cm across, and their water-repellent surface makes rain bead up and roll off. The flowers are around 30 cm wide and, per Kew, are best seen from June to September in the northern hemisphere. The simulation below is a general illustration, not an exact schedule.',
      ],
      stages: {
        seed: {
          name: 'Lotus seed',
          description:
            'A lotus seed has a very hard shell and sits in the ripe seed pod. It can stay dormant for an astonishingly long time — Kew records a seed more than 1,000 years old that still sprouted. To germinate, growers usually file or nick the shell and sow in warm water; the RHS advises about 25 °C or more.',
        },
        germination: {
          description:
            'The seed soaks up water and a curled shoot and first root emerge. The shoot reaches toward the water surface; the warmer the water, the faster it goes. Real timing varies a lot with temperature.',
        },
        seedling: {
          description:
            'The first leaves float on the surface like small plates, joined to the mud by thin stalks. The rhizome starts creeping through the mud and storing starch.',
        },
        vegetative: {
          description:
            'The rhizome grows and the plant pushes up large leaves that stand above the water on long, finely prickly stalks. The RHS gives a water depth of about 40–60 cm for large plants and about 15–22 cm for small cultivars.',
        },
        'bud-formation': {
          description:
            'A separate flower stalk rises and carries a small egg-shaped bud, still near the water surface or just peeping above the leaves.',
        },
        'bud-development': {
          description:
            'The bud swells and climbs above the leaves; the petal tips blush pink as it prepares to open.',
        },
        blooming: {
          description:
            'In the morning the petals begin to part, outer ones first. A lotus flower follows a daily rhythm: it opens in the morning and closes toward evening (NCSU).',
        },
        'full-bloom': {
          description:
            'The flower opens wide, showing the yellow-green seed pod in the centre ringed by yellow stamens. According to NCSU each flower lasts about three days. Lotus flowers can also heat themselves — holding roughly 30–35 °C even when the air is much colder.',
        },
        wilting: {
          name: 'Wilting and seed pod',
          description:
            'Petals drop onto the water, leaving the swelling seed pod with ripening seeds in small pockets. The pod dries, bows over and drops its seeds into the mud so the cycle can continue.',
        },
      },
      care: {
        light: 'Sun-loving; lotus growing guides usually call for many hours of direct sun a day.',
        water: 'Keep the roots submerged: about 40–60 cm of water for large plants, 15–22 cm for small cultivars (RHS).',
        soil: 'Nutrient-rich mud or clay at the bottom of a pot or pond; avoid loose soil that floats up.',
        temperature: 'Sow seed at about 25 °C or more (RHS). In cold climates lotus should be outdoors only in summer.',
        extra: 'For seed: nick or file the hard shell before soaking so water can get in.',
      },
      facts: [
        'A lotus seed more than 1,000 years old has been germinated (Kew).',
        'A lotus flower can hold about 30–35 °C even when the air is only about 10 °C, thanks to its ability to generate heat.',
        'Lotus leaves are super-hydrophobic: water forms beads and rolls off, carrying dirt away — the “lotus effect”.',
        'According to Wikipedia, a lotus rhizome can extend by up to roughly 20 m in a year.',
      ],
      keywords: [
        'lotus growth stages',
        'lotus life cycle',
        'time-lapse lotus flower',
        'how to grow lotus from seed',
        'how long does a lotus take to bloom',
        'sacred lotus facts',
      ],
      altText:
        'Illustration of a pink lotus flower on a tall stalk among large round leaves in a pond, grown from a lotus seed in the mud.',
      timeNote:
        'The guides we consulted give no standard “seed to flower” time for lotus. These milestones are wide estimates: lotus grown from seed often flowers after one growing season and may take a second year.',
      startNote: 'The simulation starts from a lotus seed with its shell prepared, sown in mud.',
    },
  },
};
