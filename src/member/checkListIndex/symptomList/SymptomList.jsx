import React from "react";
import { motion } from "framer-motion";
import styles from "./SymptomList.module.css";
import { FETAL_CHECKLIST, BABY_CHECKLIST } from "./list";

// --- CheckItem ---
const CheckItem = ({ check, index }) => (
  <motion.div
    className={styles.checkWrapper}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
  >
    <div className={styles.checkRow}>
      <div className={styles.checkLeft}>
        <div className={styles.checkIconDone} />
        <span className={styles.checkTitle}>{check.title}</span>
      </div>
    </div>
  </motion.div>
);

// --- WeekSection ---
const WeekSection = ({ data, index, isInfant }) => {
  const title = isInfant ? data.month : data.week;

  return (
    <motion.div
      className={styles.weekSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <div className={styles.itemActive} />
      <div className={styles.weekContent}>
        <div className={styles.weekTitleWrapper}>
          <span className={styles.weekTitle}>{title}</span>
        </div>
        <div className={styles.checkList}>
          {data.checks.map((check, i) => (
            <CheckItem key={check.id} check={check} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- SymptomList 메인 ---
const SymptomList = ({ babyData }) => {
  if (!babyData) return null;

  const isInfant = babyData.status === "infant";
  const checklist = isInfant ? BABY_CHECKLIST : FETAL_CHECKLIST;

  return (
    <div className={styles.main}>
      <div className={styles.lineWrapper}>
        <div className={styles.timelineLine} />
      </div>
      <div className={styles.sectionList}>
        {checklist.map((section, i) => (
          <WeekSection
            key={section.id}
            data={section}
            index={i}
            isInfant={isInfant}
          />
        ))}
      </div>
    </div>
  );
};

export default SymptomList;
