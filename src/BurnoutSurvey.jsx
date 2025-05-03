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
    "하루 종일 일하는 것은 나를 긴장시킨다.",
    "나는 직무상 발생하는 문제들을 효과적으로 해결한다.",
    "일 때문에 소진된 상태이다.",
    "직장에 효과적인 기여를 하고 있다고 느낀다.",
    "이 일을 시작한 이후로 내 일에 대한 관심이 줄었다.",
    "맡은 일을 하는데 있어서 소극적이 되었다.",
    "내가 생각할 때, 나는 일을 잘한다.",
    "직무상 무언가를 성취했을 때 기쁨을 느낀다.",
    "나는 현재의 직무에서 가치 있는 많은 것을 이루어왔다.",
    "나는 방해받지 않고 내 일을 수행하기 원할 뿐이다.",
    "내 일이 무언가에 기여하든 말든 나는 점점 더 냉소적이 되었다.",
    "내 일의 중요성이 의심스럽다.",
    "나는 일을 효과적으로 처리하고 있다는 자신감이 있다."
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
  
    const exhaustionIdx = [0, 1, 2, 3, 5];              // 소진: 1, 2, 3, 4, 6
    const depersonalIdx = [7, 8, 12, 13, 14];           // 냉소: 8, 9, 13, 14, 15
    const efficacyIdx = [4, 6, 9, 10, 11, 15];          // 효능감: 5, 7, 10, 11, 12, 16
  
    const exhaustionSum = exhaustionIdx.reduce((sum, i) => sum + getValue(i), 0);
    const depersonalSum = depersonalIdx.reduce((sum, i) => sum + getValue(i), 0);
    const efficacySum = efficacyIdx.reduce((sum, i) => sum + getValue(i), 0);
  
    const exhaustionMean = exhaustionSum / exhaustionIdx.length;
    const depersonalMean = depersonalSum / depersonalIdx.length;
    const efficacyMean = efficacySum / efficacyIdx.length;
  
    // 아래 T 점수는 원래 있던 계산 방식 유지 (원하면 조정 가능)
    const exhaustionT = 50 + 10 * (exhaustionMean - 2.26) / 1.47;    ;
    const depersonalT = 50 + 10 * (depersonalMean - 1.74) / 1.36;    ;
    const efficacyT = 50 + 10 * (efficacyMean - 4.34) / 1.17;
  
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
          <h2 className="burnout-title">📋 MBI GS 설문지</h2>
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