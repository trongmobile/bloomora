import type { FlowerData } from '../types';

export const daisy: FlowerData = {
  id: 'daisy',
  slugs: { vi: 'hoa-cuc-hoa-mi', en: 'daisy' },
  scientificName: 'Bellis perennis',
  scientificAliases: ['Bellis', 'common daisy', 'English daisy', 'lawn daisy', 'Aster bellis'],
  family: 'Asteraceae',
  group: 'perennial',
  colors: ['white', 'pink', 'red'],
  bloomSeasons: ['spring', 'summer', 'autumn'],
  daysToBloom: [90, 300],
  speedBand: 'medium',
  startMaterial: 'seed',
  confidence: 'low',
  featured: false,
  stages: [
    { id: 'seed', days: [1, 7] },
    { id: 'germination', days: [7, 21] },
    { id: 'seedling', days: [30, 60] },
    { id: 'vegetative', days: [40, 150] },
    { id: 'bud-formation', days: [7, 21] },
    { id: 'bud-development', days: [7, 14] },
    { id: 'blooming', days: [1, 3] },
    { id: 'full-bloom', days: [60, 180] },
    { id: 'wilting', days: [14, 60] },
  ],
  visual: {
    archetype: 'daisy',
    palette: {
      petal: '#fbf6f3',
      petalDeep: '#e79ab0',
      petalTip: '#ffffff',
      center: '#f4c20d',
      centerDeep: '#b88a00',
      leaf: '#5f9b47',
      leafDeep: '#37733a',
      stem: '#6a9a4c',
    },
  },
  related: ['cosmos', 'gerbera', 'echinacea'],
  sources: [
    {
      title: 'Bellis perennis L.',
      publisher: 'International Plant Names Index (Kew, Harvard University Herbaria, Australian National Herbarium)',
      url: 'https://www.ipni.org/n/184409-1',
      supports: 'Name and author (Linnaeus), published in Species Plantarum 2: 886 on 1 May 1753, family Asteraceae.',
    },
    {
      title: 'Bellis perennis',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Bellis_perennis',
      supports:
        'Perennial habit up to 20 cm, rhizomes and flat leaf rosettes, flower head size, white ray florets often red-tipped, leafless stems, heliotropism, bloom from March to September, hardiness, propagation by seed or division, etymology (bellus, perennis, “day’s eye”), native range.',
    },
    {
      title: 'Bellis perennis',
      publisher: 'Wikipedia tiếng Việt',
      url: 'https://vi.wikipedia.org/wiki/Bellis_perennis',
      supports: 'Vietnamese name “cúc Anh”, family Asteraceae, first described by Linnaeus in 1753, height, ray colours, rosette leaves.',
    },
    {
      title: 'Bellis perennis (English daisy) — Plant Toolbox',
      publisher: 'NC State Extension',
      url: 'https://plants.ces.ncsu.edu/plants/bellis-perennis/',
      supports:
        'Grown as a tender biennial or annual, preference for sun with afternoon shade and cool, moist, fertile soil, decline in summer heat, low drought tolerance, slow start then rapid growth, propagation by seed or division, 3–6 inch height, bloom colours, double forms, achene fruit, pollinators, toxicity note.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa cúc họa mi',
      aliases: ['cúc họa mi', 'cúc Anh', 'daisy', 'cúc daisy', 'cúc bãi cỏ'],
      tagline: 'Bông hoa bé xíu, cánh trắng đầu hồng, nằm sát đất và mở ra mỗi sáng như “con mắt của ngày”.',
      metaDescription:
        'Xem hoa cúc họa mi lớn lên từ hạt đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách trồng và điều thú vị.',
      intro: [
        'Hoa cúc họa mi (Bellis perennis), còn gọi là cúc Anh hay daisy, là cây thân thảo lâu năm thuộc họ Cúc, có nguồn gốc từ châu Âu. Cây rất thấp, cao tối đa khoảng 20 cm, với những lá nhỏ hình bầu dục hoặc hình thìa xếp thành vòng sát mặt đất. Nó thường mọc thành đám trên bãi cỏ nên còn được gọi là “lawn daisy”.',
        'Mỗi “bông” rộng chừng 2–3 cm thật ra là một cụm hoa: nhiều hoa tia màu trắng, thường có đầu hồng hoặc đỏ, xếp quanh đĩa hoa ống màu vàng, và mỗi cụm nằm trên một cuống không lá dài 2–10 cm. Các giống vườn có thể có hoa đơn hoặc hoa kép, màu trắng, hồng hoặc đỏ.',
      ],
      stages: {
        seed: {
          description:
            'Hạt cúc họa mi là quả bế nhỏ, không có túm lông. Theo Wikipedia, có thể gieo hạt sau đợt sương giá cuối cùng; nhiều người gieo hạt rồi trồng như cây hai năm làm hoa trang trí. Hạt được rải trên mặt đất tơi, ẩm.',
        },
        germination: {
          description:
            'Hạt hút nước, rễ mầm chui ra và chồi non nhú lên khỏi mặt đất. Các nguồn tôi đã kiểm tra không nêu số ngày nảy mầm cụ thể, nên khoảng thời gian ở đây chỉ là ước lượng thô cho điều kiện mát và ẩm.',
        },
        seedling: {
          description:
            'Cặp lá mầm xòe ra, rồi những lá thật nhỏ hình thìa mọc ra sát đất. NC State nhận xét cây “khởi động chậm” rồi mới lớn nhanh, nên giai đoạn cây con có thể kéo dài nhiều tuần.',
        },
        vegetative: {
          description:
            'Cây tạo thành một vòng lá dẹt sát đất, dài khoảng 2–5 cm mỗi lá, và có thân rễ ngắn bò ngầm để lan rộng. Cây thích mát, đất ẩm và màu mỡ, nắng kèm bóng râm buổi chiều. Khi trời nóng, cây yếu đi và không chịu hạn.',
        },
        'bud-formation': {
          description:
            'Từ giữa vòng lá, những cuống hoa không lá nhú lên, mỗi cuống mang một nụ nhỏ được bao bởi hai hàng lá bắc xanh. Cuống ngắn, chỉ 2–10 cm, nên nụ nằm sát dưới tán lá.',
        },
        'bud-development': {
          description:
            'Nụ phồng lên, các lá bắc xanh hé ra và để lộ đầu hồng của những cánh hoa còn khép bên trong. Nụ chưa nở thường đỏ hồng hơn hoa đã nở.',
        },
        blooming: {
          description:
            'Các hoa tia trắng xòe ra như một vành nan quanh đĩa vàng, thường vẫn giữ đầu cánh màu hồng đến đỏ. Cả cụm hoa nở vào buổi sáng và khép lại về đêm, đó là lý do tên “daisy” bị cho là biến âm của “day’s eye” (mắt của ngày).',
        },
        'full-bloom': {
          description:
            'Nhiều bông nhỏ nở cùng lúc, có thể xoay theo hướng mặt trời. Theo Wikipedia, cây ra hoa từ khoảng tháng 3 đến tháng 9; ở nơi lý tưởng, mùa hoa rất dài và thậm chí có vài bông giữa mùa đông ôn hòa. NC State ghi mùa hoa chính là mùa xuân đến đầu hè, sau đó nở lẻ tẻ đến khi có sương giá.',
        },
        wilting: {
          name: 'Hoa tàn, kết hạt',
          description:
            'Cánh hoa rụng dần, đĩa vàng ở giữa khô thành đầu hạt chứa các quả bế nhỏ. Cây sống lâu năm nên vòng lá vẫn còn qua năm sau, và có thể nhân bằng cách chia cụm sau khi ra hoa. Ở vùng nóng, cây thường yếu đi vào giữa hè.',
        },
      },
      care: {
        light: 'Nắng đầy đủ đến bóng râm một phần; NC State khuyên chọn nơi nắng kèm bóng mát buổi chiều ở vùng nóng.',
        water: 'Giữ đất ẩm đều; cây không chịu hạn và yếu đi khi trời nóng khô.',
        soil: 'Đất thoát nước tốt nhưng giữ ẩm, giàu chất hữu cơ và màu mỡ; chấp nhận đất sét, thịt hoặc cát, pH từ chua đến kiềm.',
        temperature:
          'Ưa khí hậu mát. Wikipedia nêu cây có thể trồng ở nơi nhiệt độ thấp nhất trên khoảng −35°C; nắng nóng mùa hè làm cây suy yếu.',
        extra:
          'Nhân giống bằng hạt sau đợt sương giá cuối hoặc chia cụm sau khi ra hoa. Cây dễ lan ra bãi cỏ nên có thể thành cỏ dại. NC State ghi cây có độc ở mức trung bình, nên không nên ăn nhiều.',
      },
      facts: [
        'Tên “daisy” được cho là biến âm của “day’s eye” (mắt của ngày) vì cả cụm hoa khép lại ban đêm và mở ra buổi sáng; Geoffrey Chaucer gọi nó là “eye of the day”.',
        'Tên khoa học Bellis có thể bắt nguồn từ tiếng Latin bellus (“xinh xắn”), còn perennis nghĩa là “bền lâu, sống lâu năm”.',
        'Cây có hiện tượng hướng quang: hoa xoay theo vị trí của mặt trời trên bầu trời.',
        'Hoa là nguồn mật cho bướm và các loài thụ phấn khác, và là quốc hoa của Hà Lan.',
        'Từ xa xưa, cúc họa mi từng được gọi là “bruisewort” (cỏ chữa vết bầm) và dùng trong y học dân gian; trẻ em vẫn kết chúng thành vòng hoa.',
      ],
      keywords: [
        'hoa cúc họa mi',
        'quá trình phát triển của hoa cúc họa mi',
        'các giai đoạn phát triển của hoa cúc họa mi',
        'vòng đời hoa cúc họa mi',
        'time-lapse hoa cúc họa mi',
        'cách trồng hoa cúc họa mi',
        'hoa daisy',
      ],
      altText:
        'Minh họa cây cúc họa mi thấp sát đất với vòng lá hình thìa và nhiều bông hoa nhỏ cánh trắng đầu hồng, tâm vàng trên cuống ngắn, lớn lên từ hạt trong đất.',
      timeNote:
        'Đây là ước tính thô với độ tin cậy thấp: các nguồn tôi kiểm tra không nêu số ngày cụ thể từ hạt đến hoa. Cây thường được gieo hạt rồi trồng như cây hai năm, nên thời gian đến lúc ra hoa phụ thuộc mạnh vào mùa gieo, nhiệt độ và giống; các mốc ở đây chỉ để minh họa thứ tự các giai đoạn.',
      startNote: 'Mô phỏng bắt đầu từ một hạt nhỏ (quả bế) rải trên mặt đất tơi và ẩm.',
    },
    en: {
      name: 'Common daisy',
      aliases: ['English daisy', 'lawn daisy', 'daisy', 'bruisewort'],
      tagline: 'A tiny low flower with white petals tipped in pink, opening every morning as the “day’s eye”.',
      metaDescription:
        'Watch a common daisy grow from seed to full bloom in an interactive time-lapse: growth stages, estimated timing, growing tips and surprising facts.',
      intro: [
        'The common daisy (Bellis perennis), also called English daisy or lawn daisy, is a perennial herb in the daisy family, native to Europe. It is a very low plant, growing to about 20 cm at most, with small rounded or spoon-shaped leaves in a rosette lying flat to the ground. It often colonises lawns and is hard to get rid of by mowing.',
        'Each “flower”, about 2–3 cm across, is really a flower head: many white ray florets, often tipped pink or red, around a yellow disc of tiny tubular florets, borne on a leafless stem 2–10 cm tall. Garden forms may be single or double, in white, pink or red.',
      ],
      stages: {
        seed: {
          description:
            'A daisy “seed” is a tiny achene with no pappus. Wikipedia says it can be sown after the last frost, and the plant is often grown from seed as a biennial bedding plant. The seeds are scattered on loose, moist soil.',
        },
        germination: {
          description:
            'The seed takes up water, a root pushes out and the shoot lifts into the light. The sources I checked give no exact germination time, so the range here is only a rough estimate for cool, moist conditions.',
        },
        seedling: {
          description:
            'Two seed leaves open, followed by small spoon-shaped true leaves close to the soil. NC State describes the plant as slow to start and then fast-growing, so the seedling stage can last several weeks.',
        },
        vegetative: {
          description:
            'The plant builds a flat rosette of leaves, each about 2–5 cm long, and short creeping rhizomes help it spread. It likes cool temperatures, moist fertile soil, and sun with afternoon shade. In summer heat it declines, and it is not drought tolerant.',
        },
        'bud-formation': {
          description:
            'From the middle of the rosette, leafless flower stalks push up, each carrying one small bud wrapped in two rows of green bracts. The stalks are short, only 2–10 cm, so the buds sit just above the leaves.',
        },
        'bud-development': {
          description:
            'The buds swell and the green bracts part to show the pink tips of the petals still folded inside. Unopened buds are often more strongly reddened than the open flowers.',
        },
        blooming: {
          description:
            'The white ray florets spread like a fringe around the yellow disc, often keeping pink to red tips. The whole head opens in the morning and closes at night, which is why “daisy” is thought to be a corruption of “day’s eye”.',
        },
        'full-bloom': {
          description:
            'Many small heads open together and can follow the sun across the sky. According to Wikipedia the plant blooms from about March to September, and under ideal conditions the season is very long, with a few flowers even in mild winters. NC State gives spring to early summer as the main season, with sporadic flowering until frost.',
        },
        wilting: {
          name: 'Wilting and seed set',
          description:
            'Petals fall and the yellow disc dries into a seed head of small achenes. Being perennial, the rosette carries on into the next year, and clumps can be divided after flowering. In hot climates the plants often weaken by midsummer.',
        },
      },
      care: {
        light: 'Full sun to partial shade; NC State suggests sun with afternoon shade in warm climates.',
        water: 'Keep the soil evenly moist; the plant is not drought tolerant and declines in hot, dry weather.',
        soil: 'Well-drained but moisture-retentive, fertile soil rich in organic matter; clay, loam or sand are accepted, from acid to alkaline pH.',
        temperature:
          'Prefers cool weather. Wikipedia says it can be grown where minimum temperatures stay above about −35 °C; summer heat weakens it.',
        extra:
          'Propagate by seed after the last frost, or by dividing clumps after flowering. It spreads easily into lawns and can become weedy. NC State lists it as moderately poisonous, so do not eat large amounts.',
      },
      facts: [
        'The name “daisy” is considered a corruption of “day’s eye”, because the whole head closes at night and opens in the morning; Geoffrey Chaucer called it the “eye of the day”.',
        'The genus name Bellis may come from the Latin bellus, “pretty”, and perennis is Latin for “everlasting”.',
        'The plant shows heliotropism: its flowers follow the position of the sun in the sky.',
        'The flowers are a nectar source for butterflies and other pollinators, and the daisy is the national flower of the Netherlands.',
        'In medieval times it was called “Mary’s Rose”, and it has long been known as bruisewort and used in herbal medicine; children still make daisy chains from it.',
      ],
      keywords: [
        'daisy growth stages',
        'common daisy life cycle',
        'time-lapse daisy growth',
        'how daisies grow from seed',
        'how long do daisies take to bloom',
        'how to grow English daisy',
      ],
      altText:
        'Illustration of a low common daisy plant with a rosette of spoon-shaped leaves and several small white flowers tipped in pink with yellow centres on short stems, growing from a seed in the soil.',
      timeNote:
        'Low-confidence estimates: the sources I checked give no exact number of days from seed to flower. Daisies are usually sown and grown as biennial bedding plants, so time to bloom depends strongly on sowing season, temperature and cultivar; the ranges here only illustrate the order of the stages.',
      startNote: 'The simulation starts from a single tiny seed (achene) scattered on loose, moist soil.',
    },
  },
};
