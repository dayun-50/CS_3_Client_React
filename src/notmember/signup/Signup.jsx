import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { useState } from "react";

function Signup() {

    const navigate = useNavigate();



    return (
        <div
            className={styles.container}
            style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#FFF4D6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <div className={styles.membershipbox}>

                <div className={styles.mbsinbox}>


                    <div className={styles.h1h1}>
                    <h1 className={styles.newusertitle}>회원가입</h1>
                    </div>

                    <div className={styles.newemail}>
                        <label htmlFor="email">이메일</label>
                        <div className={styles.inputButtonWrapper}>
                            <input 
                                id="email" 
                                type="email" 
                                placeholder="이메일" 
                                className={styles.inputError}
                                />
                            <button className={styles.emailauth}>이메일 인증</button>
                        </div>
                    </div>

                    <div className={styles.emailing}>

                    <label htmlFor="emailok">인증번호</label>
                    <input 
                        id="emailok" 
                        type="text" 
                        placeholder="인증번호" 
                        className={styles.inputError}
                        /> <br/>
                    </div>

                    <div className={styles.newid}>
                        <label htmlFor="email">아이디</label>
                        <div className={styles.inputButtonWrapper}>
                            <input 
                                id="email" 
                                type="text" 
                                placeholder="아이디" 
                                className={styles.inputError}
                                />
                            <button className={styles.idauth}>중복확인</button>
                        </div>
                    </div>

                    <div className={styles.newnic}>
                        <label htmlFor="email">닉네임</label>
                        <div className={styles.inputButtonWrapper}>
                            <input 
                                id="email" 
                                type="text" 
                                placeholder="닉네임" 
                                className={styles.inputError}
                                />
                            <button className={styles.nicauth}>중복확인</button>
                        </div>
                    </div>

                    <div className={styles.pwing}>
                        <label htmlFor="emailok">비밀번호</label>
                        <input 
                            id="emailok" 
                            type="password" 
                            placeholder="비밀번호" 
                            className={styles.inputError}
                            /> <br/>
                    </div>

                    <div className={styles.phone}>
                        <label htmlFor="phone">연락처</label>
                        <div className={styles.phoneWrapper}>
                            <span className={styles.prefix}>010 -</span>
                            <input 
                                id="phone1" 
                                type="text" 
                                placeholder="연락처" 
                                className={styles.inputError}
                                />
                            <span className={styles.dash}>-</span>
                            <input 
                                id="phone2" 
                                type="text" 
                                placeholder="연락처" 
                                className={styles.inputError}
                                />
                        </div>
                    </div>

                    <div className={styles.parent}>
                        <label>
                            <input type="radio" name="parentType" value="father" className={styles.papa}/> 아빠
                        </label>
                        <label>
                            <input type="radio" name="parentType" value="mother" className={styles.papa}/> 엄마
                        </label>
                    </div>

                    <div className={styles.birthing}>
                        <label htmlFor="emailok">생년월일</label>
                        <input 
                            id="emailok" 
                            type="date" 
                            placeholder="생년월일" 
                            className={styles.inputError}
                            /> <br/>
                    </div>

                    <div className={styles.familying}>
                        <label htmlFor="emailok">가족코드</label>
                        <input 
                            id="emailok" 
                            type="text" 
                            placeholder="가족코드" 
                            className={styles.inputError}
                            /> <br/>
                    </div>
                    
                    <div className={styles.okcheck}>
                        <label className={`${styles.checkboxLabel} ${styles.true}`}>
                            <input id="checkbox" type="checkbox" /> 가족 코드가 없을 경우 체크해 주세요
                        </label>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button className={styles.backbutton} onClick={() => navigate(-1)}>취소</button>
                        <button className={styles.signinbutton}>완료</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Signup;