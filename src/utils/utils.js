// This file contains all the pure utility functions

/**
 *
 * @param {Array} arr the array in which the function will search for the element
 * @param {Number} element element to be searched
 * @param {Number} start starting index of the array
 * @param {Number} end last index of the array
 * @description This is an implementation of Binary search algorithm.
 * We might use this for searching operation
 */
const binarySearch = function (arr, element, start, end) {
    if (start > end) {
        return false;
    }

    var mid = Math.floor((start + end) / 2);

    if (arr[mid] === element) {
        return true;
    }

    if (arr[mid] > element) {
        return binarySearch(arr, element, start, mid - 1);
    }

    else {
        return binarySearch(arr, element, mid + 1, end);
    }
};

module.exports = binarySearch;
