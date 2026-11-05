import type { FlowerData } from '../types';

export const phalaenopsis: FlowerData = {
  id: 'phalaenopsis',
  slugs: { vi: 'hoa-lan-ho-diep', en: 'moth-orchid' },
  scientificName: 'Phalaenopsis spp.',
  scientificAliases: ['Phalaenopsis', 'Phalaenopsis amabilis', 'moth orchid', 'lan hồ điệp'],
  family: 'Orchidaceae',
  group: 'perennial',
  colors: ['white', 'pink', 'purple', 'yellow'],
  bloomSeasons: ['winter', 'spring'],
  daysToBloom: [1100, 2400],
  speedBand: 'slow',
  startMaterial: 'seed',
  confidence: 'low',
  featured: false,
  stages: [
    { id: 'seed', days: [14, 60] },
    { id: 'germination', days: [30, 90] },
    { id: 'seedling', days: [300, 600] },
    { id: 'vegetative', days: [700, 1500] },
    { id: 'bud-formation', days: [14, 30] },
    { id: 'bud-development', days: [60, 90] },
    { id: 'blooming', days: [7, 14] },
    { id: 'full-bloom', days: [60, 120] },
    { id: 'wilting', days: [30, 90] },
  ],
  visual: {
    archetype: 'orchid',
    palette: {
      petal: '#f4e4ee',
      petalDeep: '#c9679c',
      petalTip: '#ffffff',
      center: '#e8b84a',
      centerDeep: '#a8681a',
      leaf: '#4f8a50',
      leafDeep: '#2f6a3c',
      stem: '#6a8a52',
    },
  },
  related: ['lotus', 'rose', 'tulip'],
  sources: [
    {
      title: 'Phalaenopsis',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Phalaenopsis',
      supports: 'Orchid genus in the family Orchidaceae, mostly epiphytic with broad leaves, flowers carried on arching spikes.',
    },
    {
      title: 'Cooling in Phalaenopsis',
      publisher: 'Anthura',
      url: 'https://anthura.nl/en/crop-optimization/phalaenopsis-pot-advice/cooling-in-phalaenopsis/',
      supports: 'Spike induction needs cool temperatures: a 24-hour average of about 19–20 °C, with nights down to about 16 °C, to switch the plant from vegetative to flowering.',
    },
    {
      title: 'Growing the Best Phals, Part I',
      publisher: 'American Orchid Society',
      url: 'https://secure.aos.org/media/Content-Images/PDFs/GrowingBestPhalsPart_I.pdf',
      supports: 'Growing guidance for Phalaenopsis; heat above about 28 °C after induction can lead the spike to form a keiki or the buds to abort.',
    },
    {
      title: 'How To Grow Phalaenopsis Orchids From Seeds',
      publisher: 'Hunker',
      url: 'https://www.hunker.com/12586064/how-to-grow-phalaenopsis-orchids-from-seeds/',
      supports: 'Phalaenopsis grown from seed typically take about three to five years to first flower.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa lan hồ điệp',
      aliases: ['lan hồ điệp', 'hồ điệp', 'phalaenopsis', 'lan bướm'],
      tagline: 'Chùm hoa như đàn bướm đậu trên cành cong, được người trồng canh để nở đúng dịp Tết.',
      metaDescription:
        'Xem hoa lan hồ điệp lớn lên từ hạt đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách kích cành và những điều thú vị.',
      intro: [
        'Lan hồ điệp (Phalaenopsis) là nhóm lan thuộc họ Lan (Orchidaceae), phần lớn sống bám trên cây. Lá dày, rộng xòe thành cụm sát gốc; hoa mọc thành chuỗi trên cành cong vòng cung, trông như đàn bướm.',
        'Lan hồ điệp được chuộng làm quà Tết vì hoa bền, nở được nhiều tuần. Muốn ra cành, cây cần thời gian lạnh nhẹ về đêm. Các mốc dưới đây là ước tính cho cây từ hạt; trong thực tế cây bán ra phần lớn được nhân giống trong ống nghiệm và đã gần tuổi ra hoa.',
      ],
      stages: {
        seed: {
          description:
            'Hạt lan nhỏ như bụi, không có chất dự trữ nên ngoài tự nhiên phải nhờ nấm cộng sinh để nảy mầm; người trồng gieo trong môi trường vô trùng.',
        },
        vegetative: {
          description:
            'Cây ra thêm lá dày bản rộng và rễ khí xanh bạc bám lên giá thể. Cây từ hạt thường mất vài năm mới đủ lớn để ra hoa lần đầu.',
        },
        'bud-formation': {
          description:
            'Khi đêm đủ mát (trung bình ngày đêm khoảng 19–20°C), cây chuyển từ sinh trưởng sang ra hoa và nhú một cành hoa từ gốc lá.',
        },
        'bud-development': {
          description:
            'Cành hoa dài ra và cong vòng cung, nụ phồng dần. Từ lúc cành nhú đến lúc nở hoa đầu tiên thường mất khoảng hai đến ba tháng.',
        },
        'full-bloom': {
          description:
            'Cành mang chuỗi hoa lớn, cánh bên rất rộng. Hoa lan hồ điệp có thể giữ nhiều tuần; nhiệt độ cao quá (trên khoảng 28°C) có thể làm nụ rụng.',
        },
        wilting: {
          description:
            'Hoa lần lượt tàn và rụng; cây có thể ra cành mới từ mắt trên cành cũ nếu còn khỏe.',
        },
      },
      care: {
        light: 'Ánh sáng tán xạ sáng, tránh nắng gắt trực tiếp.',
        water: 'Tưới khi giá thể gần khô; tránh để nước đọng trong nõn lá.',
        soil: 'Giá thể thoáng như vỏ thông hoặc rêu, không dùng đất thường.',
        temperature:
          'Để ra cành cần vài tuần đêm mát, khoảng 16–20°C. Nhiệt độ cao sau khi kích có thể làm cành ra cây con (keiki) hoặc nụ rụng.',
        extra: 'Hoa cần thời gian khoảng hai đến ba tháng từ khi nhú cành tới khi nở, nên người trồng thường kích cành sớm trước Tết.',
      },
      facts: [
        'Lan hồ điệp thường mất khoảng ba đến năm năm từ hạt đến lần ra hoa đầu tiên.',
        'Đêm mát là tín hiệu để lan hồ điệp ra cành hoa.',
        'Hạt lan nhỏ như bụi nên cần nấm hoặc môi trường dinh dưỡng đặc biệt để nảy mầm.',
        'Cây có rễ khí xanh bạc, có thể nhìn thấy bên ngoài chậu.',
      ],
      keywords: [
        'hoa lan hồ điệp',
        'quá trình phát triển của lan hồ điệp',
        'các giai đoạn phát triển của hoa lan hồ điệp',
        'vòng đời lan hồ điệp',
        'time-lapse lan hồ điệp',
        'cách kích lan hồ điệp ra hoa Tết',
      ],
      altText:
        'Minh họa cây lan hồ điệp với vài lá dày xòe rộng, rễ khí xanh bạc và một cành hoa cong mang chuỗi hoa trắng hồng giống cánh bướm, lớn lên từ vài hạt nhỏ như bụi.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính thô. Các nguồn cho thấy cây từ hạt mất vài năm đến lần ra hoa đầu và hai đến ba tháng từ lúc nhú cành đến khi nở; độ dài các giai đoạn còn lại là suy đoán.',
      startNote: 'Mô phỏng bắt đầu từ những hạt lan nhỏ như bụi gieo trong môi trường vô trùng.',
    },
    en: {
      name: 'Moth orchid',
      aliases: ['Phalaenopsis', 'lan hồ điệp', 'butterfly orchid'],
      tagline: 'A chain of flowers like moths along an arching spike, timed by growers to open for Tết.',
      metaDescription:
        'Watch a moth orchid grow from seed to full bloom in an interactive time-lapse: growth stages, estimated timing, how growers trigger spikes and plant facts.',
      intro: [
        'The moth orchid (Phalaenopsis) is a genus of orchids in the family Orchidaceae, most of them growing on trees. The leaves are thick, broad and held in a tight cluster near the base; the flowers are carried in a row on an arching spike and look like moths in flight.',
        'It is a favourite Tết gift because the flowers last for weeks. To spike, the plant needs a spell of cooler nights. The timings below are estimates for a plant from seed; the orchids actually sold are mostly propagated in laboratories and are already close to flowering age.',
      ],
      stages: {
        seed: {
          description:
            'Orchid seeds are as fine as dust and carry almost no food reserve, so in nature they depend on a fungus to germinate; growers sow them on sterile medium.',
        },
        vegetative: {
          description:
            'The plant adds thick, broad leaves and silvery-green aerial roots that cling to the support. Grown from seed it usually takes years to reach flowering size.',
        },
        'bud-formation': {
          description:
            'When nights turn cool enough (a 24-hour average of around 19–20 °C), the plant switches from growth to flowering and pushes a spike from the base of the leaves.',
        },
        'bud-development': {
          description:
            'The spike lengthens and arches and the buds swell. From first visible spike to first open flower typically takes about two to three months.',
        },
        'full-bloom': {
          description:
            'The spike carries a chain of large flowers with very broad side petals. They can last several weeks; heat above roughly 28 °C can make the buds drop.',
        },
        wilting: {
          description:
            'Flowers fade and drop one after another; a healthy plant may send out a new spike from a node on the old one.',
        },
      },
      care: {
        light: 'Bright, filtered light; avoid harsh direct sun.',
        water: 'Water when the medium is nearly dry and never leave water sitting in the leaf crown.',
        soil: 'An airy medium such as bark or moss, never ordinary soil.',
        temperature:
          'To spike it needs several weeks of cool nights, about 16–20 °C. Heat after induction can turn the spike into a keiki or abort the buds.',
        extra: 'Because it takes two to three months from spike to bloom, growers trigger spikes well ahead of Tết.',
      },
      facts: [
        'A moth orchid grown from seed typically takes about three to five years to flower for the first time.',
        'Cool nights are the signal that makes a moth orchid send up a flower spike.',
        'The seeds are as fine as dust and need a fungus or a special medium to germinate.',
        'The plant has silvery-green aerial roots that you can see outside the pot.',
      ],
      keywords: [
        'moth orchid growth stages',
        'phalaenopsis life cycle',
        'time-lapse moth orchid',
        'how to make a phalaenopsis bloom',
        'Phalaenopsis for Tết',
      ],
      altText:
        'Illustration of a moth orchid with a few broad thick leaves, silvery-green aerial roots and an arching spike of white and pink moth-shaped flowers, growing from a pinch of dust-like seeds.',
      timeNote:
        'Timings are rough estimates. Sources suggest several years from seed to first flower and two to three months from spike to bloom; the lengths of the other stages are guesses.',
      startNote: 'The simulation starts from a pinch of dust-fine orchid seeds sown on sterile medium.',
    },
  },
};
