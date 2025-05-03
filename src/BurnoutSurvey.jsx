import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function BurnoutSurvey() {
  const navigate = useNavigate();

  const labels = [
    "전혀없다",
    "1년에 2-3회 또는 그 미만",
    "한 달에 한 번 또는 그 미만",
    "한 달에 2-3회",
    "일주일에 1회 정도",
    "일주일에 2-3회",
    "매일"
  ];

  const questions = [
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
  ];

  const handleSubmit = () => {
    const unanswered = questions.some((_, i) => {
      return !document.querySelector(`input[name='q${i}']:checked`);
    });
  
    if (unanswered) {
      alert("모든 문항에 응답해야 결과를 볼 수 있습니다.");
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
        efficacyT
      }
    });
  };  

  return (
    <div className="burnout-container">
      <main className="burnout-main">
        <section className="burnout-section">
          <h2 className="burnout-title">📋 MBI HSS 설문지</h2>
          <p className="burnout-instruction">
            다음 질문에 0에서 6 사이의 점수로 답해주세요.<br />
            (0: 전혀없다, 1: 1년에 2-3회 또는 그 미만, 2: 한 달에 한 번 또는 그 미만,
            3: 한 달에 2-3회, 4: 일주일에 1회 정도, 5: 일주일에 2-3회, 6: 매일)
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
            <button className="burnout-button" onClick={handleSubmit}>결과 보기</button>
          </div>
        </section>
      </main>
    </div>
  );
}