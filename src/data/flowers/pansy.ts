import type { FlowerData } from '../types';

export const pansy: FlowerData = {
  id: 'pansy',
  slugs: { vi: 'hoa-pang-xe', en: 'pansy' },
  scientificName: 'Viola × wittrockiana',
  scientificAliases: ['Viola tricolor var. hortensis', 'garden pansy', 'păng-xê', 'pensée'],
  family: 'Violaceae',
  group: 'annual',
  colors: ['purple', 'yellow', 'blue', 'white'],
  bloomSeasons: ['winter', 'spring'],
  daysToBloom: [60, 90],
  speedBand: 'fast',
  startMaterial: 'seed',
  confidence: 'moderate',
  featured: false,
  isNew: true,
  stages: [
    { id: 'seed', days: [1, 2] },
    { id: 'germination', days: [7, 14] },
    { id: 'seedling', days: [14, 21] },
    { id: 'vegetative', days: [21, 30] },
    { id: 'bud-formation', days: [7, 10] },
    { id: 'bud-development', days: [7, 10] },
    { id: 'blooming', days: [3, 3] },
    { id: 'full-bloom', days: [30, 60] },
    { id: 'wilting', days: [14, 30] },
  ],
  visual: {
    archetype: 'pansy',
    palette: {
      petal: '#7a4fc2',
      petalDeep: '#3f1f82',
      petalTip: '#a07ee0',
      center: '#f3c623',
      centerDeep: '#b8860b',
      leaf: '#5f9a55',
      leafDeep: '#33683a',
      stem: '#6aa060',
      accent: '#f3c623',
    },
  },
  related: ['daisy', 'cosmos', 'carnation'],
  sources: [
    {
      title: 'How to Grow Pansies from Seed in 11 Steps',
      publisher: 'Epic Gardening',
      url: 'https://www.epicgardening.com/pansies-from-seed/',
      supports: 'Growing pansies from seed: sowing, germination and transplanting.',
    },
    {
      title: 'Viola × wittrockiana Majestic Giant Mixed Pansy',
      publisher: 'Thompson & Morgan (via Promesse de Fleurs)',
      url: 'https://www.promessedefleurs.ie/annuals/flower-seeds/thompson-and-morgan-seeds/viola-x-wittrockiana-majestic-giant-mixed-pansy.html',
      supports: 'Approximate 60–70 days from seed to flower; germination at about 7–14 days at 18–21 °C.',
    },
    {
      title: 'How To Grow Pansies From Seeds',
      publisher: 'Hunker',
      url: 'https://www.hunker.com/12214781/how-to-grow-pansies-from-seeds/',
      supports: 'General guidance on sowing and growing pansies from seed.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa păng-xê',
      aliases: ['păng xê', 'pang xe', 'pansy'],
      tagline: 'Đóa hoa nhỏ có “khuôn mặt” nhiều màu, ưa mát và nở rộ vào mùa lạnh quanh Tết.',
      metaDescription:
        'Xem hoa păng-xê lớn lên từ hạt đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách trồng păng-xê chơi Tết và những điều thú vị.',
      intro: [
        'Hoa păng-xê (Viola × wittrockiana) thuộc họ Hoa tím (Violaceae). Cây thấp, lá tròn mép khía, mỗi hoa có năm cánh với các đốm “mặt” đặc trưng ở giữa.',
        'Păng-xê ưa khí hậu mát nên hay được trồng làm hoa chậu dịp Tết ở những vùng lạnh như Đà Lạt. Nguồn tham khảo cho biết cây thường ra hoa khoảng 60–70 ngày kể từ lúc gieo hạt.',
      ],
      stages: {},
      care: {
        light: 'Nắng nhẹ đến bán phần; nóng gắt làm cây yếu đi.',
        water: 'Giữ đất ẩm đều, không úng.',
        soil: 'Đất tơi xốp, giàu mùn, thoát nước tốt.',
        temperature: 'Ưa mát; hạt nảy mầm tốt ở khoảng 18–21 °C.',
        extra: 'Ngắt hoa tàn thường xuyên để cây ra hoa tiếp.',
      },
      facts: [
        'Hạt thường nảy mầm sau khoảng 7–14 ngày ở 18–21 °C.',
        'Từ lúc gieo đến lúc ra hoa thường khoảng 60–70 ngày.',
        'Mỗi hoa có năm cánh, hai cánh trên và ba cánh dưới.',
        'Păng-xê là hoa lai tạo, xuất phát từ các loài Viola hoang dã.',
      ],
      keywords: [
        'hoa păng-xê',
        'quá trình phát triển của hoa păng-xê',
        'các giai đoạn phát triển của hoa păng-xê',
        'time-lapse hoa păng-xê',
        'cách trồng hoa păng-xê chơi Tết',
        'hoa păng-xê nở sau bao lâu',
      ],
      altText:
        'Minh họa cây păng-xê thấp với lá tròn xanh và những hoa năm cánh màu tím có đốm vàng ở giữa.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính. Nguồn cho biết khoảng 60–70 ngày từ hạt đến hoa; độ dài từng giai đoạn là suy đoán, phụ thuộc giống và nhiệt độ.',
      startNote: 'Mô phỏng bắt đầu từ một hạt păng-xê nhỏ gieo nông trong đất ẩm.',
    },
    en: {
      name: 'Pansy',
      aliases: ['garden pansy', 'viola', 'păng-xê'],
      tagline: 'A small flower with a many-coloured “face” that loves cool weather and blooms around Tết.',
      metaDescription:
        'Watch a pansy grow from seed to full bloom in an interactive time-lapse: growth stages, estimated timing, how to grow it for Tết and plant facts.',
      intro: [
        'The garden pansy (Viola × wittrockiana) is in the violet family (Violaceae). It is a low plant with rounded, scalloped leaves, and each flower has five petals with a typical “face” of blotches in the middle.',
        'Pansies like cool weather, so they are popular potted flowers at Tết in cooler parts of Vietnam such as Đà Lạt. Sources say plants usually flower about 60–70 days after sowing.',
      ],
      stages: {},
      care: {
        light: 'Gentle sun to part shade; harsh heat weakens the plant.',
        water: 'Keep the soil evenly moist, never waterlogged.',
        soil: 'Loose, humus-rich, free-draining soil.',
        temperature: 'Prefers cool; seed germinates best at about 18–21 °C.',
        extra: 'Pick off spent flowers regularly to keep it blooming.',
      },
      facts: [
        'Seed typically germinates in about 7–14 days at 18–21 °C.',
        'It usually flowers about 60–70 days from sowing.',
        'Each flower has five petals, two upper and three lower.',
        'Garden pansies are hybrids bred from wild Viola species.',
      ],
      keywords: [
        'pansy growth stages',
        'Viola × wittrockiana life cycle',
        'time-lapse pansy',
        'how to grow pansies for Tết',
        'how long pansies take to flower',
      ],
      altText:
        'Illustration of a low pansy plant with rounded green leaves and five-petalled purple flowers with yellow blotches in the middle.',
      timeNote:
        'Timings are rough estimates. Sources say about 60–70 days from seed to flower; the length of each stage is a guess that depends on variety and temperature.',
      startNote: 'The simulation starts from a single small pansy seed sown shallowly in damp soil.',
    },
  },
};
