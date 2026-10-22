import type { FlowerData } from '../types';

export const sunflower: FlowerData = {
  id: 'sunflower',
  slugs: { vi: 'hoa-huong-duong', en: 'sunflower' },
  scientificName: 'Helianthus annuus',
  family: 'Asteraceae',
  group: 'annual',
  colors: ['yellow', 'orange'],
  bloomSeasons: ['summer', 'autumn'],
  daysToBloom: [50, 110],
  speedBand: 'fast',
  startMaterial: 'seed',
  confidence: 'moderate',
  featured: true,
  stages: [
    { id: 'seed', days: [1, 3] },
    { id: 'germination', days: [7, 10] },
    { id: 'seedling', days: [10, 21] },
    { id: 'vegetative', days: [30, 50] },
    { id: 'bud-formation', days: [7, 14] },
    { id: 'bud-development', days: [7, 14] },
    { id: 'blooming', days: [3, 7] },
    { id: 'full-bloom', days: [10, 14] },
    { id: 'wilting', days: [30, 45] },
  ],
  visual: {
    archetype: 'sunflower',
    palette: {
      petal: '#f5b800',
      petalDeep: '#d78a00',
      petalTip: '#ffd94a',
      center: '#6a4422',
      centerDeep: '#2c1a0b',
      leaf: '#4f8c3a',
      leafDeep: '#2c5e29',
      stem: '#4b7d34',
      accent: '#c98a2b',
    },
  },
  related: ['marigold', 'chrysanthemum', 'morning-glory'],
  sources: [
    {
      title: 'Helianthus annuus — accepted name and native range',
      publisher: 'Kew — Plants of the World Online',
      url: 'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:119003-2/general-information',
      supports: 'Accepted scientific name, native range, annual herb.',
    },
    {
      title: 'Helianthus annuus (sunflower) — RHS plant profile',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/105515/helianthus-annuus/details',
      supports: 'Annual habit, typical height, full-sun requirement, sowing from seed.',
    },
    {
      title: 'Sunflowers — gardening in Minnesota',
      publisher: 'University of Minnesota Extension',
      url: 'https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/sunflowers',
      supports: 'Germination time, sowing depth, spacing, soil pH and watering.',
    },
    {
      title: 'Grow your own sunflowers (EM 9866)',
      publisher: 'Oregon State University Extension',
      url: 'https://extension.oregonstate.edu/catalog/em-9866-grow-your-own-sunflowers',
      supports: 'Sowing soil temperature, cultivar days-to-maturity, drought tolerance once established.',
    },
    {
      title: 'Common sunflower',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Common_sunflower',
      supports: 'Heliotropism, floret spirals (Fibonacci numbers), the seed-is-a-fruit detail.',
    },
    {
      title: 'Sunflowers move to the beat of an internal clock',
      publisher: 'UC Davis, Department of Plant Biology',
      url: 'https://biology.ucdavis.edu/news/sunflowers-move-clock',
      supports: 'Circadian solar tracking in young plants and the pollinator-visit study.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa hướng dương',
      aliases: ['hướng dương', 'hướng dương'],
      tagline: 'Từ một hạt sọc đen trắng đến chiếc đĩa vàng cao hơn đầu người chỉ trong vài tháng.',
      metaDescription:
        'Xem hoa hướng dương lớn lên từ hạt giống đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách trồng và kiến thức thú vị.',
      intro: [
        'Hoa hướng dương (Helianthus annuus) là cây thân thảo một năm thuộc họ Cúc, có nguồn gốc từ Bắc Mỹ. Trong một mùa sinh trưởng, một hạt nhỏ có thể trở thành thân cây cao khoảng 2,5–4 mét, mang trên đỉnh một đầu hoa rộng hàng chục xăng-ti-mét.',
        'Điều thú vị là “bông” hướng dương thực ra là một cụm hoa gồm hàng trăm hoa nhỏ: những cánh vàng ở rìa là hoa lưỡi, còn phần đĩa ở giữa là hàng trăm hoa ống xếp thành các đường xoắn ốc. Mỗi hoa ống được thụ phấn thành công sẽ cho một hạt.',
      ],
      stages: {
        seed: {
          description:
            'Thứ ta gọi là “hạt” hướng dương thật ra là một quả bế có vỏ sọc; nhân bên trong mới là hạt. Nó nằm ngủ trong đất cho đến khi đủ ẩm và đủ ấm — các hướng dẫn gieo hạt thường khuyên đợi đến khi đất ấm lên khoảng 10–15°C.',
        },
        germination: {
          description:
            'Hạt hút nước và trương lên, rễ mầm chui ra trước và đâm xuống sâu, rồi chồi non cong lên tìm ánh sáng. Gieo sâu khoảng 2,5 cm trong đất đủ ấm, cây thường nhú lên khỏi mặt đất sau khoảng 7–10 ngày.',
        },
        seedling: {
          description:
            'Hai lá mầm xòe ra, sau đó cặp lá thật đầu tiên xuất hiện. Rễ cọc bắt đầu cắm sâu — nhờ vậy, khi đã bén rễ, hướng dương chịu hạn khá tốt. Giai đoạn này cây con còn mỏng manh với gió mạnh và sâu hại.',
        },
        vegetative: {
          description:
            'Thân vươn lên nhanh, lá to hình tim mọc so le. Cây cần ít nhất khoảng 6 giờ nắng mỗi ngày để quang hợp và tích lũy năng lượng. Ở cây còn non, chồi đỉnh bám theo mặt trời trong ngày — một nhịp điều khiển bởi đồng hồ sinh học của cây.',
        },
        'bud-formation': {
          description:
            'Ở đỉnh thân xuất hiện nụ: một khối xanh nhỏ được bao bọc bởi các lá bắc. Cây chuyển từ sinh trưởng thân lá sang chuẩn bị ra hoa; thân đã gần đạt chiều cao cuối cùng.',
        },
        'bud-development': {
          description:
            'Nụ lớn dần, các lá bắc xanh bao quanh phần đĩa đang hình thành. Khi cây trưởng thành, đầu hoa ngừng bám theo mặt trời và dần quay hẳn về phía đông.',
        },
        blooming: {
          description:
            'Những cánh vàng (hoa lưỡi) bung ra từ rìa nụ. Các hoa ống ở đĩa bắt đầu nở theo từng vòng đồng tâm, thường từ ngoài vào trong, thu hút ong và các loài thụ phấn.',
        },
        'full-bloom': {
          description:
            'Đầu hoa nở đầy đặn, quay về hướng đông đón nắng sớm. Theo một nghiên cứu năm 2016 của UC Davis, hoa hướng đông được côn trùng thụ phấn ghé thăm nhiều hơn rõ rệt so với hoa bị xoay sang hướng tây.',
        },
        wilting: {
          name: 'Hoa tàn, kết hạt',
          description:
            'Cánh hoa khô và rụng, đĩa ngả nâu, hạt lớn dần và nặng khiến đầu hoa cúi xuống. Khi hạt chín, lá úa vàng và hạt rơi xuống đất — vòng đời một năm khép lại và sẵn sàng bắt đầu lại.',
        },
      },
      care: {
        light: 'Nắng trực tiếp, ít nhất khoảng 6 giờ mỗi ngày.',
        water:
          'Tưới đều khi cây còn nhỏ. Cây đã bén rễ chịu hạn tương đối tốt, nên tưới sâu và thưa thay vì tưới nhẹ mỗi ngày.',
        soil: 'Đất tơi, thoát nước tốt; các hướng dẫn thường nêu pH khoảng 6,0–7,5.',
        temperature: 'Gieo khi đất đã ấm, khoảng 10–15°C trở lên (các nguồn nêu mức từ 50 đến 60°F).',
        extra: 'Gieo sâu khoảng 2,5 cm. Giống cao nên có cọc đỡ ở nơi nhiều gió.',
      },
      facts: [
        'Các hoa ống ở đĩa xếp thành hai họ đường xoắn ốc ngược chiều nhau, số đường thường là cặp số Fibonacci như 34 và 55 (hoặc 55 và 89 ở đầu hoa lớn).',
        'Cây non có thể xoay đầu theo mặt trời suốt ngày rồi quay lại hướng đông trong đêm; khi trưởng thành, đầu hoa dừng lại và hướng đông.',
        'Hạt hướng dương ăn được thật ra là quả (quả bế); phần nhân bên trong mới là hạt.',
        'Hướng dương cùng họ Cúc với hoa cúc và cúc vạn thọ — những loài cũng có trên Bloomora.',
      ],
      keywords: [
        'hoa hướng dương',
        'quá trình phát triển của hoa hướng dương',
        'các giai đoạn phát triển của hoa hướng dương',
        'vòng đời hoa hướng dương',
        'time-lapse hoa hướng dương',
        'cách trồng hoa hướng dương',
      ],
      altText:
        'Minh họa hoa hướng dương với thân cao, lá to hình tim và đầu hoa vàng, cây lớn lên từ hạt giống trong đất.',
      timeNote:
        'Các mốc thời gian là ước tính cho điều kiện trồng ngoài trời thông thường. Giống ngắn ngày có thể ra hoa sau khoảng 50–60 ngày, giống cao thường lâu hơn; thực tế còn phụ thuộc nhiệt độ, nắng và nước.',
      startNote: 'Mô phỏng bắt đầu từ một hạt được gieo sâu khoảng 2,5 cm.',
    },
    en: {
      name: 'Sunflower',
      aliases: ['common sunflower'],
      tagline: 'From a striped seed to a golden disc taller than a person in just a few months.',
      metaDescription:
        'Watch a sunflower grow from seed to full bloom in an interactive time-lapse: growth stages, estimated timing, planting tips and surprising plant facts.',
      intro: [
        'The sunflower (Helianthus annuus) is an annual herb in the daisy family, native to North America. In a single season one small seed can become a stalk roughly 2.5–4 metres tall, carrying a flower head tens of centimetres across.',
        'The “flower” is really a flower head made of hundreds of tiny florets: the yellow petals around the edge are ray florets, while the central disc is packed with hundreds of disc florets arranged in spirals. Each disc floret that is pollinated can become one seed.',
      ],
      stages: {
        seed: {
          description:
            'What we call a sunflower “seed” is really a striped fruit (an achene); the kernel inside is the seed. It stays dormant in the soil until conditions are moist and warm enough — sowing guides usually advise waiting until the soil reaches about 10–15 °C.',
        },
        germination: {
          description:
            'The seed soaks up water and swells, the first root pushes out and anchors downward, and then the shoot curls up toward the light. Sown about 2.5 cm deep in warm soil, seedlings usually break the surface within roughly 7–10 days.',
        },
        seedling: {
          description:
            'Two seed leaves (cotyledons) unfold, followed by the first true leaves. A taproot begins to drive deep, which is why an established sunflower tolerates dry spells fairly well. At this stage the young plant is still vulnerable to strong wind and pests.',
        },
        vegetative: {
          description:
            'The stem shoots up and large heart-shaped leaves appear in alternating pairs. The plant needs at least about 6 hours of sun a day to photosynthesise and store energy. In young plants the growing tip follows the sun through the day, driven by an internal clock.',
        },
        'bud-formation': {
          description:
            'A bud appears at the top of the stem: a small green mass wrapped in bracts. The plant is switching from growing stem and leaves to preparing to flower, and the stem is close to its final height.',
        },
        'bud-development': {
          description:
            'The bud swells while green bracts enclose the developing disc. As the plant matures, the head stops tracking the sun and gradually settles facing east.',
        },
        blooming: {
          description:
            'Yellow ray petals unfurl around the edge of the bud. Disc florets begin to open in concentric rings, usually from the outside inward, attracting bees and other pollinators.',
        },
        'full-bloom': {
          description:
            'The head is fully open and faces east to catch the morning sun. In a 2016 UC Davis study, east-facing heads received noticeably more pollinator visits than heads that were turned to face west.',
        },
        wilting: {
          name: 'Wilting and seed set',
          description:
            'Petals dry and fall, the disc turns brown, and the growing seeds become heavy enough to bow the head. As the seeds ripen the leaves yellow and the seeds drop to the ground, closing the annual cycle and setting up the next one.',
        },
      },
      care: {
        light: 'Full sun — at least about 6 hours a day.',
        water:
          'Water regularly while young. Established plants tolerate dry spells fairly well, so water deeply and less often rather than lightly every day.',
        soil: 'Loose, well-drained soil; guides typically give a pH of about 6.0–7.5.',
        temperature: 'Sow once the soil has warmed to about 10–15 °C or more (sources quote 50–60 °F).',
        extra: 'Sow about 2.5 cm deep. Tall cultivars benefit from a stake in windy spots.',
      },
      facts: [
        'The disc florets form two interlocking sets of spirals whose counts are usually neighbouring Fibonacci numbers such as 34 and 55 (or 55 and 89 in large heads).',
        'Young plants can swing their heads to follow the sun all day and swing back east overnight; mature heads stop and face east.',
        'The edible “seed” is actually a fruit (an achene); the kernel inside is the true seed.',
        'Sunflowers share the daisy family with chrysanthemums and marigolds — both are also on Bloomora.',
      ],
      keywords: [
        'sunflower growth stages',
        'sunflower life cycle',
        'time-lapse sunflower growth',
        'how sunflowers grow from seed',
        'how long does a sunflower take to bloom',
        'how to grow sunflowers',
      ],
      altText:
        'Illustration of a sunflower with a tall stem, large heart-shaped leaves and a golden flower head, growing from a seed in the soil.',
      timeNote:
        'Timings are estimates for ordinary outdoor growing. Short-season cultivars can flower in roughly 50–60 days while taller ones take longer; temperature, sun and water all change the real schedule.',
      startNote: 'The simulation starts from a single seed sown about 2.5 cm deep.',
    },
  },
};
