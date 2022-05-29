export default function numberFormat(number){
const exp = /(\d)(?=(\d{3})+(?!\d))/g;
const rep = '$1,';
let arr = number.toString().split('.');
arr[0] = arr[0].replace(exp,rep);
return arr[1] ? arr.join('.'): arr[0];
}