$(function(){
	$("#searchForm").submit(function(event){
		event.preventDefault();
		$.ajax({
   			url: this.action,
   			cache: false,
  			async: false,
  			data:{ OPP: this.OPP.value },
  			dataType: "html",
  			success: function(data){
     			html = data;
     			//hvis bokmål er checked
     			$("#bokmaal").html($(html).find("#byttutBM").html());

     			//hvis nynorsk er checked
     			$("#nynorsk").html($(html).find("#byttutNN").html());


     			alert();//ordforklaring span.tydningC.kompakt))

				alert(); //selve ordet a.tiptip, om det er bokmaal jQuery('html').find('a.tiptip')[0].onclick.toString().indexOf('bokmaal')

   			}
		});
	});
});

		// $.get( this.action, { OPP: this.OPP.value }, "html" )
         //        .success(function(data){
           //       	alert(data);
                 	
           //       	var tableHtml =  $(data).find("body");
           //      	alert(tableHtml);
           //      	alert(tableHtml.html());
           //         $('#result').html(tableHtml.html()) ;
           //      }).error(function(response,status){
           //      	alert("fail:" + status);
           //      }); 
