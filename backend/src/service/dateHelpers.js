import { format,subDays,startOfWeek,endOfWeek,eachDayOfInterval,differenceInCalendarDays,parseISO  } from "date-fns";

export const toDateKey=(date)=>format(date, 'yyyy-MM-dd');
export const todayKey=()=>toDateKey(new Date())

export const last90Days=()=>{
const end=new Date();
const start =subDays(end ,89);
return eachDayOfInterval({start,end}).map(toDateKey)
}

export const currentWeekKeys=()=>{
    const now=new Date();
    const start=startOfWeek(now,{weekStartsOn:0});
    const end=endOfWeek(now,{weekStartsOn:0})
    return eachDayOfInterval({start,end}).map(toDateKey);
}
export const lastNdays=(n)=>{
    const end=new Date()
    const start=subDays(end,n-1);
    return eachDayOfInterval({start,end}).map(toDateKey);
}
export const calculateStreak=(sortedDateKeys)=>{
    if(!sortedDateKeys.length) 
        return{current:0,longest:0}
    const set=new Set(sortedDateKeys)
    const today=todayKey();
    const yesterday=toDateKey(subDays(new Date(),1))

    let current=0;
    let cursor = parseISO(todayKey())
    if(!set.has(today)&& !set.has(yesterday)){
        current=0;
        cursor=new Date()
    }else{
        if(!set.has(today))
            cursor=subDays(cursor,1);
        while(set.has(toDateKey(cursor))){
            current+=1;
            cursor=subDays(cursor,1)
        }
    }


const sortedAsc=[...sortedDateKeys].sort();
let longest=0;
let run=0;
let prev=null;
for(const key of sortedAsc){
    if(prev){
        const diff = differenceInCalendarDays(parseISO(key), parseISO(prev))
        if(diff===1) run+=1;
        else run=1;
    }else{
        run=1
    }
    if(run>longest)
        longest=run
    prev=key;
}
return {current,longest}
}