var Car = require('./car.js');

/**
 * @description a base class for Parking lot
 * @author Vinit Shahdeo <vinitshahdeo@gmail.com>
 */
class ParkingLot {

	constructor () {
        this.MAX_PARKING_SLOTS = 0; // maximum parking slots allowed
        this.parkingSlots = new Array(); // array for parking slots
    }

	/**
	 *
	 * @param {String} input user's input via terminal
	 * @description creates a parking lot with given maximum slot numbers.
	 * It throws an error if zero or negative input is provided
	 */
	createParkingLot (input) {
		this.MAX_PARKING_SLOTS = parseInt(input.split(' ')[1]);
		if (this.MAX_PARKING_SLOTS <= 0) {
			// minimum: 1 slot
			throw new Error('Minimum one slot is required to create parking slot');
		}
        for (var i = 0; i < this.MAX_PARKING_SLOTS; i++) {
            this.parkingSlots.push(null);
        }
        return this.MAX_PARKING_SLOTS;
	}

	/**
	 *
	 * @param {String} input user's input via terminal
	 * @description allocates nearest slot number to incoming cars.
	 * It throws an error if parking lot is empty or full.
	 * It also throws an error if only one field (either registration number or color) is provided.
	 */
    parkCar (input) {
        var len = this.parkingSlots.length;
    	if (this.MAX_PARKING_SLOTS > 0) {
			var car, carNumber, carColor;
	    	if (this.findNearestAvailableSlot(this.parkingSlots) == true) {
		  		for (var i = 0; i < len; i++) {
		  			if (this.parkingSlots[i] == null) {
						carNumber = input.split(' ')[1];
						carColor = input.split(' ')[2];
						if (carNumber && carColor) {
							car = new Car(carNumber, carColor);
							this.parkingSlots[i] = car;
							i = i + 1;
							return i;
						}
						else {
							throw new Error('Please provide registration number and color both');
						}
		  			}
		  		}
			  }
			else {
		  		throw new Error('Sorry, parking lot is full');
		  	}
          }
          else {
	  		throw new Error('Minimum one slot is required to create parking slot');
	  	}
	}

	/**
	 *
	 * @param {String} input user's input via terminal
	 * @description makes slot free for given slot number.
	 * It throws an error if parking lot is empty or
	 * slot number is not found
	 */
    leaveCar (input) {
    	if (this.MAX_PARKING_SLOTS > 0) {
			var index = parseInt(input.split(' ')[1] - 1);
			if (index >= this.MAX_PARKING_SLOTS) {
				throw new Error(`Slot number ${index + 1} is not found`);
			}
			else if (this.parkingSlots[index] === null) {
				throw new Error(`Slot number ${index + 1} is already free`);
			}
		    else if (index > -1 && index <= this.parkingSlots.length) {
			    this.parkingSlots[index] = null;
			    index = index + 1;
			    return index;
			}
		}
		else {
			throw new Error('Sorry, parking lot is empty');
		}
	}

	/**
	 *
	 * @param {String} input user's input via terminal
	 * @description it makes the slot free for the car of given registration number.
	 * It throws an error if car is not found.
	 */
	leaveCarByCarNumber (input) {
		if (this.MAX_PARKING_SLOTS > 0) {
			var carNumber = input.split(' ')[1];
		    for (var index = 0; index < this.MAX_PARKING_SLOTS; index++) {
				if (this.parkingSlots[index].NUMBER === carNumber) {
					this.parkingSlots[index] = null;
					return index + 1;
				}
			}
		}
		else {
			throw new Error('Sorry, car with given registration is not found');
		}
	}

	/**
	 * @description Returns an array containing parking details i.e. slot no, registration number and color
	 */
    getParkingStatus () {
    	var arr = new Array();
    	if (this.MAX_PARKING_SLOTS > 0) {
			arr.push('Slot No. Registration No. Color ');

			// use binary search here
        	for (var i = 0; i < this.parkingSlots.length; i++) {
        		if (this.parkingSlots[i] != null) {
        			var e = i + 1;
        			arr.push(e + '.  ' + this.parkingSlots[i].NUMBER + '  ' + this.parkingSlots[i].COLOR);
        		}
        	}
        	return arr;
		}
		else {
			throw new Error('Sorry, parking lot is empty');
		}
	}

