import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Information.module.css";
import { Heart, Activity, BookOpen, UserCog, TrendingUp } from "lucide-react";

const sections = [
  {
    id: "hero",
    title: "완벽한 육아 파트너",
    subtitle: "우리 아이의 소중한 성장을 기록하고, 커뮤니티의 지혜를 더하세요.",
    bgColor: "white",
    imgPosition: "none",
    icon: null,
  },
  {
    id: "baby-info",
    title: "직관적인 아기 정보",
    subtitle:
      "수유, 수면, 배변 등의 핵심 일과를 타임라인 형태로 기록하고 아이 상태를 한눈에 파악하세요.",
    bgColor: "#FCD34D",
    imgPosition: "left",
    icon: Heart,
  },
  {
    id: "health-record",
    title: "필수 건강 기록",
    subtitle:
      "예방 접종, 투약 알림 및 체온 변화 등 건강 정보를 체계적으로 관리합니다.",
    bgColor: "#93C5FD",
    imgPosition: "right",
    icon: Activity,
  },
  {
    id: "growth-chart",
    title: "성장 차트",
    subtitle:
      "WHO 표준 기반 성장 곡선 차트로 아이의 성장 속도를 파악할 수 있습니다.",
    bgColor: "#4ade80",
    imgPosition: "none",
    icon: TrendingUp,
  },
  {
    id: "journal-emergency",
    title: "산모수첩 & 긴급 상담",
    subtitle: "중요 기록과 응급 연결을 쉽고 빠르게 관리하세요.",
    bgColor: "#FFF4D6",
    imgPosition: "grid",
    icon: BookOpen,
  },
  {
    id: "community-mypage",
    title: "마이페이지 & 커뮤니티",
    subtitle: "나를 위한 공간과 함께하는 지혜를 경험하세요.",
    bgColor: "#ffffff",
    imgPosition: "grid",
    icon: UserCog,
  },
];

const Information = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRefs = useRef([]);

  const handleScroll = () => {
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sectionRefs.current.forEach((sec, idx) => {
      if (
        sec.offsetTop <= scrollPos &&
        sec.offsetTop + sec.offsetHeight > scrollPos
      ) {
        setCurrentSection(idx);
      }
    });

    // 진행 바 퍼센트 계산
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / maxScroll) * 100;
    setScrollProgress(progress);
  };

  const scrollToSection = (idx) => {
    window.scrollTo({
      top: sectionRefs.current[idx].offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      {/* Dot Navigation (Fade In/Out + 모바일 좌측 이동 + ProgressBar 포함) */}
      <motion.div
        className={styles.dotNav}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* 점 네비 */}
        {sections.map((_, idx) => (
          <div
            key={idx}
            className={`${styles.dot} ${
              currentSection === idx ? styles.activeDot : ""
            }`}
            onMouseEnter={() => setHoverIndex(idx)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => scrollToSection(idx)}
          />
        ))}

        {/* dotIndicator → hover / active 이동 */}
        <div
          className={styles.dotIndicator}
          style={{
            transform: `translateY(${
              (hoverIndex !== null ? hoverIndex : currentSection) * 32
            }px)`,
          }}
        />

        {/* Progress Bar (스크롤 퍼센트) */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
      </motion.div>

      {/* 각 Section */}
      {sections.map((sec, idx) => (
        <motion.section
          key={sec.id}
          ref={(el) => (sectionRefs.current[idx] = el)}
          className={styles.section}
          style={{ backgroundColor: sec.bgColor }}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
        >
          <div className={styles.contentWrapper}>
            {sec.icon && <sec.icon size={48} className={styles.sectionIcon} />}

            <div className={styles.textBlock}>
              <h2 className={styles.title}>{sec.title}</h2>
              <p className={styles.subtitle}>{sec.subtitle}</p>
            </div>

            {sec.imgPosition !== "none" && (
              <motion.div
                className={styles.imagePlaceholder}
                initial={{
                  x: sec.imgPosition === "left" ? -200 : 200,
                  opacity: 0,
                }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
              >
                이미지 영역
              </motion.div>
            )}
          </div>

          {idx < sections.length - 1 && <div className={styles.gradientLine} />}
        </motion.section>
      ))}
    </div>
  );
};

export default Information;
