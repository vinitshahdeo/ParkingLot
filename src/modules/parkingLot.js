var Car = require('./car.js');

/**
 * @description a base class for Parking lot
 */
class ParkingLot {
	// will initialize it later, first writing the business logic
	constructor () {
		this.totalParkings = 0;
	}
	createParkingLot (input) {
        var totalParkings = parseInt(input.split(" ")[1]);
        return totalParkings;
    }
    parkCar (totalParkings, parkingArr, len, input) {
    	if(totalParkings > 0){
			var car, carNumber, carColor;
	    	if(this.findNearestAvailableSlot(parkingArr) == true){
		  		for(var i=0;i<len;i++){
		  			if(parkingArr[i] == null){
						  // var inp = input.split(" ")[1] + ":" + input.split(" ")[2];
						carNumber = input.split(" ")[1];
						carColor = input.split(" ")[2]
						car = new Car(carNumber, carColor);
						parkingArr[i] = car
						i = i + 1;
						return i;
		  			}
		  		}
		  	}else{
		  		return null;
		  	}
	  	}else{
	  		return null;
	  	}
    }
    leaveCar (totalParkings, parkingArr, input){
    	if(totalParkings > 0){
	    	var index = input.split(" ")[1] - 1;
		    if (index > -1 && index <= parkingArr.length) {
			    parkingArr[index] = null;
			    index = index + 1;
			    return index;
			}
		}
		else {
			return null;
		}
    }
    getParkingStatus (totalParkings, parkingArr){
    	var arr = new Array();
    	if(totalParkings > 0) {
			arr.push("Slot No. Registration No. Color ");
			// use binary search here
        	for(var i=0; i<parkingArr.length;i++){
        		if(parkingArr[i] != null){
        			var e = i + 1;
        			arr.push(e + ".  " + parkingArr[i].NUMBER + "  " + parkingArr[i].COLOR);
        		}
        	}
        	return arr;
		}else{
			return [];
		}
    }
    getCarsWithSameColor (totalParkings, parkingArr, input){
		//TODO what if car of particular color is not present
    	if(totalParkings > 0){
	        var displayArr = new Array();
	        for(var i=0; i< parkingArr.length; i++){
	        	if(parkingArr[i] && parkingArr[i].COLOR.toLowerCase() == input.split(" ")[1].toLowerCase()){
	        		displayArr.push(parkingArr[i].NUMBER);
	        	}
	        }
    		return displayArr.join(", ");
		} else{
			return null;
		}
    }
    getSlotsWithSameColorCar( totalParkings, parkingArr, input) {
    	if(totalParkings > 0){
	    	var displayArr = new Array();
	        for(var i=0; i< parkingArr.length; i++){
	        	if(parkingArr[i] && parkingArr[i].COLOR.toLowerCase() == input.split(" ")[1].toLowerCase()){
	        		displayArr.push(i+1);
	        	}
	        }
        	return displayArr.join(', ');
        }else{
			return null;
		}
    }
    getSlotByCarNumber (totalParkings, parkingArr, input){
		// TODO:  What parking lot is empty
		if(totalParkings > 0){
	    	var ele = "Not found";
	        for(var i=0; i< parkingArr.length; i++){
	        	if(parkingArr[i] && parkingArr[i].NUMBER == input.split(" ")[1]){
	        		ele = i + 1;
	        	}
	        }
        	return ele;
        } else {
			return null;
		}
	}
	findNearestAvailableSlot(parkingArr){
		var ele = false;
		for(var i=0; i<parkingArr.length; i++){
			if(parkingArr[i] == null){
				ele = true;
			}
		}
		return ele;
	}
}

module.exports = ParkingLot;