import type { FlowerData } from '../types';

export const zinnia: FlowerData = {
  id: 'zinnia',
  slugs: { vi: 'hoa-cuc-zinnia', en: 'zinnia' },
  scientificName: 'Zinnia elegans',
  scientificAliases: ['Zinnia', 'Zinnia violacea', 'common zinnia', 'youth-and-age'],
  family: 'Asteraceae',
  group: 'annual',
  colors: ['pink', 'red', 'orange', 'yellow', 'white', 'purple'],
  bloomSeasons: ['summer', 'autumn'],
  daysToBloom: [60, 90],
  speedBand: 'fast',
  startMaterial: 'seed',
  confidence: 'low',
  featured: false,
  stages: [
    { id: 'seed', days: [1, 3] },
    { id: 'germination', days: [4, 14] },
    { id: 'seedling', days: [14, 21] },
    { id: 'vegetative', days: [21, 28] },
    { id: 'bud-formation', days: [5, 10] },
    { id: 'bud-development', days: [7, 12] },
    { id: 'blooming', days: [2, 4] },
    { id: 'full-bloom', days: [45, 75] },
    { id: 'wilting', days: [14, 30] },
  ],
  visual: {
    archetype: 'zinnia',
    palette: {
      petal: '#ec6a8a',
      petalDeep: '#c23560',
      petalTip: '#f7aabd',
      center: '#d99a1a',
      centerDeep: '#8a5a0a',
      leaf: '#4f8a3e',
      leafDeep: '#2f6234',
      stem: '#58803c',
    },
  },
  related: ['dahlia', 'marigold', 'cosmos', 'sunflower'],
  sources: [
    {
      title: 'Zinnia elegans',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Zinnia_elegans',
      supports:
        'Annual in the family Asteraceae native to Mexico, first collected in 1789 at Tixtla, Guerrero, described by Cavanilles (1791) and Jacquin (1792), genus named by Linnaeus after Johann Gottfried Zinn, flower head sizes up to 15 cm, colour range, pom-pom forms that resemble dahlias, height from under 15 cm to 90 cm, powdery mildew.',
    },
    {
      title: 'Zinnia — RHS Plant Guide',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/zinnia',
      supports:
        'Tender annuals at their best in the latter half of summer, single or double flowers, single zinnias look like daisies while giant doubles are dahlia-like, love sun and warmth with well-drained soil, slugs at seedling stage, pollinators visiting single flowers, deadheading, hollow stems and long vase life.',
    },
    {
      title: 'How to grow zinnia — RHS Growing Guide',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/zinnia/growing-guide',
      supports:
        'Half-hardy annuals native to Mexico and south-western USA, bristly opposite leaves, flowers carried singly on upright stems, sowing indoors at 20 °C in late April–early May, flowering around 12 weeks after sowing, spacing of 30–40 cm, planting out after frost, pinching out, watering without wetting the foliage.',
    },
    {
      title: 'Zinnia elegans (Common Zinnia, Zinnia) — Plant Toolbox',
      publisher: 'NC State Extension',
      url: 'https://plants.ces.ncsu.edu/plants/zinnia-elegans/',
      supports:
        'Erect annual of Mexican origin, full sun, loam with good drainage, propagation by seed sown after the last frost, opposite sessile clasping leaves, bloom in summer and fall, susceptibility to powdery mildew and leaf spots, air circulation, pollinators.',
    },
    {
      title: 'Zinnia',
      publisher: 'University of Illinois Extension',
      url: 'https://extension.illinois.edu/flowers/zinnia',
      supports: 'Full sun, moist well-drained soil, bloom size 1–4 inches, height 8–36 inches, bloom May to September, tender annual, deadheading for continuous bloom.',
    },
    {
      title: 'Planting and Growing Zinnias for Bold Blooms All Season',
      publisher: 'The Old Farmer’s Almanac',
      url: 'https://www.almanac.com/plant/zinnias',
      supports: 'Germination in 4 to 7 days in warm soil of about 70 °F, direct sowing once soil has warmed after the last frost, more cutting giving more branching and buds, vase life of 7 to 10 days.',
    },
    {
      title: 'How to Grow Zinnias in Containers',
      publisher: 'Gardener’s Path',
      url: 'https://gardenerspath.com/plants/flowers/grow-zinnias/',
      supports: 'Warm soil of 70–80 °F for germination, seedlings showing in 7 to 21 days, heat tolerance, avoiding wet foliage to limit powdery mildew.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa cúc zinnia',
      aliases: ['zinnia', 'cúc zinnia', 'cúc lá nhám', 'youth-and-age'],
      tagline: 'Những bông hoa nhiều lớp cánh rực rỡ như nhung, nở dày đặc trên thân thẳng chỉ khoảng ba tháng sau một hạt giống.',
      metaDescription:
        'Xem hoa cúc zinnia lớn lên từ hạt đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách trồng và những điều thú vị.',
      intro: [
        'Hoa cúc zinnia (Zinnia elegans) là cây thân thảo một năm thuộc họ Cúc, có nguồn gốc từ Mexico và được trồng làm cảnh ở nhiều nơi. Cây mọc thẳng, phân cành, lá mọc đối, ráp và có lông cứng; chiều cao từ dưới 15 cm ở giống lùn đến khoảng 90 cm ở giống cao.',
        'Mỗi “bông” thật ra là một cụm hoa. Dạng đơn trông giống hoa cúc với tâm mở, còn dạng kép lớn nhiều lớp cánh gần giống hoa thược dược. Màu sắc trải từ trắng, kem, hồng, đỏ, tím đến vàng, cam, thậm chí xanh lục. Cây ưa nắng, ưa nóng, nên rất hợp làm hoa bồn, hoa chậu và hoa cắt cành.',
      ],
      stages: {
        seed: {
          description:
            'Hạt zinnia là quả bế dẹt, hình nêm, màu nâu nhạt. Hạt nằm chờ trong đất cho đến khi hết nguy cơ sương giá và đất đã ấm; cây không chịu được lạnh nên phải gieo vào mùa xuân, không gieo vào mùa thu.',
        },
        germination: {
          description:
            'Hạt hút nước, rễ mầm chui ra rồi chồi non nhú lên. Trong đất ấm khoảng 21°C (70°F) hạt có thể nảy mầm sau 4–7 ngày; nguồn khác nêu 7–21 ngày nếu đất kém ấm hơn. Nên giữ đất hơi ẩm cho đến khi cây con xuất hiện.',
        },
        seedling: {
          description:
            'Cặp lá mầm xòe ra, kế đến là các lá thật mọc đối nhau, nhám và có lông cứng. RHS lưu ý ốc sên rất thích cây con zinnia. Nếu gieo trong khay, cây được chuyển sang chậu nhỏ và làm quen dần với ngoài trời trước khi trồng ra vườn.',
        },
        vegetative: {
          description:
            'Thân thẳng vươn lên, lá xanh ráp mọc đối và cây phân cành. Khi trồng thành khối, khoảng cách khoảng 30–40 cm là phổ biến. Bấm ngọn có thể làm cây ra nhiều cành hơn và về lâu dài cho nhiều hoa hơn, dù đôi khi phải bỏ bông đầu tiên.',
        },
        'bud-formation': {
          description:
            'Ở đầu thân và các cành xuất hiện nụ nhỏ được bao bởi các lá bắc xếp chồng như vảy. Cây chuyển từ lớn thân lá sang chuẩn bị ra hoa.',
        },
        'bud-development': {
          description:
            'Nụ phồng dần, các lá bắc hé ra để lộ màu của những cánh hoa còn xếp khít bên trong. Thân hoa rỗng nên khá dễ gãy khi gió mạnh hoặc khi cắt không cẩn thận.',
        },
        blooming: {
          description:
            'Các lớp cánh ngoài cùng bung ra trước, rồi lần lượt tới các lớp bên trong. Ở dạng đơn, hoa tia xòe quanh đĩa tâm mở thu hút ong bướm; ở dạng kép, tâm gần như được che kín bởi các cánh nhỏ.',
        },
        'full-bloom': {
          description:
            'Cây phủ đầy hoa nhiều lớp cánh rực rỡ, cực thịnh vào nửa sau mùa hè. Cắt bỏ hoa tàn (tỉa hoa) và cắt hoa cắm bình giúp cây ra hoa liên tục; hoa cắm bình thường bền khoảng 7–10 ngày.',
        },
        wilting: {
          name: 'Hoa tàn, kết hạt',
          description:
            'Cánh hoa dần héo khô, phần tâm khô lại thành đầu hạt chứa những hạt dẹt. Cây một năm này kết thúc vòng đời trong một mùa; gặp lạnh và sương giá, cây tàn hẳn.',
        },
      },
      care: {
        light: 'Nắng trực tiếp; zinnia ưa nắng và ấm, tránh chỗ râm.',
        water:
          'Tưới đủ ẩm, đặc biệt khi trời nóng khô, nhưng cố gắng không làm ướt lá để hạn chế nấm bệnh. Đất cần thoát nước tốt.',
        soil:
          'Đất tơi, giàu mùn và thoát nước tốt (đất thịt pha là hợp). Độ pH không quá quan trọng; tránh đất nặng, ướt và lạnh.',
        temperature:
          'Ưa nóng. Gieo sau khi hết nguy cơ sương giá, đất ấm khoảng 21–27°C (70–80°F) để nảy mầm tốt. Cây không chịu lạnh.',
        extra:
          'Trồng thoáng, cách nhau khoảng 30–40 cm để có gió lưu thông; bệnh phấn trắng và đốm lá hay gặp ở nơi ẩm hoặc râm. Có thể chọn giống kháng bệnh như nhóm Profusion. Tỉa hoa tàn đều đặn.',
      },
      facts: [
        'Chi Zinnia do Linnaeus đặt theo tên nhà thực vật học người Đức Johann Gottfried Zinn.',
        'Loài này được Sessé và Mociño thu thập lần đầu năm 1789 tại Tixtla, bang Guerrero (Mexico); dạng hoang dã chỉ cao chừng 15 cm với hoa đơn màu tím, rất khác các giống vườn ngày nay.',
        'Có giống hoa khổng lồ đường kính tới 15 cm, giống lùn dưới 15 cm và giống cao khoảng 90 cm; một số giống có dạng pom-pom giống thược dược.',
        'Hoa zinnia đơn với tâm mở rất hấp dẫn côn trùng thụ phấn.',
        'Thân hoa rỗng và dễ dập, có lẽ đó là lý do hoa ít thấy bán ở cửa hàng dù cắm bình khá lâu tàn.',
      ],
      keywords: [
        'hoa cúc zinnia',
        'quá trình phát triển của hoa zinnia',
        'các giai đoạn phát triển của hoa zinnia',
        'vòng đời hoa zinnia',
        'time-lapse hoa zinnia',
        'cách trồng hoa zinnia từ hạt',
        'hoa zinnia nở sau bao lâu',
      ],
      altText:
        'Minh họa hoa cúc zinnia với thân thẳng phân cành, lá xanh rộng mọc đối và những bông hoa kép nhiều lớp cánh màu hồng đậm, cây lớn lên từ một hạt dẹt trong đất.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính thô. RHS cho biết cây ra hoa khoảng 12 tuần sau khi gieo và các nguồn nêu hạt nảy mầm sau khoảng 4–21 ngày; độ dài từng giai đoạn còn lại và thời gian nở rộ là suy đoán, phụ thuộc giống, nhiệt độ, nắng và việc tỉa hoa tàn.',
      startNote: 'Mô phỏng bắt đầu từ một hạt dẹt gieo vào đất ấm, sau khi hết nguy cơ sương giá.',
    },
    en: {
      name: 'Zinnia',
      aliases: ['common zinnia', 'elegant zinnia', 'youth-and-age'],
      tagline: 'Velvety, many-layered blooms packed along upright stems, only about three months after a single seed.',
      metaDescription:
        'Watch a zinnia grow from seed to full bloom in an interactive time-lapse: growth stages, estimated timing, growing tips and surprising plant facts.',
      intro: [
        'Zinnia (Zinnia elegans) is an annual herb in the daisy family, native to Mexico and grown as an ornamental in many places. It is upright and branching, with opposite, rough, bristly leaves, and stands from under 15 cm in dwarf forms to around 90 cm in tall ones.',
        'Each “flower” is really a flower head. Singles look like daisies with an open centre, while the big layered doubles are close to dahlias. Colours run from white, cream, pink, red and purple to yellow, orange and even green. It loves sun and heat, which makes it a favourite for beds, containers and cut flowers.',
      ],
      stages: {
        seed: {
          description:
            'A zinnia “seed” is a flat, wedge-shaped, pale brown fruit (an achene). It waits in the soil until the danger of frost has passed and the ground has warmed; the plant will not tolerate cold, so it is sown in spring, never autumn.',
        },
        germination: {
          description:
            'The seed takes up water, a root pushes out and the shoot lifts into the light. In warm soil of about 21 °C (70 °F) germination can take 4–7 days; another source gives 7–21 days in cooler soil. Keep the soil lightly moist until seedlings show.',
        },
        seedling: {
          description:
            'Two seed leaves open, followed by true leaves in opposite pairs, rough and bristly. The RHS notes that slugs love zinnia seedlings. Seed sown in trays is moved to small pots and hardened off before it goes out in the garden.',
        },
        vegetative: {
          description:
            'The upright stem climbs, rough green leaves pair up along it, and the plant branches. In a block, spacing of about 30–40 cm is typical. Pinching out can give a bushier plant that bears more flowers in the long run, even if it costs the first bloom.',
        },
        'bud-formation': {
          description:
            'Small buds appear at the tips of the stem and branches, wrapped in overlapping, scale-like bracts. The plant is switching from building stem and leaves to preparing to flower.',
        },
        'bud-development': {
          description:
            'The buds swell and the bracts part to show the colour of petals still packed tightly inside. The stems are hollow, so they can snap in strong wind or be damaged when cut carelessly.',
        },
        blooming: {
          description:
            'The outermost layers of petals open first, then the inner layers in turn. On single forms the ray florets spread around an open centre that draws bees and butterflies; on doubles the centre is almost hidden by small petals.',
        },
        'full-bloom': {
          description:
            'The plant is covered in bright, many-layered flower heads, at their best in the second half of summer. Deadheading and cutting blooms for the vase keep it flowering; cut stems typically last 7–10 days in water.',
        },
        wilting: {
          name: 'Wilting and seed set',
          description:
            'Petals dry and fade, and the centre becomes a seed head holding flat seeds. This annual finishes its life within one season; cold and frost end it for good.',
        },
      },
      care: {
        light: 'Full sun; zinnias love sunshine and warmth and dislike shade.',
        water:
          'Keep well watered, especially in hot dry weather, but try not to wet the foliage, which encourages fungal disease. Good drainage is essential.',
        soil:
          'Loose, humus-rich, well-drained soil (loam suits it). pH is not critical; avoid heavy, wet, cold soils.',
        temperature:
          'A heat lover. Sow once frost has passed, with soil at about 21–27 °C (70–80 °F) for good germination. Plants do not tolerate cold.',
        extra:
          'Space plants about 30–40 cm (1–1.5 ft) apart for air circulation; powdery mildew and leaf spots are common in damp or shaded spots. Disease-resistant types such as the Profusion Series help. Deadhead regularly.',
      },
      facts: [
        'The genus Zinnia was named by Linnaeus after the German botanist Johann Gottfried Zinn.',
        'The species was first collected in 1789 at Tixtla, Guerrero, Mexico, by Sessé and Mociño; the uncultivated plant is only about 15 cm tall with single purple flowers, very unlike today’s garden forms.',
        'Giant cultivars have heads up to 15 cm across, dwarfs stay under 15 cm and tall ones reach about 90 cm; some have pom-pom forms that resemble dahlias.',
        'Single-flowered zinnias with open centres are very attractive to pollinating insects.',
        'The stems are hollow and easily damaged, probably why zinnias are rarely sold in shops even though they have a long vase life.',
      ],
      keywords: [
        'zinnia growth stages',
        'zinnia flower life cycle',
        'time-lapse zinnia growth',
        'how zinnia grow from seed',
        'how long does zinnia take to bloom',
        'how to grow zinnia',
      ],
      altText:
        'Illustration of a zinnia plant with an upright branching stem, broad opposite green leaves and deep pink many-layered double flowers, growing from a flat seed in the soil.',
      timeNote:
        'Timings are rough estimates. The RHS says plants flower around 12 weeks after sowing and sources give about 4–21 days to germinate; the lengths of the other stages and of full bloom are guesses that depend on cultivar, temperature, sun and deadheading.',
      startNote: 'The simulation starts from a single flat seed sown in warm soil after the last frost.',
    },
  },
};
