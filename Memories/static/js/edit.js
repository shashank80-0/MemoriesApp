$(document).ready(function(){	
	$("#description").val($.cookie("Description"));
	$("#date").val($.cookie("Date"));
	$("#location").val($.cookie("Location"));
	$("#image").attr("src",localStorage.getItem("Source"));
	$("#storyId").val($.cookie("Id"));
	$.removeCookie("Description");
	$.removeCookie("Date");
	$.removeCookie("Location");
	localStorage.clear();
});