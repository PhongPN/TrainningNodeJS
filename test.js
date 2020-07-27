// Reverse this string "lairotuT SJedoN"
var reverseString = str =>{
    return str.split("").reverse().join("")
};
reverseString("lairotuT SJedoN")

//Change array
let actor = [
    { firstName: "Robert", lastName: "Downey .JR" },
    {firstName: "Json", lastName: "Statham" }
]
let  [a,b] = actor;

let actorFullName = [
    {fullname: a.firstName + a.lastName},
    {fullname: b.firstName + b.lastName}
]
let [rd,js] = actorFullName;

console.log ("Name:" + rd.fullname);
console.log ("Name:" + js.fullname);

//count number
console.log (actorFullName.length);

//Sum number
var constNumbers = [1,2,3,4,5]
var sum = 0
for(let i=0; i<constNumbers.length;i++){
    sum += constNumbers[i];
}
console.log (sum);
