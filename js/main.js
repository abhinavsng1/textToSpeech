
//INIT SPEECH API
const synth= window.speechSynthesis;


//DOM ELEMENT
const textForm=document.querySelector("form")
const textInput=document.querySelector("#text-input");
const voiceSelect=document.querySelector("#voice-select")
const rate=document.querySelector("#rate")
const rateValue=document.querySelector("#rate-value");
const pitch=document.querySelector("#pitch");
const pitchValue=document.querySelector("#pitch-value");
const body=document.querySelector("body")
//inint voice array
let voices=[]

const getVoices=()=>{
	voices=synth.getVoices();
	


	//loop through voice and create one each
	voices.forEach(voice=>{
//create option value
const option=document.createElement("option")

//fill the option with voice and languages
option.textContent=voice.name +'('+voice.lang+')';


//set needed option attribute
option.setAttribute("data-lang",voice.lang);
option.setAttribute("data-name",voice.name)
voiceSelect.appendChild(option);


	})
}

getVoices();
if(synth.onvoiceschanged !== undefined){
	synth.onvoiceschanged=getVoices
}

//speak
const speak=()=>{
	

	//check if speaking
	if(synth.speaking){
		console.log("already speaking")
		return;
	}
if(textInput.value !==""){
	//add animation
	body.style.background='#141414 url("img/wave.gif")';
	body.style.backgroundRepeat="repeat-x";
	body.style.backgroundSize="100% 100%"

	const speakText=new SpeechSynthesisUtterance(textInput.value);

	//speak end
	speakText.onend=e=>{
		console.log("done ending")
		body.style.background="#141414"
	}
	//speak error
	speakText.onerror =e=>{
		console.error("something went error")
	}
		//selectedVoice
		const selectedVoice=voiceSelect.selectedOptions[0].getAttribute("data-name")

		//loop throgh voice
		voices.forEach(voice=>{
		if(voice.name===selectedVoice){
			speakText.voice=voice;
		}	
		})


		//set pyvch and rate
		speakText.rate=rate.value;
		speakText.pitch=pitch.value;

		//speak
		synth.speak(speakText)
		
}


}
//event listener

//text form submit
textForm.addEventListener("submit",e=>{
	e.preventDefault();
	speak();
	textInput.blur();
})
//rate value change
rate.addEventListener('change',e=>rateValue.textContent=rate.value)
pitch.addEventListener('change',e=>pitchValue.textContent=pitch.value)

//voice select chamge
voiceSelect.addEventListener("change",e=>speak())









