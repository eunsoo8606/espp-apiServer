module.exports={
    blog:(memberSeq,mainImg,title,content,regpIp,regpSeq,category) =>{
        return [memberSeq,mainImg,title,content,regpIp,regpSeq,category];
    },
    updateBlog:(title,content,mainImg,mdfpIp,mdfpSeq,blogSeq)=>{
        return [title,content,mainImg,mdfpIp,mdfpSeq,blogSeq];
    }
}