	/**
	 *
	 * @param {String} input user's input via terminal
	 * @description returns a comma separated string of registration numbers of car having same color.
	 * It returns null if car is not found
	 */
    getCarsWithSameColor (input) {
    	if (this.MAX_PARKING_SLOTS > 0) {
	        var sameColoredCarsArray = new Array();
	        for (var i = 0; i < this.parkingSlots.length; i++) {
	        	if (this.parkingSlots[i] && this.parkingSlots[i].COLOR.toLowerCase() == input.split(' ')[1].toLowerCase()) {
	        		sameColoredCarsArray.push(this.parkingSlots[i].NUMBER);
	        	}
	        }
    		return sameColoredCarsArray.join(', ');
		}
		else {
			return null;
		}
	}

	/**
	 *
	 * @param {String} input user's input via terminal
	 * @description returns a comma separated string of slot numbers for cars of given color.
	 * It returns null if cars of given color is not found.
	 */
    getSlotsWithSameColorCar (input) {
    	if (this.MAX_PARKING_SLOTS > 0) {
	    	var slotsWithSameColorCarArray = new Array();
	        for (var i = 0; i < this.parkingSlots.length; i++) {
	        	if (this.parkingSlots[i] && this.parkingSlots[i].COLOR.toLowerCase() == input.split(' ')[1].toLowerCase()) {
	        		slotsWithSameColorCarArray.push(i + 1);
	        	}
	        }
        	return slotsWithSameColorCarArray.join(', ');
        }
        else {
			return null;
		}
	}

	/**
	 *
	 * @param {String} input user's input via terminal
	 * @description returns slot number for given car number.
	 * It returns null if car is not found.
	 */
    getSlotByCarNumber (input) {
		// TODO:  What parking lot is empty
		if (this.MAX_PARKING_SLOTS > 0) {
	    	var ele = 'Not found';
	        for (var i = 0; i < this.parkingSlots.length; i++) {
	        	if (this.parkingSlots[i] && this.parkingSlots[i].NUMBER == input.split(' ')[1]) {
	        		ele = i + 1;
	        	}
	        }
        	return ele;
        }
        else {
			return null;
		}
	}

	/**
	 * @description returns a comma separated string of free parking slots.
	 * It returns `null` if parking lot is not created
	 */
	findAllAvailableSlots () {
		if (this.MAX_PARKING_SLOTS > 0) {
	    	var availableSlots = new Array();
	        for (var i = 0; i < this.parkingSlots.length; i++) {
	        	if (!(this.parkingSlots[i] && this.parkingSlots[i].COLOR && this.parkingSlots[i].NUMBER)) {
	        		availableSlots.push(i + 1);
	        	}
	        }
        	return availableSlots.join(', ');
        }
        else {
			return null;
		}
	}

	/**
	 * @description returns a comma separated string of allocated parking slots.
	 * It returns `null` if parking lot is not created.
	 */
	findAllAllocatedSlots () {
		if (this.MAX_PARKING_SLOTS > 0) {
	    	var allocatedSlots = new Array();
	        for (var i = 0; i < this.parkingSlots.length; i++) {
	        	if (this.parkingSlots[i] && this.parkingSlots[i].COLOR && this.parkingSlots[i].NUMBER) {
	        		allocatedSlots.push(i + 1);
	        	}
	        }
        	return allocatedSlots.join(', ');
        }
        else {
			return null;
		}
	}

	/**
	 * @description returns the nearest available slot
	 * used by parkCar() method to find nearest slot
	 */
	findNearestAvailableSlot () {
		var ele = false;
		for (var i = 0; i < this.parkingSlots.length; i++) {
			if (this.parkingSlots[i] == null) {
				ele = true;
			}
		}
		return ele;
	}
}

module.exports = ParkingLot;
