module.exports={
    INSERT : 'INSERT INTO BLOG (MEMBER_SEQ,MAIN_IMG,TITLE,CONTENT,REGP_IP,REGP_SEQ)VALUES(?,?,?,?,?,?)',
    DELETE : 'DELETE FROM BLOG WHERE BLOG_SEQ = ?',
    UPDATE : '',
    LIST   :(title,content)=>{ 
        var list = `SELECT B.* 
                      FROM (SELECT @rownum:=@rownum+1 AS RNUM,
                                   BLOG_SEQ,
                                   MAIN_IMG,
                                   TITLE,
                                   REG_DTTM,
                                   CONTENT
                              FROM BLOG, (SELECT @rownum:=0) TMP
                             WHERE MEMBER_SEQ = ?
                   ${(title !== undefined && title !== '') ? 'AND TITLE LIKE CONCAT("%",?,"%")':''}
                   ${(content !== undefined && content !== '')?'AND CONTENT LIKE CONCAT("%",?,"%")':''}
                    ) B
                   WHERE RNUM > ? AND RNUM <= ?`;

                   return list;
            },
    TOTAL  : `SELECT COUNT(*) as COUNT FROM BLOG WHERE MEMBER_SEQ = ?`,
    SELECTONE:'SELECT * FROM BLOG WHERE BLOG_SEQ = ?'
}