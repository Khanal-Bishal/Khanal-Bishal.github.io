import { ALPHA_NUM } from "./constants";

export function getRandomId(idLength:number)
 {
     let randomId=''
     let randomIndex
     for (let i=0;i<idLength;i++)
     {
        randomIndex =Math.floor(Math.random()*ALPHA_NUM.length)
        randomId += ALPHA_NUM.charAt(randomIndex)
    }
    return randomId
 }

