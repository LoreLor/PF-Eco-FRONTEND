export default function SortAndFilter(array,set){
    if(set.filter === "All"){
        if(set.order === "date"){
            return array.sort((a,b)=> Math.abs(new Date(a.date)) - Math.abs(new Date(b.date)))
        }
        if(set.order === "date2"){
            return array.sort((a,b)=> Math.abs(new Date(b.date)) - Math.abs(new Date(a.date)))
        }
    }

    if(set.filter ==="shipped"){
        if(set.order === "date"){
            let temp = array.filter((order)=> order.sendStatus === "shipped")
            return temp.sort((a,b)=> Math.abs(new Date(a.date)) - Math.abs(new Date(b.date)))
        }
        if(set.order === "date2"){
            let temp = array.filter((order)=> order.sendStatus === "shipped")
            return temp.sort((a,b)=> Math.abs(new Date(b.date)) - Math.abs(new Date(a.date)))
        }
    }

    if(set.filter ==="delivered"){
        if(set.order === "date"){
            let temp = array.filter((order)=> order.sendStatus === "delivered")
            return temp.sort((a,b)=> Math.abs(new Date(a.date)) - Math.abs(new Date(b.date)))
        }
        if(set.order === "date2"){
            let temp = array.filter((order)=> order.sendStatus === "delivered")
            return temp.sort((a,b)=> Math.abs(new Date(b.date)) - Math.abs(new Date(a.date)))
        }
    }

    if(set.filter ==="returned"){
        if(set.order === "date"){
            let temp = array.filter((order)=> order.sendStatus === "returned")
            return temp.sort((a,b)=> Math.abs(new Date(a.date)) - Math.abs(new Date(b.date)))
        }
        if(set.order === "date2"){
            let temp = array.filter((order)=> order.sendStatus === "returned")
            return temp.sort((a,b)=> Math.abs(new Date(b.date)) - Math.abs(new Date(a.date)))
        }
    }
}