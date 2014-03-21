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
                        html =  data;
                        var bokmaalHit = $(html).find("#byttutBM").html();
                        var nyNorskHit = $(html).find("#byttutNN").html();

                       var bokmalWords = findSearchHitWord(bokmaalHit);
                       var bokmalArticles = findHitWordArticles(bokmaalHit);

                       var nynorskWords = findSearchHitWord(nyNorskHit);
                       var nynorskArticles = findHitWordArticles(nyNorskHit);

                       generateHtml(bokmalWords, bokmalArticles, "#bokmalResult");
                       generateHtml(nynorskWords, nynorskArticles, "#nynorskResult");

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

//returnerer oppslagsordet .html for å få verdien
function findSearchHitWord(partialResult){
    return $(partialResult).find(".oppslagdiv a");

}

function findHitWordArticles(partialResult){
    return $(partialResult).find(".artikkel");
}

function findMeaningInArticle(article){
    var meanings = $(article).find("span[class='utvidet']")[0];
    var intro = $(meanings).clone().children().remove(":not(.henvisning)").end().text();
    intro = intro.replace(/;/g, ',');
    var wordUsageDiv =  $(meanings).find("div.doemeliste")[0];
    var content =  $(wordUsageDiv).children().remove(".kompakt").end().text();

    if(intro!=""){
        return '<div class="intro">' + intro +'</div>' + '<div class="wordUsage">' +content + '</div>';

    }
    return content;

}

function introMassage(intro){

}

function generateHtml(hitWords,hitArticles, languageId){
    var htmlResult="";
    if(hitWords.length>0){
        for (var i=0;i<hitWords.length;i++){
            htmlResult += '<div id="treff' + i +'" class="sokeTreff">' +
                '<div id="ordtreff" class="ord">' + $(hitWords[i]).html() + '</div></div>';

            var article = hitArticles[i];
            var meaningArray = findMeaningInArticle(article);
            htmlResult+='<div id="betydning">' + meaningArray + '</div>';
        }
    }else {
        htmlResult="Ingen treff";
    }

    $(languageId).html(htmlResult);
}


//helper methods

function insertBokmal(htmlResult){

}

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
  return "http://localhost:63342/statisk/index.html";
  //this is commented out to not spam uioordbok with wrongfull queries
  //"http://www.nob-ordbok.uio.no/perl/ordbok.cgi"
}

//sjekker om switchen står til bokmål
function isBokmal(){
    return !myonoffswitch.checked;
}



    //this is just a list over the req urls:
    //     NoJson-fullresp: http://www.nob-ordbok.uio.no/perl/ordbok.cgi?OPP=moro
    // short-json-autocompl-for-bokmål: http://www.nob-ordbok.uio.no/perl/lage_ordliste_liten_nr2000.cgi?spr=bokmaal&query=heis       


		
