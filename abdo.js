let txt = document.getElementById('txt');
let mp3 = document.getElementById('mp3a');
let mp4 = document.getElementById('mp4a');
let btn1 = document.getElementById('mp3');
let btn2 = document.getElementById('mp4');
let p = document.getElementById('p');

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '971259495emshbe9e527309b4dc4p1f01eejsn1dd736c66ac5',
		'x-rapidapi-host': 'youtube-to-mp4-mp3.p.rapidapi.com'
	}
};

async function fetchURLForVid(url){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        let data = result.videos[0];
        let src = data.url;
        mp4.href = src;
        // console.log(data);
    } catch (error) {
        console.error(error);
    } 
}
async function fetchURLForAud(url){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        let data = result.mp3;
        let src ;
        for (let i = 0; i < data.length; i++) {
            if(data[i].hasAudio==true){
                src = data[i].url; 
                break;
            };
        }
        mp3.href = src;
        // console.log(src);
    } catch (error) {
        console.error(error);
    } 
}

txt.addEventListener('blur',()=>{
    try{
        let url = txt.value;
        let UrlKey , source = url.split('=');
        if(source.length==3){
        UrlKey = source[1].slice(0,source[1].indexOf('&'));
        } else if(source.length==2){
        UrlKey = source[1];
        } else {
        source = url.split('/');
        UrlKey = source[3].slice(0,source[3].length);
        }
        // console.log(UrlKey);
        let VidUrl = `https://youtube-to-mp4-mp3.p.rapidapi.com/video-info/${UrlKey}`;
        let AudUrl = `https://youtube-to-mp4-mp3.p.rapidapi.com/audio-info/${UrlKey}`;
        fetchURLForVid(VidUrl);
        fetchURLForAud(AudUrl);
        btn1.style.display = 'block';
        btn2.style.display = 'block';
        p.textContent = 'Valid link';
    } catch(e){
        console.error('error',e);
        p.textContent = 'Invalid link';
        btn1.style.display = 'none';
        btn2.style.display = 'none';
    }
})
