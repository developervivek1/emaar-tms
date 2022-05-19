function modal(el){
  add(['#'+el, '#'+el+' > modal'], ['fadeIn', 'pulse']);
  visible(['#'+el, '#'+el+' > modal']);
}

function close_modal(el){
  del(['#'+el, '#'+el+' > modal'], ['fadeIn', 'pulse']);
  visible(['#'+el, '#'+el+' > modal']);
}

function loader(){
  var data = {
    title: 'Please wait',
    message: 'Sending data to server.....',
    pos: {
      yaxis: "bottom",
      xaxis: "right"
    },
    theme: "light",
    time: 4000,
    overlay: false
  }
  
  loadLoader(data);
}

function add(el, cl){
  for(var x=0;x<el.length;x++) $(el[x]).addClass('animated '+cl[x]);  
}

function del(el, cl){
   for(var x=0;x<el.length;x++) $(el[x]).removeClass('animated '+cl[x]); 
}

function visible(el){
  for(var x=0;x<el.length;x++) $(el[x]).css("visibility", ($(el[x]).css('visibility') == "hidden") ? ("visible") : ("hidden"));
}


function loadLoader(data){
  var overlay = (data.overlay) ? ("no-overlay") : ("");
  var dataAttr = data.theme+' '+data.pos.yaxis+' '+data.pos.xaxis+' '+overlay;
  
  var modalHtml = '<modal-con id="loader" '+dataAttr+'><modal loader><header>'+
                  '<label>'+data.title+'</label>'+
                  '</header><main>'+
                  '<div><svg md-loader stroke-width="5" viewBox="0 0 66 66">'+
                  '<circle cx="33" cy="33" r="25" />'+
                  '</svg></div>'+
                  '<div>'+data.message+'</div>'+
                  '</main></modal></modal-con>';
  
  if($("md-dialog").is(':empty')){ 
      $("md-dialog").html(modalHtml);
  }
  
  add(['#loader', '#loader > modal'], ['fadeIn', 'pulse']);
  visible(['#loader', '#loader > modal']);
  
  if(data.time){
     setTimeout(function(){  
         del(['#loader', '#loader' > 'modal'], ['fadeIn', 'pulse']);
         visible(['#loader', '#loader > modal']);
         $("md-dialog").html("");
      }, data.time);
  }
}