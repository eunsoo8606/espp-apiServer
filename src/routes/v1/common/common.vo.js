

module.exports={
    common:(blog)=>{
        var result = [blog.memberSeq,blog.content,blog.title,blog.firstIndex,blog.lastIndex];
        var origin = [];
        var j = 0;
        for(var i =0; i < result.length; i++){
            if(result[i] !== undefined && result[i] !== "") {
                origin[j] = result[i];
                j++;
            }
        }
        return origin;
    }
}