module.exports={
    blog:(memberSeq,mainImg,title,content,regpIp,regpSeq) =>{
        return [memberSeq,mainImg,title,content,regpIp,regpSeq];
    },
    updateBlog:(title,content,mainImg,mdfpIp,mdfpSeq,blogSeq)=>{
        return [title,content,mainImg,mdfpIp,mdfpSeq,blogSeq];
    }
}