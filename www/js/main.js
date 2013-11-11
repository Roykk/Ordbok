$(function(){
	$("#searchForm").submit(function(event){
		event.preventDefault();
    var input = validateInput(this.searchText.value);
    if(input!=null){
      input = String(input);
  		$.ajax({
     			url: getActionUrl(),
          type:"get",
     			cache: false,
    			async: false,
    			data:{OPP:input},
    			dataType: "html",
    			success: function(data){
       			html = data;
       			//hvis bokmål er checked
       			$("#bokmaal").html($(html).find("#byttutBM").html());

       			//hvis nynorsk er checked
       			$("#nynorsk").html($(html).find("#byttutNN").html());


       			//ordforklaring span.tydningC.kompakt))

    				//selve ordet a.tiptip, om det er bokmaal jQuery('html').find('a.tiptip')[0].onclick.toString().indexOf('bokmaal')

     			}
  		});
    }else{
      alert('Ditt søk inneholder et eller flere ugyldige tegn.');
    }
	});

  $("#searchIcon").click(function(event){
    $("form[name='searchForm']").submit();
  });

});


function validateInput(input){
  if(input!=null){
    input = input.trim().split(" ",1);
    var pattern = /^[ÆØÅæøåA-Za-z]*$/i;
    return input[0].match(pattern);
  }
}

function getActionUrl(){
  return "http://www.vg.no"; 
  //this is commented out to not spam uioordbok with wrongfull queries
  //"http://www.nob-ordbok.uio.no/perl/ordbok.cgi"
}

		
