import PrenatalList from "./prenatalList/PrenatalList";
import SymptomList from "./symptomList/SymptomList";
import styles from "./CheckListIndex.module.css";

// 주차별 체크리스트
const CheckListIndex = () => {
  return (
    <div className={styles.CheckContanier}>
      {/* Left 영역 (검진 리스트) */}
      <div className={styles.left}>
        {/* <h2 className={styles.title}>주차별 산전 검진</h2> */}
        <PrenatalList />
      </div>

      {/* Right 영역 (증상 리스트) */}
      <div className={styles.rigth}>
        <h2 className={styles.title}>증상 및 주의사항</h2>
        <SymptomList />
      </div>
    </div>
  );
};
export default CheckListIndex;
