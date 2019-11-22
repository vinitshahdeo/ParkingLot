#!/usr/bin/env node
const fs = require('fs'),
    chalk = require('chalk'),
	readLine = require('readline');

var	commandLineInputs = process.argv, // processing command line inputs
    interactiveMode = false;

/**
 * @description importing the parkingLot class
 */
var Parking = require('./modules/parkingLot.js'),
	parkingLot = new Parking();

// to avoid memory leaks errors, default max listeners = 10
require('events').EventEmitter.defaultMaxListeners = 0;

if (commandLineInputs[commandLineInputs.length - 1].endsWith('.txt')) {
    interactiveMode = false;
    fs.readFile(commandLineInputs[2], 'utf-8', function (err, data) {
        if (err) {
            console.log('Error in reading file');
        }
        var arr = data.split('\n');
		for (var i = 0; i < arr.length; i++) {
			processUserCommands(arr[i]);
        }

        // returning to console once all the inputs are processed
        process.exit(1);
    });
}
else {
    interactiveMode = true;
    openInteractiveConsole();
}

/**
 * @description called when users want to interact via console
 * it process one command at a time
 */
function openInteractiveConsole () {

    var prompts = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    // option for user to enter commands
    if (interactiveMode) {
        prompts.question('Input: ', function (data) {
            processUserCommands(data);
        });
    }
}

/**
 *
 * @param {String} input entered via console
 * @description driver function for different commands for entered by users
 * calls respective functions of ParkingLot class based on commands
 */
function processUserCommands (input) {
	var userCommand = input.split(' ')[0],
		totalParkingSlots,
		parkingSlotNumber,
		parkingSlotNumbers;
    switch (userCommand) {
        case 'create_parking_lot':
            try {
                totalParkingSlots = parkingLot.createParkingLot(input);
                console.log(chalk.yellow.bold('Created a parking lot with ' + totalParkingSlots + ' slots.'));
            }
            catch (err) {
                console.log(chalk.red.bold(err.message));
            }

            break;
        case 'park':
            try {
                parkingSlotNumber = parkingLot.parkCar(input);
                console.log(chalk.green('Allocated slot number: ' + parkingSlotNumber));
            }
            catch (err) {
                console.log(chalk.red.bold(err.message));
            }
            break;
        case 'leave':
            try {
                parkingSlotNumber = parkingLot.leaveCar(input);
                console.log(chalk.blue('Slot number ' + parkingSlotNumber + ' is free.'));
            }
            catch (err) {
                console.log(chalk.red(err.message)); // handling exceptions
            }
            break;
        case 'status':
            try {
                var parkingSlotStatus = parkingLot.getParkingStatus();
                if (parkingSlotStatus.length > 1) {
                    console.log(parkingSlotStatus.join('\n'));
                }
                else {
                    console.log(chalk.yellow('Sorry, parking lot is empty')); // what if it's empty
                }
            }
            catch (err) {
                console.log(chalk.red.bold(err.message));
            }
            break;
        case 'registration_numbers_for_cars_with_colour':
            var registrationNumbers = parkingLot.getCarsWithSameColor(input);
            if (registrationNumbers) {
                console.log(registrationNumbers);
			}
			else {
                console.log(chalk.red('Sorry, Car with given color is not found'));
            }
            break;
        case 'slot_numbers_for_cars_with_colour':
            parkingSlotNumbers = parkingLot.getSlotsWithSameColorCar(input);
            if (parkingSlotNumbers) {
                console.log(parkingSlotNumbers);
            }
            else {
                console.log(chalk.red.bold('Sorry, Car with given color is not found'));
            }
            break;
        case 'slot_number_for_registration_number':
            parkingSlotNumber = parkingLot.getSlotByCarNumber(input);
            if (parkingSlotNumber) {
                console.log(parkingSlotNumber);
			}
			else {
                console.log(chalk.red.bold('Sorry, Car with given registration number is not found'));
            }
            break;
        case 'leave_car_by_registration_number':
            try {
                parkingSlotNumber = parkingLot.leaveCarByCarNumber(input);
                console.log(chalk.blue('Slot number ' + parkingSlotNumber + ' is free.'));
            }
            catch (err) {
                console.log(chalk.red('Sorry, car with given registration is not found'));
            }
            break;
        case 'available_slot_numbers':
            var availableSlotNumbers = parkingLot.findAllAvailableSlots(input);
            if (availableSlotNumbers) {
                console.log(availableSlotNumbers);
			}
			else {
                console.log(chalk.red.bold('Sorry, Parking Lot is not created'));
            }
            break;
        case 'allocated_slot_numbers':
            var allocatedSlotNumbers = parkingLot.findAllAllocatedSlots(input);
            if (allocatedSlotNumbers) {
                console.log(allocatedSlotNumbers);
			}
			else {
                console.log(chalk.red.bold('Sorry, Parking Lot is not created'));
            }
            break;
        case 'exit':
			process.exit(0);
			break;
        default:
            console.log(chalk.red.bold(input, 'is an invalid command'));
            break;
    }
    openInteractiveConsole();
}
