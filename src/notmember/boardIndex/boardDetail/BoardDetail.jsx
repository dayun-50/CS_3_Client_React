import { useState } from "react";
import styles from "./BoardDetail.module.css";
import {
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Send,
} from "lucide-react";

// --- 게시글 데이터 ---
const POST_DATA = {
  id: 100,
  title: "여기 제목들어갈걸",
  author: "아가미",
  isMine: true, // 게시글이 내가 작성한 글인지 여부 추가
};

// --- 댓글 데이터 ---
const initialComments = [
  {
    id: 1,
    nickname: "개발자1",
    date: "2025.11.17",
    text: "여기에 댓글이 들어가는데 뭐라고 나오겠지. 첫 번째 상위 댓글입니다.",
    isReply: false,
    isMine: true, // 댓글이 내가 작성한 글인지 여부 추가
    replies: [
      {
        id: 1.1,
        nickname: "기획자A",
        date: "2025.11.18",
        text: "답글 내용입니다. 아이디어가 좋네요!",
        isReply: true,
        isMine: false, // 답글이 남이 작성한 글인지 여부 추가
      },
    ],
  },
  {
    id: 2,
    nickname: "디자이너B",
    date: "2025.11.19",
    text: "두 번째 상위 댓글입니다. 프로젝트 방향에 동의합니다.",
    isReply: false,
    isMine: false,
    replies: [],
  },
];

