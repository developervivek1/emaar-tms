
   (function() {
  
    'use strict';
  
    $('.input-file').each(function() {
      var $input = $(this),
          $label = $input.next('.js-labelFile'),
          labelVal = $label.html();
      
     $input.on('change', function(element) {
        var fileName = '';
        if (element.target.value) fileName = element.target.value.split('\\').pop();
        fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
     });
    });

  })();

  /*topsearch*/
  function myFunction() {
   document.getElementById("topsearch").style.display = "block";
   document.getElementById("hidesearch").style.display = "none";
}

document.addEventListener('mouseup', function(e) {
  var container = document.getElementById('topsearch');
  var container1 = document.getElementById('hidesearch');
  if (!container.contains(e.target)) {
      container.style.display = 'none';
      container1.style.display = 'block';
  }
});
 /*textedit*/
 $(function () {
   // Summernote
   $('.textarea').summernote()
 })

 /*dragdrop img*/
 $(function () {
 document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
   const dropZoneElement = inputElement.closest(".drop-zone");
 
   dropZoneElement.addEventListener("click", (e) => {
     inputElement.click();
   });
 
   inputElement.addEventListener("change", (e) => {
     if (inputElement.files.length) {
       updateThumbnail(dropZoneElement, inputElement.files[0]);
     }
   });
 
   dropZoneElement.addEventListener("dragover", (e) => {
     e.preventDefault();
     dropZoneElement.classList.add("drop-zone--over");
   });
 
   ["dragleave", "dragend"].forEach((type) => {
     dropZoneElement.addEventListener(type, (e) => {
       dropZoneElement.classList.remove("drop-zone--over");
     });
   });
 
   dropZoneElement.addEventListener("drop", (e) => {
     e.preventDefault();
 
     if (e.dataTransfer.files.length) {
       inputElement.files = e.dataTransfer.files;
       updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
     }
 
     dropZoneElement.classList.remove("drop-zone--over");
   });
 });
 
 /**
  * Updates the thumbnail on a drop zone element.
  *
  * @param {HTMLElement} dropZoneElement
  * @param {File} file
  */
 function updateThumbnail(dropZoneElement, file) {
   let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
 
   // First time - remove the prompt
   if (dropZoneElement.querySelector(".drop-zone__prompt")) {
     dropZoneElement.querySelector(".drop-zone__prompt").remove();
   }
 
   // First time - there is no thumbnail element, so lets create it
   if (!thumbnailElement) {
     thumbnailElement = document.createElement("div");
     thumbnailElement.classList.add("drop-zone__thumb");
     dropZoneElement.appendChild(thumbnailElement);
   }
 
   thumbnailElement.dataset.label = file.name;
 
   // Show thumbnail for image files
   if (file.type.startsWith("image/")) {
     const reader = new FileReader();
 
     reader.readAsDataURL(file);
     reader.onload = () => {
       thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
     };
   } else {
     thumbnailElement.style.backgroundImage = null;
   }
 }
})

function readURL(input) {
   if (input.files && input.files[0]) {
 
     var reader = new FileReader();
 
     reader.onload = function(e) {
       $('.image-upload-wrap').hide();
 
       $('.file-upload-image').attr('src', e.target.result);
       $('.file-upload-content').show();
 
       $('.image-title').html(input.files[0].name);
     };
 
     reader.readAsDataURL(input.files[0]);
 
   } else {
     removeUpload();
   }
 }
 
 function removeUpload() {
   $('.file-upload-input').replaceWith($('.file-upload-input').clone());
   $('.file-upload-content').hide();
   $('.image-upload-wrap').show();
 }
 $('.image-upload-wrap').bind('dragover', function () {
       $('.image-upload-wrap').addClass('image-dropping');
    });
    $('.image-upload-wrap').bind('dragleave', function () {
       $('.image-upload-wrap').removeClass('image-dropping');
 });
 
 /*filtercount*/
 $('.mega-menu').click(function() {
   $('.badge').show();
});


$(document).on('click', '#upload-aphoto', function () {
  document.getElementById('selectedFile').click();
});

$('#selectedFile').change(function () {
  if (this.files[0] == undefined)
    return;
  $('#imageModalContainer').modal('show');
  let reader = new FileReader();
  reader.addEventListener("load", function () {
    window.src = reader.result;
    $('#selectedFile').val('');
  }, false);
  if (this.files[0]) {
    reader.readAsDataURL(this.files[0]);
  }
});

let croppi;
$('#imageModalContainer').on('shown.bs.modal', function () {
let width = document.getElementById('crop-image-container').offsetWidth - 20;
$('#crop-image-container');
  croppi = $('#crop-image-container').croppie({
    viewport: {
      // width: width,
      height: width 
    },
  });
$('.modal-body').height(document.getElementById('crop-image-container'));
croppi.croppie('bind', {
  url: window.src,
}).then(function () {
  croppi.croppie('setZoom', 0);
});
});
$('#imageModalContainer').on('hidden.bs.modal', function () {
croppi.croppie('destroy');
});

$(document).on('click', '.save-modal', function (ev) {
croppi.croppie('result', {
  type: 'base64',
  format: 'jpeg',
  size: 'original'
}).then(function (resp) {
    $('#confirm-img').attr('src', resp);
    $('.modal').modal('hide');
});
});

/*verification*/
document.body.addEventListener('click', (e) => {
  const target = e.target
  if (target.classList.contains('square')) {
    target.classList.toggle('selected')
  }
})

/*form diable btn*/
$(document).on('change keyup', '.form-control', function(e){
  let Disabled = true;
   $(".form-control").each(function() {
     let value = this.value
     if ((value)&&(value.trim() !=''))
         {
           Disabled = false
         }else{
           Disabled = true
           return false
         }
   });
  
  if(Disabled){
       $('.btn-dis').prop("disabled", true);
     }else{
       $('.btn-dis').prop("disabled", false);
     }
})

/*request upload filed */
var input = document.getElementById( 'file-upload' );
var infoArea = document.getElementById( 'file-upload-filename' );

input.addEventListener( 'change', showFileName );

function showFileName( event ) {
  
  // the change event gives us the input it occurred in 
  var input = event.srcElement;
  
  // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  var fileName = input.files[0].name;
  
  // use fileName however fits your app best, i.e. add it into a div
  infoArea.textContent =  fileName;
}

/*choose radio tab*/
$(document).ready(function () {
  $('input[name="intervaltype"]').click(function () {
      $(this).tab('show');
      $(this).removeClass('active');
  });
})