let urls=[];
  console.log(urls.length);
  let timers_url={};
  let urltimer={};
  let running_timer;
  let visitedDomain=[];
  let timer_overwrite={};
  let running_url=[];
  let testset=new Set();
  let activeTaburl;
  let releurl;
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed or updated!');
    chrome.storage.local.get(
      ['urls', 'overwritten', 'visitedDomain', 'running', 'timers', 'urltotimer'],
      (result) => {
        urls = result.urls || [];
        console.log(urls);
        timers_url = result.timers || {};
        urltimer = result.urltotimer || {};
        visitedDomain = result.visitedDomain || [];
        running_url = result.running || [];
        timer_overwrite = result.overwritten || {};
      }
    )
  });
console.log('initialized');
// console.log(urls.length);
// initializes arrays that contain domains and timers sent from settings popup
function addToArrayIfNotExists(array, element) {
  if (!array.includes(element)) {
    array.push(element);
  }
}

let activeTabId;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
       activeTabId = tabs[0].id;
      console.log("Active tab ID:", activeTabId);
    }
  })
// first event post installation that occurs once extension icon gets clicked
chrome.action.onClicked.addListener(()=>{
  // 
  console.log(visitedDomain);
  console.log(urls)
  console.log(urltimer[urls[0]]);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
         activeTabId = tabs[0].id;
      console.log("Active tab ID:", activeTabId);
    }
  });
    if(urls.length>0)
    {
        // chrome.storage.local.get(['sites'],
        //   (result)=>{
            // let popupURL=result.sites;
            chrome.windows.create({
              url:'sites.html',
              type:'popup',
              width:300,
              height:300,
              left: 900, // Adjust the position to the bottom right
              top: 70
             
          
          })
          
        ;
        
            // let popupURL=`sites.html?domainId=${domains}`
            // chrome.tabs.reload(tabId,{bypassCache:false});
            ;
        
        ;
    }
    else{
      chrome.windows.create({
        url:'sites.html',
        type:'popup',
        width:300,
        height:300,
        left: 900, // Adjust the position to the bottom right
        top: 70
       
    
    });
    }
  
 
  } );

async function storethenget(){
  const data= await new Promise((resolve)=>{
    
chrome.storage.local.set({urls:urls,timers:timers_url,
  urltotimer:urltimer,overwritten:timer_overwrite,
running:running_url,visitedDomain:visitedDomain}
  ,()=>{chrome.storage.local.get(['urls', 'overwritten', 'visitedDomain', 'timertoid', 'running', 'timers', 'urltotimer'],
  (result)=>{
    urls = result.urls;
    timers_url = result.timers  ;
    urltimer = result.urltotimer ;
    visitedDomain = result.visitedDomain;
    running_url = result.running;
    timer_overwrite = result.overwritten;

  });
chrome.runtime.sendMessage({action:'setting_over'});
  });

  })
  return data;
}

async function storethenget_1(){
  const data= await new Promise((resolve)=>{
    
chrome.storage.local.set({overwritten:timer_overwrite}
  ,()=>{chrome.storage.local.get(['overwritten', 'visitedDomain','running'],
  (result)=>{
    visitedDomain = result.visitedDomain;
    running_url = result.running;
    timer_overwrite = result.overwritten;

  });
chrome.runtime.sendMessage({action:'setting_over'});
  });

  })
  return data;
}

