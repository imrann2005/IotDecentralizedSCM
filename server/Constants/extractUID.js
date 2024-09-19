function extractUid(input) {
    // Extract the uid string from the object
    const uidString = input;

    // Regular expression to match numbers in the UID string
    const matches = uidString.match(/\d+/g);

    if (matches) {
        // Join matched numbers with a space
        const extractedUid = matches.join(' ');

        // Return the formatted response
        return { uid: extractedUid };
    } else {
        // Handle the case where no numbers were found
        return { uid: '' };
    }
}

module.exports = extractUid;
