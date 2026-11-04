import type { FlowerData } from '../types';

export const mai: FlowerData = {
  id: 'mai',
  slugs: { vi: 'hoa-mai-vang', en: 'yellow-mai' },
  scientificName: 'Ochna integerrima',
  scientificAliases: ['Ochna', 'Ochna harmandii', 'mai flower', 'yellow mai', 'Vietnamese yellow apricot blossom'],
  family: 'Ochnaceae',
  group: 'shrub-tree',
  colors: ['yellow'],
  bloomSeasons: ['winter', 'spring'],
  daysToBloom: [850, 1500],
  speedBand: 'slow',
  startMaterial: 'seed-or-cutting',
  confidence: 'low',
  featured: false,
  isNew: true,
  stages: [
    { id: 'seed', days: [14, 30] },
    { id: 'germination', days: [14, 40] },
    { id: 'seedling', days: [180, 300] },
    { id: 'vegetative', days: [500, 900] },
    { id: 'bud-formation', days: [60, 100] },
    { id: 'bud-development', days: [60, 120] },
    { id: 'blooming', days: [3, 7] },
    { id: 'full-bloom', days: [10, 20] },
    { id: 'wilting', days: [40, 90] },
  ],
  visual: {
    archetype: 'mai',
    palette: {
      petal: '#f9d423',
      petalDeep: '#e5a50a',
      petalTip: '#fff3a0',
      center: '#b8651b',
      centerDeep: '#7a3a0a',
      leaf: '#5f9a3e',
      leafDeep: '#2f6a2a',
      stem: '#5a4636',
    },
  },
  related: ['peach-blossom', 'marigold', 'cherry-blossom'],
  sources: [
    {
      title: 'Ochna integerrima',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Ochna_integerrima',
      supports: 'Species in the family Ochnaceae, known in Vietnam as mai vàng, blooming profusely for Tết and widely bought in southern Vietnam; mai vàng has five petals while mai núi has five to nine.',
    },
    {
      title: 'Yellow Mai (Ochna integerrima)',
      publisher: 'Earthpedia',
      url: 'https://earthpedia.earth.com/plant-encyclopedia/angiosperms/ochnaceae/ochna-integerrima',
      supports: 'Plant-encyclopedia entry for Ochna integerrima, including the yellow flowers and ornamental fruit with shiny black seeds when it cracks open.',
    },
    {
      title: 'Mai vàng',
      publisher: 'Mytour',
      url: 'https://mytour.vn/vi/blog/bai-viet/mai-vang.html',
      supports: 'Vietnamese-language overview of mai vàng, its other names (hoàng mai, huỳnh mai, lão mai) and its role at Tết in the south.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa mai vàng',
      aliases: ['mai vàng', 'hoàng mai', 'huỳnh mai', 'mai Tết', 'hoa mai'],
      tagline: 'Cành mai vàng rực nở đúng sáng mùng Một: biểu tượng của Tết ở miền Nam và miền Trung.',
      metaDescription:
        'Xem hoa mai vàng lớn lên từ hạt đến lúc nở rộ dịp Tết qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách chăm và những điều thú vị.',
      intro: [
        'Hoa mai vàng (Ochna integerrima) là cây bụi hoặc cây gỗ nhỏ thuộc họ Mai (Ochnaceae). Ở Việt Nam, mai vàng thường có năm cánh, còn mai núi có từ năm đến chín cánh. Hoa nở rộ vào dịp Tết và được mua nhiều ở miền Nam.',
        'Ở miền Bắc, “hoa mai” thường chỉ một loài khác (Prunus mume) nên khi nói về mai vàng ngày Tết ta thường nhắc tới miền Nam và miền Trung. Các mốc thời gian dưới đây là ước tính thô cho một cây trồng từ hạt; trên thực tế cây mai chơi Tết thường là cây nhiều năm tuổi được nhà vườn chăm theo từng mùa.',
      ],
      stages: {
        seed: {
          description:
            'Quả mai chín có hạt đen bóng. Khi trồng, hạt được đặt vào đất ẩm và nảy mầm sau vài tuần ở khí hậu nóng.',
        },
        vegetative: {
          description:
            'Cây lên thân gỗ, phân cành và mang lá xanh bóng. Cây cần vài năm để ra hoa đều; người chơi mai thường tạo dáng thân và cành trong giai đoạn này.',
        },
        'bud-formation': {
          description:
            'Nụ hình thành trên cành và lớn dần. Người trồng chăm tưới và bón để cây dồn sức cho vụ Tết.',
        },
        'bud-development': {
          description:
            'Nhà vườn tuốt lá mai vào cuối năm âm lịch để cây bật chồi hoa và nở đúng Tết; ngày tuốt lá thay đổi theo thời tiết và giống.',
        },
        'full-bloom': {
          description:
            'Cây phủ đầy hoa vàng năm cánh tròn, nở rộ trong những ngày Tết.',
        },
        wilting: {
          name: 'Cánh rụng, kết quả',
          description:
            'Sau khi cánh hoa rụng, đài hoa còn lại thường chuyển sang đỏ và mang những quả hạch nhỏ màu đen; cây lại ra lá xanh.',
        },
      },
      care: {
        light: 'Nắng nhiều; cây thích chỗ thoáng và đầy nắng.',
        water: 'Tưới vừa phải, tránh úng nước; giảm tưới trước khi tuốt lá.',
        soil: 'Đất tơi xốp, thoát nước tốt, giàu mùn.',
        temperature: 'Ưa khí hậu ấm; hợp miền Nam và miền Trung Việt Nam.',
        extra: 'Tuốt lá vào cuối năm âm lịch rồi chăm tưới nhẹ; ngày tuốt lá phụ thuộc thời tiết và giống mai.',
      },
      facts: [
        'Mai vàng còn có tên gọi khác là hoàng mai, huỳnh mai hay lão mai.',
        'Mai vàng thường có năm cánh, còn mai núi có từ năm đến chín cánh.',
        'Ở miền Bắc, “hoa mai” thường chỉ loài Prunus mume, không phải mai vàng.',
        'Quả mai có hạt đen bóng lộ ra khi quả nứt.',
      ],
      keywords: [
        'hoa mai vàng',
        'quá trình phát triển của hoa mai',
        'các giai đoạn phát triển của hoa mai vàng',
        'vòng đời hoa mai',
        'time-lapse hoa mai vàng',
        'cách chăm mai Tết',
      ],
      altText:
        'Minh họa cây mai vàng với thân nâu, nhiều cành nhỏ phủ đầy hoa vàng năm cánh tròn, lớn lên từ một hạt nhỏ màu đen trong đất.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính thô, chưa có nguồn khoa học cho thời gian từ hạt đến hoa; độ dài các giai đoạn là suy đoán và rất khác nhau tùy giống, cây ghép hay cây hạt, và cách chăm sóc.',
      startNote: 'Mô phỏng bắt đầu từ một hạt mai nhỏ gieo vào đất ẩm.',
    },
    en: {
      name: 'Yellow mai',
      aliases: ['Ochna integerrima', 'mai vàng', 'Vietnamese yellow apricot blossom', 'mai flower'],
      tagline: 'A branch of golden flowers opening on the morning of Tết: the emblem of the new year in southern and central Vietnam.',
      metaDescription:
        'Watch a yellow mai tree grow from seed to Tết bloom in an interactive time-lapse: growth stages, estimated timing, growing tips and surprising plant facts.',
      intro: [
        'Yellow mai (Ochna integerrima) is a shrub or small tree in the family Ochnaceae. In Vietnam the yellow mai usually has five petals, while the mountain mai has five to nine. It flowers profusely at Tết and is widely bought in the south.',
        'In the north “mai” often refers to a different plant (Prunus mume), so the yellow mai of Tết is mostly a southern and central tradition. The timings below are rough estimates for a tree grown from seed; the mai that families keep at Tết are usually older trees that growers have tended season after season.',
      ],
      stages: {
        seed: {
          description:
            'The ripe fruit holds shiny black seeds. Sown in damp soil in warm weather, the seed germinates within a few weeks.',
        },
        vegetative: {
          description:
            'The plant builds a woody trunk, branches and carries glossy green leaves. It needs several years before it flowers well; growers shape the trunk and branches during this phase.',
        },
        'bud-formation': {
          description:
            'Buds form on the branches and swell. Growers water and feed to bring the tree into its best shape for Tết.',
        },
        'bud-development': {
          description:
            'Growers strip the leaves late in the lunar year so the tree pushes out flower buds and opens at Tết; the date shifts with the weather and variety.',
        },
        'full-bloom': {
          description:
            'The tree is covered in round, five-petalled yellow flowers, at their fullest through the days of Tết.',
        },
        wilting: {
          name: 'Petal fall and fruit',
          description:
            'After the petals drop, the remaining sepals often turn red and carry small black drupes; the tree puts out fresh green leaves.',
        },
      },
      care: {
        light: 'Plenty of sun; it likes an open, bright spot.',
        water: 'Water moderately and avoid waterlogging; ease off before stripping the leaves.',
        soil: 'Loose, humus-rich, well-drained soil.',
        temperature: 'Likes warm climates; suited to southern and central Vietnam.',
        extra: 'Strip leaves late in the lunar year, then water lightly; the date depends on the weather and the variety.',
      },
      facts: [
        'Yellow mai is also called hoàng mai, huỳnh mai or lão mai in Vietnamese.',
        'The yellow mai usually has five petals, while the mountain mai has five to nine.',
        'In northern Vietnam “mai” often refers to Prunus mume, not the yellow mai.',
        'The fruit shows shiny black seeds when it cracks open.',
      ],
      keywords: [
        'yellow mai growth stages',
        'yellow mai life cycle',
        'time-lapse mai flower',
        'Ochna integerrima growth',
        'Vietnamese Tết yellow apricot blossom',
      ],
      altText:
        'Illustration of a yellow mai tree with a brown trunk and many small branches covered in round five-petalled yellow flowers, growing from a small black seed in the soil.',
      timeNote:
        'Timings are rough estimates with no scientific source for seed-to-flower time; the length of each stage is a guess that varies with variety, grafting and care.',
      startNote: 'The simulation starts from a single small mai seed sown in damp soil.',
    },
  },
};
