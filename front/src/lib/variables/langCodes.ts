interface TLangCodes {
  [lang: string]: {
    name: string;
    nativeName: string;
    ianaCode?: string;
  };
}

// 초반에는 한중일 언어만 지원
const langCodes: TLangCodes = {
  en: { name: "English", nativeName: "English" },
  ko: { name: "Korean", nativeName: "한국어" },
  ja: { name: "Japanese", nativeName: "日本語" },
  "zh-cn": { name: "Chinese (Simplified)", nativeName: "汉语", ianaCode: "zh-Hans" },
  "zh-tw": { name: "Chinese (Traditional)", nativeName: "漢語", ianaCode: "zh-Hant" },
};

export default langCodes;
