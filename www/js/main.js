$(function(){
	$("#searchForm").submit(function(event){
		event.preventDefault();
		 $.get( this.action, { OPP: this.OPP.value } )
                 .success(function(data){
                 	alert("ok");
                    $('#result').html(data) ;
                 }).error(function(data,status){
                 	alert("fail:" + status);
                 }); 
	});



});