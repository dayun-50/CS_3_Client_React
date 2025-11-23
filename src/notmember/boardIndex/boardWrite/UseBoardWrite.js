
import { useEffect, useRef, useState } from "react";
import { caxios } from "../../../config/config";
import { useNavigate } from "react-router-dom";



export function UseBoardWrite() {
    const navigate = useNavigate();

    // ----------- 버튼 상태변수 -----------
    const [selectedVisibility, setSelectedVisibility] = useState("all"); //공개여부
    // ----------- 드롭다운 상태변수 -----------
    const options = ["후기", "질문", "무료나눔"]; // 드롭다운 옵션
    const [selected, setSelected] = useState(options[0]); // 초기 선택값
    const [isOpen, setIsOpen] = useState(false);//드롭다운 여닫기 상태변수
    const CATEGORY_MAP = {
        "전체": "all",
        "후기": "review",
        "무료나눔": "free",
        "질문": "qna",
    };
    // ----------- 파일 상태변수 -----------
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [inEditorUploadFiles, setInEditorUploadFiles] = useState([]);

    const editorRef = useRef(null);
    const titleRef = useRef(null);


    // ----------- 파일 관련 함수  -----------
    // 파일 크기 포매터
    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]; // 숫자를 소수점 두 자리까지 표시하고 단위와 함께 반환
    };

    // 파일 선택 핸들러 :FileList 객체를 배열로 변환
    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);// 기존 파일 목록에 새 파일을 추가
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);// 파일 선택 입력 필드를 초기화하여 동일한 파일을 다시 선택할 수 있도록 함
        event.target.value = null;
    };

    // 파일 삭제 핸들러 :인덱스를 사용하여 해당 파일만 제외하고 새 배열 생성
    const handleFileRemove = (indexToRemove) => {
        setUploadedFiles((prevFiles) =>
            prevFiles.filter((_, index) => index !== indexToRemove)
        );
    };




    // ----------- 버튼  함수 -----------
    //드롭다운 선택
    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };
    //공개버튼 세팅
    const handleVisibilityChange = (option) => {
        setSelectedVisibility(option);
    };
    //뒤로가기
    const handleBack = () => {
        navigate(-1);
    }

    // 작성완료된 글에서 미리보기된 파일 sysname 추출
    const extractImages = (node, arr = []) => {
        if (!node) return arr;
        if (node.type === "image") {
            const url = node.attrs.src;
            const sysname = url.split("/").pop(); // 파일명 추출
            arr.push(sysname);
        }
        if (node.content) {
            node.content.forEach(child => extractImages(child, arr));
        }
        return arr;
    };

    //작성완료
    const handleComplete = async () => {
        console.log("버튼 눌림")
        console.log(inEditorUploadFiles);
        console.log(editorRef.current)
        // if (!editorRef.current) return;
        const form = new FormData();
        // 1) 파일 담기
        uploadedFiles.forEach(file => {
            form.append("files", file);
        });


        //2-1) 에디터 내 업로드된 파일들 담기
        const validFiles = inEditorUploadFiles.filter(file =>
            imageSysList.includes(file.url)
        );
        console.log("유효한 에디터 파일들:", validFiles);
        return


        // 2) 에디터 JSON 담기
        const contentJSON = editorRef.current.getJSON();
        form.append("content", JSON.stringify(contentJSON));
        const imageSysList = extractImages(contentJSON);
        form.append("imageSysList", JSON.stringify(imageSysList));



        // 3) 나머지 값 담기
        form.append("title", titleRef.current.value);
        const board_type = CATEGORY_MAP[selected];
        form.append("board_type", board_type);
        let is_privated = selectedVisibility === "member" ? true : false;
        if (selectedVisibility)
            form.append("is_privated", is_privated);
        try {
            await caxios.post("/board/write", form)
                .then(resp => {
                    console.log(resp);
                    alert("작성이 완료되었습니다!")
                    //navigate("/board");
                })


        } catch (err) {
            alert("업로드에 실패했습니다. 다시 시도하세요");
        }
    };

    return {
        handleBack,
        handleComplete,
        handleVisibilityChange,
        handleSelect,
        setIsOpen,
        setUploadedFiles,
        formatFileSize,
        handleFileSelect,
        handleFileRemove,
        setInEditorUploadFiles,

        titleRef,
        editorRef,
        uploadedFiles,
        options,
        isOpen,
        selected,
        selectedVisibility
    };
}
