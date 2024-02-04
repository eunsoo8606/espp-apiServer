module.exports = {
    INSERT:'INSERT INTO API_MOVIE_DATA(SITE,IMG_SRC,MOVIE_RANK,TITLE,TIME) VALUES(?,?,?,?,?)',
    DELETE:'DELETE FROM API_MOVIE_DATA',
    UPDATE:(column)=>{return 'UPDATE API_MOVIE_DATA SET ' + column + ' = ?'},
    LIST:'SELECT * FROM API_MOVIE_DATA',
    DETAIL:(column)=>{return 'SELECT * FROM API_MOVIE_DATA WHERE ' + column + ' = ?'}
}