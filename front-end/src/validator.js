const checkNumber = (x) => {

    for(let i=0; i<x.length; i++){
        if(parseInt(x[i])){ // returns true if number
            return true;
        }
    }
    return false;
}

const checkUpper = (x) => {

    for(let i=0; i<x.length; i++){
        if(x[i] === x[i].toUpperCase() && !checkNumber(x[i])){
            return true; // returns true at instance of uppercase letter
        }
    }
    return false;
}

const checkLower = (x) => {
    for(let i=0; i<x.length; i++){
        if(x[i] === x[i].toLowerCase() && !checkNumber(x[i])){
            return true; // returns true at instance of lowercase letter
        }
    }
    return false;
}

export const validatePassword = (x) => {


    if(x.length < 8){ // early return if less than 8 characters
        // console.log("Passwords too short!");
        return false;
    }

    if(!checkUpper(x)){ // early return if no uppercase letter
        // console.log("Password does not contain uppercase letter!");
        return false;
    }

    if(!checkLower(x)){ // early return if no lowercase letter
        // console.log("Password does not contain uppercase letter!");
        return false;
    }

    if(!checkNumber(x)){ // early return if no number
        // console.log("Password does not contain a number!");
        return false;
    }

    // console.log("The passwords are the same!");
    return true;
}
