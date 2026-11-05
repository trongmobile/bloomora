import type { FlowerData } from '../types';

export const peachBlossom: FlowerData = {
  id: 'peach-blossom',
  slugs: { vi: 'hoa-dao', en: 'peach-blossom' },
  scientificName: 'Prunus persica',
  scientificAliases: ['Amygdalus persica', 'peach', 'flowering peach', 'đào Nhật Tân'],
  family: 'Rosaceae',
  group: 'shrub-tree',
  colors: ['pink', 'red'],
  bloomSeasons: ['winter', 'spring'],
  daysToBloom: [1100, 2100],
  speedBand: 'slow',
  startMaterial: 'seed-or-cutting',
  confidence: 'low',
  featured: false,
  stages: [
    { id: 'seed', days: [60, 120] },
    { id: 'germination', days: [14, 40] },
    { id: 'seedling', days: [180, 365] },
    { id: 'vegetative', days: [700, 1200] },
    { id: 'bud-formation', days: [60, 120] },
    { id: 'bud-development', days: [90, 180] },
    { id: 'blooming', days: [3, 7] },
    { id: 'full-bloom', days: [7, 14] },
    { id: 'wilting', days: [60, 120] },
  ],
  visual: {
    archetype: 'peach',
    palette: {
      petal: '#f7a9bd',
      petalDeep: '#e0547e',
      petalTip: '#fde3ea',
      center: '#e9b44c',
      centerDeep: '#b8324f',
      leaf: '#6fa04a',
      leafDeep: '#3d7436',
      stem: '#4d3b34',
    },
  },
  related: ['cherry-blossom', 'mai', 'chrysanthemum'],
  sources: [
    {
      title: 'Peach',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Peach',
      supports: 'Prunus persica in the family Rosaceae, a deciduous tree whose fruit is a drupe with a single large stone, grown for fruit and for ornamental flowers.',
    },
    {
      title: 'Đào Nhật Tân sẵn sàng cho vụ Tết',
      publisher: 'Báo Nhân Dân',
      url: 'https://nhandan.vn/post-791771.html',
      supports: 'Growers at Nhật Tân strip the leaves about 40–50 days before Tết so the branches carry full buds that open on time.',
    },
    {
      title: 'Dân làng đào nổi tiếng Hà Nội tất bật tuốt lá trước Tết Nguyên đán',
      publisher: 'Nhà đầu tư',
      url: 'https://nhadautu.vn/dan-lang-dao-noi-tieng-ha-noi-tat-bat-tuot-la-truoc-tet-nguyen-dan-d72310.html',
      supports: 'Many Nhật Tân growers hire extra hands to strip leaves 30–45 days before Tết.',
    },
    {
      title: 'Hà Nội: Làng Nhật Tân tất bật tuốt lá đào để cây ra hoa đúng dịp Tết Nguyên đán 2023',
      publisher: 'Pháp luật TP.HCM',
      url: 'https://plo.vn/ha-noi-lang-nhat-tan-tat-bat-tuot-la-dao-de-cay-ra-hoa-dung-dip-tet-nguyen-dan-2023-post710652.html',
      supports: 'Leaf stripping is usually about 45 days before Tết, and some varieties need it as early as 90 days before; the date shifts with the weather.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa đào',
      aliases: ['đào', 'đào Nhật Tân', 'đào bích', 'hoa đào Tết'],
      tagline: 'Cành đào hồng nở đúng sáng mùng Một: một cái cây được người làm vườn canh từng tuần để rộ hoa vào Tết.',
      metaDescription:
        'Xem hoa đào lớn lên từ hạt đến lúc nở rộ dịp Tết qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách tuốt lá và những điều thú vị.',
      intro: [
        'Hoa đào (Prunus persica) là cây gỗ nhỏ rụng lá thuộc họ Hoa hồng. Quả đào là loại quả hạch có một hạt cứng, nhưng ở miền Bắc Việt Nam người ta trồng nhiều giống đào để lấy hoa, nổi tiếng nhất là vùng Nhật Tân (Hà Nội).',
        'Cành đào hồng là hình ảnh quen thuộc của Tết ở miền Bắc. Đào tự nhiên nở vào đầu xuân, nên người làm vườn tuốt lá đào trước Tết khoảng một đến hai tháng để cây thoát khỏi nghỉ đông và ra hoa đúng dịp. Các mốc dưới đây là ước tính cho một cây trồng từ hạt; trên thực tế cây bán dịp Tết thường là cây đã được chăm nhiều năm hoặc được ghép.',
      ],
      stages: {
        seed: {
          description:
            'Hạt đào nằm trong nhân của hạt cứng có rãnh sâu. Hạt cần một giai đoạn lạnh và ẩm trước khi nảy mầm, giống như nhiều cây ôn đới khác.',
        },
        vegetative: {
          description:
            'Cây lớn thành thân gỗ, phân nhiều cành và có lá thuôn xanh. Phải sau vài năm cây mới đủ lớn để ra hoa.',
        },
        'bud-formation': {
          description:
            'Nụ hoa hình thành trên cành, sẵn sàng nở vào mùa xuân sau đó. Đây là lúc người làm vườn bắt đầu chuẩn bị cây cho vụ Tết.',
        },
        'bud-development': {
          description:
            'Nụ phồng dần. Vào khoảng 40–50 ngày trước Tết, nhà vườn tuốt hết lá để cây dồn sức cho nụ và nở đúng dịp; ngày chính xác còn tùy giống và thời tiết năm đó.',
        },
        'full-bloom': {
          description:
            'Cành phủ đầy hoa năm cánh màu hồng. Bông hoa nở từ trên xuống dưới trong vài ngày, thường kéo dài khoảng hai tuần quanh Tết nếu trời không quá nóng.',
        },
        wilting: {
          name: 'Hoa rụng, kết quả',
          description:
            'Cánh hoa rụng, cây mọc lá non xanh mướt và các quả đào nhỏ bắt đầu hình thành ở những chỗ hoa đã thụ phấn.',
        },
      },
      care: {
        light: 'Nắng đầy đủ; đào cần nhiều ánh sáng để ra nụ đều.',
        water: 'Tưới vừa phải, đất thoát nước tốt. Úng nước làm rễ thối và rụng nụ.',
        soil: 'Đất tơi xốp, thoát nước tốt, giàu mùn.',
        temperature:
          'Đào là cây ôn đới, cần một mùa lạnh để nụ phát triển. Ở miền Nam nóng ẩm, đào khó nở đẹp và thường phải được bảo quản kỹ.',
        extra:
          'Tuốt lá khoảng 40–50 ngày trước Tết (một số giống sớm hơn) rồi chăm tưới nhẹ; nếu thời tiết nóng bất thường, người làm vườn phải điều chỉnh ngày tuốt lá.',
      },
      facts: [
        'Ở miền Bắc, cành đào là một trong hai loài hoa biểu tượng của Tết, bên cạnh hoa mai ở miền Nam.',
        'Một số giống đào cần tuốt lá sớm tới khoảng 90 ngày trước Tết, theo lời người làm vườn.',
        'Quả đào là quả hạch chứa một hạt cứng có rãnh sâu, khác với quả anh đào chỉ có hạt nhỏ.',
        'Ngày tuốt lá không cố định: năm nào trời nóng, nhà vườn phải làm muộn vài ngày.',
      ],
      keywords: [
        'hoa đào',
        'quá trình phát triển của hoa đào',
        'các giai đoạn phát triển của hoa đào',
        'vòng đời hoa đào',
        'time-lapse hoa đào',
        'cách chăm đào Tết',
        'tuốt lá đào bao nhiêu ngày trước Tết',
      ],
      altText:
        'Minh họa cây đào với thân gỗ nâu, nhiều cành nhỏ phủ đầy hoa năm cánh màu hồng, lớn lên từ một hạt cứng có rãnh trong đất.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính thô. Chỉ mốc tuốt lá khoảng 40–50 ngày trước Tết (một số giống sớm hơn) lấy từ báo chí; thời gian cây lớn tới tuổi ra hoa và độ dài các giai đoạn còn lại là suy đoán, rất khác nhau tùy giống, cây ghép hay cây hạt, và điều kiện chăm sóc.',
      startNote: 'Mô phỏng bắt đầu từ một hạt đào gieo vào đất sau khi hạt đã trải qua mùa lạnh.',
    },
    en: {
      name: 'Peach blossom',
      aliases: ['flowering peach', 'đào', 'Nhật Tân peach'],
      tagline: 'Pink branches that open on the morning of Tết: a tree whose growers time its flowers to the week.',
      metaDescription:
        'Watch a peach blossom tree grow from seed to Tết bloom in an interactive time-lapse: growth stages, estimated timing, leaf-stripping and surprising plant facts.',
      intro: [
        'Peach (Prunus persica) is a small deciduous tree in the rose family. The fruit is a drupe with a single hard stone, but in northern Vietnam many varieties are grown for their flowers, the best known from Nhật Tân village in Hanoi.',
        'A pink-blossomed branch is the classic picture of Tết in the north. Peach naturally flowers in early spring, so growers strip the leaves about one to two months before Tết to bring the tree out of its winter rest and flower on time. The timings below are estimates for a tree grown from seed; the trees sold at Tết are usually grafted or have been tended for many years.',
      ],
      stages: {
        seed: {
          description:
            'The seed sits inside a hard, deeply grooved stone. Like many temperate trees it needs a cold, moist spell before it will germinate.',
        },
        vegetative: {
          description:
            'The tree builds a woody trunk, branches many times and carries slender green leaves. It takes several years before it is big enough to flower.',
        },
        'bud-formation': {
          description:
            'Flower buds form along the branches, ready to open the following spring. This is when growers begin preparing the tree for Tết.',
        },
        'bud-development': {
          description:
            'The buds swell. About 40–50 days before Tết, growers strip every leaf so the tree puts its energy into the buds and opens on cue; the exact date depends on the variety and the year’s weather.',
        },
        'full-bloom': {
          description:
            'Branches are covered in five-petalled pink flowers. They open over a few days and, if the weather is not too warm, last around two weeks through Tết.',
        },
        wilting: {
          name: 'Petal fall and fruit set',
          description:
            'Petals drop, fresh green leaves unfold, and small peaches begin to form where flowers were pollinated.',
        },
      },
      care: {
        light: 'Full sun; peach needs plenty of light to bud evenly.',
        water: 'Water moderately on well-drained soil. Waterlogging rots the roots and drops buds.',
        soil: 'Loose, humus-rich, well-drained soil.',
        temperature:
          'A temperate tree that needs a cold season for its buds. In hot, humid southern Vietnam it flowers poorly and needs careful handling.',
        extra:
          'Strip leaves about 40–50 days before Tết (some varieties earlier) and water lightly afterwards; if the weather is unusually warm, growers adjust the date.',
      },
      facts: [
        'In the north the peach branch is one of the two emblem flowers of Tết, alongside the yellow mai in the south.',
        'Growers say some varieties need stripping as early as about 90 days before Tết.',
        'A peach is a drupe with one hard, deeply grooved stone, unlike a cherry’s small stone.',
        'There is no fixed stripping date: in a warm year growers wait a few days longer.',
      ],
      keywords: [
        'peach blossom growth stages',
        'peach blossom life cycle',
        'time-lapse peach blossom',
        'Tết peach blossom',
        'when to strip peach leaves before Tết',
      ],
      altText:
        'Illustration of a peach tree with a brown woody trunk and many small branches covered in five-petalled pink flowers, growing from a grooved stone in the soil.',
      timeNote:
        'Timings are rough estimates. Only the leaf-stripping window of about 40–50 days before Tết (some varieties earlier) comes from news reports; the years to reach flowering and the lengths of the other stages are guesses that vary with variety, grafting and care.',
      startNote: 'The simulation starts from a single peach stone sown in the soil after its cold spell.',
    },
  },
};