async function message_responsesender(message){
  return new Promise((resolve)=>{
    chrome.runtime.sendMessage(message,(response)=>
    {
      resolve(response)
    })
  })
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {            
    if (message.action === 'monitorURL' && !urls.includes(message.url)) {
            let monitoredURL = message.url;
            console.log(monitoredURL);
      let sent_timer=message.timer;
      console.log(sent_timer);
        urls.push(monitoredURL);
      urltimer[monitoredURL]=sent_timer;

      // timers_url[timerId]=sent_timer;
      // /timer_toid[sent_timer]=timerId;
      timer_overwrite[monitoredURL]=sent_timer;
      console.log(timer_overwrite)
      chrome.storage.local.set({urls:urls,timers:timers_url,
        urltotimer:urltimer,visitedDomain:visitedDomain,
        overwritten:timer_overwrite,
         running:running_url,sites:currenttabId.url},()=>{
        console.log('Data stored in local storage.')
          })
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            for (let i = 0; i < tabs.length; i++) {
              let curr_url = tabs[i].url;
              let tabId=tabs[i].id;
              let curr_domain=new URL(curr_url).hostname
              console.log(curr_domain);
              console.log()
                for(let i=0;i<urls.length;i++){
                    if (curr_domain===urls[i]) { 
                       
                       
                       addToArrayIfNotExists(visitedDomain,curr_domain);
                       chrome.storage.local.set({visitedDomain:visitedDomain,running:running_url},
                         ()=>{console.log('nice to see')
                             console.log('Data stored in local storage.');
                            //  let popupURL = `timers.html?domainId=${curr_domain}`
                             message_responsesender({action:'launch_now',object:timer_overwrite[curr_domain]}).then((response)=> 
                             {chrome.tabs.reload(tabId,{bypassCache:false});
                              chrome.windows.create({
                                 url: 'timers.html',
                                 type: 'popup',
                                 width: 100,
                                 height: 100,
                                 left: 950, // Adjust the position to the bottom right
                                 top: 520,
    
                                 tabId:tabId
                               },()=>{
                                running_url.push(curr_domain);
                               }
                               )})
                              })
                     
                     }
                   }
                  // })
              
        }     })
        }
  } 
    
    // const MonitoredURL = monitoredURL;
  

  );
     
  
    
let currenttabId;

chrome.tabs.onActivated.addListener((activeInfo)=>{
    
    currenttabId=activeInfo.tabId;
    console.log(currenttabId);
    // console.log(activeTabId);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
           activeTabId = tabs[0].id;
        console.log("Active tab ID:", activeTabId);
      
    // console.log(activeTabId);
    if(activeTabId===currenttabId)
    {
      chrome.tabs.reload(currenttabId,{bypassCache:true});
      chrome.tabs.get(currenttabId,(currentTab)=>{
        let currentdomain=new URL(currentTab.url).hostname;
        console.log(currentdomain);
      for (let i=0;i<urls.length;i++){
    if (currentdomain.includes(urls[i])) {
                  releurl=urls[i]
                  console.log('yeahhh')
                  console.log('were here');
                  if (visitedDomain.includes(releurl)){
                    if (running_url.length>0){x 
                      if(running_url[0]===releurl){
                        chrome.runtime.sendMessage(
                          {action:'store_current_timer'},(response)=>{
  
                      if(response.action==='returned_timer'){
                          let new_timer=response.object;
                          timer_overwrite[releurl]=new_timer;
                          chrome.storage.local.set({overwritten:timer_overwrite,running:running_url},()=>{
                  // let popupURL=`timers.html`;
                  
                  message_responsesender({action:'launch_now',object:timer_overwrite[releurl]}).then((response)=> 
                   {  console.log('checking');
                    // chrome.tabs.reload(tabId,{bypassCache:false});;
                    chrome.windows.create({
                       url: 'timers.html',
                       type: 'popup',
                       width: 100,
                       height: 100,
                       left: 950, // Adjust the position to the bottom right
                       top: 520,

                       tabId:tabId
                     })})
                })
                  }})
                
                      }
                      else{
                         running_timer=timer_overwrite[running_url[0]];
        chrome.runtime.sendMessage({action:'pausetimer'},(response)=>{
        let pausedtimer=response.object;
        running_timer=pausedtimer;
        chrome.storage.local.set({overwritten:timer_overwrite})})
      running_url=[];
      chrome.storage.local.set({visitedDomain:visitedDomain},()=>{
        message_responsesender({action:'launch_now',object:timer_overwrite[releurl]}).then((response)=> 
        {
          // chrome.tabs.reload(tabId,{bypassCache:false});
          console.log('checking');
         chrome.windows.create({
            url: 'timers.html',
            type: 'popup',
            width: 100,
            height: 100,
            left: 950, // Adjust the position to the bottom right
            top: 520,

            tabId:tabId
          },()=>{
            console.log('checking');
      running_url.push(releurl);
      chrome.storage.local.set({running:running_url});
          }
          )})
    }
      )
    
                      }
                    }else{
      
      
      message_responsesender({action:'launch_now',object:timer_overwrite[releurl]}).then((response)=> 
        {console.log('checking');
          // chrome.tabs.reload(tabId,{bypassCache:false});
         chrome.windows.create({
            url: 'timers.html',
            type: 'popup',
            width: 100,
            height: 100,
            left: 950, // Adjust the position to the bottom right
            top: 520,

            tabId:tabId
          },
          ()=>{console.log('checking');
         running_url.push(releurl);  
         chrome.storage.local.set({running:running_url}); 
          })
        })
                    }
                
    }  else
    {if(running_url.length>0)
      
      {running_timer=timer_overwrite[running_url[0]];
      
        chrome.runtime.sendMessage({action:'pausetimer'},(response)=>{
        let pausedtimer=response.object;
        timer_overwrite[running_url[0]]=pausedtimer;
        chrome.storage.local.set({overwritten:timer_overwrite})})          
      addToArrayIfNotExists(visitedDomain,currentdomain);
      running_url=[]
      
      message_responsesender({action:'launch_now',
      object:timer_overwrite[releurl]}).then((response)=> 
        {console.log('checking');
          // chrome.tabs.reload(tabId,{bypassCache:false});
         chrome.windows.create({
            url: 'timers.html',
            type: 'popup',
            width: 100,
            height: 100,
            left: 950, // Adjust the position to the bottom right
            top: 520,

            tabId:tabId
          },
          ()=>{console.log('checking');
          running_url.push(releurl);
      chrome.storage.local.set({running:running_url,visitedDomain:visitedDomain});
  
          })}) 
        
    }else{
      addToArrayIfNotExists(visitedDomain,currentdomain)
      chrome.storage.local.set({visitedDomain:visitedDomain});

      message_responsesender({action:'launch_now',
      object:timer_overwrite[releurl]}).then((response)=> 
        {console.log('checking');
          // chrome.tabs.reload(tabId,{bypassCache:false});
         chrome.windows.create({
            url: 'timers.html',
            type: 'popup',
            width: 100,
            height: 100,
            left: 950, // Adjust the position to the bottom right
            top: 520,

            tabId:tabId
          },
          ()=>{console.log('checking');
            running_url.push(releurl);
            chrome.storage.local.set({running:running_url})
          })})
      }}
}
      
else{
    if (running_url.length>0){
      console.log('oh')
      console.log(running_url);
      
      running_timer=timer_overwrite[running_url[0]];
      
      chrome.runtime.sendMessage({action:'pausetimer'},(response)=>{
        let pausedtimer=response.object;
        timer_overwrite[running_url[0]]=pausedtimer;
        chrome.storage.local.set({overwritten:timer_overwrite})
      });
    

    } 
} 
      }  }
)
    } 
  }
})
  } 
  )
  
