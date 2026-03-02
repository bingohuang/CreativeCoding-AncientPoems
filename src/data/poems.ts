export interface Poem {
  id: number;
  title: string;
  author: string;
  dynasty: string;
  content: string[];
  pinyin: string[];
  annotations: { word: string; meaning: string }[];
  background: string;
  image: string;
}

export const poems: Poem[] = [
  {
    id: 1,
    title: "所见",
    author: "袁枚",
    dynasty: "清",
    content: [
      "牧童骑黄牛，",
      "歌声振林樾。",
      "意欲捕鸣蝉，",
      "忽然闭口立。"
    ],
    pinyin: [
      "mù tóng qí huáng niú，",
      "gē shēng zhèn lín yuè。",
      "yì yù bǔ míng chán，",
      "hū rán bì kǒu lì。"
    ],
    annotations: [
      { word: "牧童", meaning: "放牛的孩子" },
      { word: "振", meaning: "回荡，响亮" },
      { word: "林樾", meaning: "树林" },
      { word: "意欲", meaning: "想要" },
      { word: "鸣蝉", meaning: "正在叫的知了" }
    ],
    background: "这首诗描写了一个天真可爱的牧童形象。牧童骑在黄牛背上，开心地唱着歌，歌声在树林里回荡。当他想要捕捉树上鸣叫的知了时，立刻停止了唱歌，静静地站着，生怕惊动了知了。诗人用生动的笔触，捕捉到了孩子天真烂漫的瞬间。",
    image: "/images/所见的插画.jpg"
  },
  {
    id: 2,
    title: "春晓",
    author: "孟浩然",
    dynasty: "唐",
    content: [
      "春眠不觉晓，",
      "处处闻啼鸟。",
      "夜来风雨声，",
      "花落知多少。"
    ],
    pinyin: [
      "chūn mián bù jué xiǎo，",
      "chù chù wén tí niǎo。",
      "yè lái fēng yǔ shēng，",
      "huā luò zhī duō shǎo。"
    ],
    annotations: [
      { word: "春眠", meaning: "春天的睡眠" },
      { word: "不觉晓", meaning: "不知不觉天亮了" },
      { word: "闻", meaning: "听到" },
      { word: "啼鸟", meaning: "鸟儿叫" },
      { word: "夜来", meaning: "夜里" }
    ],
    background: "这首诗写的是春天早晨的情景。诗人在春天睡得很香，不知不觉天就亮了。醒来时，到处都能听到鸟儿欢快的叫声。想起昨夜的风雨声，不知道有多少花儿被吹落了。诗人用简单的语言，表达了对春天的喜爱和对落花的惋惜。",
    image: "/images/春晓的插画.jpg"
  },
  {
    id: 3,
    title: "舟夜书所见",
    author: "查慎行",
    dynasty: "清",
    content: [
      "月黑见渔灯，",
      "孤光一点萤。",
      "微微风簇浪，",
      "散作满河星。"
    ],
    pinyin: [
      "yuè hēi jiàn yú dēng，",
      "gū guāng yì diǎn yíng。",
      "wēi wēi fēng cù làng，",
      "sàn zuò mǎn hé xīng。"
    ],
    annotations: [
      { word: "月黑", meaning: "没有月亮的夜晚" },
      { word: "渔灯", meaning: "渔船上的灯" },
      { word: "孤光", meaning: "孤单的灯光" },
      { word: "萤", meaning: "萤火虫" },
      { word: "簇", meaning: "聚集，吹起" }
    ],
    background: "这首诗描写的是夜晚在船上看到的美丽景色。没有月亮的夜晚，看到渔船上的灯光，像萤火虫一样微弱。微风吹起细小的波浪，灯光散开在河面上，就像满河的星星在闪烁。诗人用优美的语言，描绘了夜晚河面的宁静与美丽。",
    image: "/images/舟夜书所见的插画.jpg"
  },
  {
    id: 4,
    title: "小池",
    author: "杨万里",
    dynasty: "宋",
    content: [
      "泉眼无声惜细流，",
      "树阴照水爱晴柔。",
      "小荷才露尖尖角，",
      "早有蜻蜓立上头。"
    ],
    pinyin: [
      "quán yǎn wú shēng xī xì liú，",
      "shù yīn zhào shuǐ ài qíng róu。",
      "xiǎo hé cái lù jiān jiān jiǎo，",
      "zǎo yǒu qīng tíng lì shàng tóu。"
    ],
    annotations: [
      { word: "泉眼", meaning: "泉水的出口" },
      { word: "惜", meaning: "爱惜" },
      { word: "晴柔", meaning: "晴天柔和的风光" },
      { word: "小荷", meaning: "刚长出的荷叶" },
      { word: "尖尖角", meaning: "荷叶刚露出水面的尖角" }
    ],
    background: "这首诗描写的是初夏小池塘的美丽景色。泉水静静地流淌，好像爱惜这细细的水流。树荫倒映在水面上，喜爱这晴朗柔和的天气。小小的荷叶刚刚露出尖尖的角，早就有一只蜻蜓停在上面了。诗人用细腻的观察，捕捉到了大自然中生动有趣的一幕。",
    image: "/images/小池的插画.jpg"
  },
  {
    id: 5,
    title: "静夜思",
    author: "李白",
    dynasty: "唐",
    content: [
      "床前明月光，",
      "疑是地上霜。",
      "举头望明月，",
      "低头思故乡。"
    ],
    pinyin: [
      "chuáng qián míng yuè guāng，",
      "yí shì dì shàng shuāng。",
      "jǔ tóu wàng míng yuè，",
      "dī tóu sī gù xiāng。"
    ],
    annotations: [
      { word: "疑", meaning: "怀疑，以为" },
      { word: "举头", meaning: "抬头" },
      { word: "思", meaning: "思念" },
      { word: "故乡", meaning: "家乡" }
    ],
    background: "这首诗是李白最著名的诗作之一，表达了游子对故乡的思念之情。明亮的月光洒在床前，诗人以为是地上的白霜。抬头望着天上的明月，不由得低下头来思念远方的家乡。这首诗语言简单，但感情真挚，千百年来感动了无数人。",
    image: "/images/静夜思的插画.jpg"
  },
  {
    id: 6,
    title: "绝句",
    author: "杜甫",
    dynasty: "唐",
    content: [
      "两个黄鹂鸣翠柳，",
      "一行白鹭上青天。",
      "窗含西岭千秋雪，",
      "门泊东吴万里船。"
    ],
    pinyin: [
      "liǎng gè huáng lí míng cuì liǔ，",
      "yì háng bái lù shàng qīng tiān。",
      "chuāng hán xī lǐng qiān qiū xuě，",
      "mén bó dōng wú wàn lǐ chuán。"
    ],
    annotations: [
      { word: "黄鹂", meaning: "黄莺鸟" },
      { word: "翠柳", meaning: "翠绿的柳树" },
      { word: "白鹭", meaning: "一种白色的水鸟" },
      { word: "窗含", meaning: "从窗户望出去" },
      { word: "西岭", meaning: "西边的山岭" },
      { word: "泊", meaning: "停泊" }
    ],
    background: "这首诗描绘了春天美丽的景色。两只黄鹂在翠绿的柳树上欢快地歌唱，一行白鹭飞向蔚蓝的天空。从窗户望出去，可以看到西岭上终年不化的积雪，门前停泊着从遥远的东吴驶来的船只。诗人用色彩鲜明的画面，展现了春天的生机勃勃。",
    image: "/images/绝句的插画.jpg"
  },
  {
    id: 7,
    title: "村居",
    author: "高鼎",
    dynasty: "清",
    content: [
      "草长莺飞二月天，",
      "拂堤杨柳醉春烟。",
      "儿童散学归来早，",
      "忙趁东风放纸鸢。"
    ],
    pinyin: [
      "cǎo zhǎng yīng fēi èr yuè tiān，",
      "fú dī yáng liǔ zuì chūn yān。",
      "ér tóng sàn xué guī lái zǎo，",
      "máng chèn dōng fēng fàng zhǐ yuān。"
    ],
    annotations: [
      { word: "草长", meaning: "青草生长" },
      { word: "莺飞", meaning: "黄莺飞舞" },
      { word: "拂堤", meaning: "轻拂着堤岸" },
      { word: "醉", meaning: "陶醉" },
      { word: "春烟", meaning: "春天的雾气" },
      { word: "散学", meaning: "放学" },
      { word: "纸鸢", meaning: "风筝" }
    ],
    background: "这首诗描写了春天乡村的美好景象。二月里，青草生长，黄莺飞舞。杨柳轻拂着堤岸，陶醉在春天的雾气中。孩子们放学回来得早，急忙趁着东风放风筝。诗人用欢快的笔调，描绘了春天里孩子们快乐玩耍的场景。",
    image: "/images/村居的插画.jpg"
  },
  {
    id: 8,
    title: "九月九日忆山东兄弟",
    author: "王维",
    dynasty: "唐",
    content: [
      "独在异乡为异客，",
      "每逢佳节倍思亲。",
      "遥知兄弟登高处，",
      "遍插茱萸少一人。"
    ],
    pinyin: [
      "dú zài yì xiāng wéi yì kè，",
      "měi féng jiā jié bèi sī qīn。",
      "yáo zhī xiōng dì dēng gāo chù，",
      "biàn chā zhū yú shǎo yì rén。"
    ],
    annotations: [
      { word: "异乡", meaning: "外地，他乡" },
      { word: "异客", meaning: "外乡的客人" },
      { word: "佳节", meaning: "美好的节日" },
      { word: "倍", meaning: "更加" },
      { word: "遥知", meaning: "远远地知道" },
      { word: "茱萸", meaning: "一种香草，重阳节插在头上" }
    ],
    background: "这首诗是王维在重阳节思念家乡亲人时写的。诗人独自一人在外地，每逢节日就更加思念亲人。他想象着家乡的兄弟们正在登高望远，头上插着茱萸，只是少了他一个人。这首诗表达了深深的思乡之情，真挚感人。",
    image: "/images/九月九日忆山东兄弟的插画.jpg"
  }
];
