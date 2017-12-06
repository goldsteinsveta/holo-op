var bg = $('.holoFace').css('backgroundColor')
if(bg != 'rgba(6, 6, 6, 0)') {
	$('body').css('backgroundColor', bg)
}
$('.holoBox').remove()
$('body > *').css({
	'filter': 'none',
	'opacity': 1
})

