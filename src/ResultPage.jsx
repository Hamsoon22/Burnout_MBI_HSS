// ResultPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

const translations = {
  ko: {
    noResult: "❗ 설문 결과가 없습니다",
    prompt: "홈페이지에서 설문을 먼저 제출해 주세요.",
    backHome: "홈으로 돌아가기",
    title: "📊MBI HSS 설문 결과",
    exhaustion: "소진 점수 평균",
    depersonal: "비인격화 점수 평균",
    efficacy: "효능감 점수",
    retry: "다시 하기"
  },
  en: {
    noResult: "❗ No survey result found",
    prompt: "Please submit the survey on the homepage first.",
    backHome: "Return to Home",
    title: "📊MBI HSS Survey Result",
    exhaustion: "Exhaustion Mean Score",
    depersonal: "Depersonalization Mean Score",
    efficacy: "Efficacy Score",
    retry: "Try Again"
  },
  my: {
    noResult: "❗ စစ်တမ်းရလဒ်မရှိပါ",
    prompt: "ပင်မစာမျက်နှာတွင် စစ်တမ်းဖြည့်ပေးပါ။",
    backHome: "မူလသို့ပြန်မည်",
    title: "📊MBI HSS စစ်တမ်းရလဒ်",
    exhaustion: "ပင်ပန်းနွမ်းနယ်မှု အားဖြည့်မှတ်",
    depersonal: "မတည်ကြည်မှု အားဖြည့်မှတ်",
    efficacy: "ထိရောက်မှု အားဖြည့်မှတ်",
    retry: "ထပ်မံလုပ်ဆောင်မည်"
  }
};

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const lang = state?.lang || "ko";
  const t = translations[lang];

  if (!state) {
    return (
      <div className="burnout-container">
        <h2>{t.noResult}</h2>
        <p>{t.prompt}</p>
        <div className="burnout-button-center">
          <button className="burnout-button" onClick={() => navigate("/")}>{t.backHome}</button>
        </div>
      </div>
    );
  }

  const { exhaustionMean, depersonalMean, efficacyMean, exhaustionT, depersonalT, efficacyT } = state;

  return (
    <div className="burnout-container">
      <main className="burnout-main">
        <section className="burnout-section">
          <h2 className="burnout-title">{t.title}</h2>
          <div className="burnout-result-box">
            <p className="burnout-result-text">{t.exhaustion}: {exhaustionMean.toFixed(2)} / T= {exhaustionT.toFixed(1)}</p>
            <p className="burnout-result-text">{t.depersonal}: {depersonalMean.toFixed(2)} / T= {depersonalT.toFixed(1)}</p>
            <p className="burnout-result-text">{t.efficacy}: {efficacyMean.toFixed(2)} / T= {efficacyT.toFixed(1)}</p>
          </div>
          <div className="burnout-button-center">
            <button className="burnout-button" onClick={() => navigate("/")}>{t.retry}</button>
          </div>
        </section>
      </main>
    </div>
  );
}
