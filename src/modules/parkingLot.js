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
						car = new Car(carNumber, carColor);
						this.parkingSlots[i] = car;
						i = i + 1;
						return i;
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
	 * It throws an error if parking lot is empty
	 */
    leaveCar (input) {
    	if (this.MAX_PARKING_SLOTS > 0) {
	    	var index = input.split(' ')[1] - 1;
		    if (index > -1 && index <= this.parkingSlots.length) {
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
	 * @description Returns an array containg parking details i.e. slot no, registration number and color
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
	 * @description returns a comma separated string of regsitration numbers of car having same color.
	 * It returns null if car is not found
	 */
    getCarsWithSameColor (input) {
    	if (this.MAX_PARKING_SLOTS > 0) {
	        var displayArr = new Array();
	        for (var i = 0; i < this.parkingSlots.length; i++) {
	        	if (this.parkingSlots[i] && this.parkingSlots[i].COLOR.toLowerCase() == input.split(' ')[1].toLowerCase()) {
	        		displayArr.push(this.parkingSlots[i].NUMBER);
	        	}
	        }
    		return displayArr.join(', ');
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
	    	var displayArr = new Array();
	        for (var i = 0; i < this.parkingSlots.length; i++) {
	        	if (this.parkingSlots[i] && this.parkingSlots[i].COLOR.toLowerCase() == input.split(' ')[1].toLowerCase()) {
	        		displayArr.push(i + 1);
	        	}
	        }
        	return displayArr.join(', ');
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

	// TODO
	findAllAvailableSlots () {

	}

	// TODO
	findAllAllocatedSlots () {

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
