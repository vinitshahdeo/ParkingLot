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
            if(this.findNearestAvailableSlot(parkingArr) == true){
                    for(var i=0;i<len;i++){
                        if(parkingArr[i][i] == null){
                            var inp = input.split(" ")[1] + ":" + input.split(" ")[2];
                        parkingArr[i][i] = inp;
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

    leaveCar (totalParkings, parkingArr, input) {
        if(totalParkings > 0) {
            var index = input.split(" ")[1] - 1;
            if (index > -1 && index <= parkingArr.length) {
                parkingArr[index][index] = null;
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
        if(totalParkings > 0){
            arr.push("Slot No. Registration No. Color ");
            for(var i=0; i<parkingArr.length;i++){
                if(parkingArr[i][i] != null){
                    var e = i + 1;
                    arr.push(e + ".  " + parkingArr[i][i].split(":")[0] + "  " + parkingArr[i][i].split(":")[1]);
                }
            }
            return arr;
        }
        else {
            return [];
        }
    }

    getCarsWithSameColor (totalParkings, parkingArr, input){
        if(totalParkings > 0){
            var displayArr = new Array();
            for(var i=0; i< parkingArr.length; i++){
                if(parkingArr[i][i] && parkingArr[i][i].split(":")[1] == input.split(" ")[1]){
                    displayArr.push(parkingArr[i][i].split(":")[0]);
                }
            }
            return displayArr.join();
        }
        else {
            return null;
        }
    }

    getSlotsWithSameColorCar( totalParkings, parkingArr, input) {
        if(totalParkings > 0){
            var displayArr = new Array();
            for(var i=0; i< parkingArr.length; i++){
                if(parkingArr[i][i] && parkingArr[i][i].split(":")[1] == input.split(" ")[1]){
                    displayArr.push(i+1);
                }
            }
            return displayArr.join();
        }
        else {
            return null;
        }
    }

    getCarNumberBySlot (totalParkings, parkingArr, input){
        if(totalParkings > 0){
            var ele;
            for(var i=0; i< parkingArr.length; i++){
                if(parkingArr[i][i] && parkingArr[i][i].split(":")[0] == input.split(" ")[1]){
                    ele = i + 1;
                }else{
                    ele = "Not found";
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
        for(var i=0; i<parkingArr.length; i++){
            if(parkingArr[i][i] == null){
                ele = true;
            }
        }
        return ele;
    }
}

module.exports = ParkingLot;