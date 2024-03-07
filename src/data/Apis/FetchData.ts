import axios from "axios";
import _ from 'lodash';

// Define the debounced function separately
const debouncedFetchData = _.debounce(async (url: string, queryParams: {}, callback: (data: any) => void) => {
    try {
        const pinCodeData = await axios.get(url, { params: queryParams });
        callback(pinCodeData?.data); // Call the callback function with the data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}, 2000);

// Export the FetchData function
export const FetchData = (url: string, queryParams: {}, callback: (data: any) => void) => {
    // Call the debounced function with the provided callback
    debouncedFetchData(url, queryParams, callback);
};