// --- 댓글 아이템 컴포넌트 ---
const CommentItem = ({ comment, commentMenuOpenId, setCommentMenuOpenId }) => {
  // 상위 댓글인지 답글인지에 따라 wrapper 및 댓글 박스 클래스 선택
  const wrapperClass = comment.isReply
    ? styles.replyCommentWrapper
    : styles.parentCommentWrapper;
  const commentClass = comment.isReply
    ? styles.replyComment
    : styles.parentComment;

  // 드롭다운 메뉴 상태
  const isMenuOpen = commentMenuOpenId === comment.id;

  // 댓글 옵션 메뉴 토글 핸들러
  const handleCommentMenuToggle = (e) => {
    e.stopPropagation();
    setCommentMenuOpenId(isMenuOpen ? null : comment.id);
  };

  // 댓글 메뉴 항목 클릭 핸들러
  const handleCommentMenuItemClick = (e, action, id) => {
    e.stopPropagation();
    setCommentMenuOpenId(null); // 메뉴 닫기
    console.log(`[댓글 ID: ${id}] ${action} 처리`);
    // 실제 로직: 신고, 수정, 삭제 API 호출
  };

  return (
    <div className={wrapperClass}>
      {/* 댓글 박스 */}
      <div className={commentClass}>
        {/* 댓글 작성자 헤더 */}
        <div className={styles.commentUserHeader}>
          <div className={styles.userNicknameBold}>{comment.nickname}</div>
          {/* 댓글 옵션 아이콘 및 드롭다운 메뉴 */}
          <div className={styles.menuContainer}>
            <MoreHorizontal
              size={24}
              color="#696b70"
              className={styles.commentOptionIcon}
              onClick={handleCommentMenuToggle}
            />
            {isMenuOpen && (
              <div className={styles.dropdownMenu}>
                {comment.isMine ? (
                  // 내가 작성한 댓글
                  <>
                    <button
                      className={styles.menuItem}
                      onClick={(e) =>
                        handleCommentMenuItemClick(e, "수정", comment.id)
                      }
                    >
                      수정
                    </button>
                    <button
                      className={styles.menuItem}
                      onClick={(e) =>
                        handleCommentMenuItemClick(e, "삭제", comment.id)
                      }
                    >
                      삭제
                    </button>
                  </>
                ) : (
                  // 남이 작성한 댓글
                  <button
                    className={styles.menuItem}
                    onClick={(e) =>
                      handleCommentMenuItemClick(e, "신고", comment.id)
                    }
                  >
                    신고
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 댓글 본문 */}
        <div className={styles.commentTextWrapper}>
          <div className={styles.commentText}>{comment.text}</div>
        </div>

        {/* 댓글 푸터 - 날짜와 답글 버튼 */}
        <div className={styles.commentFooter}>
          <div className={styles.commentDate}>{comment.date}</div>
          <div className={styles.replyButton}>답글 달기</div>
        </div>
      </div>

      {/* 답글이 있으면 재귀적으로 렌더링 */}
      {comment.replies &&
        comment.replies.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            commentMenuOpenId={commentMenuOpenId}
            setCommentMenuOpenId={setCommentMenuOpenId}
          />
        ))}
    </div>
  );
};

// --- 메인 컴포넌트 ---
const BoardDetail = () => {
  const [comments, setComments] = useState(initialComments);

  // 게시글 메뉴 드롭다운 상태
  const [postMenuOpen, setPostMenuOpen] = useState(false);

  // 댓글 메뉴 드롭다운 상태
  const [commentMenuOpenId, setCommentMenuOpenId] = useState(null);

  // 게시글 메뉴 토글 핸들러
  const handlePostMenuToggle = (e) => {
    e.stopPropagation();
    setPostMenuOpen(!postMenuOpen);
  };

  // 게시글 메뉴 항목 클릭 핸들러
  const handlePostMenuItemClick = (e, action) => {
    e.stopPropagation();
    setPostMenuOpen(false); // 메뉴 닫기
    console.log(`[게시글 ID: ${POST_DATA.id}] ${action} 처리`);
    // 실제 로직: 신고, 수정, 삭제 API 호출 및 페이지 이동
  };

  // 바로 이전 페이지로 이동
  const handlBack = () => {
    window.history.back();
    console.log("뒤로가기 -1 실행");
  };

  // 메뉴 외부 클릭 시 메뉴 닫기 핸들러 추가
  const handleOutsideClick = () => {
    setPostMenuOpen(false);
    setCommentMenuOpenId(null);
  };

  return (
    <div className={styles.parent}>
      {/* 상단 뒤로가기 버튼 영역 */}
      <div className={styles.topBar}>
        <div className={styles.backButtonWrapper}>
          <button className={styles.backButtonText} onClick={handlBack}>
            뒤로가기
          </button>
        </div>
      </div>

      <div className={styles.mainContentWrapper}>
        {/* 게시글 내용 영역 */}
        <div className={styles.postContentArea}>
          {/* 게시글 제목 및 작성자 정보 */}
          <div className={styles.postHeader}>
            <div className={styles.postTitleWrapper}>
              <b className={styles.postTitle}>{POST_DATA.title}</b>
              {/* 게시글 옵션 아이콘 및 드롭다운 메뉴 */}
              <div className={styles.menuContainer}>
                <MoreHorizontal
                  size={24}
                  color="#696b70"
                  onClick={handlePostMenuToggle}
                />
                {postMenuOpen && (
                  <div className={styles.dropdownMenu}>
                    {POST_DATA.isMine ? (
                      // 내가 작성한 글
                      <>
                        <button
                          className={styles.menuItem}
                          onClick={(e) => handlePostMenuItemClick(e, "수정")}
                        >
                          수정
                        </button>
                        <button
                          className={styles.menuItem}
                          onClick={(e) => handlePostMenuItemClick(e, "삭제")}
                        >
                          삭제
                        </button>
                      </>
                    ) : (
                      // 남이 작성한 글
                      <button
                        className={styles.menuItem}
                        onClick={(e) => handlePostMenuItemClick(e, "신고")}
                      >
                        신고
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.authorNicknameWrapper}>
              <div className={styles.userNickname}>아가미</div>
            </div>
          </div>

          {/* 게시글 본문 */}
          <div className={styles.postBodyContainer}>
            <div className={styles.postBodyText}>
              <p className={styles.paragraph}>대략적인</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>파리콕? - 요리 레시피</li>
                <li className={styles.listItem}>커리어리? - 개발자끼리 소통</li>
              </ul>
              <p className={styles.paragraph}>&nbsp;</p>
              <p className={styles.paragraph}>관리자</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  전문적인 웹 사이트를 만드는건 보류
                </li>
                <li className={styles.listItem}>
                  가이드라인을 잡는 곳으로 - 관리자를 전문적으로 갈거면
                </li>
              </ul>
              <p className={styles.paragraph}>&nbsp;</p>
              <p className={styles.paragraph}>개발자</p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  라이브러리, API 사용하는 과정으로 하는거
                </li>
                <li className={styles.listItem}>완성하는걸 목표로 하자</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 댓글 영역 */}
        <div className={styles.commentSection}>
          {/* 댓글 목록 */}
          <div className={styles.commentListWrapper}>
            <div className={styles.commentList}>
              {/* 배열 데이터를 맵핑하여 댓글 렌더링 */}
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  commentMenuOpenId={commentMenuOpenId}
                  setCommentMenuOpenId={setCommentMenuOpenId}
                />
              ))}
            </div>
          </div>

          {/* 페이지네이션 영역 */}
          <div className={styles.paginationWrapper}>
            <div className={styles.pagination}>
              {/* 이전 페이지 버튼 */}
              <button className={styles.pageControl} disabled>
                <ChevronsLeft size={20} color="#696b70" />
                <ChevronLeft size={20} color="#696b70" />
              </button>

              {/* 페이지 번호 버튼 */}
              <div className={styles.pageNumbers}>
                <button className={`${styles.pageBtn} ${styles.activePage}`}>
                  1
                </button>
                <button className={styles.pageBtn}>2</button>
                <button className={styles.pageBtn}>3</button>
                <button className={styles.pageBtn}>4</button>
                <button className={styles.pageBtn}>5</button>
              </div>

              {/* 다음 페이지 버튼 */}
              <button className={styles.pageControl}>
                <ChevronRight size={20} color="#696b70" />
                <ChevronsRight size={20} color="#696b70" />
              </button>
            </div>
          </div>

          {/* 댓글 입력창 */}
          <div className={styles.commentInputArea}>
            <div className={styles.commentInputBox}>
              <div className={styles.inputField}>
                <input
                  type="text"
                  placeholder=" 메시지를 입력하세요"
                  className={styles.inputElement}
                />
              </div>
              <div className={styles.submitButton}>
                <Send size={24} color="#fff" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
