import type { FlowerData } from '../types';

export const rose: FlowerData = {
  id: 'rose',
  slugs: { vi: 'hoa-hong', en: 'rose' },
  scientificName: 'Rosa spp.',
  scientificAliases: ['Rosa', 'Rosa chinensis', 'Rosa x hybrida'],
  family: 'Rosaceae',
  group: 'shrub-tree',
  colors: ['red', 'pink', 'white', 'yellow', 'orange'],
  bloomSeasons: ['spring', 'summer', 'autumn'],
  daysToBloom: [150, 540],
  speedBand: 'slow',
  startMaterial: 'seed-or-cutting',
  confidence: 'low',
  featured: true,
  stages: [
    { id: 'seed', days: [30, 90] },
    { id: 'germination', days: [14, 60] },
    { id: 'seedling', days: [30, 60] },
    { id: 'vegetative', days: [60, 180] },
    { id: 'bud-formation', days: [14, 35] },
    { id: 'bud-development', days: [14, 28] },
    { id: 'blooming', days: [3, 7] },
    { id: 'full-bloom', days: [5, 10] },
    { id: 'wilting', days: [60, 150] },
  ],
  visual: {
    archetype: 'rose',
    palette: {
      petal: '#d0243a',
      petalDeep: '#7d0f26',
      petalTip: '#f06a78',
      center: '#8a1a30',
      centerDeep: '#4a0a18',
      leaf: '#3f7a43',
      leafDeep: '#1f4f2c',
      stem: '#58753a',
    },
  },
  related: ['tulip', 'cherry-blossom', 'chrysanthemum'],
  sources: [
    {
      title: 'Roses — growing guide',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/roses/growing-guide',
      supports: 'Sun requirement, spacing, watering, softwood cuttings, why seed is rarely used.',
    },
    {
      title: 'Roses — plant types and flowering season',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/roses',
      supports: 'Flower forms, once-flowering versus repeat-flowering types, soil preference.',
    },
    {
      title: 'Rose',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Rose',
      supports: 'Hips and achenes, origin of garden roses, number of species varies by classification.',
    },
    {
      title: 'Rosa (roses)',
      publisher: 'NC State Extension Plant Toolbox',
      url: 'https://plants.ces.ncsu.edu/plants/rosa/common-name/roses/',
      supports: 'Woody perennial habit, size range, sun and soil pH.',
    },
    {
      title: 'Photoperiodism',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Photoperiodism',
      supports: 'Roses listed as day-neutral plants.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa hồng',
      aliases: ['hồng', 'hồng vườn', 'hoa hồng nhung'],
      tagline: 'Biểu tượng của vẻ đẹp — nhưng hành trình đến đóa hồng đầu tiên cần nhiều kiên nhẫn hơn bạn nghĩ.',
      metaDescription:
        'Xem quá trình phát triển của hoa hồng qua time-lapse: nảy mầm, cây con, nụ, nở rộ rồi kết quả hồng. Thời gian ước tính, cách chăm sóc và những lưu ý trung thực.',
      intro: [
        'Hoa hồng (chi Rosa, họ Hoa hồng) là nhóm cây bụi thân gỗ, thường có gai, với vô số giống trồng. Hồng vườn hiện đại có nguồn gốc lai tạo gắn với hồng Trung Quốc (Rosa chinensis), du nhập vào châu Âu từ thế kỷ 18.',
        'Trong thực tế, hầu hết người trồng không gieo hồng từ hạt: nhiều giống không kết hạt hoặc cho cây khác cây mẹ, nên được nhân bằng cành giâm hoặc ghép — RHS nhận xét gieo hạt hồng tốn thời gian và đáng tin cậy nhất với hồng dại. Vì vậy mô phỏng dưới đây là minh họa chung cho một cây hồng lớn lên và ra hoa; các mốc thời gian chỉ là khoảng rất rộng.',
      ],
      stages: {
        seed: {
          name: 'Hạt hoặc cành giâm',
          description:
            'Hạt hồng nằm trong quả hồng (hip); mỗi quả chứa từ vài đến vài chục “hạt”, thực ra là các quả bế nhỏ. Nhiều loài hồng cần một giai đoạn lạnh ẩm trước khi nảy mầm. Vì vậy người trồng thường chọn cành giâm để có cây giống hệt cây mẹ.',
        },
        germination: {
          description:
            'Khi đủ điều kiện, rễ mầm nhú ra rồi chồi non vươn lên; hạt hồng nảy mầm khá thất thường và có thể kéo dài nhiều tuần. Với cành giâm, bước tương ứng là ra rễ — RHS nêu khoảng hai tháng với cành giâm mềm vào đầu xuân.',
        },
        seedling: {
          description:
            'Những lá thật đầu tiên xuất hiện, sau đó là lá kép lông chim với các lá chét bầu dục có răng cưa. Thân còn mềm; cây con cần ánh sáng tốt và đất thoát nước.',
        },
        vegetative: {
          description:
            'Cây ra các cành mới có gai và lá kép 5–7 lá chét. Hồng cần nắng — RHS khuyên tối thiểu khoảng 4 giờ mỗi ngày — cùng đất ẩm, màu mỡ và thoát nước tốt.',
        },
        'bud-formation': {
          description:
            'Ở đầu cành xuất hiện những nụ nhỏ màu xanh. Hồng thuộc nhóm cây trung tính ngày dài (day-neutral): chúng ra hoa theo độ tuổi và sự phát triển của cành chứ không phụ thuộc chặt vào độ dài ngày.',
        },
        'bud-development': {
          description:
            'Nụ phình ra, các lá đài xanh ôm lấy lớp cánh cuộn bên trong. Màu cánh hoa lộ dần ở đầu nụ trước khi nụ hé mở.',
        },
        blooming: {
          description:
            'Lá đài tách ra và những cánh ngoài cùng bung dần, để lộ lớp cánh cuộn bên trong. Tùy giống, hoa nở một lần hoặc nhiều lần trong mùa; nhiều giống hồng vườn nở lặp lại từ đầu hè đến thu.',
        },
        'full-bloom': {
          description:
            'Hoa nở rộ với nhiều lớp cánh xếp chồng quanh nhụy và nhị. Hồng vườn được chọn tạo chủ yếu vì số lớp cánh, dáng hoa, màu sắc và hương thơm.',
        },
        wilting: {
          name: 'Hoa tàn, kết quả',
          description:
            'Cánh hoa nhăn lại rồi rụng. Nếu không cắt bỏ hoa tàn, đế hoa phình thành quả hồng (hip) màu đỏ cam chứa hạt; nhiều giống hồng vườn ít hoặc không kết quả.',
        },
      },
      care: {
        light: 'Tối thiểu khoảng 4 giờ nắng mỗi ngày (RHS); nhiều nắng hơn thường tốt cho đa số giống.',
        water: 'Giữ đất ẩm đều, tưới sâu vào gốc; tránh làm ướt lá liên tục để hạn chế bệnh nấm.',
        soil: 'Đất ẩm, màu mỡ, thoát nước tốt; pH từ hơi chua đến trung tính.',
        temperature: 'Nhiều giống ưa khí hậu mát, ôn hòa; hãy chọn giống phù hợp với khí hậu nơi bạn sống.',
        extra:
          'Cắt bỏ hoa tàn và tỉa cành già đúng mùa giúp cây ra hoa tốt hơn. Tại nhà, nhân giống bằng cành giâm mềm vào đầu đến giữa xuân (RHS).',
      },
      facts: [
        'Mỗi quả hồng có thể chứa từ 5 đến 160 “hạt” (thực ra là quả bế), tùy loài.',
        'Hồng vườn hiện đại có nguồn gốc lai tạo gắn với hồng Trung Quốc (Rosa chinensis), du nhập vào châu Âu từ thế kỷ 18.',
        'Hồng thuộc nhóm cây trung tính ngày dài nên thời điểm ra hoa không bị ràng buộc chặt vào độ dài ngày.',
        'Số loài hồng hoang dại được ghi nhận khác nhau giữa các tài liệu, từ khoảng 140 đến hơn 300 — tùy cách phân loại.',
      ],
      keywords: [
        'hoa hồng',
        'quá trình phát triển của hoa hồng',
        'vòng đời của hoa hồng',
        'các giai đoạn phát triển của hoa hồng',
        'cách chăm sóc hoa hồng',
        'time-lapse hoa hồng',
      ],
      altText:
        'Minh họa cây hoa hồng với thân có gai, lá kép xanh đậm và những đóa hồng đỏ nhiều lớp cánh, lớn lên từ hạt trong đất.',
      timeNote:
        'Không có mốc “từ hạt đến hoa” chuẩn trong các hướng dẫn mà chúng tôi tham khảo: hạt hồng nảy mầm thất thường và hầu hết cây được nhân bằng cành giâm hoặc ghép. Hãy xem các con số là khoảng rất rộng mang tính minh họa, không phải lịch trình.',
      startNote: 'Mô phỏng bắt đầu từ hạt; trong thực tế, phần lớn cây hồng được nhân bằng cành giâm hoặc ghép.',
    },
    en: {
      name: 'Rose',
      aliases: ['garden rose'],
      tagline: 'A symbol of beauty — but the road to the first bloom takes more patience than you might think.',
      metaDescription:
        'Watch a rose grow in an interactive time-lapse: germination, seedling, buds, full bloom and rose hips. Estimated timing, care tips and honest caveats.',
      intro: [
        'Roses (genus Rosa, the rose family) are woody, usually thorny shrubs with a huge number of cultivated varieties. Modern garden roses were bred with the help of the China rose (Rosa chinensis), which reached Europe in the 18th century.',
        'In practice most gardeners do not grow roses from seed: many cultivars set no seed or give plants unlike the parent, so they are propagated by cuttings or grafting — the RHS notes that growing roses from seed is time-consuming and most reliable for species roses. This simulation is therefore a general illustration of a rose growing and flowering, and its timings are deliberately wide ranges.',
      ],
      stages: {
        seed: {
          name: 'Seed or cutting',
          description:
            'Rose seeds sit inside the hip; each hip holds from a handful to dozens of “seeds”, which are really small achenes. Many roses need a cold, moist period before they germinate. That is why gardeners usually choose cuttings, which give plants identical to the parent.',
        },
        germination: {
          description:
            'When conditions are right the root emerges and the shoot reaches up; rose seed germination is erratic and can take many weeks. For cuttings the equivalent step is rooting — the RHS gives about two months for softwood cuttings taken in early spring.',
        },
        seedling: {
          description:
            'The first true leaves appear, followed by compound leaves with toothed oval leaflets. Stems are still soft; young plants need good light and free-draining soil.',
        },
        vegetative: {
          description:
            'The plant sends up new thorny shoots with 5–7 leaflets per leaf. Roses need sun — the RHS advises at least about 4 hours a day — plus moist, fertile, well-drained soil.',
        },
        'bud-formation': {
          description:
            'Small green buds appear at the tips of the shoots. Roses are day-neutral plants: they flower according to age and shoot development rather than a strict day-length trigger.',
        },
        'bud-development': {
          description:
            'The bud swells as green sepals hug the rolled petals inside. Colour shows at the tip of the bud before it begins to open.',
        },
        blooming: {
          description:
            'The sepals pull apart and the outer petals loosen, revealing the rolled petals within. Depending on the variety, flowers come once or repeatedly through the season; many garden roses repeat from early summer into autumn.',
        },
        'full-bloom': {
          description:
            'The flower is fully open with many layers of petals around the stamens and carpels. Garden roses have mostly been selected for petal count, shape, colour and fragrance.',
        },
        wilting: {
          name: 'Wilting and hips',
          description:
            'Petals crinkle and fall. If the spent flowers are not removed, the base swells into a red-orange hip holding the seeds; many garden cultivars produce few or no hips.',
        },
      },
      care: {
        light: 'At least about 4 hours of sun a day (RHS); more sun generally suits most varieties.',
        water: 'Keep the soil evenly moist and water deeply at the base; avoid constantly wetting the leaves to limit fungal disease.',
        soil: 'Moist, fertile, free-draining soil; slightly acidic to neutral pH.',
        temperature: 'Many varieties prefer cool, mild climates; choose a variety suited to your local climate.',
        extra:
          'Removing spent flowers and pruning old stems at the right season helps plants flower better. At home, propagate with softwood cuttings in early to mid spring (RHS).',
      },
      facts: [
        'A single rose hip can contain anywhere from 5 to 160 “seeds” (really achenes), depending on the species.',
        'Modern garden roses were bred with the help of the China rose (Rosa chinensis), which reached Europe in the 18th century.',
        'Roses are day-neutral, so the timing of flowering is not tied tightly to day length.',
        'Sources disagree on how many wild rose species exist — from about 140 to over 300 — depending on how they are classified.',
      ],
      keywords: [
        'rose growth stages',
        'rose life cycle',
        'time-lapse rose growth',
        'how roses grow',
        'how long does a rose take to bloom',
        'rose care for beginners',
      ],
      altText:
        'Illustration of a rose plant with thorny stems, dark green compound leaves and layered red roses, growing from a seed in the soil.',
      timeNote:
        'The guides we consulted give no standard “seed to first bloom” figure: rose seed germinates erratically and most plants are propagated by cuttings or grafting. Treat the numbers as very wide, illustrative ranges rather than a schedule.',
      startNote: 'The simulation starts from a seed; in practice most roses are propagated by cuttings or grafting.',
    },
  },
};
