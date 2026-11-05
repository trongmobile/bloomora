import type { FlowerData } from '../types';

export const gladiolus: FlowerData = {
  id: 'gladiolus',
  slugs: { vi: 'hoa-lay-on', en: 'gladiolus' },
  scientificName: 'Gladiolus × hortulanus',
  scientificAliases: ['Gladiolus hybridus', 'Gladiolus grandiflorus', 'sword lily', 'gladiola'],
  family: 'Iridaceae',
  group: 'bulb',
  colors: ['red', 'pink', 'orange', 'white'],
  bloomSeasons: ['spring', 'summer', 'winter'],
  daysToBloom: [70, 100],
  speedBand: 'fast',
  startMaterial: 'bulb',
  confidence: 'moderate',
  featured: false,
  isNew: true,
  stages: [
    { id: 'seed', days: [1, 3] },
    { id: 'germination', days: [7, 10] },
    { id: 'seedling', days: [7, 10] },
    { id: 'vegetative', days: [30, 40] },
    { id: 'bud-formation', days: [10, 15] },
    { id: 'bud-development', days: [12, 17] },
    { id: 'blooming', days: [3, 5] },
    { id: 'full-bloom', days: [10, 14] },
    { id: 'wilting', days: [10, 20] },
  ],
  visual: {
    archetype: 'gladiolus',
    palette: {
      petal: '#e0364f',
      petalDeep: '#9c1230',
      petalTip: '#f06a7c',
      center: '#f5d9a0',
      centerDeep: '#c98a3a',
      leaf: '#4f8f55',
      leafDeep: '#2c5e36',
      stem: '#5a9a5a',
    },
  },
  related: ['lavender', 'tulip', 'narcissus'],
  sources: [
    {
      title: 'How long for gladiolus bulbs to bloom: timing and tips',
      publisher: 'Longfield Gardens',
      url: 'https://www.longfield-gardens.com/blogs/gladiola-care/how-long-for-gladiolus-bulbs-to-bloom-timing-and-tips',
      supports: 'Most gladiolus bloom about 70–100 days after planting; dwarf types can be faster.',
    },
    {
      title: 'Gladiolus Time to Bloom: A Guide to Summer Success',
      publisher: 'Longfield Gardens',
      url: 'https://www.longfield-gardens.com/blogs/gladiola-care/gladiolus-time-to-bloom-a-guide-to-summer-success',
      supports: 'Blooms last about 2–3 weeks; planting every two weeks extends the display; shade slows growth.',
    },
    {
      title: 'Gladiolus (Extension Folder F146)',
      publisher: 'Michigan State University Extension (archive)',
      url: 'https://archive.lib.msu.edu/DMC/extension_publications/F146/F146.pdf',
      supports: 'Historical extension figures of roughly 60–120 days to bloom depending on variety.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa lay ơn',
      aliases: ['lay ơn', 'layơn', 'lay-ơn', 'kiếm lan', 'gladiolus'],
      tagline: 'Một củ nhỏ vươn thành thân thẳng mang chùm hoa xếp tầng, hay được cắm trên bàn thờ ngày Tết.',
      metaDescription:
        'Xem hoa lay ơn lớn lên từ củ đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách trồng lay ơn chơi Tết và những điều thú vị.',
      intro: [
        'Hoa lay ơn (Gladiolus) thuộc họ Diên vĩ (Iridaceae). Cây mọc từ một củ giống, lá dẹt hình kiếm xếp thành quạt, và một thân hoa thẳng đứng mang hàng chục hoa nở lần lượt từ dưới lên.',
        'Lay ơn là loài được trồng và cắm nhiều ở Việt Nam dịp Tết. Theo nguồn tham khảo, phần lớn giống nở sau khoảng 70–100 ngày kể từ lúc trồng củ, nên người trồng thường tính ngược từ ngày Tết, và trồng cách nhau vài tuần để hoa nở kéo dài.',
      ],
      stages: {
        seed: {
          name: 'Củ giống',
          description:
            'Lay ơn bắt đầu từ một củ giống dẹt, bọc áo nâu mỏng. Củ được đặt xuống đất ẩm, chờ rễ và chồi nhú ra.',
        },
      },
      care: {
        light: 'Cần nhiều nắng; trồng chỗ râm làm cây chậm nở, có thể lâu hơn nhiều.',
        water: 'Tưới đều, giữ đất ẩm vừa; tránh úng làm thối củ.',
        soil: 'Đất tơi xốp, thoát nước tốt.',
        temperature: 'Hợp thời tiết ấm; đất đủ ấm thì củ mới nảy tốt.',
        extra: 'Trồng nối tiếp mỗi hai tuần một đợt để hoa nở kéo dài.',
      },
      facts: [
        'Phần lớn giống lay ơn nở sau khoảng 70–100 ngày kể từ lúc trồng củ.',
        'Mỗi thân hoa thường nở trong khoảng hai đến ba tuần.',
        'Trồng cách nhau khoảng hai tuần giúp mùa hoa kéo dài.',
        'Trồng chỗ râm làm hoa nở chậm hơn.',
      ],
      keywords: [
        'hoa lay ơn',
        'quá trình phát triển của hoa lay ơn',
        'các giai đoạn phát triển của hoa lay ơn',
        'time-lapse hoa lay ơn',
        'cách trồng hoa lay ơn chơi Tết',
        'hoa lay ơn nở sau bao lâu',
      ],
      altText:
        'Minh họa cây lay ơn với bó lá dẹt hình kiếm mọc từ củ và một thân hoa thẳng mang các hoa đỏ xếp thành tầng.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính. Nguồn cho biết hoa nở sau khoảng 70–100 ngày; độ dài từng giai đoạn là suy đoán, phụ thuộc giống, nhiệt độ và ánh sáng.',
      startNote: 'Mô phỏng bắt đầu từ một củ lay ơn đặt trong đất ẩm.',
    },
    en: {
      name: 'Gladiolus',
      aliases: ['sword lily', 'gladiola', 'lay ơn'],
      tagline: 'A small corm that shoots up a straight spike of tiered flowers, a Tết altar favourite.',
      metaDescription:
        'Watch a gladiolus grow from corm to full bloom in an interactive time-lapse: growth stages, estimated timing, how to grow it for Tết and plant facts.',
      intro: [
        'Gladiolus belongs to the iris family (Iridaceae). It grows from a corm, with flat sword-shaped leaves in a fan and one upright flower spike carrying many flowers that open from the bottom up.',
        'It is widely grown and arranged at Tết in Vietnam. A source says most varieties bloom about 70–100 days after planting, so growers count back from the holiday and plant in batches a few weeks apart to stretch the display.',
      ],
      stages: {
        seed: {
          name: 'Corm',
          description:
            'The plant starts from a flattened corm wrapped in thin brown tunics. It is set in damp soil and waits for roots and a shoot to emerge.',
        },
      },
      care: {
        light: 'Full sun; shade slows growth and can delay bloom by weeks.',
        water: 'Water evenly and keep the soil moderately moist; avoid waterlogging, which rots the corm.',
        soil: 'Loose, free-draining soil.',
        temperature: 'Warm; the corm sprouts best once the soil has warmed.',
        extra: 'Plant a new batch every two weeks to extend the bloom.',
      },
      facts: [
        'Most gladiolus bloom about 70–100 days after planting.',
        'A spike typically blooms for around two to three weeks.',
        'Planting every two weeks extends the display.',
        'Shade makes plants bloom later.',
      ],
      keywords: [
        'gladiolus growth stages',
        'gladiolus life cycle',
        'time-lapse gladiolus',
        'how to grow gladiolus for Tết',
        'how long gladiolus take to bloom',
      ],
      altText:
        'Illustration of a gladiolus with a fan of flat sword-shaped leaves from a corm and an upright spike of red flowers stacked in tiers.',
      timeNote:
        'Timings are rough estimates. Sources say about 70–100 days from planting to bloom; the length of each stage is a guess that depends on variety, temperature and light.',
      startNote: 'The simulation starts from a single gladiolus corm set in damp soil.',
    },
  },
};
