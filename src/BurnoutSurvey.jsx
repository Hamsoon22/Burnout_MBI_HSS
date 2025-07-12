// BurnoutSurvey.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import "./langButtons.css";

const translations = {
  ko: {
    title: "📋 MBI HSS 설문지",
    instruction:
      "다음 질문에 0에서 6 사이의 점수로 답해주세요.\n(0: 전혀없다, 1: 1년에 2-3회 또는 그 미만, 2: 한 달에 한 번 또는 그 미만, 3: 한 달에 2-3회, 4: 일주일에 1회 정도, 5: 일주일에 2-3회, 6: 매일)",
    submit: "결과 보기",
    labels: ["전혀없다", "1년에 2-3회 또는 그 미만", "한 달에 한 번 또는 그 미만", "한 달에 2-3회", "일주일에 1회 정도", "일주일에 2-3회", "매일"],
    questions: [
      "맡은 일을 하는 데 있어서 정서적으로 고갈된 느낌이 든다.",
      "일을 마치고 퇴근할 때쯤이면 기진맥진한 느낌이 든다.",
      "아침에 일어나서 다시 출근할 생각을 하면 피곤한 느낌이 든다.",
      "대상자의 감정을 쉽게 이해할 수 있다.",
      "일부 대상자들에 대해서 인격이 없는 물체처럼 대하고 있다고 느낀다.",
      "하루 종일 사람들과 함께 일한다는 것은 힘든 일이다.",
      "대상자들의 문제를 효과적으로 해결한다.",
      "일 때문에 소진된 상태이다.",
      "일을 통해 다른 사람들의 삶에 긍정적인 영향을 주고 있다고 느낀다.",
      "이 업무를 하게된 이후로 사람들에게 점점 둔감해졌다.",
      "이 직업으로 인해 내가 정서적으로 메말라가는 것 같아 걱정이다.",
      "매우 활기찬 느낌이 든다.",
      "업무로 인해 좌절감을 느낀다.",
      "내게 주어진 일을 지나치게 열심히 한다고 느낀다.",
      "어떤 대상자들에게는 무슨 일이 일어났는지 별로 신경 쓰지 않는다.",
      "사람들과 직접 대하면서 일하는 것에 스트레스를 받는다.",
      "대상자들과 쉽게 편안한 분위기를 만들 수 있다.",
      "대상자들과 친밀하게 일하고 나면 흐뭇해진다.",
      "직업을 통해 가치 있는 많은 것들을 성취해왔다.",
      "한계에 다다른 느낌이 든다.",
      "직장에서 감정적인 문제들을 매우 침착하게 다룬다.",
      "대상자들이 어떨 때는 자신들의 문제들에 대해 나를 비난하고 있다고 느낀다."
    ]
  },
  en: {
    title: "📋 MBI HSS Survey",
    instruction:
      "Please respond using a score from 0 to 6.\n(0: Never, 1: A few times a year or less, 2: Once a month or less, 3: A few times a month, 4: Once a week, 5: A few times a week, 6: Every day)",
    submit: "View Results",
    labels: ["Never", "A few times a year or less", "Once a month or less", "A few times a month", "Once a week", "A few times a week", "Every day"],
    questions: [
      "I feel emotionally drained from my work.",
      "I feel used up at the end of the workday.",
      "I feel fatigued when I get up in the morning and have to face another day on the job.",
      "I can easily understand how my recipients feel about things.",
      "I feel I treat some recipients as if they were impersonal objects.",
      "Working with people all day is really a strain for me.",
      "I deal very effectively with the problems of my recipients.",
      "I feel burned out from my work.",
      "I feel I'm positively influencing other people's lives through my work.",
      "I've become more callous toward people since I took this job.",
      "I worry that this job is hardening me emotionally.",
      "I feel very energetic.",
      "I feel frustrated by my job.",
      "I feel I'm working too hard on my job.",
      "I don't really care what happens to some recipients.",
      "Working with people directly puts too much stress on me.",
      "I can easily create a relaxed atmosphere with my recipients.",
      "I feel exhilarated after working closely with my recipients.",
      "I have accomplished many worthwhile things in this job.",
      "I feel like I'm at the end of my rope.",
      "In my work, I deal with emotional problems very calmly.",
      "I feel recipients blame me for some of their problems."
    ]
  },
  my: {
    title: "📋 MBI HSS စစ်တမ်း",
    instruction:
      "အောက်ဖော်ပြပါမေးခွန်းများကို ၀ မှ ၆ အထိ အမှတ်ပေးပါ။\n(၀ - ဘယ်တော့မှမရှိဘူး၊ ၁ - တစ်နှစ်ကို အနည်းငယ် (သို့) ပိုနည်းတယ်၊ ၂ - တစ်လကို တစ်ကြိမ် (သို့) ပိုနည်းတယ်၊ ၃ - တစ်လကို အနည်းငယ်၊ ၄ - တစ်ပတ်ကို တစ်ကြိမ်၊ ၅ - တစ်ပတ်ကို အနည်းငယ်၊ ၆ - နေ့တိုင်း)",
    submit: "ရလဒ်ကြည့်မည်",
    labels: ["ဘယ်တော့မှမရှိဘူး", "တစ်နှစ်ကို အနည်းငယ် (သို့) ပိုနည်းတယ်", "တစ်လကို တစ်ကြိမ် (သို့) ပိုနည်းတယ်", "တစ်လကို အနည်းငယ်", "တစ်ပတ်ကို တစ်ကြိမ်", "တစ်ပတ်ကို အနည်းငယ်", "နေ့တိုင်း"],
    questions: [
      "ကျွန်ုပ်၏အလုပ်ကြောင့် စိတ်ပိုင်းဆိုင်ရာ ပင်ပန်းနွမ်းနယ်နေသည်ဟု ခံစားရသည်။",
      "အလုပ်ပြီးဆုံးချိန်တွင် အင်အားကုန်ခန်းသည်ဟု ခံစားရသည်။",
      "မနက်အိပ်ရာထချိန်တွင် နောက်ထပ်အလုပ်လုပ်ရမည့်တစ်ရက်ကို ရင်ဆိုင်ရမည်ဖြစ်၍ ပင်ပန်းနွမ်းနယ်နေသည်ဟု ခံစားရသည်။",
      "ကျွန်ုပ်၏ ဝန်ဆောင်မှုခံယူသူများသည် အခြေအနေများကို မည်သို့ခံစားရသည်ကို ကျွန်ုပ်လွယ်ကူစွာ နားလည်နိုင်သည်။",
      "ကျွန်ုပ်သည် အချို့သော ဝန်ဆောင်မှုခံယူသူများကို လူပုဂ္ဂိုလ်တစ်ဦးချင်းစီအဖြစ် မဟုတ်ဘဲ အရာဝတ္ထုသဖွယ် သဘောထားမိသည်ဟု ခံစားရသည်။",
      "တစ်နေ့တာလုံး လူများနှင့် အလုပ်လုပ်ရခြင်းသည် ကျွန်ုပ်အတွက် အမှန်တကယ် ဖိစီးမှုဖြစ်သည်။",
      "ကျွန်ုပ်သည် ဝန်ဆောင်မှုခံယူသူများ၏ ပြဿနာများကို ထိရောက်စွာ ကိုင်တွယ်ဖြေရှင်းနိုင်သည်။",
      "ကျွန်ုပ်၏အလုပ်ကြောင့် စိတ်ပိုင်းဆိုင်ရာပင်ပန်းနွမ်းနယ်ခြင်းကို ခံစားရသည်။",
      "ကျွန်ုပ်၏အလုပ်မှတစ်ဆင့် အခြားသူများ၏ဘဝအပေါ် အပြုသဘောဆောင်သော သက်ရောက်မှုရှိသည်ဟု ခံစားရသည်။",
      "ဤအလုပ်ကို စတင်လုပ်ကိုင်ပြီးနောက် လူများအပေါ် စာနာစိတ်ကင်းမဲ့လာသည်။",
      "ဤအလုပ်ကြောင့် ကျွန်ုပ်၏စိတ်ခံစားမှုများ မာကျောလာမည်ကို စိုးရိမ်သည်။",
      "ကျွန်ုပ်သည် အလွန်တက်ကြွသည်ဟု ခံစားရသည်။",
      "ကျွန်ုပ်၏အလုပ်ကြောင့် စိတ်ပျက်အားငယ်ရသည်ဟု ခံစားရသည်။",
      "ကျွန်ုပ်သည် ကျွန်ုပ်၏အလုပ်တွင် အလွန်ပင်ပန်းခံနေရသည်ဟု ခံစားရသည်။",
      "အချို့သော ဝန်ဆောင်မှုခံယူသူများနှင့်ပတ်သက်၍ မည်သို့ဖြစ်ဖြစ် ဂရုမစိုက်တော့ပေ။",
      "လူများနှင့် တိုက်ရိုက်လုပ်ကိုင်ရခြင်းသည် ကျွန်ုပ်အပေါ် ဖိစီးမှုဒဏ်ကို များစွာသက်ရောက်စေသည်။",
      "ကျွန်ုပ်သည် ဝန်ဆောင်မှုခံယူသူများနှင့်အတူ စိတ်အပန်းဖြေနိုင်သော ပတ်ဝန်းကျင်ကို အလွယ်တကူ ဖန်တီးနိုင်သည်။",
      "ဝန်ဆောင်မှုခံယူသူများနှင့် အနီးကပ်လုပ်ကိုင်ပြီးနောက် စိတ်အားတက်ကြွသည်ဟု ခံစားရသည်။",
      "ဤအလုပ်တွင် အဖိုးတန်သောအရာများစွာကို ပြီးမြောက်အောင်မြင်ခဲ့သည်။",
      "ကျွန်ုပ်သည် ဆက်လက်ရင်ဆိုင်နိုင်ဖို့ အင်အားမရှိတော့သလို ခံစားနေရသည်။",
      "ကျွန်ုပ်၏အလုပ်တွင် စိတ်ပိုင်းဆိုင်ရာပြဿနာများကို အလွန်အေးဆေးတည်ငြိမ်စွာ ကိုင်တွယ်ဖြေရှင်းသည်။",
      "ဝန်ဆောင်မှုခံယူသူများသည် ၎င်းတို့၏ပြဿနာအချို့အတွက် ကျွန်ုပ်ကို အပြစ်တင်သည်ဟု ခံစားရသည်။"
    ]
  }
};

