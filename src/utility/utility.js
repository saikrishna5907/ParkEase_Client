export const  getMillSecondsTimeInHMSFormat = (payedUntil) => {
    let howMuchExceeded = ((new Date().getTime() - payedUntil.getTime()));
    let seconds = howMuchExceeded / 1000;
    // 2- Extract hours:
    let hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    let minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = Math.ceil(seconds % 60);
    return {
        hours: hours,
        minutes : minutes,
        seconds: seconds
    }
}