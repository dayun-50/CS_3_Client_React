import { useState } from "react";
import BoardEditor from "./BoardEditor";
import FileBox from "./file/FileBox";

const BoardWrite = () => {
  const [content, setContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]); // 파일 박스


  const handleSubmit = () => {
    console.log("최종 내용:", content);
    // TODO: 백엔드로 전송 (content HTML 그대로 전송)
  };

    

  return (
    <div>
      <h2>보드 작성 페이지</h2>


      <FileBox uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
      <BoardEditor content={content} setContent={setContent} /> {/*에디터 부분*/}


    </div>
  );
};

export default BoardWrite;
