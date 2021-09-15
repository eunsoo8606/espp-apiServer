module.exports={
    getLocationGridXY:`SELECT *
                         FROM HANG_DONG_TMP
                        WHERE CONCAT(HANGDONG_GUNGU,HANGDONG_DONG) LIKE CONCAT("%",?,"%")`
}