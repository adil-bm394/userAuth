let str="adil"

let arr=str.split('');
//console.log(arr);

let i=0,j=arr.length-1;
while(i<j){
    let temp;
    temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;

    i++,j--;
}
console.log(arr.join("")); 