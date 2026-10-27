import type { FlowerData } from '../types';

export const cosmos: FlowerData = {
  id: 'cosmos',
  slugs: { vi: 'hoa-sao-nhai', en: 'cosmos' },
  scientificName: 'Cosmos bipinnatus',
  scientificAliases: ['Cosmos', 'garden cosmos', 'Mexican aster'],
  family: 'Asteraceae',
  group: 'annual',
  colors: ['pink', 'white', 'purple', 'red'],
  bloomSeasons: ['summer', 'autumn'],
  daysToBloom: [60, 110],
  speedBand: 'fast',
  startMaterial: 'seed',
  confidence: 'moderate',
  featured: false,
  stages: [
    { id: 'seed', days: [1, 3] },
    { id: 'germination', days: [6, 18] },
    { id: 'seedling', days: [12, 21] },
    { id: 'vegetative', days: [25, 35] },
    { id: 'bud-formation', days: [7, 14] },
    { id: 'bud-development', days: [7, 14] },
    { id: 'blooming', days: [2, 4] },
    { id: 'full-bloom', days: [60, 120] },
    { id: 'wilting', days: [20, 40] },
  ],
  visual: {
    archetype: 'cosmos',
    palette: {
      petal: '#f48fb1',
      petalDeep: '#d6558a',
      petalTip: '#fbd0e0',
      center: '#f2b400',
      centerDeep: '#b87a00',
      leaf: '#5a9a45',
      leafDeep: '#34703a',
      stem: '#5a8a40',
    },
  },
  related: ['dahlia', 'marigold', 'sunflower'],
  sources: [
    {
      title: 'Cosmos bipinnatus Cav.',
      publisher: 'International Plant Names Index (Kew, Harvard University Herbaria, Australian National Herbarium)',
      url: 'https://www.ipni.org/n/198320-1',
      supports: 'Name and author (Cavanilles), first published in 1791, family Asteraceae.',
    },
    {
      title: 'Cosmos bipinnatus',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Cosmos_bipinnatus',
      supports:
        'Annual habit, height of 60 cm to 2 m, flower head size, eight ray florets, finely cut leaves that support each other in groups, germination and flowering times, pollinators, frost tenderness.',
    },
    {
      title: 'Cosmos (plant)',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Cosmos_(plant)',
      supports: 'Origin of the genus name (Greek kosmos “ordered world” or kósmima “jewel”).',
    },
    {
      title: 'Sao nhái (Cosmos bipinnatus)',
      publisher: 'Wikipedia tiếng Việt',
      url: 'https://vi.wikipedia.org/wiki/Sao_nh%C3%A1i',
      supports: 'Vietnamese name “sao nhái”, family Asteraceae, first described by Cavanilles in 1791.',
    },
    {
      title: 'Chi Cúc chuồn',
      publisher: 'Wikipedia tiếng Việt',
      url: 'https://vi.wikipedia.org/wiki/Chi_C%C3%BAc_chu%E1%BB%93n',
      supports: 'Other Vietnamese names of Cosmos bipinnatus (cúc chuồn chuồn, cúc Mexico, cốt mốt) and of the genus (hoa cánh bướm).',
    },
    {
      title: 'FP149: Cosmos bipinnatus ‘Sonata White’ (Sonata White Mexican Aster)',
      publisher: 'University of Florida IFAS Extension (EDIS)',
      url: 'https://edis.ifas.ufl.edu/publication/FP149',
      supports:
        'Annual herb, flower colours, full sun, spacing of 12–18 inches, direct sowing, germination in about a week and bloom in 2 to 3 months, thin stems that may need staking, moderate drought tolerance.',
    },
    {
      title: 'Cosmos bipinnatus (cut-leaf cosmos) — Plant Toolbox',
      publisher: 'NC State Extension',
      url: 'https://plants.ces.ncsu.edu/plants/cosmos-bipinnatus/common-name/cut-leaf-cosmos',
      supports:
        'Annual from Mexico and southwest North America, sowing once frost has passed and soil is at least 65 °F, germination in 7 to 21 days, soil moisture after sowing, deadheading, reseeding, pollinators, cut-flower use.',
    },
    {
      title: 'Cosmos brings beauty to your universe',
      publisher: 'NC State Extension — The Extension Gardener',
      url: 'https://extensiongardener.ces.ncsu.edu/gardening-publications-2/extgardener-previous-newsletters/extgardener-past-features/extgardener-cosmos-brings-beauty-to-your-universe/',
      supports:
        'Cutting plants back to 12–18 inches when seed heads form so they bloom again in about a month, self-sowing, Cosmos sulphureus having golden-yellow or orange flowers.',
    },
    {
      title: 'Cosmos bipinnatus ‘Fizzy Pink’ (Fizzy Series) — plant profile',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/353853/cosmos-bipinnatus-fizzy-pink-fizzy-series/details',
      supports: 'Half-hardy annual, full sun, moist but well-drained soil of any pH, flowers in summer and autumn, deadheading to prolong flowering.',
    },
    {
      title: 'Cosmos (Cosmos bipinnatus)',
      publisher: 'University of Illinois Extension',
      url: 'https://extension.illinois.edu/flowers/cosmos',
      supports: 'Full sun, low-fertility well-drained soil, bloom June to October, bloom colours, deadheading, overfertilising and overwatering reducing flowers, self-seeding, support for tall cultivars.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa sao nhái',
      aliases: ['sao nhái', 'cúc chuồn chuồn', 'cúc Mexico', 'hoa cánh bướm', 'cốt mốt', 'cúc ngũ sắc'],
      tagline: 'Những cánh hoa mỏng như giấy bay phấp phới trên đám lá nhỏ như sợi chỉ, chỉ vài tháng sau một nhúm hạt.',
      metaDescription:
        'Xem hoa sao nhái lớn lên từ hạt đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách trồng và những điều thú vị.',
      intro: [
        'Hoa sao nhái (Cosmos bipinnatus), còn gọi là cúc chuồn chuồn hay cúc Mexico, là cây thân thảo một năm thuộc họ Cúc, có nguồn gốc từ Mexico và Tây Nam Bắc Mỹ. Tùy giống, cây cao từ khoảng 60 cm đến 2 mét, lá xẻ mảnh như sợi chỉ và hoa có màu hồng, tím hoặc trắng.',
        'Mỗi “bông” rộng thường 5–7 cm thật ra là một cụm hoa: khoảng tám hoa tia hồng, tím hoặc trắng xếp quanh một đĩa hoa ống màu vàng. Cây dễ trồng, ưa nắng, không đòi đất giàu dinh dưỡng, nên được trồng nhiều làm hoa vườn và hoa cắt cành.',
      ],
      stages: {
        seed: {
          description:
            'Hạt sao nhái là quả bế hình thoi, màu sẫm. Hạt nằm chờ trong đất cho đến khi hết nguy cơ sương giá và đất đã ấm — hướng dẫn của NC State là gieo khi đất đạt ít nhất khoảng 18°C (65°F). Hạt được cào nhẹ vào đất tơi; gieo quá sâu sẽ khó nảy mầm.',
        },
        germination: {
          description:
            'Hạt hút nước, rễ mầm chui ra rồi chồi non nhú lên khỏi mặt đất. Các nguồn nêu khoảng 7–21 ngày để nảy mầm, nhanh nhất ở khoảng 24°C (75°F). Nên giữ đất ẩm trong 5–10 ngày đầu sau khi gieo.',
        },
        seedling: {
          description:
            'Cặp lá mầm xòe ra, kế đến là những lá thật mọc đối nhau và xẻ thùy sâu, mảnh như ren. Cây con lớn nhanh. Khoảng cách trồng thường được nêu là 30–45 cm (12–18 inch) giữa các cây để mỗi cây có đủ chỗ.',
        },
        vegetative: {
          description:
            'Thân phân cành, đám lá xẻ nhỏ như sợi chỉ dày lên và cây vươn cao. Đất nghèo dinh dưỡng lại hợp với cây: bón nhiều phân hay tưới quá tay có thể làm cây ra ít hoa. Thân khá mảnh nên giống cao thường cần cọc đỡ khi gặp gió hoặc mưa lớn.',
        },
        'bud-formation': {
          description:
            'Ở đầu các cành xuất hiện nụ nhỏ, được bao bởi các lá bắc xanh (thường có tám lá bắc ngoài). Cây chuyển từ lớn thân lá sang chuẩn bị ra hoa, và khi hoa nở cây sẽ dần nặng đầu.',
        },
        'bud-development': {
          description:
            'Nụ phồng dần lên, các lá bắc hé ra để lộ màu hồng, tím hoặc trắng của những cánh hoa còn cuộn bên trong. Chẳng bao lâu nữa nụ sẽ bung.',
        },
        blooming: {
          description:
            'Các hoa tia (thường tám cái) xòe ra thành chiếc đĩa hình chén, mỗi cánh dài khoảng 2–3,5 cm với đầu có ba răng lượn sóng. Ở giữa, hoa ống màu vàng bắt đầu nở và thu hút ong, bướm.',
        },
        'full-bloom': {
          description:
            'Cây phủ đầy hoa rộng chừng 5–7 cm. Mùa hoa kéo dài: ở bang Illinois (Mỹ), cây ra hoa từ khoảng tháng 6 đến tháng 10. Cắt bỏ hoa đã tàn (tỉa hoa) giúp cây ra hoa liên tục.',
        },
        wilting: {
          name: 'Hoa tàn, kết hạt',
          description:
            'Cánh hoa rụng, phần đĩa ở giữa khô lại thành đầu hạt. Cây tự gieo hạt khá dễ, nên năm sau thường có cây con mọc lên ở chỗ cũ. Nếu cắt cây còn khoảng 30–45 cm khi đầu hạt xuất hiện, cây có thể ra hoa lại sau khoảng một tháng; còn gặp sương giá thì cây một năm này sẽ tàn hẳn.',
        },
      },
      care: {
        light: 'Nắng trực tiếp; chịu được bóng râm một phần nhưng ra hoa tốt nhất khi đủ nắng.',
        water:
          'Giữ đất ẩm trong 5–10 ngày đầu sau gieo, sau đó tưới vừa phải. Cây chịu hạn ở mức trung bình; tưới quá nhiều làm giảm hoa. Đất cần thoát nước tốt.',
        soil:
          'Đất tơi, thoát nước tốt, độ phì thấp. RHS ghi cây mọc được trên đất phấn, sét, thịt và cát, với pH axit, trung tính hoặc kiềm.',
        temperature:
          'Gieo khi hết nguy cơ sương giá và đất ấm từ khoảng 18°C (65°F) trở lên; nảy mầm tốt nhất ở khoảng 24°C. Cây không chịu được sương giá.',
        extra:
          'Trồng cách nhau khoảng 30–45 cm. Giống cao nên có cọc đỡ hoặc trồng sát nhau cho cây tựa vào nhau. Cắt hoa tàn thường xuyên để kéo dài mùa hoa.',
      },
      facts: [
        '“Bông” sao nhái là một cụm hoa: thường có tám hoa tia màu hồng đến tím hoặc trắng, xếp quanh đĩa gồm nhiều hoa ống nhỏ màu vàng.',
        'Tên chi Cosmos có thể bắt nguồn từ tiếng Hy Lạp kosmos, nghĩa là “thế giới có trật tự” (vì các bộ phận của hoa xếp gọn gàng), hoặc từ kósmima, nghĩa là “viên ngọc” (vì màu hoa rực rỡ).',
        'Chữ bipinnatus nhắc tới lá xẻ lông chim kép: các thùy lá hẹp như sợi chỉ, chỉ rộng chừng 0,5–1 mm. Khi trồng thành nhóm, các lá đan vào nhau và cây đỡ nhau, đỡ đổ khi hoa nặng đầu.',
        'Hoa thu hút ong và bướm, kể cả bướm vua (monarch); sao nhái còn là loại hoa cắt cành tốt, hoa bền.',
        'Cosmos sulphureus — một loài cùng chi — có hoa màu vàng óng hoặc cam, khác với màu hồng, tím, trắng của sao nhái.',
      ],
      keywords: [
        'hoa sao nhái',
        'quá trình phát triển của hoa sao nhái',
        'các giai đoạn phát triển của hoa sao nhái',
        'vòng đời hoa sao nhái',
        'time-lapse hoa sao nhái',
        'cách trồng hoa sao nhái',
        'hoa cúc chuồn chuồn',
      ],
      altText:
        'Minh họa hoa sao nhái với thân mảnh phân cành, lá xẻ nhỏ như sợi chỉ và những bông hoa hồng nhạt có tâm vàng, cây lớn lên từ hạt giống trong đất.',
      timeNote:
        'Các mốc thời gian là ước tính cho điều kiện trồng ngoài trời thông thường. Các nguồn nêu hạt nảy mầm sau khoảng 7–21 ngày và ra hoa sau khoảng 2–3 tháng; độ dài giai đoạn nở rộ và tàn chỉ là ước lượng thô, phụ thuộc giống, nhiệt độ, nắng và việc cắt hoa tàn.',
      startNote: 'Mô phỏng bắt đầu từ một hạt được cào nhẹ vào đất tơi, không vùi sâu.',
    },
    en: {
      name: 'Cosmos',
      aliases: ['garden cosmos', 'Mexican aster', 'cosmea'],
      tagline: 'Paper-thin petals floating above thread-fine leaves, only a few months after a pinch of seed.',
      metaDescription:
        'Watch a cosmos grow from seed to full bloom in an interactive time-lapse: growth stages, estimated timing, growing tips and surprising plant facts.',
      intro: [
        'Cosmos (Cosmos bipinnatus), also called garden cosmos or Mexican aster, is an annual herb in the daisy family, native to Mexico and southwest North America. Depending on the cultivar it stands from about 60 cm to 2 metres tall, with finely cut, thread-like leaves and pink, purple or white flowers.',
        'Each “flower”, usually 5–7 cm across, is really a flower head: about eight ray florets in pink, purple or white around a yellow disc of tiny tubular florets. It is easy to grow, loves sun and does not need rich soil, which is why it is a popular border and cut-flower plant.',
      ],
      stages: {
        seed: {
          description:
            'A cosmos “seed” is a dark, spindle-shaped fruit (an achene). It waits in the soil until the danger of frost has passed and the ground has warmed; NC State advises sowing once the soil reaches at least about 18 °C (65 °F). The seeds are raked lightly into loose soil — sowing too deep hinders germination.',
        },
        germination: {
          description:
            'The seed takes up water, a root pushes out, and the shoot lifts into the light. Sources give roughly 7–21 days to germinate, quickest at around 24 °C (75 °F). Keep the soil moist for the first 5–10 days after sowing.',
        },
        seedling: {
          description:
            'Two seed leaves open, followed by true leaves that grow in opposite pairs and are deeply cut, almost lace-like. Seedlings grow quickly. Planting distance is usually given as 30–45 cm (12–18 in.) between plants so each has room.',
        },
        vegetative: {
          description:
            'The stem branches and the mass of thread-fine foliage thickens as the plant shoots up. Poor soil suits it: heavy feeding or overwatering can mean fewer flowers. The stems are fairly thin, so tall cultivars often need stakes in wind or heavy rain.',
        },
        'bud-formation': {
          description:
            'Small buds appear at the ends of the branches, wrapped in green bracts (usually eight outer bracts). The plant is switching from building stem and leaves to preparing to flower, and it grows top-heavy once the flowers open.',
        },
        'bud-development': {
          description:
            'The buds swell and the bracts part to show pink, purple or white petals still curled inside. Before long the buds will open.',
        },
        blooming: {
          description:
            'The ray florets (usually eight) spread into a shallow cup, each petal about 2–3.5 cm long with three wavy teeth at its tip. In the middle the yellow disc florets begin to open, drawing in bees and butterflies.',
        },
        'full-bloom': {
          description:
            'The plant is covered in flower heads around 5–7 cm wide. The season is long: in Illinois, USA, cosmos blooms from about June to October. Removing spent flowers (deadheading) keeps it blooming continuously.',
        },
        wilting: {
          name: 'Wilting and seed set',
          description:
            'Petals drop and the central disc dries into a seed head. Cosmos self-sows readily, so seedlings often appear in the same spot the next year. Cut back to about 30–45 cm when seed heads form and the plant can bloom again in about a month — but frost ends this annual for good.',
        },
      },
      care: {
        light: 'Full sun; part shade is tolerated, but flowering is best with plenty of sun.',
        water:
          'Keep the soil moist for the first 5–10 days after sowing, then water moderately. Drought tolerance is moderate, and overwatering reduces flowering. Good drainage matters.',
        soil:
          'Loose, well-drained soil of low fertility. The RHS lists chalk, clay, loam and sand, with acid, neutral or alkaline pH.',
        temperature:
          'Sow once frost has passed and the soil is at least about 18 °C (65 °F); germination is best around 24 °C. Plants do not tolerate frost.',
        extra:
          'Space plants about 30–45 cm (12–18 in.) apart. Stake tall cultivars or plant them close so they lean on each other. Deadhead regularly to prolong the flowering season.',
      },
      facts: [
        'The cosmos “flower” is a flower head: usually eight pink-to-violet or white ray florets around a disc of many small yellow tubular florets.',
        'The genus name Cosmos may come from the Greek kosmos, “ordered world”, for the neat arrangement of the flower parts, or from kósmima, “jewel”, for the bright colours of the heads.',
        'The species name bipinnatus points to the twice-divided leaves, whose segments are thread-narrow, only about 0.5–1 mm wide. Grown in groups, the leaves interlock and the plants prop each other up when the heads get heavy.',
        'The flowers attract bees and butterflies, including monarchs, and cosmos is a good cut flower with long-lasting blooms.',
        'Cosmos sulphureus, a relative in the same genus, has golden-yellow or orange flowers rather than the pink, purple and white of garden cosmos.',
      ],
      keywords: [
        'cosmos growth stages',
        'cosmos flower life cycle',
        'time-lapse cosmos growth',
        'how cosmos grow from seed',
        'how long does cosmos take to bloom',
        'how to grow cosmos',
      ],
      altText:
        'Illustration of a cosmos plant with slender branching stems, thread-fine leaves and pale pink flowers with yellow centres, growing from a seed in the soil.',
      timeNote:
        'Timings are estimates for ordinary outdoor growing. Sources give about 7–21 days to germinate and about 2–3 months to flower; the lengths of the full-bloom and wilting stages are rough guesses that depend on cultivar, temperature, sun and deadheading.',
      startNote: 'The simulation starts from a single seed raked lightly into loose soil, not buried deep.',
    },
  },
};
