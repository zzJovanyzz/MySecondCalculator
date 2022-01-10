/*Created By: Jovany Araujo
  Date: January 08, 2022
*/
  
/*
          The following functions each perform a specific math operation 
          on a pair of numbers 
  
          Will return a number
  
          Numbers can be in string form i.e '4' or 4
        */

function myAdd(num1, num2) {
  let answer = parseFloat(num1) + parseFloat(num2);

  if (answer.toString().length < 11) {
    return answer;
  } else {
    return answer.toString().substring(0, 10);
  }
}

function mySubtract(num1, num2) {
  let answer = parseFloat(num1) - parseFloat(num2);

  if (answer.toString().length < 11) {
    return answer;
  } else {
    return answer.toString().substring(0, 10);
  }
}

function myMultiply(num1, num2) {
  let answer = parseFloat(num1) * parseFloat(num2);

  if (answer.toString().length < 11) {
    return answer;
  } else {
    return answer.toString().substring(0, 10);
  }
}

function myDivide(num1, num2) {
  let answer = parseFloat(num1) / parseFloat(num2);

  if (answer.toString().length < 11) {
    return answer;
  } else {
    return answer.toString().substring(0, 10);
  }
}

// End math operation functions

/*
          operate() takes two numbers and one operator 
          it calls one of the previous math operation functions based
          on which operator it was given
  
          it will return the value returned from the math operation function
          that has been called
  
          return value will be a number data type
  
  
          all arguments can be in string form
  
          i.e.  
              operate('2', '2', '+')
          ||
          \/
              myAdd('2', '2')
          ||
          \/
              4
        */

function operate(num1, num2, myOperator) {
  if (myOperator == "+") {
    return myAdd(num1, num2);
  } else if (myOperator == "-") {
    return mySubtract(num1, num2);
  } else if (myOperator == "*") {
    return myMultiply(num1, num2);
  } else if (myOperator == "/") {
    return myDivide(num1, num2);
  }
}

// End operate()

/*
          myEval() evaluates an arithmetic expression 
          from a string 
          Makes a call to previous operate() function
        */

function myEval(expressionToEval) {
  let thisArr = expressionToEval.split(" ");
  let nums = [];
  let ops = [];

  for (let i = 0; i < thisArr.length; i++) {
    if (isNaN(thisArr[i])) {
      ops.push(thisArr[i]);
    } else {
      nums.push(thisArr[i]);
    }
  }

  for (let i = 0; i < ops.length; i++) {
    nums.push(ops[i]);
  }
  console.log(`Final nums Array ${nums}`)
  return operate(nums[0], nums[1], nums[2]);
}

//  End myEval()

/*
          validExpression() checks if an arithmetic expresion from a string 
          is 'valid' meaning it is in the correct format for myEval() to 
          evaluate i.e.  '2 + 2' must return true 
  
  
          Will return false for expressions where there are an incorrect 
          amount of numbers or operators and for expressions where numbers 
          or operators are in incorrect positions
        */

function validExpression(stringExpression) {
  let stringToArr = stringExpression.split(" ");

  if (stringToArr[1] == "/" && stringToArr[2] == "0") {
    document.getElementById("calcDisplay").innerText = "Ha! Nice Try.";
    return false;
  }

  if (stringToArr.length == 3) {
    if (!isNaN(stringToArr[0]) && stringToArr[0] != "") {
      if (isNaN(stringToArr[1])) {
        if (!isNaN(stringToArr[2]) && stringToArr[2] != "") {
          return true;
        }
      }
    }
  }

  return false;
}

// End validExpression()

/* 
          myClear() will clear text in the display of the calculator
          as well as all variables by refreshing the page
          
        */

function myClear() {
  location.reload();
}

// End myClear()

/*
  myDelete() will delete the last character in the currentInput field
*/

function myDelete() {
  
  let currentExpression = document.getElementById("currentInput").innerText.split(" ");
  console.log(currentExpression)
  let lastIndex = currentExpression.length - 1

  if (isNaN(currentExpression[lastIndex])){
    document.getElementById("currentInput").innerText = currentExpression.slice(0, lastIndex ).join(" ") ;
  } else {
    let latestEle = currentExpression[lastIndex] ;
    let trimmedEle = latestEle.substring(0, latestEle.length - 1);
    let trimmedCurrentInput = [];

    for (let i = 0; i < currentExpression.length - 1; i++){
      trimmedCurrentInput.push(currentExpression[i]);
    }
    
    trimmedCurrentInput.push(trimmedEle)
    document.getElementById("currentInput").innerText = trimmedCurrentInput.join(" ")
       
  }
 

}

// End myDelete()

/*
  When called placePeriod() will check if the latest element of the expression 
  in the currentInput field has a '.' decimal, if it doesnt it will insert a '.'
  'beforeend' in the currentInput
  if the currentInput field already includes a '.' then the function will return
*/

function placePeriod() {

  let expresionArr = document.getElementById("currentInput").innerText.split(" ");

  if (expresionArr[expresionArr.length - 1].includes(".")){
    return;
  } else {
    document.getElementById("currentInput").insertAdjacentText("beforeend", ".");
  }

}

// End placePeriod()

/*
          numberClick() adds the innerText of the element that called it
          to the display of the calculator ('beforeend')
  
        */

function numberClick(ele) {
  let numberValue = ele.innerText;
  if (document.getElementById("currentInput").innerText.length < 10) {
    document
      .getElementById("currentInput")
      .insertAdjacentText("beforeend", numberValue);
  }
}

// End numberClick


/*
  When called operatorClick() will check if there is already a 'valid' expression
  on the display of the calculator. If there is a valid expression then place that
  expression inside of a variable myValidExpression, then call myEval() on myValidExpression
  and place the return value inside of a different variable myExpressionAnswer 

*/



function operatorClick(ele) {
  if (validExpression(document.getElementById("currentInput").innerText)) {
    document.getElementById("lastExpression").innerText = document.getElementById("currentInput").innerText;
    document.getElementById("currentInput").innerText = myEval(
      document.getElementById("currentInput").innerText
    );
    document
      .getElementById("currentInput")
      .insertAdjacentText("beforeend", ` ${ele.innerText} `);
  } else {
    document
      .getElementById("currentInput")
      .insertAdjacentText("beforeend", ` ${ele.innerText} `);
  }
}

// End operatorClick()

/*
  when called equalsClick() will check if there is a 'valid' expression 
  in the display of the calculator, if there is it will evaluate the 
  expression and replace the text inside of the calculator display with
  the answer of the evaluated expression


*/

function equalsClick() {
  if (validExpression(document.getElementById("currentInput").innerText)) {
    document.getElementById("lastExpression").innerText = document.getElementById("currentInput").innerText;
    document.getElementById("currentInput").innerText = myEval(
      document.getElementById("currentInput").innerText
    );
  }
}

// End equalsClick()

function pressOne() {
  document.getElementById("button1").click();
}
