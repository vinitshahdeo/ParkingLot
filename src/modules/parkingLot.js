var Car = require('./car.js');

/**
 * @description a base class for Parking lot
 */

class ParkingLot {
	// will initialize it later, first writing the business logic
	constructor () {
        this.totalParkings = 0;
        this.parkingArr = new Array();
    }
    // TODO: What if input is not a number
	createParkingLot (input) {
        this.totalParkings = parseInt(input.split(" ")[1]);
        for(var i=0; i < this.totalParkings; i++){
            this.parkingArr.push(null);
        }
        return this.totalParkings;
    }
    parkCar (input) {
        var len = this.parkingArr.length;
    	if(this.totalParkings > 0){
			var car, carNumber, carColor;
	    	if(this.findNearestAvailableSlot(this.parkingArr) == true){
                // use binary search here
		  		for(var i=0;i<len;i++){
		  			if(this.parkingArr[i] == null){
						  // var inp = input.split(" ")[1] + ":" + input.split(" ")[2];
						carNumber = input.split(" ")[1];
						carColor = input.split(" ")[2]
						car = new Car(carNumber, carColor);
						this.parkingArr[i] = car
						i = i + 1;
						return i;
		  			}
		  		}
		  	}else{
		  		return null;
		  	}
          }
          else {
	  		return null;
	  	}
    }
    leaveCar (input){
    	if(this.totalParkings > 0){
	    	var index = input.split(" ")[1] - 1;
		    if (index > -1 && index <= this.parkingArr.length) {
			    this.parkingArr[index] = null;
			    index = index + 1;
			    return index;
			}
		}
		else {
			return null;
		}
    }
    getParkingStatus (){
    	var arr = new Array();
    	if(this.totalParkings > 0) {
			arr.push("Slot No. Registration No. Color ");
			// use binary search here
        	for(var i = 0; i < this.parkingArr.length;i++){
        		if(this.parkingArr[i] != null){
        			var e = i + 1;
        			arr.push(e + ".  " + this.parkingArr[i].NUMBER + "  " + this.parkingArr[i].COLOR);
        		}
        	}
        	return arr;
		}else{
			return [];
		}
    }
    getCarsWithSameColor (input){
		//TODO what if car of particular color is not present
    	if(this.totalParkings > 0){
	        var displayArr = new Array();
	        for(var i = 0; i < this.parkingArr.length; i++){
	        	if(this.parkingArr[i] && this.parkingArr[i].COLOR.toLowerCase() == input.split(" ")[1].toLowerCase()){
	        		displayArr.push(this.parkingArr[i].NUMBER);
	        	}
	        }
    		return displayArr.join(", ");
		} else {
			return null;
		}
    }
    getSlotsWithSameColorCar(input) {
    	if (this.totalParkings > 0) {
	    	var displayArr = new Array();
	        for (var i=0; i < this.parkingArr.length; i++){
	        	if ( this.parkingArr[i] && this.parkingArr[i].COLOR.toLowerCase() == input.split(" ")[1].toLowerCase()) {
	        		displayArr.push(i+1);
	        	}
	        }
        	return displayArr.join(', ');
        }
        else {
			return null;
		}
    }
    getSlotByCarNumber (input){
		// TODO:  What parking lot is empty
		if (this.totalParkings > 0) {
	    	var ele = "Not found";
	        for (var i=0; i < this.parkingArr.length; i++){
	        	if(this.parkingArr[i] && this.parkingArr[i].NUMBER == input.split(" ")[1]){
	        		ele = i + 1;
	        	}
	        }
        	return ele;
        } 
        else {
			return null;
		}
	}
	findNearestAvailableSlot(parkingArr){
		var ele = false;
		for(var i = 0; i < this.parkingArr.length; i++){
			if (this.parkingArr[i] == null){
				ele = true;
			}
		}
		return ele;
	}
}

module.exports = ParkingLot;