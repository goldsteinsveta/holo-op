var win = $(window)
var body = $('body')
var holoBox, holoWrap, holoFace, holoFace_loader

// possible width and height of holo face
function getRadius(){
	if (win.width() < win.height()) { return win.width() }
	return win.height()
}

// relation of holoFace to given window
function getRatio() { return((getRadius()/3) / win.width()) }

// get original content of the body without script tags
var content = body.html().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
var bg = body.css('background-color')

// blur original content
var content_dom = $('body > *')
content_dom.css({
	transition: 'filter 0.3s',
	filter: 'blur(15px)'
})

// create sqare that fits window and holds holo faces
function addBox() {
	var box = document.createElement('div')
	box.className = 'holoBox'
	body.append(box)

	holoBox = $('.holoBox')
	holoBox.css({
		display: 'flex',
		'flex-direction': 'row',
		'flexWrap': 'wrap',
		'justify-content': 'space-between',
		position: 'fixed',
		'z-index': 9999,
		width: getRadius(),
		height: getRadius(),
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		margin: 'auto'
	})
}
addBox()

// create holo face...
function addFace() {
	var face = document.createElement('div')
	var loader = document.createElement('div')
	var wrap = document.createElement('div')
	
	face.className = 'holoFace'
	loader.className = 'holoFace_loader'
	wrap.className = 'holoWrap'
	
	face.appendChild(wrap)
	face.appendChild(loader)

	holoBox.append(face)
}
// ...4 +1 times
addFace()
addFace()
addFace()
addFace()
addFace()

holoFace = $('.holoFace')
for (var i = 0; i < holoFace.length; i++) {
	var f = $(holoFace[i])

	var margin
	if (i == 0 || i == 4) { margin = '0 calc(100% / 3)' }
	else { margin = 0 }

	var rotate = 0
	if (i == 1) { rotate = 270 }
	else  if (i == 3) { rotate = 90 }
	else if (i == 4) { rotate = 180 }

	f.css({
		position: 'relative',
		overflow: 'hidden',
		width: getRadius()/3,
		height:getRadius()/3,
		margin: margin,
		'box-sizing': 'border-box',
		'border': 'solid white',
    	'border-width': '2px 2px 0 2px',
		transform: 'rotate(' + rotate + 'deg) scaleX(-1)',
		backgroundColor: 'rgba(6,6,6,0)',
	})
	
	// how-to face
	if (i == 2) {
		f.html('resize window to fit your prism')
		f.css({
			opacity: 1,
			transform: 'none',
			display: 'flex',
			'justify-content': 'center',
			'align-items': 'center',
			fontSize: '2vw',
			padding: '2vw',
			'border-width': '2px 2px 2px 2px',
			'text-align': 'center',
		    'font-family': 'monospace',
		    'text-shadow': '0 0 1vw #baeeff'
		})
	}

}
// additional custom styles
function addStyle(par) {
	if (par == 'invert') {
		$('.holoFace *').css({
			backgroundColor: 'black',
			color: 'white',
			stroke: 'white'
		})
		return
	}
	if (par == 'instagram') {
		$('.holoFace main, .holoFace header').css({
			backgroundColor: 'black'
		})
		return
	}
}

holoWrap = $('.holoWrap')
holoWrap.append(content).css({
	'margin-top': -win.scrollTop() + 'px',
	'opacity': 0
})
// scale wrapper to holoFace
function scaleWrap() {
    holoWrap.css({
    	'width': win.width(),
		'transform': 'scale(' + getRatio() + ')',
		'transform-origin': 'top left'
    })
}

holoFace_loader = $('.holoFace_loader')
holoFace_loader.css({
    width: '5vw',
    height: '300%',
    background: 'white',
    transform: 'rotate(30deg)',
    position: 'absolute',
    right: '-45%',
    top: '-100%'
})

var steps = [false,false]
function start() {
	steps = [true,true]
	scaleWrap();
	// hide border add bg
	holoFace.css({
		'backgroundColor': bg,
		border: 'none'
	})
	$(holoFace[2]).html('').css({
		'backgroundColor': 'transparent'
	})
	// custom style
	addStyle('instagram')

	// bling bling
	holoFace_loader.animate({right: '130%'}, 900)

	// show wrap
	holoWrap.animate({opacity: '1'},800)

	// deal with original content
	content_dom.animate({opacity: 0}, 800)
	body.css({
		'background-color':'black',
		'transition': 'background-color 0.8s'
	})
}


$(window).on('resize', function() {
	
	if (!steps[0]) {
		$(holoFace[2]).html('scroll to start')
		steps[0] = true
	}

	scaleWrap()
	var r = getRadius()
	$('.holoBox').css({
		width: r,
		height: r
	})
	$('.holoFace').css({
		width: r/3,
		height: r/3
	})
})

$(window).on('scroll', function(){

	if (!steps[1]) {
		start()
		steps[1] = true
	}

	var ratio = getRatio()
	$('.holoWrap').css({
		'margin-top': -win.scrollTop() * ratio + 'px',
		'margin-left': -win.scrollLeft() * ratio + 'px'
	})
})

// in case of no scroll page
$(window).on('click', function() {
	if (!steps[1]) {
		start()
		steps[1] = true
	}
})
