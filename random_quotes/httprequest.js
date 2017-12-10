function getQuote(){
	$.ajax({
		type:"GET",
		url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=10",
		headers:{"x-mashape-key":"kCuXsWn8OlmshzWzbbY0GyBryliJp1Ajjthjsnpsbiga219jsp"},
		async:true,
		cache: false,
		success: function(result){
			var response = JSON.parse(result);
			var responseQuote = response.quote;
			var responseAuthor = response.author;
			$("#quotes").html(responseQuote);
			$("#author").html("-"+responseAuthor);
			$("#tweetQuote").click(function(){
				var tweetText = responseQuote+" - "+responseAuthor;
				$(".twitter-share-button").attr("href","https://twitter.com/share?text="+tweetText);
			});
		}
	});
}

$(document).ready(function(){
	$("#getQuote").click(getQuote);
});