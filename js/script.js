const pianoKeys = document.querySelectorAll(".piano-keys .key")
const mappedKeys = []

const volumeSlider = document.querySelector('.volume-slider input')
let volume = 0.5
volumeSlider.addEventListener('input', volumeHandler)

const checkKeys = document.querySelector('.keys-check input')
checkKeys.addEventListener('click', showHideKeys)

pianoKeys.forEach((key)=>{
	const keyToMap = key.children[0].innerHTML
	mappedKeys.push(keyToMap)
	key.addEventListener('click', ()=> playTune(keyToMap))
})

document.addEventListener('keydown', (e)=>{
	const key = e.key
	playTune(key)
	keydownHandler(key)
})

document.addEventListener('keyup', (e)=>{
	const key = e.key
	keydownHandler(key)
})

function showHideKeys(){
	pianoKeys.forEach((key)=>key.classList.toggle('hide'))
}

function volumeHandler(e){
	volume = e.target.value
}

function playTune(key){
	if(mappedKeys.indexOf(key) < 0){
		return
	}
	const sound = document.createElement('audio')
	sound.src = `./audio/${key}.mp3`
	sound.volume = volume
	sound.addEventListener('canplaythrough',()=>{
		sound.play()
	})
}

function keydownHandler(key){
	if(mappedKeys.indexOf(key) < 0){
		return
	}
	const element = document.querySelector(`[data-key = "${key}"]`)
	element.classList.toggle('key-pressed')
}
