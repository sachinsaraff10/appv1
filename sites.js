let lst=[];
const { v4: uuidv4 } = require('uuid');
        // let x=0;
const urlParams = new URLSearchParams(window.location.search);
let domains = urlParams.get('domainId');
chrome.runtime.sendMessage({action:"storageplease",domains},(response)=>{

})
const body=document.querySelector('body');
body.style.display='flex';
        const maincontainer=document.getElementById('maincontainer')
  maincontainer.style.display='flex';
  maincontainer.style.flexDirection='column';

  const container2=document.getElementById('container2');
  container2.style.marginBottom='25px';
  const container3=document.getElementById('container3');
  container3.style.display='flex';
  container3.style.flexDirection='column';
  container3.style.marginLeft='10px';
  container3.style.gap='10px';
  container2.style.flexGrow='.2'; 
        // const listcontainer=document.getElementById('listcontainer');
        // listcontainer.style.display='inline-block';
        // listcontainer.style.justifyContent='space-even';
        // listcontainer.style.display='flex';
    // listcontainer.style.flexDirection='column';
    //     listcontainer.style.gap='2px';
        // var divv;
        // let removebtn;
        // const addbutton=document.getElementById('addbutton');
//   document.addEventListener(
//     'DOMContentLoaded',()=>{
//         chrome.storage.local.get('urls',function(data){
//             const urlList= document.getElementById()
//         })
//     }
//   )        
        function remover(parent,child){
         parent.removeChild(child);
          }
        // function disappear(box){
        //   box.close();
        // }
        // function newbox(){ var divv=document.createElement("div");
  // function appender(container1,container2){container2.appendChild(container1)};
   //                                          divv.classList.add("container");
   // const newbtn=document.createElement("button");
  //  divv.style.display='flex';
  //  divv.style.height='fit-content';
  //  divv.style.justifyContent='left';
  //  divv.style.backgroundColor='white';
  // // newbtn.textContent="New site";
  // newbtn.addEventListener('click',()=>{setnew(newbtn,divv)});
      
   // divv.appendChild(newbtn);
   // divv.appendChild(removebtn);
    //  addbutton.addEventListener('click',()=>{setnew(addbutton,divv)})
    //  maincontainer.appendChild(divv)                     
    // }
        
        // addbutton.addEventListener('click',newbox); 
   
     //  function setnew(button,div){
     // var dbox=document.createElement('dialog');
     // dbox.classList.add('dcontainer');
     // // dbox.style.display='flex';
     // dbox.style.justifycontent='center';
     // dbox.style.height='fit-content';
     // dbox.style.width='fit-content';
  let inpp=document.getElementById('urlId');
     // inpp.type='text';
     inpp.placeholder='www.example.com';
     // inpp.id='urlID';
     // dbox.appendChild(inpp);
      const okbtn=document.getElementById('okbutton');
     // okbtn.textContent="okay";
      okbtn.disabled=true;
      inpp.addEventListener('input', () => {
        const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)?[a-z0-9-]+\.[a-z]{2,}\/?.*$/i;
        const urlInput = inpp.value.trim();
        if (urlPattern.test(urlInput)) {
          okbtn.disabled = lst.includes(urlInput);
        } else {
          okbtn.disabled = true;
        }})
        
      // });
      // const cancelbtn=document.createElement('button');
     // cancelbtn.textContent=`cancel`;
      // cancelbtn.addEventListener('click',()=>{disappear(dbox)});
     // dbox.appendChild(okbtn);
     // dbox.appendChild(cancelbtn);
      
      okbtn.addEventListener('click',()=>{setok(okbtn,inpp,container3);
        addtimer();
        let serializedtimer=JSON.stringify(timer);
        let url=inpp.value;        
        chrome.runtime.sendMessage({ action: 'set-timer',url:url,timer:serializedtimer});
    });
      // okbtn.addEventListener('click',()=>{disappear(dbox)});
      
        
      // document.body.appendChild(dbox);
       // dbox.showModal();}
  
      function setok(button,input,div){
        // const listcontainer=document.getElementById('listcontainer');
    const label=document.createElement('label');
    const radiocontainer=document.createElement('div');
    
    // listcontainer.classList.add('listbox');
    radiocontainer.style.height='fit-content';
     radiocontainer.style.width='fit-content';
     radiocontainer.style.display='flex';
     radiocontainer.style.justifyContent='space-even';
     const radio=document.createElement('input');
     radio.type='radio';
        radio.name = 'radioGroup';
      radio.value=input.value;
     label.setAttribute('for','radio');   
     // listcontainer.style.gap='1px';
     // listcontainer.style.listStyle='Disc';
     // listcontainer.style.justifyContent='space-even';
    //  listcontainer.style.justifyContent='left';
    // let lists=document.createElement('li');
    label.textContent=radio.value;
    let unique=label.textContent;
    
    if (lst.includes(unique)){
      button.disabled=true;
    }else{lst.push(unique);
      // ipcRenderer.send('url-added',unique);
      button.disabled=false;
    }   
        radiocontainer.appendChild(radio);
        radiocontainer.appendChild(label);
     // removebtn=document.createElement("button");
   // removebtn.textContent="Remove site";
   // removebtn.addEventListener('click',()=>{remover(div,listcontainer)});
   // listcontainer.appendChild(lists);
   radio.addEventListener('click', () => {
      if (radio.checked) {
        radio.focus(); 
        // Ensure the radio button has focus after being checked
      // radio.addEventListener('click',()=>{radio.checked=false;})}
      }})
  
    // Event listener for the keydown event on the document
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Delete' && radio.checked) {
        const selectedText = radiocontainer.querySelector('input:checked + label').textContent;
    lst = lst.filter((item) => item !== selectedText);
        radiocontainer.remove();
        
      }})
   div.appendChild(radiocontainer);     
   // listcontainer.appendChild(removebtn);
   // radio.addEventListener('click',(event)=>{if(event.key==='Delete'){
   //   remover(div,radiocontainer);
   
   
  // 
      }

      chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
        if (message.action==="initialize"){
            let valuables = message.vals;
            valuables.forEach((entry) => {
                
            
                presetok(entry,container3)
            })
        }
      })

      function presetok(input,div){
        const label=document.createElement('label');
        const radiocontainer=document.createElement('div');
        
        radiocontainer.style.height='fit-content';
         radiocontainer.style.width='fit-content';
         radiocontainer.style.display='flex';
         radiocontainer.style.justifyContent='space-even';
         const radio=document.createElement('input');
         radio.type='radio';
            radio.name = 'radioGroup';
          radio.value=input;
         label.setAttribute('for','radio');   
         
        label.textContent=radio.value;
        let unique=label.textContent;
        radiocontainer.appendChild(radio);
        radiocontainer.appendChild(label);
     
   radio.addEventListener('click', () => {
      if (radio.checked) {
        radio.focus(); 
              }})
  
    // Event listener for the keydown event on the document
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Delete' && radio.checked) {
        const selectedText = radiocontainer.querySelector('input:checked + label').textContent;
    lst = lst.filter((item) => item !== selectedText);
        radiocontainer.remove();
        
      }})
   div.appendChild(radiocontainer);     
    
      }
      function addtimer(){
      const timerDiv = document.createElement('div');
            timerDiv.classList.add('container');
            
            const hourInput = document.createElement('input');
            hourInput.type = 'text';
            hourInput.placeholder='hours';
            hourInput.classList.add('hours');

            const minuteInput = document.createElement('input');
            minuteInput.type = 'text';
            minuteInput.placeholder='minutes';
            minuteInput.classList.add('minutes');

            const secondInput = document.createElement('input');
            secondInput.type = 'text';
            secondInput.placeholder='seconds';
            secondInput.classList.add('seconds');

            // const playButton = document.createElement('button');
            // playButton.textContent = 'Play';
            // playButton.classList.add('paused');
            timerDiv.appendChild(hourInput);
            timerDiv.appendChild(document.createTextNode(':'));
            timerDiv.appendChild(minuteInput);
            timerDiv.appendChild(document.createTextNode(':'));
            timerDiv.appendChild(secondInput);
            // timerContainer.appendChild(timerDiv);
            container3.appendChild(okayButton);
            container3.appendChild(timerDiv);
            const timer = {
                tabId:tabId,
                hourInput: hourInput,
                minuteInput: minuteInput,
                secondInput: secondInput,
                urlId:uuidv4(),
                intervalId:null};

            timers.push(timer);

            chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
                if (message.action==="set-timer"){
                    chrome.runtime.sendMessage({action:"monitorURL",timer:serializedtimer,hourInput: serializedtimer.hourInput.value,minuteInput: serializedtimer.minuteInput.value,secondInput: serializedtimer.secondInput.value})
                }
            })
        }