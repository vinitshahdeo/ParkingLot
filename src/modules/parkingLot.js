var Car = require('./car.js');

/**
 * @description a base class for Parking lot
 */
class ParkingLot {
	// will initialize it later, first writing the business logic
	constructor () {
        this.MAX_PARKING_SLOTS = 0; // maximum parking slots allowed
        this.parkingSlots = new Array(); // array for parking slots
    }

    // TODO: What if input is not a number
	createParkingLot (input) {
        this.MAX_PARKING_SLOTS = parseInt(input.split(' ')[1]);
        for (var i = 0; i < this.MAX_PARKING_SLOTS; i++) {
            this.parkingSlots.push(null);
        }
        return this.MAX_PARKING_SLOTS;
    }
    parkCar (input) {
        var len = this.parkingSlots.length;
    	if (this.MAX_PARKING_SLOTS > 0) {
			var car, carNumber, carColor;
	    	if (this.findNearestAvailableSlot(this.parkingSlots) == true) {
                // use binary search here
		  		for (var i = 0; i < len; i++) {
		  			if (this.parkingSlots[i] == null) {
						  // var inp = input.split(" ")[1] + ":" + input.split(" ")[2];
						carNumber = input.split(' ')[1];
						carColor = input.split(' ')[2];
						car = new Car(carNumber, carColor);
						this.parkingSlots[i] = car;
						i = i + 1;
						return i;
		  			}
		  		}
		  	} else {
		  		return null;
		  	}
          }
          else {
	  		return null;
	  	}
    }
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
			return null;
		}
    }
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
		} else {
			return [];
		}
    }
    getCarsWithSameColor (input) {
		// TODO what if car of particular color is not present
    	if (this.MAX_PARKING_SLOTS > 0) {
	        var displayArr = new Array();
	        for (var i = 0; i < this.parkingSlots.length; i++) {
	        	if (this.parkingSlots[i] && this.parkingSlots[i].COLOR.toLowerCase() == input.split(' ')[1].toLowerCase()) {
	        		displayArr.push(this.parkingSlots[i].NUMBER);
	        	}
	        }
    		return displayArr.join(', ');
		} else {
			return null;
		}
    }
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
	findNearestAvailableSlot (parkingSlots) {
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
