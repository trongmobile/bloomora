import type { FlowerData } from '../types';

export const hibiscus: FlowerData = {
  id: 'hibiscus',
  slugs: { vi: 'hoa-dam-but', en: 'hibiscus' },
  scientificName: 'Hibiscus rosa-sinensis',
  scientificAliases: ['Hibiscus × rosa-sinensis', 'Chinese hibiscus', 'tropical hibiscus', 'shoeblack plant', 'râm bụt', 'bông bụp', 'bụp'],
  family: 'Malvaceae',
  group: 'shrub-tree',
  colors: ['red', 'pink', 'orange', 'yellow', 'white'],
  bloomSeasons: ['spring', 'summer', 'autumn', 'winter'],
  daysToBloom: [300, 425],
  speedBand: 'slow',
  startMaterial: 'seed-or-cutting',
  confidence: 'low',
  featured: false,
  stages: [
    { id: 'seed', days: [1, 3] },
    { id: 'germination', days: [6, 25] },
    { id: 'seedling', days: [60, 90] },
    { id: 'vegetative', days: [188, 235] },
    { id: 'bud-formation', days: [30, 45] },
    { id: 'bud-development', days: [14, 25] },
    { id: 'blooming', days: [1, 2] },
    { id: 'full-bloom', days: [30, 90] },
    { id: 'wilting', days: [20, 45] },
  ],
  visual: {
    archetype: 'hibiscus',
    palette: {
      petal: '#e0243c',
      petalDeep: '#9c0f2a',
      petalTip: '#f06a78',
      center: '#f2c230',
      centerDeep: '#a87a10',
      leaf: '#3f8a45',
      leafDeep: '#1f5a2c',
      stem: '#5a7a3a',
      accent: '#7a0a1c',
    },
  },
  related: ['bougainvillea', 'plumeria', 'rose'],
  sources: [
    {
      title: 'Hibiscus rosa-sinensis (Chinese Hibiscus) — Plant Toolbox',
      publisher: 'NC State Extension (North Carolina State University)',
      url: 'https://plants.ces.ncsu.edu/plants/hibiscus-rosa-sinensis/',
      supports: 'Woody shrub of the mallow family with flowers up to 6 inches across and a showy central tube, each flower lasting only one day; full sun to partial shade; propagated by stem cutting; needs protection from wind and frost.',
    },
    {
      title: 'Hibiscus × rosa-sinensis (Chinese hibiscus)',
      publisher: 'Royal Horticultural Society (RHS)',
      url: 'https://www.rhs.org.uk/plants/8738/hibiscus-rosa-sinensis/details',
      supports: 'Single five-petalled flowers about 10 cm across with yellow-anthered red stamens, from summer to autumn; propagate by seed in spring or semi-ripe cuttings in summer; frost-free climates only.',
    },
    {
      title: 'Hibiscus rosa-sinensis — Tropical Plant Database',
      publisher: 'National Tropical Botanical Garden (NTBG)',
      url: 'https://ntbg.org/database/plants/detail/hibiscus-rosa_sinensis',
      supports: 'Stamen stalks and style fused into a long column with many anthers part-way up and five round stigma lobes at the tip; fruit a dry five-parted capsule with up to three seeds; origin unknown and no longer known in the wild.',
    },
    {
      title: 'Hibiscus — Gardening Solutions',
      publisher: 'UF/IFAS Extension, University of Florida',
      url: 'https://gardeningsolutions.ifas.ufl.edu/plants/ornamentals/hibiscus/',
      supports: 'Hibiscus flowers often last just a day, but the plant blooms over a long season, nearly year-round in South Florida; it is sensitive to cold.',
    },
    {
      title: 'Hibiscus rosa-sinensis — Landscape Plant Propagation Information (archived copy)',
      publisher: 'UF/IFAS, University of Florida (via the Internet Archive)',
      url: 'https://web.archive.org/web/20240724062729/https://hort.ifas.ufl.edu/database/lppi/sp181.shtml',
      supports: 'Cutting is the primary propagation method; stem-tip cuttings root in 4–6 weeks; seed germinates in 1–4 weeks and takes 10–14 months to flower.',
    },
    {
      title: 'Dâm bụt',
      publisher: 'Wikipedia tiếng Việt',
      url: 'https://vi.wikipedia.org/wiki/D%C3%A2m_b%E1%BB%A5t',
      supports: 'Vietnamese names (dâm bụt, râm bụt, bông bụp); a widely grown ornamental in Vietnam that tolerates heat, storms and sandy soil; Malaysia’s national flower.',
    },
    {
      title: 'Cây Dâm Bụt (Bụp) — Những cây thuốc và vị thuốc Việt Nam',
      publisher: 'Đỗ Tất Lợi, reposted by vnras.com',
      url: 'https://vnras.com/cay-dam-but/',
      supports: 'A shrub 1–2 m tall with large solitary red flowers, five free petals and a long staminal column; planted all over Vietnam as an ornamental and as hedges; mộc cận (Hibiscus syriacus) is a different plant.',
    },
  ],
  text: {
    vi: {
      name: 'Hoa dâm bụt',
      aliases: ['dâm bụt', 'râm bụt', 'bông bụp', 'bụp', 'hoa bụp', 'hibiscus', 'Chinese hibiscus'],
      tagline: 'Bụi cây quen thuộc nơi hàng rào làng quê, nở những đóa đỏ lớn mỗi ngày với ống nhị dài vươn giữa hoa.',
      metaDescription:
        'Xem hoa dâm bụt lớn lên từ hạt đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách chăm và những điều thú vị về hoa bụp.',
      intro: [
        'Hoa dâm bụt (Hibiscus rosa-sinensis), còn gọi là râm bụt hay bông bụp, là cây bụi thuộc họ Bông (Malvaceae). Ở Việt Nam, cây nhỡ cao khoảng 1–2 mét, hoa to mọc đơn, thường màu đỏ, có năm cánh rời nhau và một ống nhị dài nhô ra giữa hoa. Cây được trồng khắp nơi để làm cảnh và làm hàng rào.',
        'Mỗi đóa thường chỉ nở một ngày nhưng cây ra hoa liên tục. Một số tài liệu dùng tên mộc cận cho Hibiscus syriacus, là một loài khác. Nguồn cho biết cây trồng từ hạt ra hoa sau khoảng 10–14 tháng, còn thời gian từ cành giâm đến lúc ra hoa chưa có số liệu, nên các mốc thời gian dưới đây chỉ là ước tính thô.',
      ],
      stages: {
        seed: {
          description:
            'Hạt nằm trong quả nang khô năm ngăn, mỗi quả có tối đa ba hạt. Hạt nảy mầm sau khoảng 1–4 tuần; ngoài thực tế cây thường được nhân giống bằng cành giâm.',
        },
        'full-bloom': {
          description:
            'Hoa xòe năm cánh, ống nhị dài nhô ra giữa hoa, mang nhiều bao phấn ở phần giữa và đầu nhụy năm núm tròn ở chóp. Mỗi hoa thường chỉ nở một ngày, nhưng nụ mới liên tục ra.',
        },
        wilting: {
          description:
            'Mỗi hoa tàn sau khoảng một ngày. Nếu đậu quả, cây để lại quả nang khô năm ngăn, nhưng nhiều nơi cây ít đậu hạt.',
        },
      },
      care: {
        light: 'Nắng đầy đủ đến bóng râm một phần.',
        water: 'Giữ ẩm vùng rễ; khi đã bén rễ chịu hạn ở mức vừa phải.',
        soil: 'Đất giàu mùn, ẩm, thoát nước tốt.',
        temperature: 'Là cây vùng nóng, cần che gió và không chịu sương giá hay lạnh dưới khoảng 10 °C.',
        extra: 'Hoa ra trên cành mới; NC State khuyên cắt tỉa khoảng một nửa vào đầu xuân để cây ra cành mới mang hoa.',
      },
      facts: [
        'Mỗi hoa dâm bụt thường chỉ nở một ngày, nhưng cây ra hoa liên tục, ở vùng nhiệt đới gần như quanh năm.',
        'Nhị và vòi nhụy hợp thành một ống dài nhô ra giữa hoa, mang nhiều bao phấn và năm núm nhụy tròn ở chóp.',
        'Tên tiếng Anh “shoeblack plant” đến từ nước nhớt xanh đen của hoa héo, từng dùng để đánh bóng giày.',
        'Dâm bụt là quốc hoa của Malaysia; nguồn gốc của loài chưa rõ và không còn gặp ngoài tự nhiên.',
      ],
      keywords: [
        'hoa dâm bụt',
        'quá trình phát triển của hoa dâm bụt',
        'hoa dâm bụt nở mấy ngày',
        'time-lapse hoa dâm bụt',
        'hoa râm bụt bông bụp',
        'cách trồng hoa dâm bụt',
      ],
      altText:
        'Minh họa cây dâm bụt với lá bầu dục bóng và những đóa hoa đỏ lớn năm cánh, ống nhị dài vàng và đỏ nhô ra giữa hoa.',
      timeNote:
        'Các mốc thời gian chỉ là ước tính thô. Nguồn (UF/IFAS) chỉ cho biết cây trồng từ hạt ra hoa sau 10–14 tháng và cành giâm ra rễ sau 4–6 tuần; chưa có số liệu từ cành giâm đến lúc ra hoa, nên các giai đoạn còn lại là suy đoán.',
      startNote: 'Mô phỏng bắt đầu từ một hạt dâm bụt; ngoài thực tế cây thường được nhân giống bằng cành giâm.',
    },
    en: {
      name: 'Hibiscus',
      aliases: ['Chinese hibiscus', 'tropical hibiscus', 'shoeblack plant', 'hoa dâm bụt', 'râm bụt', 'bông bụp'],
      tagline: 'A hedge shrub with big red blooms that usually last a day.',
      metaDescription:
        'Watch a hibiscus grow from seed to full bloom in an interactive time-lapse: growth stages, estimated timing, care tips and facts about the hoa dâm bụt.',
      intro: [
        'The Chinese hibiscus (Hibiscus rosa-sinensis), known in Vietnamese as dâm bụt, râm bụt or bông bụp, is a shrub in the mallow family (Malvaceae). In Vietnam it grows 1–2 metres tall with large solitary flowers, usually red, with five separate petals and a long column rising from the centre. It is planted everywhere as an ornamental and as hedges.',
        'Each flower usually lasts only a day, but the plant blooms continually. Some Vietnamese sources use the name mộc cận for Hibiscus syriacus, which is a different species. Sources say a seed-grown plant flowers after about 10–14 months, and there is no figure for cuttings, so every timing below is only a rough estimate.',
      ],
      stages: {
        seed: {
          description:
            'The seeds sit in a dry five-parted capsule, up to three per capsule, and germinate in about 1–4 weeks. In practice the plant is usually propagated by cuttings.',
        },
        'full-bloom': {
          description:
            'The flower opens five petals around a long staminal column, with many anthers part-way up and five round stigma lobes at the tip. Each flower usually lasts a day, but new buds keep coming.',
        },
        wilting: {
          description:
            'Each flower fades after about a day. If it sets fruit it leaves a dry five-parted capsule, though in many places the plant sets little seed.',
        },
      },
      care: {
        light: 'Full sun to partial shade.',
        water: 'Keep the roots moist; moderately drought tolerant once established.',
        soil: 'Rich, moist, well-drained soil.',
        temperature: 'A tropical plant that needs shelter from wind and does not tolerate frost or cold below about 10 °C.',
        extra: 'It flowers on new growth; NC State suggests pruning back by about half in early spring to encourage flowering shoots.',
      },
      facts: [
        'Each hibiscus flower usually lasts only a day, but the plant keeps blooming, nearly year-round in the tropics.',
        'The stamens and style are fused into a long column with many anthers and five round stigma lobes at the tip.',
        'The name “shoeblack plant” comes from the blue-black juice of the wilted flowers, once used to polish shoes.',
        'It is the national flower of Malaysia; the species’ origin is unknown and it is no longer known in the wild.',
      ],
      keywords: [
        'hibiscus growth stages',
        'how long does a hibiscus flower last',
        'time-lapse hibiscus',
        'Chinese hibiscus life cycle',
        'hoa dâm bụt râm bụt bông bụp',
      ],
      altText:
        'Illustration of a hibiscus shrub with glossy oval leaves and large red five-petalled flowers, each with a long yellow and red column rising from the centre.',
      timeNote:
        'Timings are rough estimates. A UF/IFAS source says a seed-grown plant flowers after 10–14 months and cuttings root in 4–6 weeks; there is no figure from cutting to first bloom, so the other stages are guesses.',
      startNote: 'The simulation starts from a single hibiscus seed; in practice the plant is usually propagated by cuttings.',
    },
  },
};
