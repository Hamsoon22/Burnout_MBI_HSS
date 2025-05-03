import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="burnout-container">
        <h2>❗ 설문 결과가 없습니다</h2>
        <p>홈페이지에서 설문을 먼저 제출해 주세요.</p>
        <div className="burnout-button-center">
          <button className="burnout-button" onClick={() => navigate("/")}>홈으로 돌아가기</button>
        </div>
      </div>
    );
  }

  const { exhaustionMean, depersonalMean, efficacyMean, exhaustionT, depersonalT, efficacyT } = state;

  return (
    <div className="burnout-container">
      <main className="burnout-main">
        <section className="burnout-section">
          <h2 className="burnout-title">📊MBI HSS 설문 결과</h2>
          <div className="burnout-result-box">
            <p className="burnout-result-text">소진 점수 평균: {exhaustionMean.toFixed(2)} / T= {exhaustionT.toFixed(1)}</p>
            <p className="burnout-result-text">비인격화 점수 평균: {depersonalMean.toFixed(2)} / T= {depersonalT.toFixed(1)}</p>
            <p className="burnout-result-text">효능감 점수: {efficacyMean.toFixed(2)} / T= {efficacyT.toFixed(1)}</p>
          </div>
          <div className="burnout-button-center">
            <button className="burnout-button" onClick={() => navigate("/")}>다시 하기</button>
          </div>
        </section>
      </main>
    </div>
  );
}
