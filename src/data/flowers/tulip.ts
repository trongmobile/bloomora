import type { FlowerData } from '../types';

export const tulip: FlowerData = {
  id: 'tulip',
  slugs: { vi: 'hoa-tulip', en: 'tulip' },
  scientificName: 'Tulipa gesneriana',
  scientificAliases: ['Tulipa', 'Tulipa x gesneriana', 'garden tulip'],
  family: 'Liliaceae',
  group: 'bulb',
  colors: ['red', 'pink', 'yellow', 'white', 'orange', 'purple'],
  bloomSeasons: ['spring'],
  daysToBloom: [120, 210],
  speedBand: 'medium',
  startMaterial: 'bulb',
  confidence: 'moderate',
  featured: true,
  stages: [
    { id: 'seed', days: [28, 42] },
    { id: 'germination', days: [70, 100] },
    { id: 'seedling', days: [7, 14] },
    { id: 'vegetative', days: [14, 21] },
    { id: 'bud-formation', days: [5, 10] },
    { id: 'bud-development', days: [7, 14] },
    { id: 'blooming', days: [2, 4] },
    { id: 'full-bloom', days: [5, 7] },
    { id: 'wilting', days: [30, 60] },
  ],
  visual: {
    archetype: 'tulip',
    palette: {
      petal: '#e0364c',
      petalDeep: '#9a1430',
      petalTip: '#f5707e',
      center: '#3a2438',
      centerDeep: '#1f1220',
      leaf: '#5f9c6a',
      leafDeep: '#2f6a46',
      stem: '#5a9a5c',
    },
  },
  related: ['rose', 'cherry-blossom', 'marigold'],
  sources: [
    {
      title: 'Tulip',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Tulip',
      supports: 'Habit, heights, cold requirement for flowering, seed capsule, tulip mania, bulb production.',
    },
    {
      title: 'Tulipa gesneriana',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Tulipa_gesneriana',
      supports: 'Introduction to western Europe in 1554, bloom in April–May, frost-hardy bulbs.',
    },
    {
      title: 'Tulipa gesneriana — accepted name',
      publisher: 'Kew — Plants of the World Online',
      url: 'https://powo.science.kew.org/taxon/542923-1',
      supports: 'Accepted name, family Liliaceae, cultigen from Türkiye, bulbous geophyte.',
    },
    {
      title: 'Tulipa gesneriana (15) common garden tulip — details',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/18512/tulipa-gesneriana-(15)-common-garden-tulip-late-tulip/details',
      supports: 'Height, late-spring flowering, autumn planting depth, hardiness, care, offsets.',
    },
    {
      title: 'Tulip (Tulipa)',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/tulip',
      supports: 'Sun, soil, drainage and the dry summer rest.',
    },
    {
      title: 'How long does it take tulip bulbs to bloom?',
      publisher: 'Longfield Gardens (bulb retailer)',
      url: 'https://www.longfield-gardens.com/blogs/tulip-care/how-long-does-it-take-tulip-bulbs-to-bloom',
      supports: 'Four to seven months from planting to bloom; rooting and chilling periods; a variety blooms about a week.',
    },
    {
      title: 'How to grow tulips from seed',
      publisher: 'Longfield Gardens (bulb retailer)',
      url: 'https://www.longfield-gardens.com/blogs/tulip-care/how-to-grow-tulips-from-seed',
      supports: 'Four to seven years from seed to first flower; seed pod and seed description.',
    },
    {
      title: 'How do you force tulip bulbs indoors?',
      publisher: 'Iowa State University Extension',
      url: 'https://yardandgarden.extension.iastate.edu/faq/how-do-you-force-tulip-bulbs-indoors',
      supports: '12–16 weeks of chilling at 40–45 °F, then about 3–4 weeks to bloom.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa tulip',
      aliases: ['tulip', 'uất kim hương', 'hoa uất kim cương'],
      tagline: 'Một củ giống, một mùa đông lạnh, và đóa hoa đầu xuân rực rỡ.',
      metaDescription:
        'Time-lapse hoa tulip từ củ giống: ra rễ, ủ lạnh, vươn lá, nụ rồi nở rộ. Thời gian ước tính, cách trồng và những sự thật thú vị về tulip.',
      intro: [
        'Tulip (Tulipa gesneriana) là cây thân củ sống lâu năm thuộc họ Loa kèn (Liliaceae). Theo Kew, đây là một cultigen — dạng cây trồng — có nguồn gốc từ Thổ Nhĩ Kỳ; Wikipedia cho rằng tổ tiên của tulip vườn nhiều khả năng đến từ vùng Thiên Sơn. Tulip được đưa vào Tây Âu từ Constantinople năm 1554.',
        'Điểm đặc biệt của tulip là nó cần mùa đông. Củ phải trải qua một giai đoạn lạnh kéo dài thì thân hoa mới vươn dài và ra hoa đúng cách. Vì thế mô phỏng dưới đây bắt đầu từ củ giống trồng vào mùa thu, không phải từ hạt: cây trồng từ hạt phải mất khoảng 4–7 năm mới ra hoa đầu tiên (Longfield Gardens).',
      ],
      stages: {
        seed: {
          name: 'Củ giống',
          description:
            'Củ tulip được trồng vào mùa thu, sâu khoảng 10–15 cm (RHS). Trong khoảng 4–6 tuần đầu, củ chủ yếu mọc rễ dưới đất, chưa có gì nhú lên mặt đất.',
        },
        germination: {
          name: 'Ra rễ và ủ lạnh',
          description:
            'Đây là giai đoạn dài nhất và gần như vô hình: củ nằm dưới đất qua mùa đông. Tulip cần khoảng 12–16 tuần lạnh (dưới khoảng 10°C) để thân hoa phát triển và ra hoa đúng cách (Wikipedia; Iowa State Extension).',
        },
        seedling: {
          name: 'Mầm nhú lên',
          description:
            'Khi đất ấm dần vào đầu xuân, mầm xanh cuộn tròn nhú lên khỏi mặt đất. Chiếc lá đầu tiên mở ra, to bản.',
        },
        vegetative: {
          description:
            'Các lá rộng bản vươn lên và quang hợp mạnh, nạp năng lượng cho củ và cho đóa hoa đang thành hình. Cây thích nắng đầy đủ và đất thoát nước tốt.',
        },
        'bud-formation': {
          description:
            'Giữa các lá, một nụ hoa xuất hiện trên đầu cuống. Cuống hoa bắt đầu vươn dài, kết quả của giai đoạn lạnh đã qua.',
        },
        'bud-development': {
          description:
            'Cuống hoa vươn cao, nụ phình lên và lộ dần màu cánh hoa qua lớp đài xanh. Tulip ra hoa muộn hay sớm tùy nhóm giống: sớm, giữa hay muộn mùa xuân.',
        },
        blooming: {
          description:
            'Cánh hoa tách ra, hoa hé mở thành hình chén. Theo Iowa State, từ lúc củ rời kho lạnh đến khi nở hoa mất khoảng 3–4 tuần trong điều kiện ép hoa.',
        },
        'full-bloom': {
          description:
            'Hoa mở hết cỡ, để lộ nhị và nhụy ở giữa. Một giống tulip thường đẹp nhất trong khoảng một tuần (Longfield Gardens); trồng phối các giống sớm, giữa và muộn có thể kéo dài màu hoa tới khoảng sáu tuần.',
        },
        wilting: {
          name: 'Hoa tàn, củ nghỉ hè',
          description:
            'Cánh hoa rụng. Nếu để lại, bầu nhụy phình thành quả nang ba cạnh chứa nhiều hạt dẹt như đồng xu. Lá vàng dần khi củ chuyển sang nghỉ qua mùa hè khô ấm; củ đẻ thêm củ con để nhân giống.',
        },
      },
      care: {
        light: 'Nắng đầy đủ, nơi kín gió (RHS).',
        water: 'Đất ẩm nhưng thoát nước tốt; tránh úng vì củ dễ thối.',
        soil: 'Chịu được nhiều loại đất — đất vôi, sét, thịt hoặc cát — miễn là thoát nước tốt (RHS).',
        temperature:
          'Cần mùa đông lạnh 12–16 tuần để ra hoa; ở vùng khí hậu nóng, củ thường phải được ủ lạnh nhân tạo. Ưa mùa xuân mát ẩm và mùa hè khô, ấm.',
        extra:
          'Tulip độc nếu ăn và có thể gây dị ứng da — hãy đeo găng tay khi xử lý củ (RHS). Sau khi hoa tàn, cắt bỏ hoa và nhân giống bằng củ con vào mùa hè.',
      },
      facts: [
        'Cơn sốt tulip (“tulip mania”) ở Hà Lan kéo dài từ năm 1634 đến 1637 và được xem là bong bóng đầu cơ đầu tiên được ghi nhận trong lịch sử.',
        'Những cánh hoa sọc “vỡ màu” nổi tiếng thời đó là do một loại virus do rệp lây truyền, loại virus này cũng làm cây yếu đi.',
        'Hà Lan sản xuất tới khoảng 3 tỷ củ tulip mỗi năm, phần lớn để xuất khẩu.',
        'Tulip đen thật sự đầu tiên được lai tạo năm 1986 ở Bovenkarspel, Hà Lan.',
      ],
      keywords: [
        'hoa tulip',
        'quá trình phát triển của hoa tulip',
        'vòng đời của hoa tulip',
        'các giai đoạn phát triển của hoa tulip',
        'cách trồng hoa tulip từ củ',
        'time-lapse hoa tulip',
      ],
      altText:
        'Minh họa một cây tulip đỏ mọc từ củ giống dưới đất, với lá xanh bản rộng và đóa hoa hình chén nở trên cuống cao.',
      timeNote:
        'Khoảng thời gian từ trồng đến nở hoa (khoảng 4–7 tháng) lấy từ hướng dẫn của một nhà cung cấp củ giống, kết hợp thông tin về giai đoạn lạnh 12–16 tuần của các trang khuyến nông. Đây là ước tính; thời điểm thực tế phụ thuộc giống và khí hậu.',
      startNote:
        'Mô phỏng bắt đầu từ củ giống trồng vào mùa thu. Trồng từ hạt mất khoảng 4–7 năm mới ra hoa.',
    },
    en: {
      name: 'Tulip',
      aliases: ['garden tulip'],
      tagline: 'One bulb, one cold winter, and a burst of colour at the start of spring.',
      metaDescription:
        'Tulip time-lapse from bulb: rooting, winter chill, leaves, bud and full bloom. Estimated timing, planting tips and fun facts about tulips.',
      intro: [
        'The tulip (Tulipa gesneriana) is a perennial bulb in the lily family (Liliaceae). Kew treats it as a cultigen — a cultivated form — from Türkiye, while Wikipedia says the garden tulip is widely believed to descend from plants of the Tian Shan. Tulips reached western Europe from Constantinople in 1554.',
        'What makes tulips special is that they need a winter. The bulb needs a long cold period before the flower stalk will stretch and bloom properly. This simulation therefore starts from a bulb planted in autumn rather than from seed: tulips grown from seed take roughly 4–7 years to flower for the first time (Longfield Gardens).',
      ],
      stages: {
        seed: {
          name: 'Bulb',
          description:
            'Tulip bulbs are planted in autumn, about 10–15 cm deep (RHS). For the first 4–6 weeks the bulb mostly grows roots underground; nothing shows above the soil yet.',
        },
        germination: {
          name: 'Rooting and chilling',
          description:
            'This is the longest and nearly invisible phase: the bulb sits in the ground through winter. Tulips need roughly 12–16 weeks of cold (below about 10 °C) for the flower stalk to develop and bloom properly (Wikipedia; Iowa State Extension).',
        },
        seedling: {
          name: 'Shoot emerges',
          description:
            'As the soil warms in early spring, a curled green shoot pushes up through the surface. The first leaf unfurls, broad and flat.',
        },
        vegetative: {
          description:
            'Broad leaves stretch up and photosynthesise hard, feeding the bulb and the flower taking shape. The plant likes full sun and free-draining soil.',
        },
        'bud-formation': {
          description:
            'Between the leaves a flower bud appears at the top of the stalk. The stalk starts to lengthen, a result of the cold period it has been through.',
        },
        'bud-development': {
          description:
            'The stalk climbs and the bud swells, with petal colour showing through the green outer layers. Tulips flower early, mid or late spring depending on the group.',
        },
        blooming: {
          description:
            'The petals part and the flower opens into a cup. According to Iowa State, forced bulbs take about 3–4 weeks to flower after leaving cold storage.',
        },
        'full-bloom': {
          description:
            'The flower opens fully, revealing the stamens and pistil. A single tulip variety is usually at its best for about a week (Longfield Gardens); mixing early, mid and late varieties can stretch the colour to around six weeks.',
        },
        wilting: {
          name: 'Wilting and summer rest',
          description:
            'The petals fall. If left, the ovary swells into a three-sided capsule holding many flat, coin-like seeds. The leaves yellow as the bulb goes dormant through the warm, dry summer, and it makes offsets that are used to propagate it.',
        },
      },
      care: {
        light: 'Full sun in a sheltered spot (RHS).',
        water: 'Soil that is moist but well drained; avoid waterlogging because bulbs rot.',
        soil: 'Tolerates many soil types — chalk, clay, loam or sand — provided it drains well (RHS).',
        temperature:
          'Needs a 12–16 week cold winter to flower; in hot climates bulbs are usually pre-chilled artificially. Prefers a cool, moist spring and a warm, dry summer.',
        extra:
          'Tulips are toxic if eaten and can irritate skin — wear gloves when handling bulbs (RHS). After flowering, deadhead, and propagate by separating offsets in summer.',
      },
      facts: [
        'Tulip mania in the Netherlands ran from 1634 to 1637 and is considered the first recorded speculative bubble.',
        'The famous striped “broken” tulips of that era were caused by a virus spread by aphids — which also weakened the plants.',
        'The Netherlands produces as many as 3 billion tulip bulbs a year, mostly for export.',
        'The first truly black tulip was bred in 1986 in Bovenkarspel, the Netherlands.',
      ],
      keywords: [
        'tulip growth stages',
        'tulip life cycle',
        'time-lapse tulip growing',
        'how long does a tulip bulb take to bloom',
        'how to plant tulip bulbs',
        'tulip facts',
      ],
      altText:
        'Illustration of a red tulip growing from a bulb in the soil, with broad green leaves and a cup-shaped flower on a tall stalk.',
      timeNote:
        'The planting-to-bloom span (about 4–7 months) comes from a bulb retailer’s guide, combined with the 12–16 week chilling period given by extension sites. These are estimates; real timing depends on variety and climate.',
      startNote:
        'The simulation starts from a bulb planted in autumn. Tulips grown from seed take roughly 4–7 years to flower.',
    },
  },
};
