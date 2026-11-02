import type { FlowerData } from '../types';

export const echinacea: FlowerData = {
  id: 'echinacea',
  slugs: { vi: 'hoa-cuc-non-tim', en: 'echinacea' },
  scientificName: 'Echinacea purpurea',
  scientificAliases: ['Echinacea', 'purple coneflower', 'eastern purple coneflower', 'Rudbeckia purpurea'],
  family: 'Asteraceae',
  group: 'perennial',
  colors: ['purple', 'pink'],
  bloomSeasons: ['summer', 'autumn'],
  daysToBloom: [365, 730],
  speedBand: 'slow',
  startMaterial: 'seed',
  confidence: 'low',
  featured: false,
  stages: [
    { id: 'seed', days: [30, 90] },
    { id: 'germination', days: [10, 20] },
    { id: 'seedling', days: [20, 28] },
    { id: 'vegetative', days: [240, 540] },
    { id: 'bud-formation', days: [14, 35] },
    { id: 'bud-development', days: [14, 28] },
    { id: 'blooming', days: [3, 7] },
    { id: 'full-bloom', days: [45, 90] },
    { id: 'wilting', days: [30, 90] },
  ],
  visual: {
    archetype: 'echinacea',
    palette: {
      petal: '#d0629f',
      petalDeep: '#a63d80',
      petalTip: '#e6a0c8',
      center: '#b4541e',
      centerDeep: '#6e3014',
      leaf: '#4f8a3e',
      leafDeep: '#2f6234',
      stem: '#58803f',
    },
  },
  related: ['daisy', 'cosmos', 'zinnia'],
  sources: [
    {
      title: 'Echinacea purpurea (L.) Moench',
      publisher: 'International Plant Names Index (Kew, Harvard University Herbaria, Australian National Herbarium)',
      url: 'https://www.ipni.org/n/1174497-2',
      supports: 'Accepted name and author, published by Moench in 1794 from the basionym Rudbeckia purpurea L. (1753), family Asteraceae.',
    },
    {
      title: 'Echinacea purpurea',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Echinacea_purpurea',
      supports:
        'Herbaceous perennial up to 120 cm, native range and habitat, flower head 7–15 cm across with domed yellow disc florets and sterile pink or purple ray florets, name origin (Greek “spiny one”), propagation by division, root cuttings and seed, germination with temperature swings or stratification, pollinators, bird-dispersed achenes, sun and drought tolerance.',
    },
    {
      title: 'Echinacea purpurea (Coneflower, Eastern Purple Coneflower) — Plant Toolbox',
      publisher: 'North Carolina Extension Gardener (NC State Extension)',
      url: 'https://plants.ces.ncsu.edu/plants/echinacea-purpurea/',
      supports:
        'Herbaceous perennial, 3 to 4 feet tall, flowers early summer to mid-fall, drooping lavender rays around a purplish-brown spiny disc, flowers up to 5 inches across, drought tolerance once established, easy propagation and reseeding, achenes eaten by birds, leaving stems standing for stem-nesting bees.',
    },
    {
      title: 'Purple Coneflower',
      publisher: 'Penn State Extension',
      url: 'https://extension.psu.edu/purple-coneflower',
      supports: 'Hardy in zones 3–9, blooms late June to early September, 24–36 inches tall, full sun to partial shade, seeds need cold stratification to germinate, value for pollinators and goldfinches, spacing for airflow.',
    },
    {
      title: 'Purple Coneflowers for the Mississippi Gardener (P2690)',
      publisher: 'Mississippi State University Extension Service',
      url: 'https://extension.msstate.edu/publications/purple-coneflowers-for-the-mississippi-gardener',
      supports:
        'Easy from seed, 30 to 90 days of cool moist stratification helps even germination, transplanting seedlings at two or three sets of leaves, not burying the crown, dividing every three to four years in spring, deadheading for reblooming, leaving seed heads for birds.',
    },
    {
      title: 'Echinacea (coneflower)',
      publisher: 'Clemson Cooperative Extension — Home & Garden Information Center',
      url: 'https://hgic.clemson.edu/factsheet/echinacea/',
      supports:
        'Sowing indoors at 65–70 °F, germination 10 to 20 days later, seedlings ready to transplant 20 to 28 days after sowing, plants from seed taking 2 or more years to become sizable, mid-summer bloom until frost, up to 4 feet tall, division every 3 to 4 years, delaying deadheading for goldfinches.',
    },
    {
      title: 'Purple Coneflower (Echinacea purpurea)',
      publisher: 'University of Illinois Extension',
      url: 'https://extension.illinois.edu/flowers/purple-coneflower',
      supports: 'Full sun, well-drained soil, 2 to 4 feet tall, zones 3–8, heat and drought tolerance once established, avoiding heavy fertiliser that makes plants leggy, deadheading to extend bloom.',
    },
    {
      title: 'Echinacea (coneflower) — RHS Plant Guide',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/echinacea',
      supports: 'Tough perennials for full sun and easily drained soil, poor flowering in shade, planting in spring or summer rather than autumn, dislike of disturbance, attractive to bees and butterflies.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa cúc nón tím',
      aliases: ['echinacea', 'cúc dại tím', 'cúc nón', 'purple coneflower'],
      tagline: 'Cánh hoa tím hồng rủ nhẹ quanh chiếc nón nâu cam gai góc, nhưng cây trồng từ hạt thường phải chờ đến năm thứ hai mới nở.',
      metaDescription:
        'Xem hoa cúc nón tím (echinacea) lớn lên từ hạt đến lúc nở rộ qua time-lapse: các giai đoạn, thời gian ước tính, cách trồng và những điều thú vị.',
      intro: [
        'Hoa cúc nón tím (Echinacea purpurea), thường gọi là echinacea, là cây thân thảo sống nhiều năm thuộc họ Cúc, bản địa miền đông Bắc Mỹ, nơi cây mọc ở rừng thưa, đồng cỏ và vùng đất khô. Cây cao tới khoảng 1,2 mét, lá ráp, hình bầu dục đến mũi mác. “Cúc nón tím” là cách gọi mô tả, dịch từ tên tiếng Anh purple coneflower, không phải tên chuẩn hóa chung.',
        'Mỗi “bông” rộng chừng 7–15 cm thật ra là một cụm hoa: ở giữa là chiếc nón hình vòm gồm vô số hoa ống nhỏ, quanh nó là một vòng hoa tia hồng tím hay rủ xuống. Tên Echinacea gốc Hy Lạp nghĩa là “con nhím”, vì đầu hoa chín có gai như nhím biển. Cây chịu hạn, ưa nắng và là nguồn mật quý cho ong, bướm.',
      ],
      stages: {
        seed: {
          description:
            'Hạt echinacea là quả bế nhỏ, sẫm màu, bốn cạnh, nằm trong chiếc nón hoa. Hạt thường nảy mầm tốt hơn sau một giai đoạn lạnh ẩm: MSU Extension nêu khoảng 30–90 ngày giúp hạt nảy mầm đều, còn Wikipedia ghi hạt cũng nảy mầm tốt khi nhiệt độ ngày đêm dao động. Gieo chậu vào mùa thu rồi để ngoài trời là cách ủ lạnh dễ nhất.',
        },
        germination: {
          description:
            'Khi đủ ẩm và ấm, hạt hút nước, rễ mầm chui ra và chồi non nhú lên. Clemson Extension nêu hạt nảy mầm sau khoảng 10–20 ngày ở 18–21°C (65–70°F) nếu giữ mặt đất luôn ẩm.',
        },
        seedling: {
          description:
            'Cặp lá mầm xòe ra, kế đến là những lá thật đầu tiên. Cây con thường sẵn sàng ra chậu hoặc ra vườn sau khoảng 20–28 ngày kể từ lúc gieo, hay khi có hai đến ba cặp lá. Khi trồng, không vùi cổ rễ xuống thấp hơn mặt đất để tránh thối cổ rễ.',
        },
        vegetative: {
          description:
            'Phần lớn thời gian đầu, cây chỉ lo lớn rễ và thành một cụm lá ráp sát đất; theo các nguồn, cây trồng từ hạt có thể mất hai năm hoặc hơn để thành một khóm to và thường chưa ra hoa trong năm đầu. Đây là giai đoạn dài và ước lượng thô. Tránh bón nhiều phân vì cây sẽ cao, yếu và dễ đổ.',
        },
        'bud-formation': {
          description:
            'Khi cây đã đủ lớn, thân hoa vươn lên từ cụm lá và nụ xuất hiện ở đầu thân, được bao bởi các lá bắc xanh. Ở vùng ôn đới, việc này thường xảy ra vào đầu mùa hè.',
        },
        'bud-development': {
          description:
            'Nụ tròn dần, phần nón nâu hình thành bên trong lớp lá bắc và hé lộ màu hồng tím của những cánh hoa còn khép. Chẳng bao lâu nữa hoa sẽ nở.',
        },
        blooming: {
          description:
            'Các hoa tia hồng tím xòe ra rồi rủ nhẹ xuống, để lộ chiếc nón nâu cam hình vòm ở giữa. Từ ngoài vào trong, các hoa ống nhỏ trên nón lần lượt nở, thu hút ong và bướm.',
        },
        'full-bloom': {
          description:
            'Cụm hoa rộng tới khoảng 12 cm, cánh rủ quanh nón gai nâu sẫm. Theo Penn State Extension, cây ra hoa từ cuối tháng 6 đến đầu tháng 9; Clemson ghi hoa kéo dài từ giữa hè và lác đác đến khi có sương giá. Cắt hoa tàn giúp kéo dài mùa hoa.',
        },
        wilting: {
          name: 'Hoa tàn, kết hạt',
          description:
            'Cánh hoa phai, rủ rồi rụng, còn chiếc nón khô thành đầu hạt nâu gai góc. Chim sẻ vàng (goldfinch) rất thích hạt này, nên nhiều nguồn khuyên để lại đầu hạt qua mùa đông. Cây tự gieo hạt, và phần trên mặt đất tàn đi vào cuối năm trong khi rễ vẫn sống để mọc lại vào mùa xuân.',
        },
      },
      care: {
        light: 'Nắng trực tiếp; cây chịu được bóng râm một phần nhưng RHS lưu ý cây ra hoa kém trong bóng râm.',
        water:
          'Giữ đất ẩm khi mới gieo và mới trồng; khi đã bén rễ, cây chịu hạn và chịu nóng khá tốt. Tránh tưới lên lá để hạn chế bệnh.',
        soil:
          'Đất thoát nước tốt, hơi ẩm; cây thích nghi với nhiều loại đất, kể cả đất sét hoặc nhiều đá nhưng sợ úng. Không vùi cổ rễ và không phủ lớp mulch sát cổ rễ.',
        temperature:
          'Nảy mầm tốt ở khoảng 18–21°C (65–70°F). Các nguồn nêu cây chịu được vùng khí hậu từ vùng USDA 3 đến 8–9, nghĩa là chịu lạnh tốt và chịu nóng ẩm.',
        extra:
          'Trồng thưa để thông thoáng. Không bón nhiều phân. Cắt hoa tàn để ra hoa lâu hơn, nhưng nên chừa một số đầu hạt cho chim. Có thể chia khóm sau mỗi 3–4 năm vào mùa xuân; cây không thích bị xáo trộn nên không cần chia thường xuyên.',
      },
      facts: [
        'Chiếc “nón” ở giữa gồm vô số hoa ống nhỏ lưỡng tính, còn các “cánh” hồng tím xung quanh là hoa tia vô sinh, không tạo hạt.',
        'Echinacea bắt nguồn từ tiếng Hy Lạp echinos, nghĩa là “nhím” hay “nhím biển”, vì đầu hoa chín đầy gai; còn purpurea nghĩa là “tím đỏ”.',
        'Loài này được Linnaeus mô tả năm 1753 với tên Rudbeckia purpurea, đến năm 1794 Conrad Moench mới chuyển sang chi Echinacea.',
        'Ong nghệ, ong mật và nhiều loài bướm, kể cả bướm vua (monarch), ghé thăm hoa; chim sẻ vàng và các loài chim khác ăn hạt rồi phát tán chúng.',
        'Nhiều nguồn khuyên để thân khô đứng lại qua mùa đông: các loài ong bản địa làm tổ trong thân rỗng. Echinacea cũng là loại cây người ta chia khóm, giâm rễ hoặc giâm chồi gốc để nhân giống.',
      ],
      keywords: [
        'hoa cúc nón tím',
        'echinacea',
        'quá trình phát triển của hoa echinacea',
        'các giai đoạn phát triển của hoa cúc nón tím',
        'vòng đời echinacea',
        'time-lapse echinacea',
        'cách trồng echinacea từ hạt',
        'purple coneflower',
      ],
      altText:
        'Minh họa hoa cúc nón tím với thân thẳng, lá ráp hình mũi mác và những bông hoa có cánh hồng tím rủ quanh chiếc nón nâu cam nhô cao, cây lớn lên từ hạt trong đất.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính thô. Nảy mầm sau khoảng 10–20 ngày và cây con sẵn sàng trồng sau 20–28 ngày là theo Clemson Extension; các nguồn nêu cây trồng từ hạt thường chưa ra hoa trong năm đầu và cần hai năm hoặc hơn để thành khóm lớn, nên khoảng 1–2 năm đến lúc nở hoa là ước lượng, và độ dài các giai đoạn còn lại phụ thuộc khí hậu, giống và cách chăm.',
      startNote: 'Mô phỏng bắt đầu từ một hạt nhỏ, bốn cạnh nằm trong đất, thường được ủ lạnh ẩm trước khi nảy mầm.',
    },
    en: {
      name: 'Purple coneflower',
      aliases: ['echinacea', 'eastern purple coneflower', 'hedgehog coneflower'],
      tagline: 'Pink-purple petals drooping around a spiky orange-brown cone, though a plant grown from seed usually waits until its second year to bloom.',
      metaDescription:
        'Watch purple coneflower (Echinacea purpurea) grow from seed to full bloom in a time-lapse: growth stages, estimated timing, growing tips and plant facts.',
      intro: [
        'Purple coneflower (Echinacea purpurea), often just called echinacea, is a perennial herb in the daisy family, native to eastern North America, where it grows in dry open woods, prairies and barrens. It stands up to about 1.2 metres tall, with rough, oval to lance-shaped leaves.',
        'Each “flower”, around 7–15 cm across, is really a flower head: a domed central cone made of many small tubular florets, ringed by pink-purple ray florets that often droop. The name Echinacea comes from the Greek for “hedgehog”, because the ripe heads are spiny like sea urchins. The plant is drought tolerant, loves sun and is a prized nectar source for bees and butterflies.',
      ],
      stages: {
        seed: {
          description:
            'An echinacea “seed” is a small, dark, four-sided achene held in the cone. It often germinates better after a cold, moist spell: Mississippi State Extension says about 30–90 days helps even germination, while Wikipedia notes seeds also germinate well with daily temperature swings. Sowing in pots in autumn and leaving them outside is an easy way to chill them.',
        },
        germination: {
          description:
            'With moisture and warmth the seed swells, a root emerges and a shoot lifts out of the soil. Clemson Extension gives germination at about 10–20 days at 65–70 °F (18–21 °C) if the seed bed is kept misted.',
        },
        seedling: {
          description:
            'Two seed leaves open, followed by the first true leaves. Seedlings are usually ready to move to pots or the garden about 20–28 days after sowing, or once they have two or three sets of leaves. When planting, keep the crown level with the soil — burying it risks crown rot.',
        },
        vegetative: {
          description:
            'For a long time the plant mostly builds roots and a ground-hugging clump of rough leaves; sources say a plant from seed can take two years or more to become sizeable, and it often does not flower in its first year. This stage is long and its length here is a rough estimate. Avoid heavy feeding, which makes plants tall, weak and floppy.',
        },
        'bud-formation': {
          description:
            'Once the plant is big enough, flowering stems rise from the leaf clump and buds form at their tips, wrapped in green bracts. In temperate climates this usually happens in early summer.',
        },
        'bud-development': {
          description:
            'The buds round out, the brown cone forms inside the bracts and the first pink-purple of the still-closed petals shows. The flower is nearly ready to open.',
        },
        blooming: {
          description:
            'The pink-purple ray florets spread and then droop gently, revealing the domed orange-brown cone in the middle. The tiny florets on the cone open in turn, drawing in bees and butterflies.',
        },
        'full-bloom': {
          description:
            'Flower heads up to about 12 cm across hang their petals around a dark, spiny cone. Penn State Extension gives bloom from late June to early September; Clemson says it starts in mid-summer and continues sporadically until frost. Deadheading helps prolong flowering.',
        },
        wilting: {
          name: 'Wilting and seed set',
          description:
            'The petals fade, droop and drop, and the cone dries into a spiny brown seed head. Goldfinches love the seeds, so many sources suggest leaving the heads through winter. The plant self-sows, and its top growth dies back at season’s end while the roots survive to resprout in spring.',
        },
      },
      care: {
        light: 'Full sun; part shade is tolerated, but the RHS notes it does not flower freely in shade.',
        water:
          'Keep soil moist while seeds sprout and plants establish; after that it tolerates drought and heat well. Avoid watering over the leaves to limit disease.',
        soil:
          'Well-drained, evenly moist soil; it adapts to many soils, including clay and rocky ones, but dislikes waterlogging. Do not bury the crown or pile mulch against it.',
        temperature:
          'Germination is best around 18–21 °C (65–70 °F). Sources give hardiness from USDA zone 3 up to zones 8–9, so it copes with hard cold as well as heat and humidity.',
        extra:
          'Space plants for good airflow and go easy on fertiliser. Deadhead to extend flowering, but leave some seed heads for birds. Divide clumps every 3–4 years in spring; the plant dislikes disturbance, so there is no need to do it often.',
      },
      facts: [
        'The central “cone” is made of many small bisexual tubular florets, while the pink-purple “petals” around it are sterile ray florets that make no seed.',
        'Echinacea comes from the Greek echinos, “hedgehog” or “sea urchin”, for the spiny ripe heads; purpurea means “reddish-purple”.',
        'Linnaeus named it Rudbeckia purpurea in 1753; Conrad Moench moved it to the genus Echinacea in 1794.',
        'Bumblebees, honey bees and many butterflies, monarchs included, visit the flowers, while goldfinches and other birds eat and spread the seeds.',
        'Many sources suggest leaving dead stems standing through winter, since native bees nest in the hollow stems. Besides seed, the plant is propagated by division, root cuttings and basal cuttings.',
      ],
      keywords: [
        'purple coneflower growth stages',
        'echinacea flower life cycle',
        'time-lapse echinacea growth',
        'how to grow echinacea from seed',
        'how long does echinacea take to bloom',
        'does echinacea bloom the first year',
      ],
      altText:
        'Illustration of a purple coneflower with a straight stem, rough lance-shaped leaves and flowers whose pink-purple petals droop around a raised orange-brown cone, growing from a seed in the soil.',
      timeNote:
        'Timings are rough estimates. About 10–20 days to germinate and 20–28 days to transplant size come from Clemson Extension; sources say plants from seed usually do not flower in their first year and can take two years or more to form a sizeable clump, so 1–2 years to first bloom is an approximation, and the lengths of the other stages depend on climate, cultivar and care.',
      startNote: 'The simulation starts from a single small, four-sided seed in the soil, which is often chilled while moist before it germinates.',
    },
  },
};
