const multer = require('multer');
const moment = require('moment');
const year = moment().format("YYYY");
const month = moment().format("MM");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {  // 파일이 업로드될 경로 설정
		cb(null, 'uploads/img/'+year+'/'+month);
	},
	filename: (req, file, cb) => {	// timestamp를 이용해 새로운 파일명 설정
		let newFileName = new Date().valueOf() + path.extname(file.originalname)
		cb(null, newFileName)
	},
})
const upload = multer({ storage: storage })

module.exports = upload;