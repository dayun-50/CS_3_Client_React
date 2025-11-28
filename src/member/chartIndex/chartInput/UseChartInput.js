import { caxios } from "../../../config/config";

// 전송 로직 분리
export const submitChartData = async ({ inputs, date, babySeq, id, measureTypes }) => {

  const payload = Object.entries(measureTypes)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([type, value]) => ({
      baby_seq: babySeq,
      user_id: id,
      measure_date: date,
      measure_type: type,
      measure_value: type === "EFW" ? parseFloat(value) * 1000 : parseFloat(value),
    }));


  try {
    const res = await caxios.post("/chart/insert", payload);
    alert("저장 완료!");

    return res; // 
  } catch (err) {
    console.error(err);
    alert("저장 실패");
    return null;
  }
};
