
module.exports={
    /** 
     * totalCount : 전체 페이지 수
     * totalRecodeCountPerPage : 한 페이지당 보여질 게시물 숫자.
    */
    getTotalPageCount:(totalCount,recodeCountPerPage)=>{
        if(recodeCountPerPage == "") recodeCountPerPage = 10;
        var totalPageCount = ((totalCount - 1) / recodeCountPerPage) + 1;
		return totalPageCount;
    },
    firstIndex:(cpage,recodeCountPerPage)=>{
        var firstRecordIndex = ((cpage - 1) == 0 ? 1:cpage) * recodeCountPerPage;
		return firstRecordIndex;
    },
    lastIndex:(cpage,recodeCountPerPage)=>{
        var lastIndex = cpage * recodeCountPerPage;
		return lastIndex;
    }
}