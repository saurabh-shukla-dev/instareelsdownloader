
$( document ).ready(function() {
	var locdata;

	$('#container_box').hide();
	$("#submit").click(function(){
	  var url = $('#reelsurl').val() + "?__a=1";
	  if ($('#reelsurl').val().length > 0) {
	  
	    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
		if(!pattern.test(url)) {
			swal({
					type: "info",
					title: "Invalid!",
					html: true,
					text: 'Invalid url please check.',
					confirmButtonColor: "#09a8f1"
				});
		} else {
			  $.ajax({
			  url: url,
			  beforeSend: function( xhr ) {
				$('.loading').show();
			  },
			  success: function(response) {
				$('.loading').hide();
				if(response.graphql.shortcode_media.video_url) {
					$('#owner_name').text(response.graphql.shortcode_media.owner.full_name)
					
					// set video url
					$("#video_url").attr("src", response.graphql.shortcode_media.video_url);
					$("#download_button").attr("href", response.graphql.shortcode_media.video_url + '&dl=1');
					$("#container_box video")[0].load();
					$('#container_box').show();
					
					
					const scriptURL = 'https://script.google.com/macros/s/AKfycbzPqeL914m2yefkZtW8o792ZFK48J9k4AqCJacfUj3AECQF2NR79u_bag/exec';
					dataUrl = { "url" : url};
					locdata['date_time'] = new Date().toLocaleString();
					var data = Object.assign(locdata,dataUrl);
					delete data.failedurls;
					var saveData = $.ajax({
					  type: 'POST',
					  url: scriptURL,
					  data: data,
					  dataType: "json",
					});
					
				} else {
					const scriptURL = 'https://script.google.com/macros/s/AKfycbzPqeL914m2yefkZtW8o792ZFK48J9k4AqCJacfUj3AECQF2NR79u_bag/exec';
					dataUrl = { "failedurls" : url};
					locdata['date_time'] = new Date().toLocaleString();
					var data1 = Object.assign(locdata,dataUrl);
					delete data1.url;
					var saveData = $.ajax({
					  type: 'POST',
					  url: scriptURL,
					  data: data1,
					  dataType: "json",
					});
					swal({
						type: "info",
						title: "Wrong url/Private account!",
						html: true,
						text: 'Provided url is wrong or Instagram account is private',
						confirmButtonColor: "#09a8f1"
					});
				}
			  },
			  error: function (error) {
					$('.loading').hide();
					$('#container_box').hide();
					const scriptURL = 'https://script.google.com/macros/s/AKfycbzPqeL914m2yefkZtW8o792ZFK48J9k4AqCJacfUj3AECQF2NR79u_bag/exec';
					dataUrl = { "failedurls" : url};
					locdata['date_time'] = new Date().toLocaleString();
					var data2 = Object.assign(locdata,dataUrl);
					delete data2.url;
					var saveData = $.ajax({
					  type: 'POST',
					  url: scriptURL,
					  data: data2,
					  dataType: "json",
					});
					swal({
						type: "info",
						title: "Wrong url/Private account!",
						html: true,
						text: 'Provided url is wrong or Instagram account is private',
						confirmButtonColor: "#09a8f1"
					});
			  }
			})
		}
	  
	  
	  } else {
			swal({
				type: "info",
				title: "Required!",
				html: true,
				text: 'Url/Link is required',
				confirmButtonColor: "#09a8f1"
			});
	  }
  });



	// scrollspy
	$("#mainav ul li a[href^='#']").on('click', function(e) {

	   e.preventDefault();
	   var hash = this.hash;
	   $('html, body').animate({
		   scrollTop: $(hash).offset().top
		 }, 900, function(){
		   window.location.hash = hash;
		 });

	});
  
  
  
  
  
  $("#subscription_submit").click(function(){
  
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var name = $('#subscription_name').val();
	var email = $('#subscription_email').val();
	var review = $('#subscription_review').val();
	if ($('#subscription_name').val().length <= 0) {
				swal({
					type: "info",
					title: "Required!",
					html: true,
					text: 'Name field is required',
					confirmButtonColor: "#09a8f1"
				});
	} else if ($('#subscription_email').val().length <= 0) {
		swal({
			type: "info",
			title: "Required!",
			html: true,
			text: 'Email field is required',
			confirmButtonColor: "#09a8f1"
		});
	} else if(!re.test(email)) {
		swal({
			type: "info",
			title: "Invalid Email!",
			html: true,
			text: 'Email is incorrect',
			confirmButtonColor: "#09a8f1"
		});	
	} else {
		const scriptURL = 'https://script.google.com/macros/s/AKfycby6O9pdcD5b3cUim4q1_X5m2KiZSAuSY7YNe3_LQHXrVOXMjafRJb1P/exec';
		userData = { "name" : name, "email": email, "review":review};
		locdata['date_time'] = new Date().toLocaleString();
		var data3 = Object.assign(locdata,userData);
		var saveData = $.ajax({
		  type: 'POST',
		  url: scriptURL,
		  data: data3,
		  dataType: "json",
		   beforeSend: function( xhr ) {
			$('.loading').show();
		  },
		  success: function(response) {
			$('.loading').hide();
			$('#subscription_name').val("");
			$('#subscription_email').val("");
			$('#subscription_review').val("");
			swal({
                type: "success",
                title: "Thank you!",
                html: true,
                text: 'Your response has been submitted successfully.',
                confirmButtonColor: "#62BB46"
            });
		 },
		 error: function (error) {
				$('.loading').hide();
				swal({
					type: "error",
					title: "Technical error!",
					html: true,
					text: 'Please contact to our team',
					confirmButtonColor: "#f81302"
				});
		  }
		});
	}
	
  });

$('.loading').hide();


$("#reelsurl").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#submit").click();
    }
});



$.getJSON('https://ipinfo.io/json', function(data) {
	data['date_time'] = new Date().toLocaleString();
	locdata = data;
	const scriptURL = 'https://script.google.com/macros/s/AKfycbznb99nSuB5VskYIhxXLoPp3av2B4RbzSL0Mzx4lLxZqiKmDgYOcrfK0Q/exec';
	var saveData = $.ajax({
	  type: 'POST',
	  url: scriptURL,
	  data: data,
	  dataType: "json",
	});
});
  
  
//Disable inspect
$(document).keydown(function(e){
    if(e.which === 123){
       return false;
    }
});
// Disable context menu
$(document).bind("contextmenu",function(e){
    return false;
});
  
});