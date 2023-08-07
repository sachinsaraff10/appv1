// chrome.runtime.getBackgroundPage();
let urls=[];
let timers_url={};
let visitedDomains=new Set();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {            
    if (message.action === 'monitorURL') {
      // Get the monitored URL from the message and add it to your monitoring list
      let monitoredURL = message.url;
      let sent_timer=message.timer;
      let timerId=sent_timer.urlId;
      urls.push(monitoredURL);
      timers_url[sent_timer.urlId]=sent_timer;
      chrome.storage.local.set({urls:urls,timers:timers_url},()=>{
        console.log('Data stored in local storage.')
    })
    let popupurl='timers.html?timerId=${timerId}'
    // const MonitoredURL = monitoredURL;
    chrome.tabs.query({ active: false, currentWindow: true }, (tabs) => {
      for (let i = 0; i < tabs.length; i++) {
        let releurl = tabs[i].url;
        let domain = releurl.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im)[1];
        releurl.add(domain)
        if (releurl.includes(monitoredURL) && !visitedDomains.has(domain)) {
        chrome.tabs.reload(tabId,{bypassCache:false});
          chrome.windows.create({
            url: popupurl,
            type: 'popup',
            width: 100,
            height: 100,
            left: 950, // Adjust the position to the bottom right
            top: 520,
            tabId:tabId

          });
        }
      }
    })
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        for (let i = 0; i < tabs.length; i++) {
          let curr_url = tabs[i].url;
          let domain = curr_url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im)[1];
          if (curr_url.includes(MonitoredURL) && !visitedDomains.has(domain)) {
          chrome.tabs.reload(tabId,{bypassCache:false});
            chrome.windows.create({
              url: popupurl,
              type: 'popup',
              width: 100,
              height: 100,
              left: 950, // Adjust the position to the bottom right
              top: 520;
              tabId:tabId
            });
          }
        }
      })
}});
     
    
    // if (message.action==='getkeysarray'){
    //     sendResponse({keys:keysarray});

    // }
   
  ;






  // Other background script logic and tasks...
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed or updated!'); });


chrom.runtime.onMessage.addListener((message,sender,
    sendResponse)=>{
if (message.action==='timer_please'){
    let timeID=message.timerId;
    let timerObject=timers_url[timeID];

    sendResponse({timer:timerObject})
}
})
   
chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab)=>{
        if (changeInfo.status==="complete"){
            const taburl=tab.url;
    
         chrome.storage.local.get(['urls'],(result)=> {
            const urls=result.urls;
            if (urls){
            for (let i=0;i<urls.length;i++)
            {if (taburl.includes(urls[i])){
                chrome.windows.create({
                    url: 'timers.html',
        type: 'popup',
        width: 200,
        height: 200,
        left: 950, // Adjust the position to the bottom right
        top:520,
        tabId:tabId

                })
            }} }}) 
        }
      })
    
    chrome.action.onClicked.addListener(()=>{
        chrome.windows.create({
            url:'sites.html',
            type:'popup',
            width:300,
            height:300,
            left: 900, // Adjust the position to the bottom right
            top: 70,
            tabId:tabId
    
        });
      chrome.storage.local.get (['urls'],(result)=>{ 
        let vals=result.urls;
        if (vals){
            chrome.runtime.sendMessage({action:'initialize',vals})
            
        }} )})
     // Add any initialization logic or tasks here
 


// let keysarray=[];
// for (let i=0;i<Object.keys(key_vals).length;i++){
//     keysarray.push(i.toString());
// }

  // Listen for messages from content scripts or other parts of the extension
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     // Handle the incoming messages
//     // You can distinguish different actions using the message.action property
//   });
// let vals=[];
// keysarray.forEach(key=>{
//     vals.push(keysarray[key]);
// })
 



    // try {
    //     console.log("start");
    //     throw new Error("lol");
    //     console.log("end");
    // }
    //  catch (e) {
    //     console.error(e);
    // }