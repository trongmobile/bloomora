import type { FlowerData } from '../types';

export const celosia: FlowerData = {
  id: 'celosia',
  slugs: { vi: 'hoa-mao-ga', en: 'cockscomb' },
  scientificName: 'Celosia argentea (Cristata Group)',
  scientificAliases: ['Celosia cristata', 'Celosia argentea var. cristata', 'cockscomb', 'woolflower'],
  family: 'Amaranthaceae',
  group: 'annual',
  colors: ['red', 'orange', 'yellow', 'pink'],
  bloomSeasons: ['summer', 'autumn', 'winter'],
  daysToBloom: [75, 120],
  speedBand: 'fast',
  startMaterial: 'seed',
  confidence: 'low',
  featured: false,
  isNew: true,
  stages: [
    { id: 'seed', days: [1, 3] },
    { id: 'germination', days: [7, 14] },
    { id: 'seedling', days: [14, 21] },
    { id: 'vegetative', days: [30, 45] },
    { id: 'bud-formation', days: [10, 15] },
    { id: 'bud-development', days: [10, 15] },
    { id: 'blooming', days: [3, 7] },
    { id: 'full-bloom', days: [30, 60] },
    { id: 'wilting', days: [14, 30] },
  ],
  visual: {
    archetype: 'celosia',
    palette: {
      petal: '#c4172e',
      petalDeep: '#7d0b1c',
      petalTip: '#e8374d',
      center: '#a01226',
      centerDeep: '#5c0714',
      leaf: '#6f9a4e',
      leafDeep: '#3d6a2e',
      stem: '#a8453c',
    },
  },
  related: ['marigold', 'zinnia', 'chrysanthemum'],
  sources: [
    {
      title: 'Celosia – Key Growing Information',
      publisher: "Johnny's Selected Seeds",
      url: 'https://www.johnnyseeds.com/growers-library/flowers/celosia/celosia-key-growing-information.html',
      supports: 'Germination takes about 8–14 days at 21–27 °C.',
    },
    {
      title: 'How to Plant, Grow, and Care For Cockscomb Flowers',
      publisher: 'Epic Gardening',
      url: 'https://www.epicgardening.com/cockscomb/',
      supports: 'General growing and care guidance for cockscomb (light, water, soil).',
    },
    {
      title: 'How to Grow Celosia from Seed',
      publisher: 'Sow Right Seeds',
      url: 'https://sowrightseeds.com/blogs/planters-library/grow-celosia-from-seed',
      supports: 'Starting celosia from seed, including starting indoors for a longer blooming season.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa mào gà',
      aliases: ['mào gà', 'mồng gà', 'celosia', 'cockscomb'],
      tagline: 'Đóa hoa nhung đỏ thẫm uốn nếp như mào gà, quen thuộc trên bàn thờ và chậu cảnh ngày Tết.',
      metaDescription:
        'Xem hoa mào gà lớn lên từ hạt đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách trồng mào gà cho Tết và những điều thú vị.',
      intro: [
        'Hoa mào gà (Celosia argentea, nhóm Cristata) thuộc họ Dền (Amaranthaceae). Phần “hoa” là một khối nhung dẹt, nhăn nếp như mào gà trống, thường có màu đỏ thẫm, cam hoặc vàng.',
        'Ở Việt Nam, mào gà hay được bày trên bàn thờ và trong chậu cảnh dịp Tết. Cây trồng từ hạt; nguồn tham khảo cho biết hạt nảy mầm trong khoảng 8–14 ngày ở 21–27 °C. Thời gian từ hạt đến hoa rất khác nhau tùy giống, nên người trồng phải gieo sớm để kịp Tết.',
      ],
      stages: {},
      care: {
        light: 'Cần nhiều nắng; hạt cần ánh sáng để nảy mầm nên chỉ phủ đất thật mỏng.',
        water: 'Giữ đất ẩm vừa, không úng nước.',
        soil: 'Đất tơi xốp, thoát nước tốt, giàu mùn.',
        temperature: 'Ưa ấm; hạt nảy mầm tốt ở khoảng 21–27 °C.',
        extra: 'Gieo hạt trong khay trước rồi chuyển ra chậu giúp mùa hoa dài hơn.',
      },
      facts: [
        'Hạt thường nảy mầm sau khoảng 8–14 ngày ở 21–27 °C.',
        'Mào gà thuộc họ Dền, cùng họ với rau dền.',
        'Phần giống “mào gà” là cụm hoa dẹt, nhăn nếp, không phải một bông hoa đơn.',
        'Gieo hạt trong nhà trước giúp cây có mùa hoa dài hơn.',
      ],
      keywords: [
        'hoa mào gà',
        'quá trình phát triển của hoa mào gà',
        'các giai đoạn phát triển của hoa mào gà',
        'time-lapse hoa mào gà',
        'cách trồng hoa mào gà chơi Tết',
        'hoa mào gà nở sau bao lâu',
      ],
      altText:
        'Minh họa cây mào gà với thân hồng đỏ, lá xanh và những cụm hoa đỏ thẫm dẹt, nhăn nếp như mào gà trống.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính thô. Nguồn chỉ cho biết thời gian nảy mầm; các giai đoạn còn lại là suy đoán, rất khác nhau theo giống và điều kiện trồng.',
      startNote: 'Mô phỏng bắt đầu từ một hạt mào gà nhỏ, đen, gieo nông trong đất ẩm.',
    },
    en: {
      name: 'Cockscomb',
      aliases: ['celosia', 'hoa mào gà', 'woolflower'],
      tagline: 'A velvety, ruffled crimson crest, a familiar Tết display on altars and in pots.',
      metaDescription:
        'Watch cockscomb grow from seed to full bloom in an interactive time-lapse: growth stages, estimated timing, how to grow it for Tết and plant facts.',
      intro: [
        'Cockscomb (Celosia argentea, Cristata Group) is in the amaranth family (Amaranthaceae). The “flower” is a flattened, ruffled velvety mass shaped like a rooster’s comb, usually deep red, orange or yellow.',
        'In Vietnam it is often displayed on altars and in pots at Tết. It grows from seed; a source gives germination at about 8–14 days at 21–27 °C. Time from seed to flower varies a lot by variety, so growers must sow early to catch Tết.',
      ],
      stages: {},
      care: {
        light: 'Full sun; seed needs light to germinate, so cover it only very thinly.',
        water: 'Keep the soil moderately moist, never waterlogged.',
        soil: 'Loose, free-draining soil rich in organic matter.',
        temperature: 'Warm; seed germinates best at about 21–27 °C.',
        extra: 'Starting seed in trays first and moving plants to pots can lengthen the blooming season.',
      },
      facts: [
        'Seed typically germinates in about 8–14 days at 21–27 °C.',
        'Cockscomb is in the amaranth family, the same family as amaranth greens.',
        'The comb-like part is a flattened, ruffled flower cluster, not a single bloom.',
        'Starting seed indoors first can give a longer blooming season.',
      ],
      keywords: [
        'cockscomb growth stages',
        'Celosia argentea life cycle',
        'time-lapse cockscomb',
        'how to grow cockscomb for Tết',
        'celosia from seed',
      ],
      altText:
        'Illustration of a cockscomb plant with a reddish stem, green leaves and flat, ruffled deep-red flower crests like a rooster’s comb.',
      timeNote:
        'Timings are rough estimates. A source gives only the germination time; the other stages are guesses that vary widely by variety and growing conditions.',
      startNote: 'The simulation starts from a single tiny black cockscomb seed sown shallowly in damp soil.',
    },
  },
};
