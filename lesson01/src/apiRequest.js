const apiRequest = async (url = '', optionsObj = null) => {
    let errMsg = null; // Initialize errMsg variable

    try {
        const response = await fetch(url, optionsObj);
        
        // If response is not ok, throw an error
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // If the response is successful, return the JSON response data
        return await response.json();
    } catch (err) {
        // Log the error message for debugging
        console.error(err);
        errMsg = err.message;
    } finally {
        // Return error message if any, else return null
        return errMsg || null;
    }
};

export default apiRequest;
