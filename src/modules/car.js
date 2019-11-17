/**
 * @description a basic object with two fields: Number and Color
 */
class Car {
    constructor (NUMBER, COLOR) {
        this.NUMBER = NUMBER;
        this.COLOR = COLOR;
    }

    /**
     * 
     * @param {Object} carA an instance of Car class
     * @param {Object} carB an instance of Car class
     * @description returns true if two Car Objects are equal, false if both are not equal
     */
    isCarEqual (carA, carB) {
        return ((carA.NUMBER.toLowerCase() === carB.NUMBER.toLowerCase()) 
            && carA.COLOR.toLowerCase() === carB.toLowerCase());
    }
}

module.exports = Car;