const hash = require('../middlewares/hashFnc');
module.exports = {
    nullSafe:(arg1,arg2,arg3)=>{
        try {
	        if(arguments.length == 1) {
	            var str = new String(arg1);
                if(str == "NaN") return "";
                else if(str == null) return "";
                else if(str == undefined) return "";
                else if(str.length == 0) return "";
                else if(str == "undefined") return "";
                else if(str == "null") return "";
                else if(str == "NULL") return "";
                else if(str == "(null)") return "";
                else if(str == "(NULL)") return "";
                else if(str == "{null}") return "";
                else if(str == "{NULL}") return "";
                else return str;
	        } else if(arguments.length == 2) {
	            if(typeof arg1 == "string") {
	                return Util.isNull(arg1) ? this.get(arg2) : this.get(arg1);
	            } else if(typeof arg1 == "object" && arg1 instanceof Array) {
	                return this.get(arg1[arg2]);
	            } else {
	               return "";
                }
	        } else if(arguments.length == 3) {
	            if(typeof arg1 == "object" && arg1 instanceof Array) {
    	            var str = this.get(arg1[arg2]);
    	            return Util.isNull(str) ? this.get(arg3) : this.get(str);
	            } else {
	               return "";
                }
	        }
        } catch(e) {
            e.message = flowName+e.message;
            throw e;
        }
    },
    dateFormat:(date)=>{
        var year  = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = date.getDate().toString();

        if(month.length === 1) month="0"+month;
        if(day.length === 1) day="0"+day;

        console.log('date : ', year + '.' + month + '.' +  day)
        return  year + '.' + month + '.' +  day;
    },
    getClientId:(memberSeq) =>{
        var encode = {memberSeq:memberSeq,date:new Date()};
        var client_id = hash.md5_Base64(encode.toString());
        return client_id;
    },
    getSecretKey:(memberSeq)=>{
        var encode = {memberSeq:memberSeq,date:new Date()};
        var secretKey = hash.md5_hex(encode.toString());
        return secretKey;
    }
}