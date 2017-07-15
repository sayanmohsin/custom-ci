var initBookingDataTable = function() {
    var tbl='#bookingTable';
    var url = path + "/getBookingList";
    var dt = $(tbl).DataTable({
        //"sPaginationType": "full_numbers",
        "bProcessing": true,
        "bSortable" : true,
        "serverSide": true,
        "sInfoEmtpy": "No Data Available!!",
        "aoColumns": [
       {"bSortable": false },
       {"bSortable": false },
       {"bSortable": false },
       {"bSortable": false },
       {"bSortable": false },
       {"bSortable": false },
       {"bSortable": false }
          ],
        "ajax": {
          "url": url,
          "type": "POST",
          "dataType": "json",
          "data": {
          },
         "dataSrc": function(json) {
             //Get the Array in the Order of display
             return processBookingResponse(json);
          },
      },
      //End of Ajax
    });
    return dt;
};

/**
 *
 * @param JSON response - API response
 * @returns {processPromoResponse.dataList|Array} - Array of Table rows.
 * Order of data in the array will me mapped into the table
 *
 */
var processBookingResponse = function (response){
    var dataList = [];
    if(response.status){
        var list = response.data;
         $.each(list, function( index, element ) {
             var data = [];
             var action = "";
            //  onclick= \"promoStatus("+element['id']+") \"
            // promoStatus = element['statusPromo'];
            //
            // var classBtn = (promoStatus == 1) ? "fa-toggle-on" : "fa-toggle-off";
            // var classBtn = 'fa fa-toggle-off';
            // var action = "<a id= "+element['id']+" data-toggle='tooltip' title='Disable' class='btn btn-mini btn-default statusBtn'><i id='sbtn"+promoStatus+"' class='fa "+classBtn+"'></i></a>";

            //Status Button
            // if(promoStatus == 1)
            // {
            //   var actionStatus = "<a id= "+element['id']+" data-toggle='tooltip' title='Disable' class='btn btn-mini btn-default statusBtn' onclick='updateStatusPromo(" +element['id']+ ",0)'><i class='fa "+classBtn+"'></i></a>";
            // } else if(promoStatus == 0){
            //   var actionStatus = "<a id= "+element['id']+" data-toggle='tooltip' title='Enable' class='btn btn-mini btn-default statusBtn' onclick='updateStatusPromo(" +element['id']+ ",1)'><i class='fa "+classBtn+"'></i></a>";
            // }

            //Edit Option Button
            var alertMsg = 'Are you sure?';
            var actionDeleteView = "<a id= "+element['bid']+" data-toggle='tooltip' title='Delete' class='btn btn-mini btn-default' onclick= deleteBooking(" +element['bid']+ ")><i class='fa fa-times'></i></a>"+
              "<a class='btn btn-mini btn-default' data-toggle='modal' onclick='viewBooking(" +element['bid']+ ")'><i class='fa fa-expand'></i></a>";
      // var action = "<a id= "+element['id']+" data-toggle='tooltip' title='Disable' class='btn btn-mini btn-default statusBtn'><i class='fa fa-pencil' ></i></a>";
        //  href="+path+"/viewSelectedVendor/"+element['id']+" class='btn btn-mini btn-default'><i class='fa fa-pencil' ></i></a>";
              console.log(action);
             data.push(element['sl']);
             data.push(element['name']);
             data.push(element['email']);
             data.push(element['nationality']);
             data.push(element['country']);
             data.push(paymentStatus = element['bookingStatus'] == 1 ? 'Payment Sucessful' : 'Payment Pending');
             data.push(actionDeleteView);
            //  data.push(actionStatus);
             dataList.push(data);
             "</div>"
         });
    }
    return dataList;
};

$(document).ajaxComplete(function( load, request, settings ) {
    $('td:contains("Payment Sucessful")').css('color', 'green');
    $('td:contains("Payment Pending")').css('color', 'red');
});

function deleteBooking(bid){
  if (!confirm('Are you sure?')){return 0;}
  else{
  var url = path + "/bookingDelete";
  $.ajax({
    url: url,
    type: "POST",
    data: {
      bid : bid
    } ,
    dataType: "json",
    beforeSend: function(XMLHttpRequest) {
    },
    complete: function(XMLHttpRequest, textStatus) {
      // alert('Selected booking deleted');
    },
    success: function(msg, textStatus){
      if(msg.status>0){
          $("#bookingTable").dataTable().fnDestroy();
          bookingData = initBookingDataTable();
      }
    },
    error: function(XMLHttpRequest, err) {
      alert('Something went wrong');
    }
  });
  }
}

function viewBooking(bid){
  var tbl='#bookingTable';
  var url = path + "/getSelectedBookingList";
  $.ajax({
    url: url,
    type: "POST",
    dataType: "json",
    data: {
      bid : bid
    },
    // dataSrc: function(json) {
    //        //Get the Array in the Order of display
    //        var dataList = [];
    //        if(json.status){
    //            var list = json.data;
    //             $.each(list, function( index, element ) {
    //                 var data = [];
    //                 alert(element['sl']);
    //             });
    //           }
    //     },
    success: function(json){
           //Get the Array in the Order of display
           var dataList = [];
           if(json.status){
               var list = json.data;
                $.each(list, function( index, element ) {
                    var data = [];
                    $('#viewBookingModal').modal('show')
                    $("#nameHeading").val(element['name']);
                    $("#nameView").val(element['name']);
                    $("#emailView").val(element['email']);
                    $("#dobView").val(element['dob']);
                    $("#genderView").val(element['gender']);
                    $("#nationalityView").val(element['nationality']);
                    $("#passportNationalityView").val(element['passportNationality']);
                    $("#addressLine1View").val(element['addressline1']);
                    $("#addressLine2View").val(element['addressline2']);
                    $("#zipcodeView").val(element['zipcode']);
                    $("#cityView").val(element['city']);
                    $("#countryView").val(element['country']);
                    $("#regionView").val(element['region']);
                });
              }
          }
    });
    //End of Ajax
  }






// function updateStatusPromo(id,status){
//   var url = path + "/promoStatusChanger";
//   // if (status == 1){status = 'enable';}
//   // else if(status == 0){status = 'disable';}
//   // alert(status);
//   $.ajax({
//     url: url,
//     type: "POST",
//     data: {
//       id : id,
//       status : status
//     } ,
//     dataType: "json",
//     beforeSend: function(XMLHttpRequest) {
//     },
//     complete: function(XMLHttpRequest, textStatus) {
//     },
//     success: function(msg, textStatus){
//       if(msg.status>0){
//         $(document).on('click', '.statusBtn', function() {
//           $(this).find('i').toggleClass('fa-toggle-on fa-toggle-off');
//         });
//           $("#promoTable").dataTable().fnDestroy();
//           promoData = initBookingDataTable();
//       }
//     },
//     error: function(XMLHttpRequest, err) {
//       alert('Something went wrong');
//     }
//   });
// }
