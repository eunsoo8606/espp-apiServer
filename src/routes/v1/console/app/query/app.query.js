module.exports={
    INSERT:'INSERT INTO APPLICATION (MEMBER_SEQ,APP_NAME,BUISNESS_NAME,FILE_PATH,APP_ORIGINAL_FILE_NAME,APP_RENAME_FILE_NAME,REGP_SEQ,REGP_IP,REG_DTTM,CLIENT_ID,SECRET_KEY)VALUES(?,?,?,?,?,?,?,?,?,?,?)',
    SELECT_ONE:'SELECT  APP_SEQ, MEMBER_SEQ,APP_ORIGINAL_FILE_NAME,FILE_PATH,APP_RENAME_FILE_NAME,APP_NAME,BUISNESS_NAME,WEB_DOMAIN,CLIENT_ID,HOST_ADDRESS,SECRET_KEY,REG_DTTM,REDIRECT_URI,LOGIN_STATE FROM APPLICATION WHERE APP_SEQ = ?',
    DELETE:'DELETE FROM APPLICATION WHERE APP_SEQ = ?',
    UPDATE:(filePath)=>{
        return`UPDATE APPLICATION 
                              SET 
                                APP_NAME = ? , 
                                BUISNESS_NAME = ? 
                                ${filePath !== undefined?', FILE_PATH = ?, APP_ORIGINAL_FILE_NAME = ?, APP_RENAME_FILE_NAME = ?,':','}
                                MDFP_IP = ?,
                                MDFP_SEQ = ?,
                                MDF_DTTM = ?`;}

}