import type { FlowerData } from '../types';

export const lily: FlowerData = {
  id: 'lily',
  slugs: { vi: 'hoa-ly', en: 'lily' },
  scientificName: 'Lilium spp.',
  scientificAliases: ['Lilium', 'Asiatic lily', 'Oriental lily', 'hoa loa kèn', 'hoa huệ tây'],
  family: 'Liliaceae',
  group: 'bulb',
  colors: ['white', 'pink', 'orange'],
  bloomSeasons: ['spring', 'summer', 'winter'],
  daysToBloom: [70, 118],
  speedBand: 'fast',
  startMaterial: 'bulb',
  confidence: 'low',
  featured: false,
  isNew: true,
  stages: [
    { id: 'seed', days: [1, 7] },
    { id: 'germination', days: [7, 14] },
    { id: 'seedling', days: [14, 21] },
    { id: 'vegetative', days: [28, 40] },
    { id: 'bud-formation', days: [10, 18] },
    { id: 'bud-development', days: [7, 13] },
    { id: 'blooming', days: [3, 5] },
    { id: 'full-bloom', days: [7, 14] },
    { id: 'wilting', days: [14, 28] },
  ],
  visual: {
    archetype: 'lily',
    palette: {
      petal: '#fbf3f1',
      petalDeep: '#e08aa3',
      petalTip: '#ffffff',
      center: '#e8b030',
      centerDeep: '#b5651d',
      leaf: '#4f8f4a',
      leafDeep: '#2b5e30',
      stem: '#5c9a52',
      accent: '#a8453c',
    },
  },
  related: ['narcissus', 'tulip', 'phalaenopsis'],
  sources: [
    {
      title: 'Lilium Planting & Growing Guide',
      publisher: 'Easy To Grow Bulbs',
      url: 'https://www.easytogrowbulbs.com/pages/lilium-planting-guide',
      supports: 'Planting lily bulbs: roots form first, shoots follow, and cold soil delays growth.',
    },
    {
      title: 'Lilium (cultivation bulletin)',
      publisher: 'National Mission on Horticulture (nmhs.org.in)',
      url: 'https://nmhs.org.in/w/pdf/publication/Bulletin/Z.A.Bhat/LILIUM.pdf',
      supports: 'Commercial crop duration of about 10–13 weeks for Asiatic hybrids and 14–18 weeks for Oriental hybrids.',
    },
    {
      title: 'How long does it take for a lily bulb to grow once planted',
      publisher: 'Hunker',
      url: 'https://www.hunker.com/12000296/how-long-does-it-take-for-a-lily-bulb-to-grow-once-planted',
      supports: 'General timing of lily growth after planting the bulb.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa ly',
      aliases: ['ly', 'loa kèn', 'hoa loa kèn', 'huệ tây', 'lily', 'lilium'],
      tagline: 'Củ giống nảy lên thân thẳng mang những chiếc kèn hoa lớn, thơm nồng và sang trọng.',
      metaDescription:
        'Xem hoa ly lớn lên từ củ đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách trồng hoa ly chơi Tết và những điều thú vị.',
      intro: [
        'Hoa ly (Lilium) thuộc họ Loa kèn (Liliaceae). Cây mọc từ một củ nhiều vảy, thân thẳng đứng phủ lá hình mác, đầu thân mang vài hoa lớn hình kèn với sáu cánh cong ra ngoài.',
        'Hoa ly là hoa cắm và hoa chậu phổ biến dịp Tết. Nguồn tham khảo cho biết thời gian trồng thương mại khoảng 10–13 tuần với nhóm Asiatic và 14–18 tuần với nhóm Oriental, nên người chơi phải chọn nhóm giống và tính ngày trồng cho kịp Tết.',
      ],
      stages: {
        seed: {
          name: 'Củ giống',
          description:
            'Hoa ly bắt đầu từ một củ nhiều vảy. Củ được đặt xuống đất ẩm; rễ hình thành trước, chồi mới nhú lên sau.',
        },
      },
      care: {
        light: 'Cần nhiều nắng, nhưng gốc thích mát.',
        water: 'Giữ đất ẩm vừa, không úng nước vì củ dễ thối.',
        soil: 'Đất tơi xốp, thoát nước tốt.',
        temperature: 'Đất lạnh làm củ nảy chậm.',
        extra: 'Chọn nhóm Asiatic nếu cần hoa nở sớm hơn, nhóm Oriental nở muộn hơn.',
      },
      facts: [
        'Nhóm Asiatic được trồng thương mại khoảng 10–13 tuần; nhóm Oriental khoảng 14–18 tuần.',
        'Rễ hình thành trước, chồi mọc lên sau.',
        'Đất lạnh làm củ nảy chồi chậm.',
        'Sau khi hoa tàn, cây ngừng lớn và dồn dưỡng chất về củ.',
      ],
      keywords: [
        'hoa ly',
        'quá trình phát triển của hoa ly',
        'các giai đoạn phát triển của hoa ly',
        'time-lapse hoa ly',
        'cách trồng hoa ly chơi Tết',
        'hoa ly nở sau bao lâu',
      ],
      altText:
        'Minh họa cây hoa ly với thân thẳng, lá hình mác mọc từ củ và vài hoa lớn hình kèn trắng điểm hồng.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính thô. Nguồn cho biết thời gian trồng thương mại; độ dài từng giai đoạn là suy đoán, phụ thuộc nhóm giống, nhiệt độ và ánh sáng.',
      startNote: 'Mô phỏng bắt đầu từ một củ hoa ly đặt trong đất ẩm.',
    },
    en: {
      name: 'Lily',
      aliases: ['Lilium', 'Asiatic lily', 'Oriental lily', 'hoa ly'],
      tagline: 'A scaly bulb that sends up a straight stem of large, fragrant trumpet flowers.',
      metaDescription:
        'Watch a lily grow from bulb to full bloom in an interactive time-lapse: growth stages, estimated timing, how to grow it for Tết and plant facts.',
      intro: [
        'Lilies (Lilium) are in the family Liliaceae. They grow from a scaly bulb, with an upright stem clothed in lance-shaped leaves and topped by a few large trumpet flowers with six curved tepals.',
        'Lilies are a popular cut and potted flower at Tết. A source gives commercial crop times of about 10–13 weeks for Asiatic hybrids and 14–18 weeks for Oriental hybrids, so growers must choose the group and time planting to catch the holiday.',
      ],
      stages: {
        seed: {
          name: 'Bulb',
          description:
            'The plant starts from a scaly bulb set in damp soil; roots form first and the shoot follows.',
        },
      },
      care: {
        light: 'Plenty of sun on the leaves, though the base prefers to stay cool.',
        water: 'Keep the soil moderately moist, never waterlogged, since the bulb rots easily.',
        soil: 'Loose, free-draining soil.',
        temperature: 'Cold soil delays sprouting.',
        extra: 'Choose Asiatic types for earlier bloom and Oriental types for later.',
      },
      facts: [
        'Asiatic hybrids have a commercial crop time of about 10–13 weeks; Oriental hybrids about 14–18 weeks.',
        'Roots form first and the shoot follows.',
        'Cold soil slows the bulb’s sprouting.',
        'After flowering the plant stops growing and stores energy in the bulb.',
      ],
      keywords: [
        'lily growth stages',
        'Lilium life cycle',
        'time-lapse lily',
        'how to grow lilies for Tết',
        'how long lilies take to bloom',
      ],
      altText:
        'Illustration of a lily with an upright stem, lance-shaped leaves rising from a bulb and a few large white trumpet flowers tinged pink.',
      timeNote:
        'Timings are rough estimates. A source gives commercial crop times; the length of each stage is a guess that depends on the group, temperature and light.',
      startNote: 'The simulation starts from a single lily bulb set in damp soil.',
    },
  },
};