chrome.runtime.onMessage.addListener((message,sendResponse)=>{
  if (message.action==='live_timer' && running_url.length===1)
  {
    timer_overwrite[running_url[0]]=message.object;
    chrome.storage.local.set({overwritten:timer_overwrite});
  }
})
   
chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab)=>{
        if (changeInfo.url ){
            const taburl=tab.url;
            let currentdomain=new URL(taburl).hostname;
            console.log(currentdomain);
            console.log(tabId);
            console.log(taburl);
            chrome.tabs.query({active:true, currentWindow:true},(tabs)=>{
               activeTaburl=new URL(tabs[0].url).hostname

              
            })
        //  chrome.storage.local.get(['urls',
        //  'visitedDomain','overwritten','running'],(result)=> {
        //      urls=result.urls;
        //     let visited=result.visitedDomain;
        //      timer_overwrite=result.overwritten;
        //     running_url=result.running;
            if (urls.length>0){
              console.log('lets go')
              console.log(urls)
            for (let i=0;i<urls.length;i++)
            {
              if (currentdomain.includes(urls[i])){
              console.log(urls[i]);
              releurl=urls[i];
              console.log(visitedDomain);
              console.log(running_url);
              if(visitedDomain.includes(releurl)){
                if(running_url.length>0){
                  if(currentdomain.includes(running_url[0])){
                    chrome.runtime.sendMessage(
                      {action:'store_current_timer'},(response)=>{

                  
                      let new_timer=response.object;
                      timer_overwrite[releurl]=new_timer;
                      chrome.storage.local.set({overwritten:timer_overwrite,running:running_url},
                        ()=>{

                          message_responsesender({action:'launch_now',object:new_timer}).then((response)=> 
                          {console.log('checking');
                            // chrome.tabs.reload(tabId,{bypassCache:false});
                           chrome.windows.create({
                              url: 'timers.html',
                              type: 'popup',
                              width: 100,
                              height: 100,
                              left: 950, // Adjust the position to the bottom right
                              top: 520,
            
                              tabId:tabId
                            })})

                      })
              
            
          })
          
                  }
                  else{

                     running_timer=timer_overwrite[running_url[0]];
          chrome.runtime.sendMessage({action:'pausetimer',
          object:running_timer},(response)=>{
            let pausedtimer=response.object;
            running_timer=pausedtimer;
            chrome.storage.local.set({overwritten:timer_overwrite})})
          running_url=[];

          chrome.storage.local.set({visitedDomain:visitedDomain},
            ()=>{

              message_responsesender({action:'launch_now',object:timer_overwrite[releurl]}).then((response)=> 
              {console.log('checking');
                // chrome.tabs.reload(tabId,{bypassCache:false});
               chrome.windows.create({
                  url: 'timers.html',
                  type: 'popup',
                  width: 100,
                  height: 100,
                  left: 950, // Adjust the position to the bottom right
                  top: 520,

                  tabId:tabId
                },
                ()=>{console.log('checking');
                  
          running_url.push(releurl);
          chrome.storage.local.set({running:running_url});
                })})
        }
          )

                  }
                }else{
                    message_responsesender({action:'launch_now',object:timer_overwrite[releurl]}).then((response)=> 
                    {console.log('checking');
                      // chrome.tabs.reload(tabId,{bypassCache:false});
                     chrome.windows.create({
                        url: 'timers.html',
                        type: 'popup',
                        width: 100,
                        height: 100,
                        left: 950, // Adjust the position to the bottom right
                        top: 520,
      
                        tabId:tabId
                      },
                      ()=>{
                        console.log('checking');
                  running_url.push(releurl);
                  chrome.storage.local.set({running:running_url})
                      })}) 
                


                }
              }
              else{
                if(running_url.length>0)
                  {running_timer=timer_overwrite[running_url[0]];
                    console.log(timer_overwrite);
                    console.log(timer_overwrite[releurl]);
                    chrome.runtime.sendMessage({action:'pausetimer'},(response)=>{
                      let pausedtimer=response.object;
                      running_timer=pausedtimer;
                      // running_url=[];
                      chrome.storage.local.set({overwritten:timer_overwrite});
                    })
                  running_url=[]
          
                    message_responsesender({action:'launch_now',object:timer_overwrite[releurl]}).then((response)=> 
              {console.log('checking');
                // chrome.tabs.reload(tabId,{bypassCache:false});
               chrome.windows.create({
                  url: 'timers.html',
                  type: 'popup',
                  width: 100,
                  height: 100,
                  left: 950, // Adjust the position to the bottom right
                  top: 520,

                  tabId:tabId
                },
                ()=>{console.log('checking');
                  running_url.push(releurl);
                  chrome.storage.local.set({running:running_url});
                })
              })
                }
                else{
                  addToArrayIfNotExists(visitedDomain,currentdomain);
          console.log(timer_overwrite[releurl]);
          console.log(visitedDomain);
          chrome.storage.local.set({visitedDomain:visitedDomain},()=>{

          message_responsesender({action:'launch_now',object:timer_overwrite[releurl]}).then((response)=> 
              {console.log('checking');
                // chrome.tabs.reload(tabId,{bypassCache:false});
               chrome.windows.create({
                  url: 'timers.html',
                  type: 'popup',
                  width: 100,
                  height: 100,
                  left: 950, // Adjust the position to the bottom right
                  top: 520,

                  tabId:tabId
                },
                ()=>{console.log('checking');
                  running_url.push(releurl);
                  chrome.storage.local.set({running:running_url})
                })})
          
              }
                )}
                  
              }}
              else {
                console.log(currentdomain);
                // console.log(releurl);
                console.log(running_url);
                if (running_url.length>0 && currentdomain===activeTaburl){
                running_timer=timer_overwrite[running_url[0]];

                  chrome.runtime.sendMessage({action:'pausetimer'},(response)=>{
                 let receipt=response.object;
                  timer_overwrite[running_url[0]]=receipt;
                  running_url=[];
                  chrome.storage.local.set({running:running_url,overwritten:timer_overwrite})
                  
                })
              
      
              }
            }
            }}
          }}
          )
              
            
        
 
      
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