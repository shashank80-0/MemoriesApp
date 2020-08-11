$(document).ready(function(){

	$.ajax({
		type: 'GET',
		url: "/storiesApi",
		success: function(stories){
			let output ='';
			$.each(stories, function(index,story){
				let storyId = story.ID;
				/* Converting base64 encoding to image resource*/
				let base64EncodedStoryImage = story.IMAGE;
				let trimmedStoryImage = base64EncodedStoryImage.slice(2,-3);
				let correctedStoryImage = trimmedStoryImage.replace(/\\n/g,"");
				/*---------------------------------*/
				let storyName = story.NAME;	
				let fileExtension = storyName.slice(storyName.lastIndexOf('.')+1);
				let storyImageSource = "data:image/"+fileExtension+";base64,"+correctedStoryImage;
				let storyDescription = story.DESCRIPTION;
				let storyDate = story.DATE;
				let dateOnly = storyDate.slice(0,10);
				let storyLocation = story.LOCATION;
				//console.log(storyId);

				output+= ` <div class="col-md-4 story" id="temp">
					          <div class="card mb-4 shadow-sm">
					            <img class="bd-placeholder-img card-img-top" width="100%" src=${storyImageSource} id="story-image"></img>
					            <div class="card-body">
					              <div class="d-flex justify-content-between align-items-center">
					                <div class="btn-group">
					                  <a type="button" class="btn btn-sm btn-outline-secondary" id="view" href="/view-story">View</a>
					                  <a type="button" class="btn btn-sm btn-outline-secondary" id="edit" href="/edit-story">Edit</a>
					                  <a type="button" class="btn btn-sm btn-outline-secondary" id="delete" href="/delete-story">Delete</a>
			       
					                  <span hidden id="story-location">${storyLocation}</span>
					                  <span hidden id="story-description">${storyDescription}</span>
					                  <span hidden id="story-id">${storyId}</span>					                 
					                </div>
					                <small class="text-muted" id="story-date">${dateOnly}</small>
					              </div>
					            </div>
					          </div>
					        </div>

		   				
				`; 
			});
			$('#album-story').append(output);
		}
	});
		

	$(document).on("click", "#view", function(){
		$.cookie("Description", $(this).siblings("#story-description").text());
		$.cookie("Date", $(this).parent().next().text());
		$.cookie("Location", $(this).siblings("#story-location").text());
		localStorage.setItem("Source", $(this).parents(".card-body").prev().attr("src"));
	});

	
	$(document).on("mouseenter", ".story",function(){
		$(this).addClass('zoom-animation');

	});
	$(document).on("mouseleave", ".story", function(){
		$(this).removeClass('zoom-animation');

	});

	$(document).on("click", "#delete", function(){
		$.cookie("Description", $(this).siblings("#story-description").text());
		$.cookie("Date", $(this).parent().next().text());
		$.cookie("Location", $(this).siblings("#story-location").text());
		$.cookie("Id", $(this).siblings("#story-id").text());
		localStorage.setItem("Source", $(this).parents(".card-body").prev().attr("src"));
	});

	$(document).on("click", "#edit" ,function(){
		$.cookie("Description", $(this).siblings("#story-description").text());
		$.cookie("Date", $(this).parent().next().text());
		$.cookie("Location", $(this).siblings("#story-location").text());
		$.cookie("Id", $(this).siblings("#story-id").text());
		localStorage.setItem("Source", $(this).parents(".card-body").prev().attr("src"));
	});

});
	
	

