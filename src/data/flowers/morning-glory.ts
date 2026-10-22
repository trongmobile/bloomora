import type { FlowerData } from '../types';

export const morningGlory: FlowerData = {
  id: 'morning-glory',
  slugs: { vi: 'hoa-bim-bim', en: 'morning-glory' },
  scientificName: 'Ipomoea purpurea',
  scientificAliases: ['Ipomoea tricolor', 'Ipomoea', 'common morning glory'],
  family: 'Convolvulaceae',
  group: 'vine',
  colors: ['purple', 'blue', 'pink', 'white'],
  bloomSeasons: ['summer', 'autumn'],
  daysToBloom: [45, 100],
  speedBand: 'fast',
  startMaterial: 'seed',
  confidence: 'low',
  featured: false,
  stages: [
    { id: 'seed', days: [1, 2] },
    { id: 'germination', days: [5, 14] },
    { id: 'seedling', days: [7, 14] },
    { id: 'vegetative', days: [21, 45] },
    { id: 'bud-formation', days: [7, 14] },
    { id: 'bud-development', days: [5, 10] },
    { id: 'blooming', days: [1, 1] },
    { id: 'full-bloom', days: [1, 1] },
    { id: 'wilting', days: [30, 60] },
  ],
  visual: {
    archetype: 'morning-glory',
    palette: {
      petal: '#6f7cf0',
      petalDeep: '#3a3fb0',
      petalTip: '#a9b8ff',
      center: '#ffffff',
      centerDeep: '#f2e8a0',
      leaf: '#4f9a4a',
      leafDeep: '#2a6a30',
      stem: '#5a8f3f',
    },
  },
  related: ['sunflower', 'marigold', 'chrysanthemum'],
  sources: [
    {
      title: 'Ipomoea purpurea — accepted name',
      publisher: 'Kew — Plants of the World Online',
      url: 'https://powo.science.kew.org/taxon/30043043-2',
      supports: 'Accepted name, family Convolvulaceae, native to tropical and subtropical America, climbing annual.',
    },
    {
      title: 'Ipomoea purpurea — details',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/56562/ipomoea-purpurea/details',
      supports: 'Height, flowering from summer into autumn, hardiness, care, toxicity.',
    },
    {
      title: 'Ipomoea tricolor — details',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/114278/wd/details',
      supports: 'Height of 2.5–4 m and care.',
    },
    {
      title: 'Ipomoea purpurea (common morning glory)',
      publisher: 'NC State Extension Plant Toolbox',
      url: 'https://plants.ces.ncsu.edu/plants/ipomoea-purpurea/common-name/common-morning-glory/',
      supports: 'Native range, bloom, one-day flowers, seed capsule.',
    },
    {
      title: 'Ipomoea tricolor',
      publisher: 'NC State Extension Plant Toolbox',
      url: 'https://plants.ces.ncsu.edu/plants/ipomoea-tricolor/',
      supports: 'Dry dehiscent capsule with small black seeds, sun requirement.',
    },
    {
      title: 'Growing annual morning glory',
      publisher: 'Oregon State University Extension',
      url: 'https://extension.oregonstate.edu/es/catalog/em-9880-growing-annual-morning-glory',
      supports: 'Sow when soil is at least 60 °F, height up to 15 ft, flowers from early summer to frost.',
    },
    {
      title: 'Morning glory',
      publisher: 'University of Illinois Extension',
      url: 'https://extension.illinois.edu/flowers/morning-glory',
      supports: 'Soak seed 24 hours, height, flowers open in the morning and fade by evening, reseeds heavily.',
    },
    {
      title: 'Morningglory species',
      publisher: 'Integrated Weed Management (growiwm.org)',
      url: 'https://growiwm.org/weeds/morningglory-species/',
      supports: 'Genus-level: optimum germination around 25 °C, seed capsule, seed persistence in soil, seed set as early as nine weeks after emergence.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa bìm bìm',
      aliases: ['bìm bìm', 'bìm bìm tím', 'bìm bìm biếc', 'morning glory'],
      tagline: 'Mỗi bông chỉ nở một buổi sáng, nhưng dây leo thì nở hoa suốt cả mùa.',
      metaDescription:
        'Time-lapse hoa bìm bìm (Ipomoea): từ hạt đến dây leo, nụ và hoa nở buổi sáng rồi tàn trong ngày. Thời gian ước tính, cách trồng và kiến thức thú vị.',
      intro: [
        'Hoa bìm bìm (chi Ipomoea, họ Khoai lang — Convolvulaceae) là các loài dây leo quấn thân, thường được trồng như cây một năm. Theo Kew, Ipomoea purpurea có nguồn gốc ở vùng nhiệt đới và cận nhiệt đới châu Mỹ. RHS cho biết cây cao khoảng 4–8 m với I. purpurea và 2,5–4 m với I. tricolor.',
        'Điều làm bìm bìm đặc biệt là từng bông chỉ nở một ngày: nở vào buổi sáng, phai và héo trước tối (NC State, Illinois Extension). Nhưng cây liên tục ra nụ mới, nên hoa nở từ đầu hè đến sương giá (Oregon State). Mô phỏng này là minh họa chung, không phải lịch trình chính xác.',
      ],
      stages: {
        seed: {
          name: 'Hạt',
          description:
            'Hạt bìm bìm nhỏ, đen, vỏ cứng. Người trồng thường ngâm hạt 24 giờ hoặc khía nhẹ vỏ để nước thấm vào (Illinois Extension). Hạt có thể tồn tại trong đất nhiều năm.',
        },
        germination: {
          description:
            'Gieo khi đất đã ấm — ít nhất khoảng 16°C (60°F) theo Oregon State; nhiệt độ nảy mầm tối ưu của các loài bìm bìm khoảng 25°C. Chồi non nhú ra, đội theo hai lá mầm hình cánh bướm.',
        },
        seedling: {
          description:
            'Những chiếc lá thật hình tim đầu tiên xuất hiện. Ngọn cây bắt đầu xoay tròn, tìm một điểm tựa để quấn.',
        },
        vegetative: {
          description:
            'Thân quấn quanh giàn hoặc cọc và vươn nhanh. Cây cần giàn leo, nắng ít nhất khoảng 6 giờ mỗi ngày (NC State) và không cần nhiều phân bón.',
        },
        'bud-formation': {
          description:
            'Ở nách lá, những nụ nhỏ xuất hiện. Chúng tôi không tìm được nguồn đáng tin cậy về việc cây này có phụ thuộc độ dài ngày hay không, nên không đưa ra khẳng định.',
        },
        'bud-development': {
          description:
            'Nụ vặn xoắn và dài ra, các nếp cánh cuộn chặt như chiếc dù khép. Màu cánh hoa đã lộ ở đầu nụ.',
        },
        blooming: {
          description:
            'Sáng sớm, nụ xoắn bung ra thành chiếc kèn. Bìm bìm là loài nở theo ngày: hoa mở vào buổi sáng và sẽ tàn trước khi tối.',
        },
        'full-bloom': {
          description:
            'Hoa hình phễu mở rộng với họng sáng màu. Mỗi bông chỉ nở khoảng một ngày; cây thay hoa mới mỗi sáng trong suốt mùa hoa. Ở giống ‘Heavenly Blue’, màu cánh đổi từ đỏ sang xanh khi độ pH trong tế bào tăng lên.',
        },
        wilting: {
          name: 'Hoa tàn, quả nang',
          description:
            'Hoa héo thành nếp xoắn rồi rụng. Bầu nhụy phình thành quả nang tròn nhỏ chứa các hạt đen, khô và nứt ra khi chín. Cây tự gieo hạt rất nhiều (Illinois Extension).',
        },
      },
      care: {
        light: 'Nắng đầy đủ, ít nhất khoảng 6 giờ mỗi ngày (NC State).',
        water: 'Giữ đất ẩm khi cây còn nhỏ; sau đó cây chịu hạn khá tốt (Oregon State).',
        soil: 'Đất thoát nước tốt; chịu được đất nghèo dinh dưỡng, tránh bón nhiều phân (Illinois Extension).',
        temperature:
          'Không chịu được sương giá — RHS xếp hạng H1C (tối thiểu khoảng 5–10°C). Gieo sau khi đất ấm lên.',
        extra:
          'Cần giàn hoặc cọc để leo. Hạt bìm bìm có hại nếu ăn phải (RHS, NC State) — để xa trẻ em và vật nuôi.',
      },
      facts: [
        'Mỗi bông bìm bìm chỉ nở khoảng một ngày: mở buổi sáng, héo trước tối.',
        'Ở giống ‘Heavenly Blue’, màu cánh hoa chuyển từ đỏ sang xanh khi độ pH trong không bào tế bào tăng lên.',
        'Ở nhiều nơi, bìm bìm tím (Ipomoea purpurea) bị coi là cỏ dại xâm lấn vì tự gieo hạt dày đặc.',
        'Nông dân Mexico dùng Ipomoea tricolor làm cây phủ đất rồi vùi vào đất trước khi trồng, vì nó ức chế cỏ dại.',
      ],
      keywords: [
        'hoa bìm bìm',
        'quá trình phát triển của hoa bìm bìm',
        'vòng đời của hoa bìm bìm',
        'cách trồng hoa bìm bìm',
        'vì sao hoa bìm bìm nở buổi sáng',
        'time-lapse hoa bìm bìm',
      ],
      altText:
        'Minh họa dây bìm bìm xanh tím quấn quanh một cọc tre, với lá hình tim và những bông hoa hình kèn nở buổi sáng.',
      timeNote:
        'Không có nguồn nào chúng tôi đọc nêu số ngày “từ hạt đến hoa” cho bìm bìm. Một trang quản lý cỏ dại chỉ cho biết các loài bìm bìm có thể kết hạt sớm nhất khoảng chín tuần sau khi mọc, nghĩa là hoa đầu tiên phải nở trước đó. Các mốc ở đây là ước tính, độ tin cậy thấp.',
      startNote: 'Mô phỏng bắt đầu từ hạt đã ngâm hoặc khía vỏ, gieo khi đất đã ấm.',
    },
    en: {
      name: 'Morning glory',
      aliases: ['common morning glory', 'purple morning glory'],
      tagline: 'Each bloom lasts a single morning, but the vine keeps flowering all season.',
      metaDescription:
        'Morning glory (Ipomoea) time-lapse: from seed to twining vine, buds and flowers that open at dawn and fade by evening. Estimated timing, growing tips and facts.',
      intro: [
        'Morning glories (genus Ipomoea, in the Convolvulaceae family) are twining climbers usually grown as annuals. According to Kew, Ipomoea purpurea is native to tropical and subtropical America. The RHS gives a height of about 4–8 m for I. purpurea and 2.5–4 m for I. tricolor.',
        'What makes them special is that each flower lasts just a day: it opens in the morning and fades before evening (NC State, Illinois Extension). The plant keeps making new buds, so flowers come from early summer until frost (Oregon State). This simulation is a general illustration, not an exact schedule.',
      ],
      stages: {
        seed: {
          name: 'Seed',
          description:
            'Morning glory seeds are small, black and hard-shelled. Growers usually soak them for 24 hours or nick the coat so water can get in (Illinois Extension). Seeds can survive in the soil for years.',
        },
        germination: {
          description:
            'Sow when the soil is warm — at least about 16 °C (60 °F) per Oregon State; the optimum germination temperature for morning glory species is around 25 °C. The shoot emerges carrying two butterfly-shaped seed leaves.',
        },
        seedling: {
          description:
            'The first heart-shaped true leaves appear. The growing tip starts to circle, searching for something to twine around.',
        },
        vegetative: {
          description:
            'The stem twines around a trellis or stake and shoots up. The plant needs something to climb, at least about 6 hours of sun a day (NC State), and not much fertiliser.',
        },
        'bud-formation': {
          description:
            'Small buds appear in the leaf axils. We found no reliable source on whether these species respond to day length, so we make no claim about it.',
        },
        'bud-development': {
          description:
            'The bud lengthens and twists, its petal folds wound tight like a closed umbrella. Petal colour already shows at the tip.',
        },
        blooming: {
          description:
            'At dawn the twisted bud unfurls into a trumpet. Morning glories follow a daily rhythm: the flower opens in the morning and will fade before dark.',
        },
        'full-bloom': {
          description:
            'The funnel-shaped flower opens wide with a pale throat. Each bloom lasts about a day; the vine replaces them with fresh ones each morning through the flowering season. In the cultivar ‘Heavenly Blue’ the petal colour shifts from red to blue as the cell pH rises.',
        },
        wilting: {
          name: 'Wilting and seed capsule',
          description:
            'The flower wilts into a twist and drops. The ovary swells into a small round capsule of black seeds that dries and splits open when ripe. The plant reseeds heavily (Illinois Extension).',
        },
      },
      care: {
        light: 'Full sun, at least about 6 hours a day (NC State).',
        water: 'Keep the soil moist while young; once established the plant tolerates dry spells (Oregon State).',
        soil: 'Well-drained soil; tolerates poor soil, and too much fertiliser is best avoided (Illinois Extension).',
        temperature:
          'Not frost-tolerant — the RHS rates it H1C (minimum about 5–10 °C). Sow after the soil has warmed.',
        extra:
          'Needs a trellis or stake to climb. The seeds are harmful if eaten (RHS, NC State) — keep them away from children and pets.',
      },
      facts: [
        'Each morning glory flower lasts only about a day: it opens in the morning and wilts before evening.',
        'In the cultivar ‘Heavenly Blue’ the petal colour shifts from red to blue as the pH inside the cell vacuoles rises.',
        'Where it grows wild, the purple morning glory (Ipomoea purpurea) is often considered a noxious weed because it reseeds so densely.',
        'Mexican farmers use Ipomoea tricolor as a cover crop, turning it into the soil before planting because it suppresses weeds.',
      ],
      keywords: [
        'morning glory growth stages',
        'morning glory life cycle',
        'time-lapse morning glory',
        'how to grow morning glories from seed',
        'why do morning glories bloom in the morning',
        'morning glory facts',
      ],
      altText:
        'Illustration of a blue-purple morning glory vine twining around a bamboo stake, with heart-shaped leaves and trumpet flowers open in the morning.',
      timeNote:
        'None of the sources we read gives a “seed to flower” number for morning glory. A weed-management page says morning glory species can set seed as early as nine weeks after emergence, so the first flowers must come before that. These milestones are low-confidence estimates.',
      startNote: 'The simulation starts from a seed that has been soaked or nicked, sown once the soil is warm.',
    },
  },
};
