$('#ContentPrimary').css('background-color', 'yellow');
var articleLinks = [];
var articleLink = '';
var active = true;
$('#ContentHeader').append('<div style="background:#9fff32;" id="clickAllLinks"><a style="font-size: 16px; line-height:16px; font-weight: bold; color: red;" href="#">Click Me To Got All Emails</a></div>');
self.on('message', function onMessage(activation) {
	active = activation;
});
/*$('#left_content_box ol li b a').each( function() {
	$(this).css({'color':'red', 'font-size':'15px'});
	
	articleLink = $(this).attr('href');
	alert(articleLink);
	articleLinks.push(articleLink);
	//tabs.open($(this).attr('href'));
	$(this).html('hihi');
});*/

/* Get The journal title URL and the volume*/

self.port.emit("journalTitle", [$('h1.title').text(),document.location.toString(),$('h2.filters').text()]);

$('li').each( function() {
	$(this).find('p.title a').css({'color':'red'}).live('click',function(event) {
		var articleTitle = $(this).text();
		console.log('articleTitle: ' + articleTitle);
		self.port.emit("articleTitle", articleTitle);
		
		/* article Link */
		$(this).css({'color':'red'});	
		articleLink = 'http://www.springerlink.com' + $(this).attr('href') + '/about/';
		articleLinks.push(articleLink);
		console.log('articleLink: ' + articleLink);
		event.stopPropagation();
		event.preventDefault();	
		self.port.emit("articleLink", articleLink);
	});
});
//self.port.emit("articleLinks", articleLinks);
/*var trigger = function($a) {
	$a.trigger('mouseenter');
	//alert('setTimeout');
}
$('#left_content_box').find('a').each( function() {
	setTimeout(trigger($(this)), 500);
});
*/
$('#clickAllLinks').live('click', function() {
	
	if (!active) {
		console.log('unactive');
		return;
	}
	console.log('active');
	$(this).css({'background':'yellow'});
	anchorClicker();
	
	/* Automaticly click Most Downloaded and retrive the content */

});


/* find the anchor and click them */
function anchorClicker() {
	$('li').each( function() {		
		$anchor = $(this).find('p.title a');
		$anchor.css({'border':'1px solid black'});
		$anchor.trigger('click');

	});
}