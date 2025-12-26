// PWA: Service Worker Registration + update hook
export function initPWA(){
  if(!("serviceWorker" in navigator)) return;
  window.addEventListener("load", async () => {
    try{
      const reg = await navigator.serviceWorker.register("./sw.js");
      // Optional: listen for updates
      reg.addEventListener("updatefound", () => {
        const nw = reg.installing;
        if(!nw) return;
        nw.addEventListener("statechange", () => {
          if(nw.state === "installed" && navigator.serviceWorker.controller){
            console.log("✅ New version installed. Refresh to update.");
          }
        });
      });
    }catch(err){
      console.warn("❌ SW registration failed:", err);
    }
  });
}
