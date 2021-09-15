module.exports={
    INSERT : 'INSERT INTO BLOG (MEMBER_SEQ,MAIN_IMG,TITLE,CONTENT,REGP_IP,REGP_SEQ)VALUES(?,?,?,?,?,?)',
    DELETE : 'DELETE FROM BLOG WHERE BLOG_SEQ = ?',
    UPDATE : 'UPDATE BLOG SET TITLE = ?, CONTENT = ?, MAIN_IMG = ?, MDFP_IP =? ,MDFP_SEQ = ?, MDF_DTTM = NOW() WHERE BLOG_SEQ = ?',
    LIST   :(title,content,memberSeq,firstIndex)=>{ 
        var list = `SELECT B.* 
                      FROM (SELECT @rownum:=@rownum+1 AS RNUM,
                                   BLOG_SEQ,
                                   MAIN_IMG,
                                   TITLE,
                                   REG_DTTM,
                                   CONTENT
                              FROM BLOG, (SELECT @rownum:=0) TMP
                             WHERE 1=1
                   ${(memberSeq !== undefined && memberSeq !== '') ? 'AND MEMBER_SEQ = ?':''}
                   ${(title !== undefined && title !== '') ? 'AND TITLE LIKE CONCAT("%",?,"%")':''}
                   ${(content !== undefined && content !== '')?'AND CONTENT LIKE CONCAT("%",?,"%")':''}
                    ) B
                    ${(firstIndex !== undefined && firstIndex !== '')?'WHERE RNUM > ? AND RNUM <= ?':''}`;

                   return list;
            },
    TOTAL  : `SELECT COUNT(*) as COUNT FROM BLOG WHERE MEMBER_SEQ = ?`,
    SELECTONE:`SELECT  BLOG_SEQ,MAIN_IMG,TITLE,REG_DTTM,CONTENT FROM BLOG WHERE BLOG_SEQ = ?`,
    TOP3:`SELECT *
            FROM BLOG
           WHERE MEMBER_SEQ = ?
        ORDER BY REG_DTTM DESC
           LIMIT 0,3`
}