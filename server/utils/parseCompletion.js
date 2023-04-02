function parseCompletion(completion) {
    // loop over the string to find ```js and ```
    // store the index of the first ```js
    // store the index of the last ```
    // slice the string from the first ```js to the last ```
    // attempt to parse the JSON
    // if there is an error, return the error
    // if there is no error, return the parsed JSON

    let start = completion.indexOf('{');
    let end = completion.lastIndexOf('}') + 1;
    let code = completion.slice(start, end);
    let parsed;

    try {
        parsed = JSON.parse(code);
    }
    catch (err) {
        console.log('error parsing completion')
        console.log(code)
        console.log(err);
        return err;
    }
    parsed.summary = JSON.stringify(parsed.summary)

    return parsed;
}

module.exports = parseCompletion;