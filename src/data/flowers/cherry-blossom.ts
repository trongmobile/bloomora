import type { FlowerData } from '../types';

export const cherryBlossom: FlowerData = {
  id: 'cherry-blossom',
  slugs: { vi: 'hoa-anh-dao', en: 'cherry-blossom' },
  scientificName: 'Prunus serrulata',
  scientificAliases: ['Prunus x yedoensis', 'Prunus yedoensis', 'Prunus', 'sakura', 'Yoshino cherry', 'Japanese flowering cherry'],
  family: 'Rosaceae',
  group: 'shrub-tree',
  colors: ['pink', 'white'],
  bloomSeasons: ['spring'],
  daysToBloom: [3650, 7300],
  speedBand: 'slow',
  startMaterial: 'seed-or-cutting',
  confidence: 'low',
  featured: true,
  stages: [
    { id: 'seed', days: [90, 180] },
    { id: 'germination', days: [14, 60] },
    { id: 'seedling', days: [365, 730] },
    { id: 'vegetative', days: [3000, 6000] },
    { id: 'bud-formation', days: [60, 120] },
    { id: 'bud-development', days: [120, 200] },
    { id: 'blooming', days: [3, 7] },
    { id: 'full-bloom', days: [3, 7] },
    { id: 'wilting', days: [60, 120] },
  ],
  visual: {
    archetype: 'sakura',
    palette: {
      petal: '#fbd3df',
      petalDeep: '#ef93b0',
      petalTip: '#fff0f4',
      center: '#c4456b',
      centerDeep: '#a02a52',
      leaf: '#6aa84f',
      leafDeep: '#3a7a3a',
      stem: '#4d3b34',
    },
  },
  related: ['rose', 'tulip', 'lotus'],
  sources: [
    {
      title: 'Prunus serrulata — accepted name and native range',
      publisher: 'Kew — Plants of the World Online',
      url: 'https://powo.science.kew.org/taxon/730268-1',
      supports: 'Accepted name, family Rosaceae, native from eastern and southern China to northern Korea, tree.',
    },
    {
      title: 'Prunus × yedoensis',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Prunus_%C3%97_yedoensis',
      supports: 'Hybrid origin in Japan, height, drupe, genome study, Washington DC gift of 1912.',
    },
    {
      title: 'Prunus serrulata',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Prunus_serrulata',
      supports: 'Native range, cultivated forms rarely bear fruit, ‘Fugenzo’.',
    },
    {
      title: 'Cherry blossom',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Cherry_blossom',
      supports: 'Bloom season, Yoshino flowers usually last within a week, hanami history, Kyoto bloom trend.',
    },
    {
      title: 'Bloom Watch',
      publisher: 'U.S. National Park Service',
      url: 'https://www.nps.gov/featurecontent/cherryblossom/bloom-watch.html',
      supports: 'Definition of peak bloom, blossoms last several days, effect of weather on bloom date.',
    },
    {
      title: 'Prunus serrulata (d) — details',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/14026/prunus-serrulata-d/details',
      supports: 'Height and spread, time to maturity of 10–20 years, mid-to-late spring flowers, hardiness, care and pests.',
    },
    {
      title: 'Cherry blossom forecast',
      publisher: 'Japan National Tourism Organization',
      url: 'https://www.japan.travel/en/see-and-do/cherry-blossom-forecast/',
      supports: 'Sakura season from late March to early May across Japan.',
    },
    {
      title: 'Dormant flower buds actively accumulate starch over winter in sweet cherry',
      publisher: 'Frontiers in Plant Science',
      url: 'https://frontiersin.org/journals/plant-science/articles/10.3389/fpls.2018.00171/full',
      supports: 'Flower initiation in the previous summer and winter chilling — studied in sweet cherry (Prunus avium), used here only as a genus-level proxy.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa anh đào',
      aliases: ['anh đào', 'sakura', 'hoa anh đào Nhật Bản', 'anh đào Yoshino'],
      tagline: 'Chỉ nở trong vài ngày, nhưng nụ đã thành hình từ mùa hè năm trước.',
      metaDescription:
        'Time-lapse hoa anh đào (sakura): từ hạt đến cây trưởng thành, nụ ngủ đông, nở rộ trong vài ngày và quả nhỏ. Thời gian ước tính và những điều cần biết.',
      intro: [
        'Hoa anh đào cảnh là các loài và giống thuộc chi Prunus, họ Hoa hồng (Rosaceae). Theo Kew, Prunus serrulata có vùng bản địa từ miền đông và nam Trung Quốc đến bắc Triều Tiên; giống Somei-yoshino nổi tiếng ở Nhật là một cây lai (Prunus × yedoensis) có nguồn gốc ở Nhật Bản.',
        'Khác với cây hoa hằng năm, anh đào là cây thân gỗ. RHS cho biết cây Prunus serrulata cần khoảng 10–20 năm để trưởng thành. Mô phỏng này nén cả vòng đời từ hạt đến một cây ra hoa vào một đoạn ngắn; trong thực tế, các giống cảnh thường được nhân bằng ghép, và các mốc dưới đây chỉ là ước tính rất rộng.',
      ],
      stages: {
        seed: {
          name: 'Hạt trong quả',
          description:
            'Quả anh đào là quả hạch nhỏ có một hạt cứng, được chim ăn và phát tán. RHS cho biết hạt có thể gieo ngoài trời vào mùa thu để trải qua mùa đông lạnh. Các giống cảnh trồng ở châu Âu và Bắc Mỹ hiếm khi đậu quả.',
        },
        germination: {
          description:
            'Sau mùa đông, mầm nhú ra khỏi hạt vào đầu xuân. Rễ cọc đầu tiên đâm xuống đất, thân non mọc thẳng lên.',
        },
        seedling: {
          description:
            'Cây con là một thân mảnh với vài lá có răng cưa. Trong những năm đầu cây tập trung phát triển rễ và thân, chưa ra hoa.',
        },
        vegetative: {
          description:
            'Giai đoạn kéo dài nhiều năm: thân hóa gỗ, tán lan rộng. RHS cho biết cây P. serrulata có thể cao 8–12 m và rộng hơn 8 m khi trưởng thành. Hãy thử xem mô phỏng ở tốc độ cao để thấy cây lớn lên.',
        },
        'bud-formation': {
          description:
            'Ở anh đào, nụ hoa của mùa xuân sau thành hình từ cuối mùa hè năm trước. Nguồn chúng tôi tìm được cho điều này chỉ nghiên cứu anh đào ăn quả (Prunus avium) — hãy xem đây là suy luận ở cấp chi, chưa được kiểm chứng riêng cho anh đào cảnh.',
        },
        'bud-development': {
          description:
            'Nụ ngủ đông qua mùa lạnh rồi bắt đầu phát triển khi trời ấm lên. Nghiên cứu trên anh đào ăn quả cho thấy nụ cần tích lũy đủ giờ lạnh mới nở đúng cách. Thời tiết ấm hay lạnh bất thường sẽ làm ngày nở thay đổi.',
        },
        blooming: {
          description:
            'Nụ hé mở và hoa bung ra. Giống Yoshino thường nở trước khi lá mọc, còn P. serrulata nở cùng lúc với lá non. Mùa hoa ở Nhật kéo dài từ cuối tháng 3 đến đầu tháng 5 tùy vùng (JNTO).',
        },
        'full-bloom': {
          description:
            'Cả tán cây phủ kín hoa. Cơ quan Công viên Quốc gia Hoa Kỳ định nghĩa nở rộ là khi khoảng 70% hoa đã nở; hoa chỉ giữ được vài ngày, lâu hơn nếu trời mát, lặng gió và ngắn đi nếu gặp mưa hoặc gió mạnh.',
        },
        wilting: {
          name: 'Hoa rụng, quả nhỏ',
          description:
            'Cánh hoa rụng như mưa, lá non phủ kín tán cây. Nếu có quả, quả là những quả hạch nhỏ đường kính khoảng 8–10 mm, chín đỏ đến đen vào cuối mùa hè.',
        },
      },
      care: {
        light: 'Nắng đầy đủ; thiếu nắng, cây ra ít hoa hơn (RHS, Utah State).',
        water: 'Đất ẩm, thoát nước tốt; cây nhạy cảm với hạn và úng.',
        soil: 'Đất thoát nước tốt; tránh nơi đọng nước.',
        temperature: 'Chịu lạnh tốt (RHS xếp hạng H6, khoảng −20 đến −15°C). Cần mùa đông lạnh để ra hoa.',
        extra:
          'Cắt tỉa vào mùa hè để giảm nguy cơ bệnh lá bạc (silver leaf); chú ý các bệnh như xoăn lá đào, loét vi khuẩn và héo hoa (RHS).',
      },
      facts: [
        'Hanami — ngắm hoa dưới tán anh đào — bắt đầu từ thời Nara với hoa mơ; đến thời Heian, hoa anh đào đã trở thành tâm điểm.',
        'Bộ gen của Somei-yoshino được giải mã năm 2019, xác nhận nguồn gốc lai tạo cách đây hơn 100 năm.',
        'Ngày nở rộ trung bình ở Kyoto đã dịch sớm lên từ khoảng 17/4 vào thập niên 1850 xuống khoảng 5/4 vào thập niên 2020.',
        'Giống ‘Fugenzo’ được đặt tên theo hai nhụy lá của nó, được ví như ngà của một con voi trắng.',
      ],
      keywords: [
        'hoa anh đào',
        'quá trình phát triển của hoa anh đào',
        'vòng đời của hoa anh đào',
        'các giai đoạn phát triển của hoa anh đào',
        'hoa anh đào nở khi nào',
        'time-lapse hoa anh đào sakura',
      ],
      altText:
        'Minh họa một cây anh đào với thân nâu, cành lan rộng và tán phủ đầy hoa năm cánh màu hồng nhạt, lớn lên từ một hạt trong đất.',
      timeNote:
        'RHS cho biết cây anh đào cảnh cần khoảng 10–20 năm để trưởng thành. Các giai đoạn khác, như thời điểm nụ hình thành, chỉ được ước tính từ nghiên cứu ở anh đào ăn quả. Hãy xem đây là minh họa độ tin cậy thấp.',
      startNote:
        'Mô phỏng bắt đầu từ một hạt; trong thực tế, các giống anh đào cảnh thường được nhân bằng ghép hoặc giâm cành.',
    },
    en: {
      name: 'Cherry blossom',
      aliases: ['sakura', 'Yoshino cherry', 'Japanese flowering cherry', 'ornamental cherry'],
      tagline: 'It blooms for only a few days, but the buds were formed the summer before.',
      metaDescription:
        'Cherry blossom (sakura) time-lapse: from seed to mature tree, winter-dormant buds, a few days of full bloom, and small fruit. Estimated timing and what to know.',
      intro: [
        'Ornamental cherries are species and cultivars of the genus Prunus in the rose family (Rosaceae). According to Kew, Prunus serrulata is native from eastern and southern China to northern Korea; the famous Somei-yoshino of Japan is a hybrid (Prunus × yedoensis) that originated in Japan.',
        'Unlike a bedding flower, a cherry is a woody tree. The RHS gives about 10–20 years for Prunus serrulata to reach maturity. This simulation squeezes the whole life from seed to a flowering tree into a short clip; in practice ornamental cultivars are usually grafted, and the timings below are very wide estimates.',
      ],
      stages: {
        seed: {
          name: 'Seed in the fruit',
          description:
            'A cherry is a small drupe holding one hard seed, eaten and spread by birds. The RHS says seed can be sown outdoors in autumn so it goes through winter cold. Cultivated forms in Europe and North America rarely bear fruit.',
        },
        germination: {
          description:
            'After winter the seedling pushes out of the stone in early spring. The first taproot dives into the soil while the young stem rises.',
        },
        seedling: {
          description:
            'The young tree is a slender stem with a few toothed leaves. For the first years it puts its effort into roots and stem rather than flowers.',
        },
        vegetative: {
          description:
            'A phase lasting years: the stem turns woody and the crown spreads. The RHS gives a mature P. serrulata as 8–12 m tall and over 8 m wide. Try the simulation at high speed to watch the tree grow.',
        },
        'bud-formation': {
          description:
            'In cherries the flower buds for next spring form at the end of the previous summer. The source we found for this studied sweet cherry (Prunus avium) only — treat it as a genus-level inference, not verified for ornamental cherries.',
        },
        'bud-development': {
          description:
            'The buds overwinter dormant, then start growing as it warms. Research on sweet cherry shows buds need enough chilling to flower properly. Unusually warm or cold weather shifts the bloom date.',
        },
        blooming: {
          description:
            'The buds open and the flowers burst out. Yoshino cherries typically flower before the leaves come out, while P. serrulata flowers at the same time as the young leaves. Across Japan the season runs from late March to early May depending on the region (JNTO).',
        },
        'full-bloom': {
          description:
            'The whole crown is covered in flowers. The US National Park Service defines peak bloom as roughly 70% of blossoms open; the flowers last only several days, longer in cool, calm weather and shorter in rain or strong wind.',
        },
        wilting: {
          name: 'Petal fall and small fruit',
          description:
            'Petals rain down and young leaves fill out the crown. Where fruit forms, it is a small drupe about 8–10 mm across, ripening red to black by late summer.',
        },
      },
      care: {
        light: 'Full sun; with less sun the tree flowers less (RHS, Utah State).',
        water: 'Moist, free-draining soil; sensitive to both drought and waterlogging.',
        soil: 'Well-drained soil; avoid sites where water stands.',
        temperature: 'Very hardy (RHS rating H6, about −20 to −15 °C). Needs a cold winter to flower.',
        extra:
          'Prune in summer to reduce the risk of silver leaf; watch for peach leaf curl, bacterial canker and blossom wilt (RHS).',
      },
      facts: [
        'Hanami — feasting under blossoming trees — began in the Nara period with plum blossom; by the Heian period cherry had become the focus.',
        'The genome of Somei-yoshino was decoded in 2019, confirming its hybrid origin over 100 years ago.',
        'The average peak bloom date in Kyoto has moved from about April 17 in the 1850s to about April 5 in the 2020s.',
        'The cultivar ‘Fugenzo’ is named for its two leaf-like pistils, likened to the tusks of a white elephant.',
      ],
      keywords: [
        'cherry blossom growth stages',
        'cherry blossom life cycle',
        'time-lapse sakura',
        'when do cherry blossoms bloom',
        'how long do cherry blossoms last',
        'how to grow a cherry blossom tree',
      ],
      altText:
        'Illustration of a cherry tree with a brown trunk, spreading branches and a crown covered in five-petalled pale pink blossom, grown from a seed in the soil.',
      timeNote:
        'The RHS gives about 10–20 years for an ornamental cherry to reach maturity. Other milestones, such as when buds form, are only inferred from research on sweet cherry. Treat this as a low-confidence illustration.',
      startNote:
        'The simulation starts from a seed; in practice ornamental cherry cultivars are usually propagated by grafting or cuttings.',
    },
  },
};
