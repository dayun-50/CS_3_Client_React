import { useState } from "react";
import styles from "./PrenatalList.module.css";

// -----------------------------------------------------
// 데이터 구조 정의
const INITIAL_CHECKLIST = [
  {
    week: "24개월 이후",
    checks: [
      {
        id: 1,
        title: "4차 영유아 건강검진",
        date: "2025.11.17",
        isDone: false,
      },
      {
        id: 2,
        title: "4차 영유아 건강검진",
        date: "2025.11.17",
        isDone: false,
      },
    ],
  },
  {
    week: "18개월 이후",
    checks: [
      {
        id: 3,
        title: "3차 영유아 건강검진",
        date: "2025.11.10",
        isDone: false,
      },
      { id: 4, title: "독감 예방접종", date: "2025.11.10", isDone: false },
    ],
  },
  {
    week: "12개월 이후",
    checks: [
      {
        id: 5,
        title: "2차 영유아 건강검진",
        date: "2025.10.01",
        isDone: false,
      },
    ],
  },
];
// -----------------------------------------------------

// --- CheckItem 컴포넌트 (반복되는 체크 항목) ---
const CheckItem = ({ check, onToggle }) => {
  const checkCircleClass = check.isDone
    ? styles.checkDone
    : styles.checkPending;

  return (
    <div className={styles.checkItem}>
      <div className={styles.checkRow}>
        <button
          className={checkCircleClass}
          onClick={() => onToggle(check.id)}
        />
        <div className={styles.checkContent}>
          <b className={styles.checkTitle}>{check.title}</b>
          <div className={styles.checkDate}>{check.date}</div>
        </div>
      </div>
    </div>
  );
};

// --- WeekSection 컴포넌트 ---
const WeekSection = ({ data, onToggle, isSpecialWeek }) => {
  const containerClass = isSpecialWeek
    ? styles.activeSection
    : styles.defaultSection;
  const lineDotClass = isSpecialWeek
    ? styles.activeDotLine
    : styles.defaultDotLine;

  return (
    <div className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={containerClass}>
          <div className={`${styles.leftLine} ${lineDotClass}`} />
          <div className={styles.sectionContent}>
            <div className={styles.weekHeader}>
              <div className={styles.weekWrapper}>
                <b className={styles.weekTitle}>{data.week}</b>
              </div>
            </div>
            <div className={styles.checkList}>
              {data.checks.map((check) => (
                <CheckItem key={check.id} check={check} onToggle={onToggle} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 메인 컴포넌트 ---
const PrenatalList = () => {
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);

  const handleToggleCheck = (checkId) => {
    setChecklist((prevList) =>
      prevList.map((section) => ({
        ...section,
        checks: section.checks.map((check) =>
          check.id === checkId ? { ...check, isDone: !check.isDone } : check
        ),
      }))
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.lineContainer}>
        <div className={styles.verticalLine} />
      </div>
      <div className={styles.sectionsWrapper}>
        {checklist.map((section, index) => (
          <WeekSection
            key={index}
            data={section}
            isSpecialWeek={index === 0}
            onToggle={handleToggleCheck}
          />
        ))}
      </div>
    </div>
  );
};

export default PrenatalList;
