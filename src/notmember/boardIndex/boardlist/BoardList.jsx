import { useEffect, useState } from "react";
import { caxios } from "../../../config/config";


//보드리스트
const BoardList=()=>{
//0. 상태변수
const [typeBtn, setTypeBtn] =useState();//어떤 버튼 눌렸는지에 대한 상태변수
const [cpage, setCpage] =useState(); //현재 몇페이지인지에 대한 상태변수
const [thumbsUrlMap, setThumbsUrlMap] = useState({}); //썸네일 url 모아둘 맵 키: 보드시퀀스- 밸류 :blobURL
const [mergedList, setMergedList] = useState([]); // 보드랑 파일이랑 엮어둔 맵

const board_type ="qna";


// 1.필터랑 페이지 수에 맞게 가져오기
useEffect(() => {
  Object.values(thumbsUrlMap).forEach(url => URL.revokeObjectURL(url))

  async function loadList() {
    const resp = await caxios.get("/board", { //resp.data 에 1) boards가 있고 List<BoardDTO> 2) thumbs가 있을 예정 List<FileDTO>
      params: { board_type, cpage }
    }); 
    console.log(resp)
    //1) 썸네일은 맵으로 변경시키기
    const thumbsMap = new Map(); 
    resp.data.thumbs.forEach(t => {
      thumbsMap.set(t.target_seq, t);
    });

    // 2) 보드랑 붙이기 (보드시퀀스가진 맵찾아서 객체의 밸류로 넣고 아니면 null)
    const merged = resp.data.boards.map(b => ({
      board: b,
      thumb: thumbsMap.get(b.board_seq) || null
    }));

    setMergedList(merged);

    // 3) 시스네임 기반으로 blobURL에대한 맵 생성하기
    const urls = {};
    for (const item of merged) {
      if (item.thumb) {
        const blobUrl = await getThumbUrl(item.thumb.sysname);
        urls[item.board.board_seq] = blobUrl;
      }
    }

    setThumbsUrlMap(urls);
  }

  loadList();
}, [board_type, cpage]); // 페이지나 버튼이 바뀌면 해당 데이터에 맞는 내용을 다시 가져와야함


//2. 시스네임 기반으로 blob URL 생성하기 함수
async function getThumbUrl(sysname){
    const resp = await caxios.get("/file/download", {
    params :{sysname} , responseType : "blob"  
    })
    return URL.createObjectURL(resp.data)
}







return(
    <div>
        여기에 필터 버튼 있을 예정
        보드리스트
    </div>
);


}
export default BoardList;