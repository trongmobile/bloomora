import type { FlowerData } from '../types';

export const dahlia: FlowerData = {
  id: 'dahlia',
  slugs: { vi: 'hoa-thuoc-duoc', en: 'dahlia' },
  scientificName: 'Dahlia pinnata',
  scientificAliases: ['Dahlia × pinnata', 'Dahlia × hortensis', 'Dahlia', 'garden dahlia'],
  family: 'Asteraceae',
  group: 'perennial',
  colors: ['red', 'pink', 'orange', 'yellow', 'white', 'purple'],
  bloomSeasons: ['summer', 'autumn'],
  daysToBloom: [90, 120],
  speedBand: 'fast',
  startMaterial: 'tuber',
  confidence: 'low',
  featured: false,
  stages: [
    { id: 'seed', days: [7, 14] },
    { id: 'germination', days: [10, 21] },
    { id: 'seedling', days: [10, 14] },
    { id: 'vegetative', days: [35, 45] },
    { id: 'bud-formation', days: [10, 14] },
    { id: 'bud-development', days: [10, 14] },
    { id: 'blooming', days: [3, 7] },
    { id: 'full-bloom', days: [30, 90] },
    { id: 'wilting', days: [30, 60] },
  ],
  visual: {
    archetype: 'dahlia',
    palette: {
      petal: '#e0455a',
      petalDeep: '#a8203a',
      petalTip: '#ff8a8f',
      center: '#e8b020',
      centerDeep: '#a8203a',
      leaf: '#4a7c3a',
      leafDeep: '#2a5a2a',
      stem: '#4a6a34',
    },
  },
  related: ['chrysanthemum', 'cosmos', 'marigold'],
  sources: [
    {
      title: 'Dahlia pinnata Cav. — accepted name',
      publisher: 'Kew — Plants of the World Online',
      url: 'https://powo.science.kew.org/taxon/30027297-2',
      supports: 'Accepted name Dahlia pinnata, a cultigen from Mexico, tuberous geophyte.',
    },
    {
      title: 'Dahlia',
      publisher: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Dahlia',
      supports:
        'Native range of the genus, composite flower head, colours except blue and the 1846 blue-dahlia prize, octoploid garden dahlias, inulin in tubers, first flowering in Madrid in 1789 and the origin of the names Dahlia and pinnata, Mexico’s national flower (1963), more than 57,000 registered cultivars.',
    },
    {
      title: 'Dahlia — RHS plant profile',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/dahlia',
      supports:
        'Flower forms and sizes, height range, summer-to-autumn flowering until the first frosts, sunny sheltered site, not hardy so tubers are lifted, flowers must be cut fully open.',
    },
    {
      title: 'How to grow dahlias — RHS growing guide',
      publisher: 'Royal Horticultural Society',
      url: 'https://www.rhs.org.uk/plants/dahlia/growing-guide',
      supports:
        'Tender perennial grown from tubers, 5 °C threshold, spacing of at least 60 cm, pinching at about 40 cm, weekly deadheading, rounded buds versus pointed spent flowers, slow-to-sprout tubers and rot from overwatering, lifting and storing tubers, growing from seed.',
    },
    {
      title: 'Dahlias in Oregon: Planting for a Parade of Late-season Blooms (FS 95)',
      publisher: 'Oregon State University Extension Service',
      url: 'https://extension.oregonstate.edu/catalog/fs-95-dahlias-oregon',
      supports:
        'Planting once soil is about 60 °F, 4–6 in deep with the eye up, 2 ft spacing, six hours of sun, soil pH 6.5–7.0, no watering until the first two leaves show, topping at 12–16 in, disbudding, midsummer-to-fall bloom, cutting back after a hard frost and storing tubers.',
    },
    {
      title: 'Growing Dahlias',
      publisher: 'Utah State University Extension',
      url: 'https://extension.usu.edu/yardandgarden/files/Dahlias.pdf',
      supports:
        'Plant heights and flower sizes, single versus double flower forms and the central disk, seed-grown dahlias (12–14 weeks to bloom, not true to type), eyes on the roots, staking at planting, pinching, disbudding, dividing root clumps.',
    },
    {
      title: 'Growing Dahlias Successfully',
      publisher: 'Washington State University (extension notes)',
      url: 'https://s3.wp.wsu.edu/uploads/sites/2069/2023/08/GTnotes-8-24-23-GrowingDahlias.pdf',
      supports:
        'Dahlia as a root tuber (not a bulb or potato), soil at 60 °F, spacing of 2–3 ft, pH 6.5–7.0, watering once plants are 4 in tall, pinching can delay bloom, about 90 days for medium and 120 days for giant size classes, blooming until frost, over 60,000 cultivars.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa thược dược',
      aliases: ['thược dược', 'dahlia'],
      tagline:
        'Từ một rễ củ xù xì đến những đóa hoa xếp lớp rực rỡ, nở liên tục từ giữa hè cho tới khi sương giá đầu tiên đến.',
      metaDescription:
        'Xem hoa thược dược lớn lên từ củ giống đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách trồng và kiến thức thú vị.',
      intro: [
        'Thược dược (Dahlia pinnata) là cây thân thảo sống lâu năm thuộc họ Cúc, mọc từ rễ củ phình to. Theo Kew, đây là một cultigen — dạng cây trồng — có nguồn gốc từ Mexico; cả chi Dahlia vốn thuộc vùng Mexico và Trung Mỹ (Wikipedia). Cây có thể cao từ khoảng 30 cm đến 1,5 m hoặc hơn, hoa rộng từ khoảng 5 đến 30 cm (RHS).',
        'Mỗi “bông” thược dược thật ra là một cụm hoa đầu gồm nhiều hoa nhỏ: các hoa xếp thành đĩa ở giữa, bao quanh là những cánh hoa dạng lưỡi (Wikipedia). Nhờ lai tạo, hiện có hơn 57.000 giống được đăng ký, từ hoa đơn giản giống hoa cúc đến những khối cầu và tầng cánh xếp dày. Mô phỏng dưới đây vẽ một dạng hoa kép điển hình, không đại diện cho mọi giống.',
      ],
      stages: {
        seed: {
          name: 'Củ giống',
          description:
            'Củ thược dược là rễ củ phình to, không phải củ hành hay củ khoai tây (WSU). Trên phần cổ củ có những “mắt” — chồi sẽ mọc thành cây; củ không có mắt sẽ không nảy chồi (USU). Củ được đặt nằm ngang, mắt hướng lên, sâu khoảng 10–15 cm, và chỉ bắt đầu mọc khi đất đã ấm khoảng 15–16°C (60°F) (WSU).',
        },
        germination: {
          name: 'Nảy chồi',
          description:
            'Mắt trên cổ củ phình thành chồi rồi vươn lên khỏi mặt đất. Lúc này củ chưa có rễ để hút dinh dưỡng (WSU) và rất dễ thối nếu đất úng nước, nên các hướng dẫn khuyên chưa tưới cho đến khi lá đầu tiên xuất hiện (OSU; RHS). Một số củ nảy chồi chậm hơn những củ khác (RHS).',
        },
        seedling: {
          description:
            'Chồi lớn dần thành cây con với những lá kép lông chim — chính hình dạng lá này đã cho loài cái tên pinnata (Wikipedia). Rễ thược dược nằm nông và dễ bị cỏ dại tranh dinh dưỡng, nên các hướng dẫn khuyên chỉ nhổ cỏ bằng tay (WSU). Cọc đỡ nên cắm ngay lúc trồng vì đóng cọc muộn có thể làm tổn thương rễ (USU).',
        },
        vegetative: {
          description:
            'Thân và lá vươn lên nhanh; cây cần ít nhất khoảng 6 giờ nắng mỗi ngày (OSU; USU). Khi cây cao khoảng 30–40 cm và có ít nhất bốn tầng lá, người trồng thường bấm ngọn để cây đẻ nhánh bên, thành bụi gọn hơn và ra nhiều hoa hơn (OSU; RHS), dù việc này có thể làm hoa nở muộn hơn (WSU). Thân cao thường cần cọc buộc đỡ (RHS).',
        },
        'bud-formation': {
          description:
            'Ở đầu mỗi cành, nụ bắt đầu hình thành — thường là cụm ba nụ. Với giống hoa lớn, người ta ngắt hai nụ bên khi chúng còn nhỏ cỡ hạt đậu để nụ giữa phát triển thành đóa lớn hơn (USU; OSU).',
        },
        'bud-development': {
          description:
            'Nụ tròn phồng lên và lộ dần màu cánh hoa. RHS lưu ý nụ hoa thường tròn, còn hoa đã tàn thì đầu nhọn — một mẹo nhỏ để biết nên cắt bỏ bông nào.',
        },
        blooming: {
          description:
            'Các cánh hoa dạng lưỡi bung ra từ nụ và để lộ cấu trúc của hoa: giống hoa đơn có một vòng cánh quanh đĩa giữa, giống hoa kép có nhiều vòng cánh xếp lớp che kín đĩa (USU). Thược dược thường bắt đầu nở từ giữa mùa hè (OSU).',
        },
        'full-bloom': {
          description:
            'Cây ra hoa liên tục trong nhiều tuần cho đến khi sương giá làm chết phần thân lá (RHS). Cắt bỏ hoa tàn đều đặn — RHS khuyên khoảng mỗi tuần một lần — giúp cây dồn sức làm nụ mới thay vì tạo hạt (RHS). Tùy giống, hoa rộng từ khoảng 5 đến 30 cm (RHS).',
        },
        wilting: {
          name: 'Tàn hoa, kết hạt và củ nghỉ đông',
          description:
            'Khi sương giá đến, phần thân lá trên mặt đất úa tàn (RHS). Dưới đất, củ đã nhân lên thành cả cụm củ trong suốt mùa hè (WSU; USU). Giống hoa đơn thường cho nhiều hạt, giống hoa kép ít hơn, và hạt thường không cho ra hoa giống cây mẹ (USU). Ở nơi mùa đông lạnh, người trồng cắt thân, đào cụm củ lên, để khô rồi cất ở nơi tối, mát, không đóng băng cho đến mùa xuân sau (RHS; OSU).',
        },
      },
      care: {
        light: 'Nắng trực tiếp, ít nhất khoảng 6 giờ mỗi ngày; chọn chỗ ấm và kín gió. Cây không ưa bóng râm.',
        water:
          'Giữ đất ẩm đều nhưng không úng. Sau khi trồng củ, đừng tưới cho đến khi lá đầu tiên xuất hiện; về sau tưới sâu, thưa, sát gốc thay vì tưới lên hoa. Cây trồng chậu cần tưới thường xuyên hơn.',
        soil: 'Đất tơi, thoát nước tốt, pH khoảng 6,5–7,0. Đất vừa lạnh vừa úng dễ làm củ thối.',
        temperature:
          'Không chịu sương giá: giữ củ trong nhà cho đến khi nhiệt độ luôn trên 5°C. Củ chỉ bắt đầu mọc khi đất ấm khoảng 15–16°C (60°F).',
        extra:
          'Đặt củ nằm ngang, mắt hướng lên, sâu khoảng 10–15 cm; cách nhau ít nhất 60 cm, giống hoa lớn cần rộng hơn. Cắm cọc ngay lúc trồng, bấm ngọn khi cây cao khoảng 30–40 cm và cắt bỏ hoa tàn đều đặn.',
      },
      facts: [
        'Thược dược mọc từ rễ củ — không phải củ hành như tulip, cũng không phải củ khoai tây (WSU). Ở một số giống, rễ củ dự trữ inulin thay vì tinh bột (Wikipedia).',
        'Thược dược có gần đủ mọi màu, trừ xanh dương. Năm 1846, Hội Làm vườn Caledonia ở Edinburgh treo giải 2.000 bảng cho người đầu tiên tạo ra thược dược xanh; đến nay giải vẫn chưa có người nhận (Wikipedia).',
        'Thược dược vườn là thể bát bội (octoploid, có tám bộ nhiễm sắc thể tương đồng), được cho là một nguyên nhân khiến chúng đa dạng đến vậy (Wikipedia).',
        'Thược dược ra hoa lần đầu ở châu Âu năm 1789 tại Vườn Hoàng gia Madrid, từ các bộ phận cây gửi sang từ Mexico. Năm 1791, nhà thực vật Cavanilles đặt tên chi là Dahlia theo Anders Dahl, và cây đầu tiên mang tên pinnata vì lá kép lông chim (Wikipedia).',
        'Mexico tuyên bố thược dược là quốc hoa vào năm 1963 (Wikipedia).',
        'Thược dược cắt cành chỉ nên cắt khi hoa đã nở đầy: nụ khép kín sẽ không nở thêm sau khi cắt (RHS).',
      ],
      keywords: [
        'hoa thược dược',
        'cách trồng hoa thược dược',
        'các giai đoạn phát triển của hoa thược dược',
        'vòng đời hoa thược dược',
        'time-lapse hoa thược dược',
        'trồng thược dược từ củ',
      ],
      altText:
        'Minh họa hoa thược dược với thân thẳng, lá kép lông chim xanh và đóa hoa kép nhiều lớp cánh, cây lớn lên từ một rễ củ nằm trong đất.',
      timeNote:
        'Mốc 90–120 ngày dựa trên một tài liệu khuyến nông của WSU, ghi khoảng 90 ngày cho nhóm hoa cỡ trung và 120 ngày cho nhóm cỡ khổng lồ nhưng không nói rõ tính từ lúc nào, nên đây chỉ là ước tính thô. Giống, cỡ hoa, nhiệt độ đất và việc bấm ngọn đều làm thời gian thực tế thay đổi; độ dài giai đoạn nở rộ phụ thuộc vào ngày sương giá đầu tiên.',
      startNote:
        'Mô phỏng bắt đầu từ một củ giống có ít nhất một “mắt”. Thược dược cũng có thể trồng từ hạt (khoảng 12–14 tuần để ra hoa theo USU), nhưng hoa thường không giống cây mẹ.',
    },
    en: {
      name: 'Dahlia',
      aliases: ['garden dahlia', 'dahlias'],
      tagline:
        'From a knobbly tuber to layered, brilliant blooms that keep coming from midsummer until the first frost.',
      metaDescription:
        'Watch a dahlia grow from tuber to full bloom in an interactive time-lapse: growth stages, estimated timing, planting tips and surprising plant facts.',
      intro: [
        'The dahlia (Dahlia pinnata) is a herbaceous perennial in the daisy family that grows from swollen tuberous roots. Kew lists it as a cultigen — a cultivated form — from Mexico, and the genus as a whole is native to Mexico and Central America (Wikipedia). Plants range from a compact 30 cm to 1.5 m or more, with flowers from about 5 cm to 30 cm across (RHS).',
        'What looks like one flower is really a flower head made of many tiny florets: a disc in the middle surrounded by petal-like rays (Wikipedia). Breeding has produced more than 57,000 registered cultivars, from simple daisy-like singles to tight spheres and densely layered doubles. The simulation below draws one typical double form, so it cannot stand for every cultivar.',
      ],
      stages: {
        seed: {
          name: 'Tuber',
          description:
            'A dahlia tuber is a swollen root — not a bulb like a tulip’s, and not a potato (WSU). The “eyes” on its crown are the buds that become the plant, and a tuber without an eye will not grow (USU). It is laid on its side, eye up, about 10–15 cm deep, and does not start growing until the soil has warmed to roughly 15–16 °C (60 °F) (WSU).',
        },
        germination: {
          name: 'Sprouting',
          description:
            'An eye on the crown swells into a shoot that pushes up through the soil. At this point the tuber has no roots yet to feed it (WSU) and it rots easily in wet soil, so guides advise holding off watering until the first leaves show (OSU; RHS). Some tubers are slower to sprout than others (RHS).',
        },
        seedling: {
          description:
            'The shoot grows into a young plant with pinnate (feather-like) leaves — the leaf shape that gave the species its name, pinnata (Wikipedia). Dahlia roots sit near the surface and weeds compete with them, so guides recommend hand weeding only (WSU). A stake is best driven in at planting time, since hammering one in later can injure the roots (USU).',
        },
        vegetative: {
          description:
            'Stem and foliage race upward; the plant needs at least about 6 hours of sun a day (OSU; USU). When it reaches about 30–40 cm with at least four sets of leaves, growers usually pinch out the tip so the plant branches into a bushier shape with more flowers (OSU; RHS), although pinching can delay the first bloom (WSU). Tall stems usually need tying to a stake (RHS).',
        },
        'bud-formation': {
          description:
            'Buds begin to form at the end of each branch, typically in a cluster of three. On large-flowered cultivars growers remove the two side buds while they are still pea-sized so the central bud can grow into a bigger bloom (USU; OSU).',
        },
        'bud-development': {
          description:
            'The rounded buds swell and begin to show petal colour. The RHS points out that flower buds are usually rounded while spent flowers are pointed — a handy way to tell which heads to remove.',
        },
        blooming: {
          description:
            'Ray petals unfurl from the bud and reveal the flower’s structure: singles have one ring of petals around a central disc, while doubles have many layered rows of petals that hide the disc (USU). Dahlias typically start flowering around midsummer (OSU).',
        },
        'full-bloom': {
          description:
            'The plant flowers over many weeks, right up to the first frosts that kill its top growth (RHS). Deadheading regularly — the RHS suggests roughly weekly — keeps the plant putting its energy into new buds rather than seed (RHS). Depending on the cultivar, flowers are about 5–30 cm across (RHS).',
        },
        wilting: {
          name: 'Fading, seed and winter rest',
          description:
            'When frost arrives, the growth above ground dies back (RHS). Underground, the single tuber planted in spring has multiplied into a clump over the summer (WSU; USU). Single-flowered cultivars generally set plenty of seed and doubles far less, and seedlings are often not true to the parent (USU). Where winters are cold, growers cut the stems, lift the clump, let it dry and store it somewhere dark, cool and frost-free until the next spring (RHS; OSU).',
        },
      },
      care: {
        light: 'Full sun — at least about 6 hours a day — in a warm, sheltered spot. Dahlias dislike shade.',
        water:
          'Keep the soil evenly moist but never waterlogged. After planting a tuber, hold off watering until the first leaves appear; later, water deeply and less often at ground level rather than over the flowers. Potted plants need water more often.',
        soil: 'Loose, free-draining soil with a pH of about 6.5–7.0. Cold, soggy soil makes tubers rot.',
        temperature:
          'Not frost-hardy: keep tubers indoors until temperatures are consistently above 5 °C. A tuber does not start growing until the soil reaches about 15–16 °C (60 °F).',
        extra:
          'Lay the tuber on its side, eye up, about 10–15 cm deep, with plants at least 60 cm apart and more for large-flowered types. Set a stake at planting, pinch the tip at about 30–40 cm and deadhead regularly.',
      },
      facts: [
        'A dahlia grows from a root tuber — not a bulb, and not a potato (WSU). In some cultivars the tuber stores inulin rather than starch (Wikipedia).',
        'Dahlias come in almost every colour except blue. In 1846 the Caledonia Horticultural Society of Edinburgh offered £2,000 to the first person to breed a blue dahlia; the prize has still never been claimed (Wikipedia).',
        'Garden dahlias are octoploids, with eight sets of homologous chromosomes, which is credited as one reason for their huge variety (Wikipedia).',
        'Dahlias first flowered in Europe in 1789 in the Royal Gardens of Madrid, from plant parts sent from Mexico. In 1791 the botanist Cavanilles named the genus Dahlia after Anders Dahl, and the first plant became pinnata for its pinnate leaves (Wikipedia).',
        'Mexico declared the dahlia its national flower in 1963 (Wikipedia).',
        'Dahlias for the vase should be cut fully open: closed buds will not open after cutting (RHS).',
      ],
      keywords: [
        'dahlia growth stages',
        'dahlia life cycle',
        'time-lapse dahlia growth',
        'how to grow dahlias from tubers',
        'how long do dahlias take to bloom',
        'dahlia tuber planting',
      ],
      altText:
        'Illustration of a dahlia with a straight stem, green feathery leaves and a densely layered double flower, growing from a tuber in the soil.',
      timeNote:
        'The 90–120 day range rests on one WSU extension handout that lists about 90 days for medium-sized and 120 days for giant-sized cultivars without saying exactly what it counts from, so treat it as a rough estimate. Cultivar, flower size, soil temperature and pinching all shift the real schedule, and how long the full-bloom stage lasts depends on when the first frost arrives.',
      startNote:
        'The simulation starts from a tuber with at least one “eye”. Dahlias can also be grown from seed (about 12–14 weeks to bloom, according to USU), but the flowers are often not like the parent’s.',
    },
  },
};
