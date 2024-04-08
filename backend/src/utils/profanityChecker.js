
import axios from 'axios'

async function checkForProfanity(text) {
    try {

        const encodedText = encodeURIComponent(text);
        const apiUrl = `https://www.purgomalum.com/service/containsprofanity?text=${encodedText}`;        
        const response = await axios.get(apiUrl);
        const containsProfanity = response.data;

        return containsProfanity;
    } catch (error) {
        console.error('Error checking profanity:', error.message);
        return false; // Assume no profanity on error
    }
}

export default checkForProfanity