export default function BurnoutSurvey() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("ko");
  const { title, instruction, submit, labels, questions } = translations[lang];


  const handleSubmit = () => {
    const unanswered = questions.some((_, i) => {
      return !document.querySelector(`input[name='q${i}']:checked`);
    });
  
    if (unanswered) {
      const alertMessages = {
        ko: "모든 문항에 응답해야 결과를 볼 수 있습니다.",
        en: "You must answer all questions to view the results.",
        my: "မေးခွန်းအားလုံးကို ဖြေဆိုရပါမည်။"
      };
      alert(alertMessages[lang] || alertMessages.en);
      return;
    }
  
    const getValue = (i) => {
      const selected = document.querySelector(`input[name='q${i}']:checked`);
      return selected ? parseInt(selected.value, 10) : 0;
    };
  
    const exhaustionIdx = [0, 1, 2, 5, 7, 12, 13, 15, 19]; // 정서적 고갈
    const depersonalIdx = [4, 9, 10, 14, 21];              // 비인격화
    const efficacyIdx = [3, 6, 8, 11, 16, 17, 18, 20];      // 개인 성취감 (역채점 아님)
    
    const exhaustionSum = exhaustionIdx.reduce((sum, i) => sum + getValue(i), 0);
    const depersonalSum = depersonalIdx.reduce((sum, i) => sum + getValue(i), 0);
    const efficacySum = efficacyIdx.reduce((sum, i) => sum + getValue(i), 0);
    
    const exhaustionMean = exhaustionSum / exhaustionIdx.length;
    const depersonalMean = depersonalSum / depersonalIdx.length;
    const efficacyMean = efficacySum / efficacyIdx.length;
    
    const exhaustionT = 50 + 10 * (exhaustionSum - 21.42) / 11.5;
    const depersonalT = 50 + 10 * (depersonalSum - 8.11) / 6.15;
    const efficacyT = 50 + 10 * (efficacySum - 36.43) / 7.00;
  
    navigate("/result", {
      state: {
        exhaustionSum,
        exhaustionMean,
        depersonalSum,
        depersonalMean,
        efficacySum,
        efficacyMean,
        exhaustionT,
        depersonalT,
        efficacyT,
        lang // 전달
      }
    });
  };  

  return (
    <div className="burnout-container">
      <main className="burnout-main">
        <section className="burnout-section">
        <div className="burnout-lang-toggle" style={{ display: 'flex', gap: '8px', marginBottom: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => setLang('ko')}
              className={`lang-button ${lang === 'ko' ? 'active-lang' : ''}`}
            >
              🇰🇷 한국어
            </button>
            <button
              onClick={() => setLang('en')}
              className={`lang-button ${lang === 'en' ? 'active-lang' : ''}`}
            >
              🇺🇸 English
            </button>
            <button
              onClick={() => setLang('my')}
              className={`lang-button ${lang === 'my' ? 'active-lang' : ''}`}
            >
              🇲🇲 မြန်မာ
            </button>
        </div>
          <h2 className="burnout-title">{title}</h2>
          <p className="burnout-instruction">
            {instruction.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
          {questions.map((q, idx) => (
            <div key={idx} className="burnout-question-card">
              <h3>{idx + 1}. {q}</h3>
              <div className="burnout-options">
                {labels.map((label, i) => (
                  <label key={i} className="burnout-option">
                    <input type="radio" name={`q${idx}`} value={i} />
                    {i} - {label}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="burnout-button-center">
            <button className="burnout-button" onClick={handleSubmit}>{submit}</button>
          </div>
        </section>
      </main>
    </div>
  );
}