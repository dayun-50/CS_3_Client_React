import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./EverydayWrite.module.css";

// 모션
const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};
const containerVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.2 } },
};

// 분류
const EverydayWrite = ({ type = "분유", logs, setLogs, onCancel, isOpen }) => {
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState({});

  const getLogDetails = (logType) => {
    switch (logType) {
      case "분유":
      case "이유식":
        return { unit: "ml", inputType: "number", label: "용량" };
      case "배변":
        return {
          inputType: "group",
          label: "배변 기록",
          options: {
            type: ["소변", "대변"],
          },
          unit: "회",
        };
      case "수면":
        return { inputType: "timeSplit", label: "총 시간", unit: "시간" };
      case "체온":
        return { unit: "°C", inputType: "number", label: "체온" };
      default:
        return { unit: "", inputType: "text", label: "내용" };
    }
  };

  const { unit, inputType, label, options } = getLogDetails(type);

  const handleAmountChange = (e, key) => {
    // 단일 입력일 경우 'value' 키를 사용하도록 처리 (분유, 체온 등)
    const updateKey =
      inputType === "number" || inputType === "text" ? "value" : key;
    setAmount({ ...amount, [updateKey]: e.target.value });
  };

  const handleAdd = () => {
    const amountValue = amount.value;

    // 필수 입력값 확인
    if (!time) {
      alert("시간을 입력해주세요.");
      return;
    }

    if (type === "배변") {
      // 횟수(count)와 종류(type) 모두 확인
      if (!amount.count || !amount.type) {
        alert("횟수와 종류를 모두 입력/선택해주세요.");
        return;
      }
    } else if (type === "수면") {
      if (amount.hour === undefined && amount.minute === undefined) {
        alert("수면 시간을 입력해주세요.");
        return;
      }
    } else if (["number", "text"].includes(inputType)) {
      if (!amountValue) {
        alert(`${label}을 입력해주세요.`);
        return;
      }
    }

    const newLog = { time, type };
    if (type === "배변")
      // 횟수와 종류 모두 저장
      newLog.amount = `${amount.count}${unit} (${amount.type})`;
    else if (type === "수면")
      newLog.amount = `${amount.hour || 0}시간 ${amount.minute || 0}분`;
    else newLog.amount = `${amountValue}${unit || ""}`;

    setLogs && setLogs([...logs, newLog]);
    setTime("");
    setAmount({});
    onCancel && onCancel();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onCancel}
          />

          <motion.div
            className={styles.writeContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.contentWrapper}>
              <div className={styles.categoryTitleWrapper}>
                <div className={styles.categoryTitle}>{type} 기록</div>
              </div>

              <div className={styles.inputGroup}>
                {/* 시간 입력 */}
                <div className={styles.inputBox}>
                  <div className={styles.inputLabel}>시간</div>
                  <input
                    type="time"
                    className={styles.timeInput}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                {/* 배변 입력 (횟수 number + 종류 radio) */}
                {inputType === "group" && (
                  <>
                    {/* 횟수 입력: number 타입 */}
                    <div className={styles.inputBox}>
                      <div className={styles.inputLabel}>횟수</div>
                      <div className={styles.amountInputWrapper}>
                        <input
                          type="number"
                          min={1}
                          placeholder="횟수"
                          className={styles.amountInput}
                          value={amount.count || ""}
                          onChange={(e) => handleAmountChange(e, "count")}
                        />
                        <div className={styles.unitBox}>
                          <div className={styles.unitText}>{unit}</div>
                        </div>
                      </div>
                    </div>

                    {/* 종류 선택: radio 버튼 */}
                    <div className={styles.inputBox}>
                      <div className={styles.inputLabel}>종류</div>
                      <div className={styles.radioGroup}>
                        {options.type.map((t) => (
                          <label key={t} className={styles.radioLabel}>
                            <input
                              type="radio"
                              name="pooType"
                              value={t}
                              checked={amount.type === t}
                              onChange={(e) => handleAmountChange(e, "type")}
                            />
                            {t}
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* 수면 입력: 시간/분 같은 라인 */}
                {inputType === "timeSplit" && (
                  <div className={styles.inputBox}>
                    <div className={styles.inputLabel}>{label}</div>
                    <div className={styles.sleepInputWrapper}>
                      <input
                        type="number"
                        min={0}
                        placeholder="시"
                        className={styles.sleepInput}
                        value={amount.hour || ""}
                        onChange={(e) => handleAmountChange(e, "hour")}
                      />
                      <input
                        type="number"
                        min={0}
                        max={59}
                        placeholder="분"
                        className={styles.sleepInput}
                        value={amount.minute || ""}
                        onChange={(e) => handleAmountChange(e, "minute")}
                      />
                    </div>
                  </div>
                )}

                {/* 일반 입력 (분유, 체온 등) */}
                {["number", "text"].includes(inputType) && (
                  <div className={styles.inputBox}>
                    <div className={styles.inputLabel}>{label}</div>
                    <div className={styles.amountInputWrapper}>
                      <input
                        type={inputType}
                        placeholder={`${label}을 입력하세요`}
                        className={styles.amountInput}
                        value={amount.value || ""}
                        onChange={(e) => handleAmountChange(e, "value")}
                      />
                      {unit && (
                        <div className={styles.unitBox}>
                          <div className={styles.unitText}>{unit}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 버튼 */}
              <div className={styles.actionButtonsWrapper}>
                <div className={styles.actionButtonsContainer}>
                  <button
                    className={`${styles.actionButton} ${styles.backButton}`}
                    onClick={onCancel}
                  >
                    <div className={styles.buttonText}>뒤로가기</div>
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.completeButton}`}
                    onClick={handleAdd}
                  >
                    <div className={styles.buttonTextBold}>완료</div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EverydayWrite;
