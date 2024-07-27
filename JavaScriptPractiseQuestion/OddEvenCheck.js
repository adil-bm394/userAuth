function checkOddEven(n){
    if(n&1){
        return "Number is odd";
    }
    else{
        return "Number is Even";
    }

}

let res=checkOddEven(8);
console.log(res);