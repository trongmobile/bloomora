import type { FlowerData } from '../types';

export const narcissus: FlowerData = {
  id: 'narcissus',
  slugs: { vi: 'hoa-thuy-tien', en: 'chinese-narcissus' },
  scientificName: 'Narcissus tazetta',
  scientificAliases: ['Narcissus tazetta subsp. chinensis', 'Narcissus tazetta var. chinensis', 'Chinese sacred lily', 'daffodil'],
  family: 'Amaryllidaceae',
  group: 'bulb',
  colors: ['white', 'yellow'],
  bloomSeasons: ['winter', 'spring'],
  daysToBloom: [28, 45],
  speedBand: 'fast',
  startMaterial: 'bulb',
  confidence: 'low',
  featured: false,
  stages: [
    { id: 'seed', days: [1, 7] },
    { id: 'germination', days: [3, 5] },
    { id: 'seedling', days: [7, 8] },
    { id: 'vegetative', days: [7, 14] },
    { id: 'bud-formation', days: [3, 4] },
    { id: 'bud-development', days: [4, 6] },
    { id: 'blooming', days: [2, 3] },
    { id: 'full-bloom', days: [10, 14] },
    { id: 'wilting', days: [7, 14] },
  ],
  visual: {
    archetype: 'narcissus',
    palette: {
      petal: '#fbfaf3',
      petalDeep: '#c9c19a',
      petalTip: '#ffffff',
      center: '#f1c232',
      centerDeep: '#c27a0a',
      leaf: '#6aa070',
      leafDeep: '#356a4a',
      stem: '#6aa070',
    },
  },
  related: ['tulip', 'lavender', 'marigold'],
  sources: [
    {
      title: 'Relict Gold: The Long Journey of the Chinese Narcissus',
      publisher: 'Pacific Horticulture Society',
      url: 'https://pacifichorticulture.org/articles/relict-gold-the-long-journey-of-the-chinese-narcissus/',
      supports: 'History of the Chinese narcissus, its cultivation in water bowls and its association with Lunar New Year because it flowers early in southern China.',
    },
    {
      title: 'The little bulb that conquered China',
      publisher: 'Laidback Gardener',
      url: 'https://laidbackgardener.blog/2017/11/08/the-little-bulb-that-conquered-china/',
      supports: 'Narcissus tazetta subsp. chinensis is a daffodil, not a lily; bulbs grown in shallow bowls of pebbles and water for Chinese New Year; growers must time the bulbs to the variable date of the holiday.',
    },
    {
      title: 'Guide to Getting Narcissus to Bloom on Time for Chinese New Year',
      publisher: 'Bloom and Song',
      url: 'https://bloomandsong.com/hong-kong-wedding-flowers/guide-to-getting-narcissus-to-bloom-on-time-for-chinese-new-year',
      supports: 'Narcissus bulbs typically take about four to six weeks to bloom after planting, and later potting blooms faster.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa thủy tiên',
      aliases: ['thủy tiên', 'thủy tiên trắng', 'thủy tiên Tết', 'narcissus'],
      tagline: 'Củ nhỏ ngâm trong nước nở thành chùm hoa trắng thơm, được người chơi tính ngày để nở đúng Tết.',
      metaDescription:
        'Xem hoa thủy tiên lớn lên từ củ đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách chơi thủy tiên Tết và những điều thú vị.',
      intro: [
        'Hoa thủy tiên (Narcissus tazetta) thuộc họ Loa kèn đỏ (Amaryllidaceae), không phải họ Loa kèn như tên “lily” trong tiếng Anh dễ gây hiểu nhầm. Cây mọc từ củ, lá dẹt xanh dài, hoa trắng có chén vàng ở giữa và thơm nồng.',
        'Dạng thủy tiên Trung Hoa nổi tiếng vì được trồng trong bát nước đặt sỏi và gắn với Tết âm lịch ở Đông Á; nhiều gia đình Việt cũng chơi thủy tiên dịp Tết. Củ thường nở sau khoảng bốn đến sáu tuần kể từ lúc đặt vào nước, nên người chơi phải tính ngày để hoa nở đúng Tết.',
      ],
      stages: {
        seed: {
          name: 'Củ giống',
          description:
            'Thủy tiên bắt đầu từ một củ khô. Người chơi gọt, rửa củ và đặt vào bát nước với sỏi, củ nằm chờ vài ngày trước khi rễ xuất hiện.',
        },
        vegetative: {
          description:
            'Lá dẹt xanh lục mọc thành bó từ đỉnh củ, mọc dài ra và hơi cong. Củ đã chứa sẵn chất dự trữ nên cây lớn rất nhanh.',
        },
        'bud-formation': {
          description:
            'Một cuống hoa nhú giữa các lá, đầu cuống là lớp vỏ mỏng như giấy bọc chặt cụm nụ.',
        },
        'bud-development': {
          description:
            'Lớp vỏ giấy nứt ra và cụm nụ phồng lên. Người chơi chỉnh nhiệt độ và ánh sáng để hoa nở đúng ngày Tết.',
        },
        'full-bloom': {
          description:
            'Chùm hoa nở rộ, mỗi hoa có sáu cánh trắng và chén vàng ở giữa, tỏa mùi thơm nồng.',
        },
        wilting: {
          description:
            'Hoa tàn dần, cánh héo thành màu nâu giấy; củ dùng hết dự trữ nên chỉ nên giữ lại để trồng đất nếu còn khỏe.',
        },
      },
      care: {
        light: 'Ánh sáng sáng, tránh nắng gắt; thiếu sáng làm cây vươn dài, ngả.',
        water: 'Giữ mực nước ngang đáy củ, không ngập cả củ để tránh thối.',
        soil: 'Thường trồng trong bát có sỏi và nước, không cần đất.',
        temperature: 'Hợp mát vừa; nóng làm hoa nở sớm, lạnh làm nở chậm.',
        extra: 'Thời gian từ lúc đặt củ tới lúc nở khoảng bốn đến sáu tuần; trồng càng muộn trong mùa thì nở càng nhanh.',
      },
      facts: [
        'Thủy tiên không phải là loài loa kèn mà là một loại thủy tiên vàng (daffodil) trong họ Loa kèn đỏ.',
        'Nguồn gốc dạng thủy tiên Trung Hoa được đưa vào Trung Quốc từ trước thời nhà Tống (960–1279).',
        'Thủy tiên được trồng trong bát nước đặt sỏi để chơi Tết âm lịch.',
        'Củ thường nở sau khoảng bốn đến sáu tuần từ lúc đặt vào nước.',
      ],
      keywords: [
        'hoa thủy tiên',
        'quá trình phát triển của hoa thủy tiên',
        'các giai đoạn phát triển của hoa thủy tiên',
        'vòng đời hoa thủy tiên',
        'time-lapse hoa thủy tiên',
        'cách chơi thủy tiên Tết',
        'hoa thủy tiên nở sau bao lâu',
      ],
      altText:
        'Minh họa cây thủy tiên với bó lá dẹt xanh dài mọc từ củ nâu, một cuống hoa mang chùm hoa trắng sáu cánh có chén vàng ở giữa.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính thô. Nguồn cho biết củ thường nở sau khoảng bốn đến sáu tuần; độ dài từng giai đoạn là suy đoán, phụ thuộc củ, nhiệt độ và ánh sáng.',
      startNote: 'Mô phỏng bắt đầu từ một củ thủy tiên khô đặt trong đất ẩm hoặc bát sỏi.',
    },
    en: {
      name: 'Chinese narcissus',
      aliases: ['Chinese sacred lily', 'thủy tiên', 'Narcissus tazetta', 'paperwhite'],
      tagline: 'A small bulb in a bowl of water that grows into fragrant white flowers, timed to open at Tết.',
      metaDescription:
        'Watch a Chinese narcissus grow from bulb to full bloom in an interactive time-lapse: growth stages, estimated timing, how to time it for Tết and plant facts.',
      intro: [
        'Chinese narcissus (Narcissus tazetta) is in the family Amaryllidaceae. Despite the name “Chinese sacred lily” it is a daffodil, not a lily. It grows from a bulb with long flat green leaves and fragrant white flowers with a yellow cup at the centre.',
        'The Chinese form is famous for being grown in a bowl of water and pebbles and for its link with Lunar New Year in East Asia; many Vietnamese families also keep narcissus at Tết. The bulb typically blooms about four to six weeks after it is set in water, so growers must time it to the date of the holiday.',
      ],
      stages: {
        seed: {
          name: 'Bulb',
          description:
            'The plant starts from a dry bulb. It is cleaned, set in a bowl of water and pebbles and waits a few days before roots appear.',
        },
        vegetative: {
          description:
            'Flat green leaves emerge in a bunch from the top of the bulb, lengthening and arching. The bulb already holds its food reserve, so growth is fast.',
        },
        'bud-formation': {
          description:
            'A flower stalk pushes up between the leaves, topped by a thin papery sheath that wraps the buds tightly.',
        },
        'bud-development': {
          description:
            'The sheath splits and the buds swell. Growers adjust temperature and light so the flowers open on the right day for Tết.',
        },
        'full-bloom': {
          description:
            'The cluster is fully open, each flower with six white petals and a yellow cup, and a strong sweet scent.',
        },
        wilting: {
          description:
            'The flowers fade and the petals turn papery brown; the bulb has used up its reserve and is best kept for planting in soil only if it is still healthy.',
        },
      },
      care: {
        light: 'Bright light, not harsh sun; too little light makes the plant stretch and flop.',
        water: 'Keep the water level at the base of the bulb, not covering it, to avoid rot.',
        soil: 'Usually grown in a bowl of pebbles and water, no soil needed.',
        temperature: 'Mild and cool; warmth hurries bloom while cold slows it.',
        extra: 'It takes about four to six weeks from setting the bulb in water to bloom; the later in the season it is set, the faster it blooms.',
      },
      facts: [
        'It is a daffodil in the Amaryllidaceae, not a lily.',
        'The ancestors of the Chinese form reached China before the Song dynasty (960–1279).',
        'It is grown in a bowl of water and pebbles for Lunar New Year.',
        'The bulb typically blooms four to six weeks after it is set in water.',
      ],
      keywords: [
        'Chinese narcissus growth stages',
        'Narcissus tazetta life cycle',
        'time-lapse narcissus',
        'how to time narcissus for Tết',
        'Chinese sacred lily care',
      ],
      altText:
        'Illustration of a Chinese narcissus with a bunch of long flat green leaves growing from a brown bulb and a flower stalk carrying a cluster of white six-petalled flowers with yellow cups.',
      timeNote:
        'Timings are rough estimates. A source says bulbs bloom about four to six weeks after planting; the length of each stage is a guess that depends on the bulb, temperature and light.',
      startNote: 'The simulation starts from a single dry bulb set in damp soil or a bowl of pebbles.',
    },
  },
};
