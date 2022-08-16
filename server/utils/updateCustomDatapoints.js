function updateCustomDatapoints(custom_datapoints, datapointTitle, newData) {
    // if custom_datapoints is a string, convert it to an object
    // find the datapoint with the datapointTitle and update it with the newData
    // return the updated custom_datapoints object
    if (typeof custom_datapoints === "string") {
        custom_datapoints = JSON.parse(custom_datapoints);
    }
    custom_datapoints[datapointTitle] = newData;
    return JSON.stringify(custom_datapoints);
}

module.exports = updateCustomDatapoints;