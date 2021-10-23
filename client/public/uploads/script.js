// let object = {
//     who: 'Hello World',
//     greet() {
//         return this.who;
//     },
//     obj2: {
//         farewell: () => {
//             return this.who;
//         }
//     }

// }

// console.log(this);

// console.log(object.greet());
// console.log(object.obj2.farewell());



let obj = {
    fun: () => {
        console.log(this);
    }
}


obj.fun() // this is window

function func() {
    let obj = {
        fun: () => {
            console.log(this); 
        }
    }
    obj.fun()
}

func() //this is window 


let a = new func(); //this time the (((this))) will be the of the function



//write a function for binary search
function bs(arr)
{
    let low = 0;
    let high = arr.length - 1;
    let mid = Math.floor((low + high) / 2);
    while (low <= high) {
        

}

























