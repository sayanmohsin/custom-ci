$(document).ready(function () {
  $('#profileForm').validator()
  var navListItems = $('div.setup-panel div a'),
          allWells = $('.setup-content'),
          allNextBtn = $('.nextBtn'),
  		  allPrevBtn = $('.prevBtn');

  allWells.hide();

  navListItems.click(function (e) {
      e.preventDefault();
      var $target = $($(this).attr('href')),
              $item = $(this);

      if (!$item.hasClass('disabled')) {
          navListItems.removeClass('btn-primary').addClass('btn-default');
          $item.addClass('btn-primary');
          allWells.hide();
          $target.show();
          $target.find('input:eq(0)').focus();
      }
  });

  allPrevBtn.click(function(){
      var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");

          prevStepWizard.removeAttr('disabled').trigger('click');
  });

  allNextBtn.click(function(){
      var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("input[type='text'],input[type='url']"),
          isValid = true;

      $(".form-group").removeClass("has-error");
      for(var i=0; i<curInputs.length; i++){
          if (!curInputs[i].validity.valid){
              isValid = false;
              $(curInputs[i]).closest(".form-group").addClass("has-error");
          }
      }

      if (isValid)
          nextStepWizard.removeAttr('disabled').trigger('click');
  });

  $('div.setup-panel div a.btn-primary').trigger('click');
});

function saveContinue(){
  var url = path+'/saveContinueCtrl';
  $.ajax({
  url: url,
  type: "POST",
  data: {
    name : $('#name').val(),
    email : $('#email').val(),
    dob : $('#dob').val(),
    gender : $("input[name='optradio']:checked").val(),
    nationality : $('#nationality').val(),
    passportNationality : $('#passportNationality').val(),
    addressline1 : $('#addressline1').val(),
    addressline2 : $('#addressline2').val(),
    zipcode : $('#zipcode').val(),
    city : $('#city').val(),
    country : $('#country').val(),
    region : $('#region').val()
    } ,
  dataType: "json",
  beforeSend: function(XMLHttpRequest) {
  },
  complete: function(XMLHttpRequest, textStatus) {
  },
  success: function(msg, textStatus){
    if(msg.status>0){
    }
  },
  error: function(XMLHttpRequest, err) {
    alert('Something wen wrong!');
  }
  });
}
