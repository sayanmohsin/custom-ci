// alert(path);
// For Timing
function showTimings(str) {
		if (str === '0') {
				document.getElementById("time-slots").innerHTML="<option value='0'>Please select...</option>";
				document.getElementById("time-select").style.display="none";
				document.getElementById("date-select").style.display="none";
				document.getElementById("length-select").style.display="none";
				document.getElementById("fees-calculated").style.display="none";
				return;
		}
$.ajax({
// url: path+"/timeSlot"/+str,
url: path+"/timeSlot/"+str,
type: "POST",
data: null,
processData: false,
contentType: false,
								cache: false,
								error: function (jq,status,message){
										alert('Something went wrong!');
								},
								success: function (data) {
									// alert(data);
								var response = "<option value='0'>Please select...</option>"+data;
								document.getElementById("time-slots").innerHTML=response;
								document.getElementById("time-select").style.display="block";
								}
});
}
function showDates(str){
		if (str === '0') {
				document.getElementById("date-select").style.display="none";
				document.getElementById("length-select").style.display="none";
				document.getElementById("fees-calculated").style.display="none";
		}
		else{
				document.getElementById("date-select").style.display="block";
		}
}
function showLength(str){
		if (str === '0') {
				document.getElementById("length-select").style.display="none";
				document.getElementById("fees-calculated").style.display="none";
				return;
		}
		else{
				document.getElementById("length-select").style.display="block";
		}
}
// For Fees Calculation
var calculate = function() {
		var course = $("#course-names").val();
		var time = $("#time-slots").val();
		var date = $("#start-dates").val();
		var length = $("#course-length").val();
		var coupon = $("#coupon-code").val() || "0";
		// alert(coupon);
			// var coupon_code = coupon || 0;

		// alert(course+" "+time+" "+date+" "+length);
				document.getElementById("apply-coupon").style.display="block";
$.ajax({
url: path+"/calculateFees/"+course+"/"+time+"/"+date+"/"+length+"/"+coupon,
type: "POST",
data: null,
processData: false,
contentType: false,
								cache: false,
								error: function (jq,status,message){
										alert('Something went wrong!');
								},
								success: function (data) {
										var array = data.split(",");

										window.courseFeesGlob = array[0];
										window.regFeesGlob = array[1];
										window.totalFeesGlob = array[2];
										window.discountRateGlob = array[4];

										document.getElementById("discount").innerHTML = "<b>"+array[3]+"</b>";
										document.getElementById("fees-calculated").style.display="block";
										document.getElementById("course-fees").innerHTML = "Course fee: <b>£"+array[0]+"</b>";
										document.getElementById("reg-fees").innerHTML = "Reg fee: <b>£"+array[1]+"</b>";
										document.getElementById("total-fees").innerHTML = "Total: £"+array[2];

								}
});
}
// For Review
$(document).ready(function(){
    $("#reviewAllBtn").click(function(){
			var url = path+"/review";
			var course = $("#course-names").val();
				var courseAct = $('#course-names option[value="'+course+'"]').text();
			var time = $("#time-slots").val();
				var timeAct = $('#time-slots option[value="'+time+'"]').text();
			var date = $("#start-dates").val();
				var dateAct = $('#start-dates option[value="'+date+'"]').text();
			var length = $("#course-length").val();
				var lengthAct = $('#course-length option[value="'+length+'"]').text();
			var courseFees = window.courseFeesGlob;
			var regFees = window.regFeesGlob;
			var totalFees = window.totalFeesGlob;
			var discountRate = window.discountRateGlob;
        $.post(url,
        {
					course : course,
					courseAct : courseAct,
					time : time,
					timeAct : timeAct,
					date : date,
					dateAct : dateAct,
					length : length,
					lengthAct : lengthAct,
					courseFees : courseFees,
					regFees : regFees,
					totalFees : totalFees,
					discountRate : discountRate
        },
        function(data,status){
             $('body').html(data);
        });
    });
});
