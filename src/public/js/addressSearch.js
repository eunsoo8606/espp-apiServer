// opener관련 오류가 발생하는 경우 아래 주석을 해지하고, 사용자의 도메인정보를 입력합니다. ("팝업API 호출 소스"도 동일하게 적용시켜야 합니다.)
//document.domain = "abc.go.kr";

function addressPopup(){
	// 주소검색을 수행할 팝업 페이지를 호출합니다.
	// 호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(https://www.juso.go.kr/addrlink/addrLinkUrl.do)를 호출하게 됩니다.
	var pop = window.open("/v1/login/address","pop","width=570, height=500, scrollbars=yes, resizable=yes");
	// 모바일 웹인 경우, 호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(https://www.juso.go.kr/addrlink/addrMobileLinkUrl.do)를 호출하게 됩니다.
	//var pop = window.open("/popup/jusoPopup.jsp","pop","scrollbars=yes, resizable=yes");
}
function addressCallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn,detBdNmList,bdNm,bdKdcd,siNm,sggNm,emdNm,liNm,rn,udrtYn,buldMnnm,buldSlno,mtYn,lnbrMnnm,lnbrSlno,emdNo){
	// 팝업페이지에서 주소입력한 정보를 받아서, 현 페이지에 정보를 등록합니다.
	// 기본 폼 생성
	var addressForm = document.createElement("addressForm");

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "roadFullAddr");
	hiddenField.setAttribute("name", "roadFullAddr");
	hiddenField.setAttribute("value", roadFullAddr);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "roadAddrPart1");
	hiddenField.setAttribute("name", "roadAddrPart1");
	hiddenField.setAttribute("value", roadAddrPart1);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "roadAddrPart2");
	hiddenField.setAttribute("name", "roadAddrPart2");
	hiddenField.setAttribute("value", roadAddrPart2);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "addrDetail");
	hiddenField.setAttribute("name", "addrDetail");
	hiddenField.setAttribute("value", addrDetail);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "engAddr");
	hiddenField.setAttribute("name", "engAddr");
	hiddenField.setAttribute("value", engAddr);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "jibunAddr");
	hiddenField.setAttribute("name", "jibunAddr");
	hiddenField.setAttribute("value", jibunAddr);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "zipNo");
	hiddenField.setAttribute("name", "zipNo");
	hiddenField.setAttribute("value", zipNo);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "admCd");
	hiddenField.setAttribute("name", "admCd");
	hiddenField.setAttribute("value", admCd);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "rnMgtSn");
	hiddenField.setAttribute("name", "rnMgtSn");
	hiddenField.setAttribute("value", rnMgtSn);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "bdMgtSn");
	hiddenField.setAttribute("name", "bdMgtSn");
	hiddenField.setAttribute("value", bdMgtSn);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "detBdNmList");
	hiddenField.setAttribute("name", "detBdNmList");
	hiddenField.setAttribute("value", detBdNmList);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "bdNm");
	hiddenField.setAttribute("name", "bdNm");
	hiddenField.setAttribute("value", bdNm);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "bdKdcd");
	hiddenField.setAttribute("name", "bdKdcd");
	hiddenField.setAttribute("value", bdKdcd);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "siNm");
	hiddenField.setAttribute("name", "siNm");
	hiddenField.setAttribute("value", siNm);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "emdNm");
	hiddenField.setAttribute("name", "emdNm");
	hiddenField.setAttribute("value", emdNm);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "liNm");
	hiddenField.setAttribute("name", "liNm");
	hiddenField.setAttribute("value", liNm);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "rn");
	hiddenField.setAttribute("name", "rn");
	hiddenField.setAttribute("value", rn);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "udrtYn");
	hiddenField.setAttribute("name", "udrtYn");
	hiddenField.setAttribute("value", udrtYn);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "buldMnnm");
	hiddenField.setAttribute("name", "buldMnnm");
	hiddenField.setAttribute("value", buldMnnm);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "buldSlno");
	hiddenField.setAttribute("name", "buldSlno");
	hiddenField.setAttribute("value", buldSlno);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "mtYn");
	hiddenField.setAttribute("name", "mtYn");
	hiddenField.setAttribute("value", mtYn);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "lnbrMnnm");
	hiddenField.setAttribute("name", "lnbrMnnm");
	hiddenField.setAttribute("value", lnbrMnnm);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "lnbrSlno");
	hiddenField.setAttribute("name", "lnbrSlno");
	hiddenField.setAttribute("value", lnbrSlno);
	addressForm.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "emdNo");
	hiddenField.setAttribute("name", "emdNo");
	hiddenField.setAttribute("value", emdNo);
	addressForm.appendChild(hiddenField);

	document.body.appendChild(addressForm);

	// 회원가입 우편번호, 기본주소, 상세주소 적용
	if(document.getElementById("post")){
		document.getElementById("post").value = zipNo;
		document.getElementById("post").style.verticalAlign = "middle";
	}
	if(document.getElementById("addr1")){
		document.getElementById("addr1").value = roadAddrPart1;
		document.getElementById("addr1").readOnly = true;
	}
	//김위천 차장님 기본 addr Value-form
	/*if(document.getElementById("addr2")) document.getElementById("addr2").value = addrDetail + " " + roadAddrPart2;
	if(document.getElementById("addr3")) document.getElementById("addr3").value = emdNm + " " + bdNm;*/

	//기획 변경요청 Value-form
	if(document.getElementById("addr2")) document.getElementById("addr2").value = addrDetail;
	if(document.getElementById("addr3")) document.getElementById("addr3").value = roadAddrPart2;

	var pushAddYn = $("#pushAddYn").val();
	if(pushAddYn == "Y") pushAddress(roadAddrPart1);
	    
}


