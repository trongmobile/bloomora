/**
 * "Which stage of a flower's life are you in?" — a light, shareable quiz that borrows Bloomora's
 * nine growth stages as a metaphor. It is for fun: nothing here is a botanical fact, a
 * psychological assessment or advice. Every option votes for one stage; the stage with the most
 * votes is the result (see src/lib/quiz.ts).
 *
 * Copy rules: warm, never judging. No stage is "good" or "bad" — even wilting is the plant
 * setting seed, and the text says so.
 */
import type { Lang, StageId } from './types';

type L10n = Record<Lang, string>;

export interface QuizOption {
  stage: StageId;
  text: L10n;
}

export interface QuizQuestion {
  id: string;
  prompt: L10n;
  /** Four options voting for four different stages. */
  options: readonly QuizOption[];
}

export interface QuizResult {
  /** Flower whose illustration represents the stage on the result page and in the share image. */
  showcase: string;
  text: Record<Lang, { title: string; body: string; tip: string }>;
}

export const QUIZ_QUESTIONS: readonly QuizQuestion[] = [
  {
    id: 'monday',
    prompt: {
      vi: 'Sáng thứ Hai, bạn thường thấy thế nào?',
      en: 'How do you usually feel on a Monday morning?',
    },
    options: [
      { stage: 'seed', text: { vi: 'Chưa muốn dậy: mình cần thêm chút yên tĩnh.', en: 'Not ready yet: I need a little more quiet.' } },
      { stage: 'seedling', text: { vi: 'Còn ngái ngủ nhưng tò mò xem hôm nay có gì mới.', en: 'Still sleepy, but curious what today will bring.' } },
      { stage: 'bud-development', text: { vi: 'Đã có kế hoạch rõ ràng và sẵn sàng bắt đầu.', en: 'I have a clear plan and I am ready to start.' } },
      { stage: 'full-bloom', text: { vi: 'Tràn đầy năng lượng, muốn gặp mọi người.', en: 'Full of energy and eager to see people.' } },
    ],
  },
  {
    id: 'project',
    prompt: {
      vi: 'Việc lớn nhất của bạn lúc này đang ở đâu?',
      en: 'Where is your biggest project right now?',
    },
    options: [
      { stage: 'seed', text: { vi: 'Mới chỉ là một ý tưởng trong đầu.', en: 'It is still just an idea in my head.' } },
      { stage: 'germination', text: { vi: 'Mình vừa làm bước đầu tiên.', en: 'I have just taken the very first step.' } },
      { stage: 'vegetative', text: { vi: 'Mình làm đều đặn, mỗi ngày một chút.', en: 'I am working steadily, a little every day.' } },
      { stage: 'wilting', text: { vi: 'Mình vừa xong và đang gom lại những gì nó mang đến.', en: 'I have just finished and am gathering what it gave me.' } },
    ],
  },
  {
    id: 'learning',
    prompt: {
      vi: 'Bạn học một điều mới theo cách nào?',
      en: 'How do you learn something new?',
    },
    options: [
      { stage: 'germination', text: { vi: 'Thử ngay, sai đâu sửa đó.', en: 'Try it straight away and fix things as I go.' } },
      { stage: 'seedling', text: { vi: 'Hỏi nhiều, xem nhiều, bắt chước người giỏi.', en: 'Ask a lot, watch a lot, copy people who are good.' } },
      { stage: 'bud-formation', text: { vi: 'Đọc và chuẩn bị thật kỹ rồi mới làm.', en: 'Read and prepare thoroughly before I begin.' } },
      { stage: 'blooming', text: { vi: 'Vừa học vừa chia sẻ lại cho người khác.', en: 'Learn while sharing it with other people.' } },
    ],
  },
  {
    id: 'weekend',
    prompt: {
      vi: 'Cuối tuần lý tưởng của bạn trông thế nào?',
      en: 'What does your ideal weekend look like?',
    },
    options: [
      { stage: 'seed', text: { vi: 'Ở nhà, không kế hoạch, nạp lại năng lượng.', en: 'At home, no plans, recharging.' } },
      { stage: 'vegetative', text: { vi: 'Làm nốt việc dang dở rồi dọn dẹp gọn gàng.', en: 'Finish what is half done, then tidy up.' } },
      { stage: 'bud-development', text: { vi: 'Chuẩn bị cho một sự kiện sắp tới.', en: 'Get ready for something coming up.' } },
      { stage: 'full-bloom', text: { vi: 'Ra ngoài, gặp bạn bè, được là chính mình.', en: 'Go out, see friends, be myself.' } },
    ],
  },
  {
    id: 'feeling',
    prompt: {
      vi: 'Câu nào giống bạn nhất dạo này?',
      en: 'Which sentence sounds most like you lately?',
    },
    options: [
      { stage: 'seedling', text: { vi: 'Mình đang học rất nhiều thứ mới, và còn non lắm.', en: 'I am learning so many new things, and I am still green.' } },
      { stage: 'bud-formation', text: { vi: 'Mình có cảm giác sắp có điều gì đó thay đổi.', en: 'I have a feeling something is about to change.' } },
      { stage: 'blooming', text: { vi: 'Mình bắt đầu được mọi người chú ý.', en: 'People are starting to notice me.' } },
      { stage: 'wilting', text: { vi: 'Mình muốn chậm lại, giữ điều quý và buông phần còn lại.', en: 'I want to slow down, keep what matters and let go of the rest.' } },
    ],
  },
  {
    id: 'obstacle',
    prompt: {
      vi: 'Khi gặp trở ngại, bạn thường làm gì?',
      en: 'When you hit an obstacle, what do you usually do?',
    },
    options: [
      { stage: 'seed', text: { vi: 'Lùi lại, nghĩ kỹ rồi mới quyết định.', en: 'Step back and think it through before deciding.' } },
      { stage: 'vegetative', text: { vi: 'Kiên trì làm tiếp, rồi cũng qua.', en: 'Keep going steadily; it passes.' } },
      { stage: 'bud-development', text: { vi: 'Điều chỉnh kế hoạch và chuẩn bị kỹ hơn.', en: 'Adjust the plan and prepare more carefully.' } },
      { stage: 'wilting', text: { vi: 'Chấp nhận, rút kinh nghiệm và gieo hạt cho lần sau.', en: 'Accept it, learn from it and plant seeds for next time.' } },
    ],
  },
  {
    id: 'season',
    prompt: {
      vi: 'Nếu là một mùa trong năm, bạn sẽ là…',
      en: 'If you were a season, you would be…',
    },
    options: [
      { stage: 'germination', text: { vi: 'Đầu xuân: mọi thứ vừa nhú lên.', en: 'Early spring: everything is just sprouting.' } },
      { stage: 'bud-formation', text: { vi: 'Cuối xuân: sắp bung nở.', en: 'Late spring: about to burst open.' } },
      { stage: 'full-bloom', text: { vi: 'Giữa hè: rực rỡ và đầy màu sắc.', en: 'Midsummer: bright and full of colour.' } },
      { stage: 'wilting', text: { vi: 'Cuối thu: thu hoạch và nghỉ ngơi.', en: 'Late autumn: harvest and rest.' } },
    ],
  },
];

