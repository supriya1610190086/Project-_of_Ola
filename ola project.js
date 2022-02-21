console.log("WELCOME TO REACH TO DESTINATION")
const input = require('readline-sync');
const fs = require('fs');

function OTP() {
    var otp = Math.floor(1000 + Math.random() * 9000)
    return otp
}

function kilometer() {
    var distance = Math.floor((Math.random() * 400) + 1)
    return distance
}

function timeToReach() {
    var time = Math.floor((Math.random() * 12) - 1)
    return time
}
var current_Location = input.question("Enter your current Location:-")
var droping_Point = input.question("Enter your droping point:-")

function showDrivers() {
    var read_json_file = fs.readFileSync("dirverData.json")
    var makeObject = JSON.parse(read_json_file)
        // for (var data in makeObject["driverData"]){
        //     console.log(makeObject["driverData"][data])
        // }
    var arry = ["cab", "taxi", "auto"]
    for (var vehical of arry) {
        console.log(vehical)
    }
    console.log("this is available from", current_Location)
    var choose_vehical = input.question("choose vehical:-")
    serial_number = 1
    for (var data in makeObject["driverData"]) {
        if (makeObject["driverData"][data]["vehical"] === choose_vehical) {
            console.log(serial_number, makeObject["driverData"][data])
            serial_number++
        }
    }
    var choose_driver = input.question("choose driver with whom you want to go:-")
    for (var data in makeObject["driverData"]) {
        if (makeObject["driverData"][data]["driverName"] == choose_driver) {
            price = makeObject["driverData"][data]["price"]
            feedback = makeObject["driverData"][data]["feedback"]
            console.log(makeObject["driverData"][data])
            console.log("THE DISTANCE IS:-", kilometer(), "km.")
            console.log("THE TIME IS:-", timeToReach(), "hour.")
            console.log(`your booking is conform with the driver ${choose_driver} you will get OTP`)
        }
    }

    function reachDestination(sec) {
        return new Promise(resolve => setTimeout(resolve, sec));
    }
    async function demo() {
        setTimeout(() => { console.log("THE OTP:-", OTP()) }, 1000)
        await reachDestination(3000);
        console.log(`YOU REACH TO  ${droping_Point}.`)
        var transection = input.question("How would you like to do payment:-")
        if (transection === "online") {
            console.log("USE GOOGLE PAY OR PHONE PAY", "\n", "YOUR TOTAL AMMOUT:-", price)
            setTimeout(() => { console.log("THANK YOU FOR TRANSCRATION") }, 2000)
            setTimeout(() => {
                var enterFeedback = input.question("Enter your feedback:-")
                feedback.push(enterFeedback)
                fs.writeFileSync("dirverData.json", JSON.stringify(makeObject, null, 4))
            }, 4000)
        } else if (transection === "cash") {
            console.log("YOUR TOTAL AMMOUT", price)
            setTimeout(() => { console.log("THANK YOU FOR PAYMENT.") }, 1000)
            setTimeout(() => {
                var enterFeedback = input.question("Enter your feedback:-")
                feedback.push(enterFeedback)
                fs.writeFileSync("dirverData.json", JSON.stringify(makeObject, null, 4))
            }, 4000)
        } else {
            console.log("Sorry we don't have such type of transection facility.")
        }
        console.log("**HOPE YOU LIKE JOURNEY***");
    }
    demo()
}
showDrivers()