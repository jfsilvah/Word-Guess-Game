var randomNumber = Math.trunc(Math.random()*1000);
console.log(randomNumber);
var yourNumber = -1;

while(yourNumber != randomNumber){
    yourNumber = prompt("Guess the number");
    if (yourNumber>randomNumber){
        alert("Your number is higher");
    }
    else if (yourNumber<randomNumber){
        alert("Your number is lower");
    }
    else{
        alert("You guessed the number !!!")
    }
}
/*var age =prompt("What is your age?");
var actualDate = new Date();
var actualYear = actualDate.getFullYear();
var actualDay = String(actualDate.getDate()).padStart(2, '0');
var actualMonth = String(actualDate.getMonth() + 1).padStart(2, '0');
var oldDate = new Date((actualYear-age)+"-"+actualMonth+"-"+actualDay+"T00:00:00Z");
actualDate.get
console.log("Your old date is: "+oldDate);
console.log((Math.round(((actualDate-oldDate)/(1000*60*60*24))*100)/100));*/