import type { FlowerData } from '../types';

export const chrysanthemum: FlowerData = {
  id: 'chrysanthemum',
  slugs: { vi: 'hoa-cuc', en: 'chrysanthemum' },
  scientificName: 'Chrysanthemum × morifolium',
  scientificAliases: ['Chrysanthemum', 'Chrysanthemum morifolium', 'Dendranthema grandiflorum', 'garden mum', 'florist mum'],
  family: 'Asteraceae',
  group: 'perennial',
  colors: ['yellow', 'white', 'pink', 'red', 'orange', 'purple'],
  bloomSeasons: ['autumn'],
  daysToBloom: [130, 245],
  speedBand: 'medium',
  startMaterial: 'seed-or-cutting',
  confidence: 'low',
  featured: true,
  stages: [
    { id: 'seed', days: [1, 3] },
    { id: 'germination', days: [7, 14] },
    { id: 'seedling', days: [21, 35] },
    { id: 'vegetative', days: [60, 110] },
    { id: 'bud-formation', days: [14, 28] },
    { id: 'bud-development', days: [28, 56] },
    { id: 'blooming', days: [7, 14] },
    { id: 'full-bloom', days: [14, 35] },
    { id: 'wilting', days: [30, 60] },
  ],
  visual: {
    archetype: 'chrysanthemum',
    palette: {
      petal: '#f3c623',
      petalDeep: '#d99a00',
      petalTip: '#fff0a0',
      center: '#e0a800',
      centerDeep: '#a87400',
      leaf: '#3f7f3a',
      leafDeep: '#25562a',
      stem: '#47763a',
    },
  },
  related: ['marigold', 'sunflower', 'rose'],
  sources: [
    {
      title: 'Chrysanthemum × morifolium — accepted name',
      publisher: 'Kew — Plants of the World Online',
      url: 'https://powo.science.kew.org/taxon/77111328-1',
      supports: 'Accepted name, family Asteraceae, native to southeast China, perennial.',
    },
    {
      title: 'How to grow chrysanthemums',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/popular/chrysanthemum/growing-guide',
      supports: 'September–November flowering, seed germination in two weeks at 15 °C, cuttings, pinching, sun and soil.',
    },
    {
      title: 'Chrysanthemum × morifolium',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Chrysanthemum_%C3%97_morifolium',
      supports: 'Height, flowering under short days, florets and seed, hardiness zones, record plant.',
    },
    {
      title: 'Chrysanthemum',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Chrysanthemum',
      supports: 'Taxonomy, history in Japan and China, pyrethrum and chrysanthemum tea.',
    },
    {
      title: 'Mums the word for fall flowers',
      publisher: 'University of Wisconsin–Madison Extension',
      url: 'https://hort.extension.wisc.edu/mums-the-word-for-fall-flowers',
      supports: 'Short-day flowering, at least 6 hours of sun, pinching.',
    },
    {
      title: 'Growing chrysanthemums in Iowa',
      publisher: 'Iowa State University Extension',
      url: 'https://yardandgarden.extension.iastate.edu/how-to/growing-chrysanthemums-iowa',
      supports: 'Buds set as days shorten, street lights can delay flowering, spacing and care.',
    },
    {
      title: 'Floral induction in the short-day plant chrysanthemum',
      publisher: 'Frontiers in Plant Science (SharathKumar et al., 2021)',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7868430',
      supports: 'Obligate short-day plant; flowering under 11 h days but not 15 h; initiation within 14 days (greenhouse cultivar).',
    },
  ],
  text: {
    vi: {
      name: 'Hoa cúc',
      aliases: ['cúc', 'cúc đại đóa', 'cúc vàng', 'hoa cúc mâm xôi'],
      tagline: 'Hoa của những ngày thu ngắn dần: cúc chỉ nở khi đêm đủ dài.',
      metaDescription:
        'Time-lapse hoa cúc (Chrysanthemum × morifolium): từ hạt hoặc cành giâm đến nụ và nở rộ. Vì sao cúc nở vào mùa thu, thời gian ước tính và cách chăm sóc.',
      intro: [
        'Hoa cúc trồng vườn và cúc bán trong chậu (Chrysanthemum × morifolium) là cây lai sống lâu năm thuộc họ Cúc (Asteraceae). Theo Kew, loài này có nguồn gốc ở đông nam Trung Quốc. Cúc được trồng ở Nhật Bản từ khoảng thế kỷ 5, và hoa cúc là biểu tượng của hoàng gia Nhật.',
        'Cúc là cây ngày ngắn: nó ra hoa khi đêm dài ra vào cuối hạ và thu. Vì vậy chiếu sáng ban đêm — như đèn đường — có thể làm cúc ra hoa chậm hoặc không ra hoa. Mô phỏng dưới đây minh họa cây cúc lớn từ hạt; trong thực tế, hầu hết cúc được nhân giống bằng cành giâm, và các mốc thời gian chỉ là ước tính rộng.',
      ],
      stages: {
        seed: {
          name: 'Hạt hoặc cành giâm',
          description:
            'Chỉ một số ít giống cúc được bán dưới dạng hạt; đa số được nhân bằng cành giâm, chia cây hoặc nuôi cấy mô. Cành giâm ra rễ trong khoảng ba tuần (RHS).',
        },
        germination: {
          description:
            'Gieo vào mùa xuân ở khoảng 15°C, hạt nảy mầm trong vòng hai tuần (RHS). Hai lá mầm nhỏ xòe ra trên mặt đất.',
        },
        seedling: {
          description:
            'Cây con ra những lá thật đầu tiên, có thùy sâu. Cây đón nắng và lớn nhanh khi trời ấm dần.',
        },
        vegetative: {
          description:
            'Giai đoạn sinh trưởng dài: cây phân cành, ra nhiều lá. Người trồng thường bấm ngọn khi cây cao khoảng 20 cm để cây phân nhánh, và ngừng bấm khoảng giữa hè để không làm chậm ra hoa (RHS; Iowa State).',
        },
        'bud-formation': {
          description:
            'Khi ngày ngắn lại và đêm dài ra vào cuối hạ, cây chuyển sang ra nụ. Trong một nghiên cứu trong nhà kính trên một giống cúc, sự khởi phát hoa diễn ra trong vòng khoảng 14 ngày sau khi cây gặp ngày ngắn; ngưỡng đêm dài chính xác vẫn chưa được xác định rõ.',
        },
        'bud-development': {
          description:
            'Nụ lớn dần, vảy bao bọc hé lộ màu cánh hoa. Cúc dễ bị sương giá làm hỏng nụ: Iowa State lưu ý nhiều giống cúc bán cho nghề cắt hoa nở muộn đến mức sương giá thường giết nụ trước khi nở.',
        },
        blooming: {
          description:
            'Các cánh hoa ngoài cùng tách ra khỏi nụ. Mỗi “bông” cúc thực ra là một cụm nhiều hoa nhỏ: các cánh hoa dài là hoa dạng dải, còn nhụy nhị nằm ở hoa dạng ống ở giữa.',
        },
        'full-bloom': {
          description:
            'Cụm hoa nở xòe đầy đặn. Giống cúc vườn thường nở từ khoảng tháng 9 đến tháng 11 (RHS, vùng khí hậu Anh); mỗi hoa nhỏ có thể tạo ra một hạt.',
        },
        wilting: {
          name: 'Hoa tàn, kết hạt',
          description:
            'Cánh hoa phai màu và khô. Phần hạt (quả bế) chín trong cụm hoa tàn. Cúc vườn thường được giữ lại bằng cách cắt tỉa gốc, phủ gốc qua mùa đông hoặc chia cây sau vài năm.',
        },
      },
      care: {
        light: 'Nắng đầy đủ, tối thiểu 6 giờ mỗi ngày (UW–Madison, Iowa State); nơi ấm, kín gió (RHS).',
        water: 'Không để đất khô hoàn toàn nhưng cũng không để úng nước (RHS).',
        soil: 'Đất màu mỡ, thoát nước tốt.',
        temperature:
          'Phần lớn giống cúc vườn chịu được ít nhất khoảng −5°C; ở nhiều nơi nên đào gốc để qua đông (RHS). Wikipedia nêu cúc vườn chịu lạnh ở vùng 5–9 theo USDA.',
        extra:
          'Bấm ngọn để cây phân nhánh và nở nhiều hoa. Tránh để đèn đêm chiếu vào cây vì có thể làm cúc ra hoa chậm (Iowa State).',
      },
      facts: [
        'Cúc được đưa từ Trung Quốc sang Nhật Bản vào thế kỷ 5; ngôi vị hoàng gia Nhật được gọi là “Ngai Hoa Cúc”.',
        'Đến năm 1630, đã có hơn 500 giống cúc được ghi nhận ở Trung Quốc.',
        'Thuốc trừ sâu pyrethrum được chiết từ hoa cúc, và trà hoa cúc được làm từ Chrysanthemum × morifolium.',
        'Năm 2020, vườn Longwood trưng bày một cây cúc “Ngàn bông” với 1.362 bông hoa, được chăm sóc suốt 17 tháng.',
      ],
      keywords: [
        'hoa cúc',
        'quá trình phát triển của hoa cúc',
        'vòng đời của hoa cúc',
        'các giai đoạn phát triển của hoa cúc',
        'cách trồng hoa cúc',
        'time-lapse hoa cúc',
      ],
      altText:
        'Minh họa một cây hoa cúc vàng nhiều lớp cánh dạng dải trên thân xanh với lá xẻ thùy, lớn lên từ hạt trong đất.',
      timeNote:
        'Các nguồn tham khảo chỉ nói cúc trồng từ cây con đầu mùa hè “ra hoa sau vài tháng” và không đưa số ngày chuẩn từ hạt đến hoa. Các mốc ở đây là khoảng ước tính rộng, độ tin cậy thấp, không phải lịch trình.',
      startNote:
        'Mô phỏng bắt đầu từ hạt; trong thực tế, đa số cúc được nhân bằng cành giâm, chia cây hoặc nuôi cấy mô.',
    },
    en: {
      name: 'Chrysanthemum',
      aliases: ['mum', 'garden mum', 'florist mum'],
      tagline: 'A flower of shortening autumn days: mums bloom only once the nights are long enough.',
      metaDescription:
        'Chrysanthemum (Chrysanthemum × morifolium) time-lapse: from seed or cutting to bud and full bloom. Why mums flower in autumn, estimated timing and care.',
      intro: [
        'Garden and florist chrysanthemums (Chrysanthemum × morifolium) are hybrid perennials in the daisy family (Asteraceae). According to Kew they are native to southeast China. Chrysanthemums reached Japan from China around the 5th century, and the flower is the emblem of Japan’s imperial family.',
        'Mums are short-day plants: they flower when the nights lengthen in late summer and autumn. That is why night-time lighting such as street lamps can delay flowering or stop it altogether. The simulation below shows a mum grown from seed; in practice most mums are propagated from cuttings, and the timings are broad estimates.',
      ],
      stages: {
        seed: {
          name: 'Seed or cutting',
          description:
            'Only a few chrysanthemum cultivars are sold as seed; most are propagated from cuttings, by division or by micropropagation. Cuttings root in about three weeks (RHS).',
        },
        germination: {
          description:
            'Sown in spring at about 15 °C, seed germinates within two weeks (RHS). Two small seed leaves open above the soil.',
        },
        seedling: {
          description:
            'The seedling makes its first true leaves, deeply lobed. It takes in the sun and grows quickly as the weather warms.',
        },
        vegetative: {
          description:
            'A long growing phase: the plant branches and builds up leaves. Gardeners usually pinch the tip at about 20 cm to make it bushy, and stop pinching around midsummer so as not to delay flowering (RHS; Iowa State).',
        },
        'bud-formation': {
          description:
            'As days shorten and nights lengthen in late summer, the plant switches to making buds. In one greenhouse study of a single cultivar, flower initiation took place within about 14 days of short days; the exact critical night length is still not well defined.',
        },
        'bud-development': {
          description:
            'Buds swell and the bracts loosen to show petal colour. Mums are vulnerable to frost: Iowa State notes that many florist-type mums flower so late that frost often kills the buds before they open.',
        },
        blooming: {
          description:
            'The outer petals unfold from the bud. Each “flower” is really a cluster of many small flowers: the long petals are ray florets, while the stamens and pistils sit in the tubular disc florets at the centre.',
        },
        'full-bloom': {
          description:
            'The head opens fully. Hardy garden types typically flower from about September to November (RHS, UK conditions); each tiny floret can produce a seed.',
        },
        wilting: {
          name: 'Wilting and seed',
          description:
            'Petals fade and dry. Seeds (achenes) ripen in the spent head. Garden mums are usually kept going by cutting back, mulching over winter, or dividing the clump after a few years.',
        },
      },
      care: {
        light: 'Full sun, at least 6 hours a day (UW–Madison, Iowa State); a warm, sheltered spot (RHS).',
        water: 'Never let the soil dry out completely, but avoid waterlogging (RHS).',
        soil: 'Fertile, well-drained soil.',
        temperature:
          'Most hardy garden mums survive to at least about −5 °C; in many places lifting the stool for winter is safer (RHS). Wikipedia lists garden types as hardy in USDA zones 5–9.',
        extra:
          'Pinch the tips to get bushier plants with more flowers. Keep night-time lights off the plants, since they can delay flowering (Iowa State).',
      },
      facts: [
        'Chrysanthemums reached Japan from China in the 5th century; the Japanese monarchy is known as the Chrysanthemum Throne.',
        'More than 500 cultivars were recorded in China by 1630.',
        'The insecticide pyrethrum is extracted from chrysanthemum flowers, and chrysanthemum tea is made from Chrysanthemum × morifolium.',
        'In 2020 Longwood Gardens displayed a “Thousand Bloom” mum carrying 1,362 blossoms, grown over 17 months.',
      ],
      keywords: [
        'chrysanthemum growth stages',
        'chrysanthemum life cycle',
        'time-lapse chrysanthemum flower',
        'why do mums bloom in fall',
        'how to grow chrysanthemums',
        'garden mum care',
      ],
      altText:
        'Illustration of a yellow chrysanthemum with many layered ray petals on a green stem with lobed leaves, grown from seed in the soil.',
      timeNote:
        'The sources we consulted only say that young mums planted in early to midsummer “flower after a few months” and give no standard seed-to-flower count. These milestones are wide, low-confidence estimates, not a schedule.',
      startNote:
        'The simulation starts from seed; in practice most mums are propagated from cuttings, by division or by micropropagation.',
    },
  },
};