export const QUIZ_RESULTS: Record<StageId, QuizResult> = {
  seed: {
    showcase: 'chrysanthemum',
    text: {
      vi: {
        title: 'Hạt giống đang ngủ',
        body: 'Bên ngoài trông như chưa có gì xảy ra, nhưng bên trong hạt đã chứa sẵn cả một cây non. Bạn đang ở giai đoạn cần yên tĩnh, tích lũy và chờ đúng lúc.',
        tip: 'Chưa cần vội. Nghỉ ngơi, thu thập ý tưởng và chọn nơi bạn muốn gieo.',
      },
      en: {
        title: 'A seed, resting',
        body: 'From the outside nothing seems to be happening, yet the seed already holds a whole young plant. You are in a stage that needs quiet, saving up and waiting for the right moment.',
        tip: 'No need to hurry. Rest, collect ideas and choose where you want to plant.',
      },
    },
  },
  germination: {
    showcase: 'sunflower',
    text: {
      vi: {
        title: 'Vừa nảy mầm',
        body: 'Chiếc rễ đầu tiên đã đâm xuống và chồi nhỏ vừa nhú lên. Bạn đang ở giai đoạn của những bước đầu tiên: còn mong manh, nhưng mọi thứ đang bắt đầu chuyển động.',
        tip: 'Làm nhỏ thôi, làm đều thôi. Bước đầu tiên đã là phần khó nhất bạn vừa vượt qua.',
      },
      en: {
        title: 'Just sprouted',
        body: 'The first root has gone down and a small shoot has just pushed up. You are in the stage of first steps: still fragile, but everything has started to move.',
        tip: 'Keep it small and keep it regular. You have just done the hardest part, the first step.',
      },
    },
  },
  seedling: {
    showcase: 'marigold',
    text: {
      vi: {
        title: 'Cây con ham học',
        body: 'Những chiếc lá thật đầu tiên đã mở ra và bạn hút lấy mọi thứ xung quanh như ánh sáng. Bạn đang ở giai đoạn học nhanh, hỏi nhiều và còn non nên được phép vụng về.',
        tip: 'Tìm một người đáng học và cho phép mình mắc lỗi. Cây con nào cũng ngả nghiêng trước khi vững.',
      },
      en: {
        title: 'An eager seedling',
        body: 'Your first true leaves have opened and you are soaking up everything around you, light included. You are in the stage of learning fast and asking a lot, and being new means being allowed to be clumsy.',
        tip: 'Find someone worth learning from, and let yourself make mistakes. Every seedling leans before it stands.',
      },
    },
  },
  vegetative: {
    showcase: 'morning-glory',
    text: {
      vi: {
        title: 'Đang lớn thân lá',
        body: 'Thân cao thêm và lá nhiều thêm từng ngày, chưa có hoa nhưng cây đang tích năng lượng cho điều lớn hơn. Bạn đang ở giai đoạn làm đều, bền bỉ và ít được nhìn thấy.',
        tip: 'Đây là phần việc thầm lặng nhưng quan trọng. Giữ nhịp, ăn ngủ đủ và tin vào tiến độ.',
      },
      en: {
        title: 'Growing stem and leaves',
        body: 'The stem gets taller and the leaves more numerous every day. There are no flowers yet, but the plant is storing energy for something bigger. You are in the steady, patient stage that few people see.',
        tip: 'This is quiet but important work. Keep your rhythm, rest enough and trust the progress.',
      },
    },
  },
  'bud-formation': {
    showcase: 'tulip',
    text: {
      vi: {
        title: 'Nụ đầu tiên vừa hình thành',
        body: 'Cây vừa nhận tín hiệu để chuyển từ lớn lên sang ra hoa. Bạn đang ở giai đoạn cảm thấy sắp có điều gì đó đổi thay, dù chưa gọi tên được.',
        tip: 'Hãy để ý những dấu hiệu nhỏ. Điều bạn đang chuẩn bị đã bắt đầu thành hình.',
      },
      en: {
        title: 'The first bud has formed',
        body: 'The plant has just received the signal to switch from growing to flowering. You are in the stage of sensing that something is about to change, even if you cannot name it yet.',
        tip: 'Pay attention to small signs. What you have been preparing has started to take shape.',
      },
    },
  },
  'bud-development': {
    showcase: 'rose',
    text: {
      vi: {
        title: 'Nụ đang căng tròn',
        body: 'Nụ phình to và màu cánh hoa bắt đầu lộ ra. Bạn đang ở giai đoạn chuẩn bị chu đáo, gần tới lúc được nhìn thấy nhưng chưa phải ngay bây giờ.',
        tip: 'Rà lại những chi tiết cuối cùng, rồi cho mình chút can đảm. Nụ không cần vội để nở.',
      },
      en: {
        title: 'A bud, swelling',
        body: 'The bud is plumping up and the colour of the petals is starting to show. You are in the stage of careful preparation, close to being seen but not quite yet.',
        tip: 'Go over the last details, then give yourself a little courage. A bud does not need to rush to open.',
      },
    },
  },
  blooming: {
    showcase: 'cherry-blossom',
    text: {
      vi: {
        title: 'Cánh hoa đầu tiên đang hé',
        body: 'Cánh hoa tách ra và ánh sáng lọt vào bên trong. Bạn đang ở giai đoạn bắt đầu cho người khác thấy mình, và được chú ý lần đầu thường hơi hồi hộp.',
        tip: 'Cứ mở ra từ từ. Chia sẻ điều bạn biết, người cần nó sẽ tìm tới.',
      },
      en: {
        title: 'The first petals are opening',
        body: 'The petals are parting and light is reaching the inside. You are in the stage of letting other people see you, and being noticed for the first time is often a little nerve-racking.',
        tip: 'Open up gradually. Share what you know and the people who need it will find you.',
      },
    },
  },
  'full-bloom': {
    showcase: 'lotus',
    text: {
      vi: {
        title: 'Nở rộ',
        body: 'Hoa mở hết cỡ, rực rỡ và hấp dẫn nhất. Bạn đang ở giai đoạn năng lượng cao, muốn gặp gỡ và kết nối, đúng lúc để làm điều mình đã chuẩn bị.',
        tip: 'Tận hưởng và nhớ rằng hoa nở rộ cũng cần nước. Chừa chỗ cho nghỉ ngơi.',
      },
      en: {
        title: 'In full bloom',
        body: 'The flower is wide open, at its brightest and most inviting. You are in a high-energy stage, wanting to meet and connect, just the right time to do what you prepared for.',
        tip: 'Enjoy it, and remember that a flower in full bloom still needs water. Leave room to rest.',
      },
    },
  },
  wilting: {
    showcase: 'chrysanthemum',
    text: {
      vi: {
        title: 'Tàn để kết hạt',
        body: 'Cánh hoa rụng xuống không phải là kết thúc: đây là lúc cây kết hạt cho mùa sau. Bạn đang ở giai đoạn khép lại một chương, thu hoạch và giữ lại điều đáng giữ.',
        tip: 'Nhìn lại điều đã đạt được, buông phần đã xong và để dành vài hạt cho lần gieo tiếp theo.',
      },
      en: {
        title: 'Fading, to set seed',
        body: 'Falling petals are not an ending: this is when the plant sets seed for the next season. You are in the stage of closing a chapter, harvesting and keeping what is worth keeping.',
        tip: 'Look back at what you achieved, let go of what is finished and save a few seeds for the next planting.',
      },
    },
  },
};
