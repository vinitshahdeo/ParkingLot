const chalk = require('chalk'); // for styling terminal strings

/**
 *
 * @description list of all the user commands supported
 */
const userCommands = [
    {
        type: 'create_parking_lot',
        description: '"create_parking_lot 6" will create a parking lot with 6 slots.'
    },
    {
        type: 'park < REGISTRATION NUMBER > < COLOR >',
        description: '"park KA-01-HH-1234 White" will allocate the nearest slot from entry gate.'
    },
    {
        type: 'leave',
        description: '"leave 4" will make slot number 4 free.'
    },
    {
        type: 'status',
        description: '"status" will display cars and their slot details'
    },
    {
        type: 'registration_numbers_for_cars_with_colour < COLOR >',
        description: '"registration_numbers_for_cars_with_colour White" will display the registration number of the cars of white color e.g. `KA-01-HH-1234, KA-01-BB-0001`'
    },
    {
        type: 'slot_numbers_for_cars_with_colour < COLOR >',
        description: '"slot_numbers_for_cars_with_colour White" will display slot numbers of the cars of white color e.g. `1, 3`'
    },
    {
        type: 'slot_number_for_registration_number < REGISTRATION NUMBER >',
        description: '"slot_number_for_registration_number MH-04-AY-1111" will display the slot number for the car with registration number MH-04-AY-1111.'
    },
    {
        type: 'leave_car_by_registration_number',
        description: '"leave_car_by_registration_number JH-01-LT-0008" will free the slot occupied by car with registration number JH-01-LT-0008.'
    },
    {
        type: 'available_slot_numbers',
        description: '"available_slot_numbers" will display available slot numbers e.g. 2, 6, 8'
    },
    {
        type: 'allocated_slot_numbers',
        description: '"allocated_slot_numbers" will display occupied slot numbers e.g. 1, 3, 4, 5, 7.'
    },
    {
        type: 'exit',
        description: '"exit" will quit the application and return to the console.'
    }
];

console.log(chalk.bold.yellow('The following user commands are supported:\n'));

// logging supported commands for help, triggered via `npm run help`
for (var index = 0; index <= 10; index++) {
    (function (command) {
        // displaying commands in interval of 2 seconds for better readability
        setTimeout(function () {
            console.log(chalk.green.bold(command.type), ':', chalk.bold.bold(command.description), '\n');
        }, index * 2000);
    })(userCommands[index]);
}
