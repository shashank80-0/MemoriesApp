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
				let storyLocation = story.LOCATION;

				output+= ` <div class="col-md-4 story">
					          <div class="card mb-4 shadow-sm">
					            <img class="bd-placeholder-img card-img-top" width="100%" src=${storyImageSource}></img>
					            <div class="card-body">
					              <p class="card-text">${storyDescription}</p>
					              <div class="d-flex justify-content-between align-items-center">
					                <div class="btn-group">
					                  <button type="button" class="btn btn-sm btn-outline-secondary" id="view">View</button>
					                  <button type="button" class="btn btn-sm btn-outline-secondary" id="edit">Edit</button>
					                  <button type="button" class="btn btn-sm btn-outline-secondary" id="delete">Delete</button>
					                </div>
					                <small class="text-muted" id="time-stamp">9 mins</small>
					              </div>
					            </div>
					          </div>
					        </div> 
				`; 
			});
			$('#album-story').append(output);
		}
	});


	
	$(".story").mouseenter(function(){
		$(this).addClass('zoom-animation');

	});
	$(".story").mouseleave(function(){
		$(this).removeClass('zoom-animation');

	});



});