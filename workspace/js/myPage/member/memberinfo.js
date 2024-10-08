// 우편번호 api
function execDaumPostcode() {
  new daum.Postcode({
      oncomplete: function(data) {
          var extraAddr = '';

          if (data.userSelectedType === 'R') {
              addr = data.roadAddress;
          } else {
              addr = data.jibunAddress;
          }

          if (data.userSelectedType === 'R') {

              if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                  extraAddr += data.bname;
              }
              if (data.buildingName !== '' && data.apartment === 'Y') {
                  extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
              }
              if (extraAddr !== '') {
                  extraAddr = ' (' + extraAddr + ')';
              }

              addr += extraAddr;
          }
          document.getElementById('postcode').value = data.zonecode;
          document.getElementById("address").value = addr;
          document.getElementById("detailAddress").focus();
      }
  }).open();
}
