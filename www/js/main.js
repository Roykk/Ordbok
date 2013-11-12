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
            $("#bokmaalResult").html($(html).find("#byttutBM").html());
            $("#nynorskResult").html($(html).find("#byttutNN").html());
          
            //ny funksjoner som trengs her.. find ovenfor henter inn way to much..
            //createBokmalResultHtml returnerer html
            //#ordtreff -->  $("#byttutBM a.tiptip");
            //#betydning --> $("#byttutNN .artikkelinnhold");
            // -->hver artikkelinnhold må mest sanns plukkes litt frahverendre/renskes opp (feks hente ut $(.utvidet)  må undersøke nærmere) )

            //createNynorskResultHtml returnerer html
            //#ordtreff -->  $("#byttutNN a.tiptip");
            //#betydning --> $("#byttutNN .artikkelinnhold")
            // -->hhver artikkelinnhold må mest sanns plukkes litt frahverendre/renskes opp (feks hente ut $(.utvidet)  må undersøke nærmere)
;

            //html til responsen:
            //ordforklaring ligger på: span.tydningC.kompakt (eller noe deromkring)
          }
  		  }); //ajax-metode-lukkes
    }else{
      alert('Ditt søk inneholder et eller flere ugyldige tegn.');
    }
	});

  //utfører en submit hvis en klikker på forstørrelseglass
  $("#searchIcon").click(function(event){
    $("form[name='searchForm']").submit();
  });

  //skjuler og viser nynorsk/bokmål
  $("#spraakSwitch").click(function(event){
    if(isBokmal()){
      $("#nynorskResult").hide("slow");
      $("#bokmalResult").show("fast");   
    }else{
      $("#bokmalResult").hide("slow");
      $("#nynorskResult").show("fast"); 
    }
  });


}); //lukker onDocumentReady

//Validerer at input ikke inneholder tall og 
//tar kun bruk første del hvis det er whitespaces
function validateInput(input){
  if(input!=null){
    input = input.trim().split(" ",1);
    var pattern = /^[ÆØÅæøåA-Za-z]*$/i;
    return input[0].match(pattern);
  }
}

//Url søket skal gå mot
function getActionUrl(){
  return "http://www.vg.no"; 
  //this is commented out to not spam uioordbok with wrongfull queries
  //"http://www.nob-ordbok.uio.no/perl/ordbok.cgi"
}

//sjekker om switchen står til bokmål
function isBokmal(){
    return !myonoffswitch.checked;
}

    //this is just a list over the req urls:
    //     NoJson-fullresp: http://www.nob-ordbok.uio.no/perl/ordbok.cgi?OPP=heis
    // short-json-autocompl-for-bokmål: http://www.nob-ordbok.uio.no/perl/lage_ordliste_liten_nr2000.cgi?spr=bokmaal&query=heis       


		
