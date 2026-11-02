import type { FlowerData } from '../types';

export const gerbera: FlowerData = {
  id: 'gerbera',
  slugs: { vi: 'hoa-dong-tien', en: 'gerbera' },
  scientificName: 'Gerbera jamesonii',
  scientificAliases: ['Gerbera', 'Gerbera × hybrida', 'Barberton daisy', 'Transvaal daisy'],
  family: 'Asteraceae',
  group: 'perennial',
  colors: ['red', 'orange', 'yellow', 'pink', 'white'],
  bloomSeasons: ['spring', 'summer', 'autumn'],
  daysToBloom: [120, 180],
  speedBand: 'medium',
  startMaterial: 'seed',
  confidence: 'moderate',
  featured: false,
  stages: [
    { id: 'seed', days: [1, 3] },
    { id: 'germination', days: [14, 21] },
    { id: 'seedling', days: [30, 50] },
    { id: 'vegetative', days: [45, 80] },
    { id: 'bud-formation', days: [14, 28] },
    { id: 'bud-development', days: [10, 21] },
    { id: 'blooming', days: [2, 5] },
    { id: 'full-bloom', days: [60, 120] },
    { id: 'wilting', days: [14, 40] },
  ],
  visual: {
    archetype: 'gerbera',
    palette: {
      petal: '#ee5a3c',
      petalDeep: '#c93a22',
      petalTip: '#f9a07a',
      center: '#3a2a22',
      centerDeep: '#1f1612',
      leaf: '#5f9a48',
      leafDeep: '#3a6e34',
      stem: '#6a9a4c',
    },
  },
  related: ['daisy', 'zinnia', 'marigold'],
  sources: [
    {
      title: 'Gerbera jamesonii',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Gerbera_jamesonii',
      supports:
        'Origin in south-eastern Africa, tufted perennial habit, leafless flowering scapes up to 75 cm, lobed leaves in a rosette, flower heads 4–5 cm across with orange-red rays, name honouring Robert Jameson, ancestor of cultivated gerberas, bee pollination.',
    },
    {
      title: 'Gerbera',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Gerbera',
      supports:
        'Genus named after Traugott Gerber, leaves all in a rosette, one-headed inflorescences, ray florets with a large strap-shaped outer lip, first described by Hooker in 1889, also called African daisy.',
    },
    {
      title: 'How to grow gerberas',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/gerbera/growing-guide',
      supports:
        'Perennial but mostly tender, full sun and well-drained soil, flowering at 10–20 °C, sowing in February or March at 20–25 °C, light needed to germinate, germination in two to three weeks, flowering four to six months after sowing, crown kept above the soil, watering, deadheading, spacing.',
    },
    {
      title: 'Gerbera jamesonii (Barberton daisy) — Plant Toolbox',
      publisher: 'NC State Extension',
      url: 'https://plants.ces.ncsu.edu/plants/gerbera-jamesonii/',
      supports:
        'Perennial often grown as an annual, leafless stems with a solitary bloom, lobed basal leaves, 7–20 rays, flower size, colours, full sun to partial shade, good drainage, brown achene fruit, cut-flower value.',
    },
    {
      title: 'Gerbera Daisy',
      publisher: 'University of Florida IFAS Extension — Gardening Solutions',
      url: 'https://gardeningsolutions.ifas.ufl.edu/plants/ornamentals/gerbera-daisy.html',
      supports:
        'Native to South Africa, grown as annuals where freezes are prolonged, leafless flower stems above a clump of fuzzy leaves, morning sun and afternoon shade, good drainage, crown at or slightly above soil level, spacing of 12–18 inches, cut-flower use.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa đồng tiền',
      aliases: ['đồng tiền', 'cúc đồng tiền', 'gerbera', 'cúc Transvaal', 'cúc Barberton'],
      tagline: 'Một cọng cuống trần vươn lên khỏi cụm lá thấp, đội bông hoa tròn rực rỡ, vài tháng sau một hạt giống nhỏ.',
      metaDescription:
        'Xem hoa đồng tiền lớn lên từ hạt đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách trồng và những điều thú vị.',
      intro: [
        'Hoa đồng tiền (Gerbera jamesonii) là cây thân thảo sống nhiều năm thuộc họ Cúc, có nguồn gốc từ Đông Nam châu Phi. Cây mọc thành bụi với lá xẻ thùy xếp thành hoa thị sát đất, còn mỗi bông hoa nằm trên một cuống trần dài, không có lá. Ở nơi lạnh, cây thường chỉ được trồng như cây một năm hoặc đem vào nhà qua mùa đông.',
        'Mỗi “bông” rộng chừng 4–5 cm (giống trồng có thể lớn hơn) thật ra là một cụm hoa: nhiều hoa tia dài, hẹp xếp quanh đĩa hoa ống ở giữa. Màu tự nhiên của loài thường là đỏ cam, còn các giống trồng có đủ sắc vàng, cam, hồng, trắng. Hoa bền nên được dùng nhiều làm hoa cắt cành và hoa chậu.',
      ],
      stages: {
        seed: {
          description:
            'Hạt đồng tiền là quả bế nhỏ, thon, đầu có chùm lông mịn gọi là mào lông, giúp hạt bay theo gió. RHS khuyên dùng hạt còn tươi vì tỉ lệ nảy mầm giảm theo thời gian. Hạt được gieo thưa, đặt đứng trong đất gieo hạt có thêm cát thô, đầu có lông chĩa lên trên.',
        },
        germination: {
          description:
            'Hạt cần ít ánh sáng để nảy mầm nên không được vùi sâu, và cần nhiệt độ khoảng 20–25°C (68–75°F). RHS ghi thời gian nảy mầm thường là hai đến ba tuần. Cây con rất dễ bị úng thối nên chỉ tưới cẩn thận, không để đất sũng nước.',
        },
        seedling: {
          description:
            'Cây con đẩy lên những lá đầu tiên, rồi lá thật dần có dạng thùy sâu đặc trưng. Cây còn yếu nên cần ấm, sáng và tránh ẩm ướt; khi lớn đủ chắc mới chuyển ra chậu hoặc luống. Với giống trồng ngoài trời ở nơi lạnh, chỉ nên ra ngoài khi đêm luôn trên 5°C.',
        },
        vegetative: {
          description:
            'Lá xếp thành cụm hoa thị thấp, lá dài và hơi phủ lông tơ, mép xẻ thùy, có thể dài hàng chục cm. Thân cây không mọc cao: lá nằm sát gốc. Cần giữ cổ rễ (chỗ lá mọc ra) cao hơn mặt đất một chút để không bị thối, và tránh làm ướt cổ rễ khi tưới.',
        },
        'bud-formation': {
          description:
            'Từ giữa cụm lá, một cuống hoa trần, không lá nhú lên mang một nụ duy nhất ở đỉnh. Cây có thể ra một hoặc vài cuống từ mỗi cụm lá. RHS cho biết cây mới trồng từ hạt thường ra hoa sau bốn đến sáu tháng kể từ khi gieo.',
        },
        'bud-development': {
          description:
            'Cuống vươn dài, nụ phồng lên trong vòng lá bắc xếp nhiều lớp. Màu của các cánh hoa bắt đầu lộ ra ở đầu nụ trước khi hoa bung. Để hoa nhiều, RHS khuyên bón thêm phân giàu kali cho cây trồng chậu vào mùa hè.',
        },
        blooming: {
          description:
            'Các hoa tia hẹp, dài từ từ duỗi ra khỏi nụ và xòe thành chiếc đĩa tròn trên đỉnh cuống. Hoa tia có một môi ngoài lớn dạng dải, còn ở giữa là đĩa hoa ống bắt đầu nở. Hoa thu hút ong và các côn trùng khác đến thụ phấn.',
        },
        'full-bloom': {
          description:
            'Bông hoa nở trọn, rộng khoảng 4–5 cm hoặc hơn tùy giống (NC State nêu kích thước hoa 3–6 inch, tức khoảng 8–15 cm), nằm một mình trên cuống cao khỏi cụm lá. Cây ra hoa thích hợp ở khoảng 10–20°C; ngoài khoảng này cây thường ngừng ra hoa rồi nở lại khi nhiệt độ trở về mức ưa thích. Cắt cả cuống hoa tàn sát gốc để cây ra thêm cuống mới.',
        },
        wilting: {
          name: 'Hoa tàn',
          description:
            'Cánh hoa rũ và khô lại, đĩa giữa chuyển nâu và có thể kết quả bế nâu. Nếu cắt bỏ cả cuống hoa tàn, cây sẽ dồn sức ra hoa mới thay vì làm hạt. Ở nơi lạnh, cây không chịu được nhiệt độ dưới khoảng 5°C nên cần đem vào nhà trước khi sương giá đến.',
        },
      },
      care: {
        light: 'Chỗ ấm, nhiều sáng. RHS khuyên nắng đầy đủ nhưng tránh nắng gắt mùa hè làm cháy lá khi trồng trong nhà; ở nơi nóng, UF/IFAS gợi ý nắng sáng và bóng râm buổi chiều.',
        water:
          'Giữ đất ẩm nhưng thoát nước tốt, không để nước đọng. Tránh làm ướt cổ rễ và lá khi tưới. Với chậu, để đất khô nhẹ giữa các lần tưới; mùa đông giữ đất hơi khô. Tưới quá nhiều dễ làm thối cổ rễ.',
        soil:
          'Đất màu mỡ, thoát nước tốt, không úng. Trồng chậu nên dùng giá thể tơi, trộn thêm sạn để thoát nước; đặt cổ rễ cao hơn mặt đất một chút.',
        temperature:
          'Ra hoa tốt khoảng 10–20°C và thường ngừng ra hoa ngoài khoảng đó; giống phổ biến phải luôn được giữ trên 5°C. Gieo hạt ở khoảng 20–25°C.',
        extra:
          'Trồng cách nhau khoảng 30 cm. Cắt hoa tàn cả cuống để cây ra hoa thêm. Sau vài năm, cụm cây chen chúc nên chia bụi vào đầu xuân.',
      },
      facts: [
        'Chi Gerbera được đặt tên để vinh danh nhà thực vật và bác sĩ người Đức Traugott Gerber (1710–1743), bạn của Carl Linnaeus. Tên loài jamesonii nhắc tới Robert Jameson, người thu thập cây gần thị trấn Barberton.',
        'Gerbera jamesonii là loài Gerbera đầu tiên được mô tả khoa học, do J. D. Hooker công bố trong Curtis’s Botanical Magazine năm 1889. Loài này là tổ tiên của các giống đồng tiền trồng ngày nay.',
        '“Bông” đồng tiền là một cụm hoa: các hoa tia hẹp, mỗi hoa có một môi ngoài lớn dạng dải, xếp quanh đĩa hoa ống ở giữa.',
        'Cuống hoa của đồng tiền trần và không có lá; toàn bộ lá nằm trong cụm hoa thị sát gốc.',
        'Hình của loài hoa này có trên cờ và huy hiệu của tỉnh Mpumalanga ở Nam Phi.',
      ],
      keywords: [
        'hoa đồng tiền',
        'quá trình phát triển của hoa đồng tiền',
        'các giai đoạn phát triển của hoa đồng tiền',
        'vòng đời hoa đồng tiền',
        'time-lapse hoa đồng tiền',
        'cách trồng hoa đồng tiền từ hạt',
        'hoa gerbera',
      ],
      altText:
        'Minh họa hoa đồng tiền với cụm lá xẻ thùy sát đất và những cuống trần vươn cao, mỗi cuống mang một bông hoa cam đỏ nhiều cánh dài hẹp quanh tâm sẫm, cây lớn lên từ hạt giống trong đất.',
      timeNote:
        'Các mốc thời gian là ước tính. RHS nêu hạt nảy mầm sau khoảng hai đến ba tuần và cây ra hoa sau khoảng bốn đến sáu tháng kể từ khi gieo; độ dài của từng giai đoạn ở giữa, cũng như giai đoạn nở rộ và tàn, chỉ là ước lượng thô, phụ thuộc giống, nhiệt độ và ánh sáng. Cây thực chất là cây lâu năm, không phải cây một năm.',
      startNote: 'Mô phỏng bắt đầu từ một hạt có mào lông, đặt đứng trong đất gieo hạt tơi và không vùi sâu.',
    },
    en: {
      name: 'Gerbera',
      aliases: ['Barberton daisy', 'Transvaal daisy', 'African daisy', 'gerbera daisy'],
      tagline: 'A bare stalk rising from a low rosette of leaves, topped by a bold round bloom, only months after one small seed.',
      metaDescription:
        'Watch a gerbera grow from seed to full bloom in an interactive time-lapse: growth stages, estimated timing, growing tips and surprising plant facts.',
      intro: [
        'Gerbera (Gerbera jamesonii), also called the Barberton daisy or Transvaal daisy, is a tufted perennial in the daisy family, native to south-eastern Africa. It forms a clump of lobed leaves in a rosette close to the ground, while each flower sits on its own long, leafless stalk. Where winters are cold it is usually grown as an annual or brought indoors for the season.',
        'Each “flower”, about 4–5 cm across in the wild species (cultivars can be bigger), is really a flower head: many long, narrow ray florets around a disc of tubular florets. The species is typically orange-red, while garden cultivars come in yellow, orange, pink and white as well. The blooms last well, so it is popular as a cut flower and a pot plant.',
      ],
      stages: {
        seed: {
          description:
            'A gerbera “seed” is a small, tapered fruit (an achene) topped with a tuft of fine bristles called a pappus, which lets it drift on the wind. The RHS advises using fresh seed because germination rates fall with age. Seeds are sown thinly, set upright in seed compost with some added sharp sand, with the feathered end pointing up.',
        },
        germination: {
          description:
            'The seed needs some light to germinate, so it is not buried deeply, and it wants about 20–25 °C (68–75 °F). The RHS gives germination as usually taking two to three weeks. Seedlings rot easily, so water carefully and never leave the compost soggy.',
        },
        seedling: {
          description:
            'The seedling pushes up its first leaves, and the true leaves gradually take on their typical deeply lobed shape. Young plants are fragile and need warmth, light and no wet feet; once they are robust enough they move to pots or beds. Outdoors in cool climates, wait until nights are reliably above 5 °C.',
        },
        vegetative: {
          description:
            'The leaves form a low rosette: long, slightly downy and lobed at the edges, sometimes tens of centimetres long. The plant does not grow tall; the foliage stays near the ground. Keep the crown (where the leaves sprout) slightly above the soil so it does not rot, and avoid wetting it when you water.',
        },
        'bud-formation': {
          description:
            'From the middle of the rosette a bare, leafless flower stalk rises, carrying a single bud at its tip. One or several stalks can come from each rosette. The RHS says plants raised from seed usually flower four to six months after sowing.',
        },
        'bud-development': {
          description:
            'The stalk lengthens and the bud swells inside its several rows of bracts. Colour begins to show at the tip of the bud before it opens. To boost flowering, the RHS suggests a high-potassium feed for potted plants in summer.',
        },
        blooming: {
          description:
            'The long, narrow ray florets slowly unfurl from the bud and spread into a round disc at the top of the stalk. Each ray has one large strap-shaped outer lip, and the tubular disc florets in the centre begin to open. Bees and other insects visit and pollinate the flowers.',
        },
        'full-bloom': {
          description:
            'The head opens fully, about 4–5 cm across or more depending on cultivar (NC State lists flower size as 3–6 inches, about 8–15 cm), held alone on a stalk above the leaf rosette. Flowering is best at about 10–20 °C; outside that range plants often stop and then restart once temperatures return to the preferred range. Remove spent stalks right at the base so the plant sends up new ones.',
        },
        wilting: {
          name: 'Wilting',
          description:
            'The rays droop and dry, and the centre darkens and may set brown achenes. Cutting off the whole spent stalk makes the plant put its energy into new flowers instead of seed. In cold climates the plant cannot take temperatures much below about 5 °C, so bring it indoors before frost.',
        },
      },
      care: {
        light:
          'A warm, bright spot. The RHS recommends full sun but warns that direct summer sun can scorch indoor plants; in hot regions UF/IFAS suggests morning sun and afternoon shade.',
        water:
          'Keep the soil moist but well drained, never waterlogged. Avoid wetting the crown and leaves when watering. In pots let the compost dry out a little between waterings, and keep it on the dry side in winter. Overwatering can rot the crown and roots.',
        soil:
          'Fertile, free-draining soil that does not waterlog. In containers use a gritty, free-draining compost and set the crown slightly above the surface.',
        temperature:
          'Flowers best at about 10–20 °C and often stops outside that range; common cultivars must always be kept above 5 °C. Sow seed at about 20–25 °C.',
        extra:
          'Space plants about 30 cm (1 ft) apart. Deadhead by cutting the whole spent stalk at the base to get more flowers. After several years the clumps become crowded, so divide them in early spring.',
      },
      facts: [
        'The genus Gerbera honours the German botanist and physician Traugott Gerber (1710–1743), a friend of Carl Linnaeus. The species name jamesonii recalls Robert Jameson, who collected the plant near the town of Barberton.',
        'Gerbera jamesonii was the first Gerbera species to be scientifically described, by J. D. Hooker in Curtis’s Botanical Magazine in 1889. It is the ancestor of today’s cultivated gerberas, which are sold in thousands of cultivars.',
        'The gerbera “flower” is a flower head: narrow ray florets, each with one large strap-shaped outer lip, around a disc of tubular florets.',
        'A gerbera flower stalk is bare and leafless; all the leaves sit in a rosette at the base of the plant.',
        'The flower appears on the flag and coat of arms of the Mpumalanga province of South Africa.',
      ],
      keywords: [
        'gerbera growth stages',
        'gerbera flower life cycle',
        'time-lapse gerbera growth',
        'how to grow gerbera from seed',
        'how long does gerbera take to bloom',
        'gerbera daisy care',
      ],
      altText:
        'Illustration of a gerbera plant with a low rosette of lobed leaves and bare, upright stalks, each carrying one orange-red flower with many long narrow petals around a dark centre, growing from a seed in the soil.',
      timeNote:
        'Timings are estimates. The RHS gives about two to three weeks to germinate and about four to six months from sowing to flowering; the lengths of the middle stages, full bloom and wilting are rough guesses that depend on cultivar, temperature and light. The plant is really a perennial, not an annual.',
      startNote: 'The simulation starts from a single bristle-tufted seed set upright in loose seed compost, not buried deep.',
    },
  },
};
