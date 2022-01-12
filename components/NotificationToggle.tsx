import { useEffect, useState } from "react"
var p:Function = (function(title:string,body:string,icon:string,tag:string){throw new Error("Notifications not initialised")})
function setP(fun:Function) {
    p=fun;
}
export function sendNotification(title:string,body:string,icon:string,tag:string) {
    p(title,body,icon,tag)
}
export default function NotificationToggle() {
    const [nE,eN] = useState(false)
    const [init,ini] = useState(false)
    function requestNotifications() {
        Notification.requestPermission().then(function(result) {
            console.log(result);
            if(Notification.permission === 'denied' || Notification.permission === 'default') {
                //alert("Notification access denied")
            } else {
                eN(true)
                setP((title:string,body:string,icon:string,tag:string)=>{
                    if (nE) {
                        new Notification(title,{body:body,icon:icon,tag:tag})
                    } else {
                        throw new Error("Notifications are disabled")
                    }
                })
                ini(true)
                new Notification("Notifications Enabled!")
            }
        });
    }
    useEffect(() => {
        if (!nE&&init) {
            new Notification("Notifications Disabled")
        }
        return () => {
        }
    }, [nE])
    if (init) {
        return (
            <button onClick={()=>{requestNotifications()}}></button>
        )
    } else {
        return (
            <button onClick={()=>{eN(!nE)}}></button>
        )
    }
}