

module.exports={
    common:(cpage,selectSize,limit,searchKeyWord)=>{
        if(cpage == undefined) cpage = 1;
        if(selectSize == undefined) selectSize = 10;
        if(limit == undefined) limit = 10;
    }
}