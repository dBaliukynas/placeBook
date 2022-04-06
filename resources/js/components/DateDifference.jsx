const DateDifference = (props) => {
    const dateDifference = parseInt(props.dateDifference);

    if (Math.floor(dateDifference / 1000) < 60) {
        const dateDifferenceInSeconds = Math.floor(dateDifference / 1000);
        return (
            <span>
                {dateDifferenceInSeconds}{" "}
                {dateDifferenceInSeconds != 1 ? (
                    <span>seconds</span>
                ) : (
                    <span>second</span>
                )}
            </span>
        );
    }
    if (Math.floor(dateDifference / 1000 / 60) < 60) {
        const dateDifferenceInMinutes = Math.floor(dateDifference / 1000 / 60);
        return (
            <span>
                {dateDifferenceInMinutes}{" "}
                {dateDifferenceInMinutes != 1 ? (
                    <span>minutes</span>
                ) : (
                    <span>minute</span>
                )}
            </span>
        );
    }
    if (Math.floor(dateDifference / 1000 / 60 / 60) < 24) {
        const dateDifferenceInHours = Math.floor(
            dateDifference / 1000 / 60 / 60
        );
        return (
            <span>
                {dateDifferenceInHours}{" "}
                {dateDifferenceInHours != 1 ? (
                    <span>hours</span>
                ) : (
                    <span>hour</span>
                )}
            </span>
        );
    }
    if (Math.floor(dateDifference / 1000 / 60 / 60 / 24) < 31) {
        const dateDifferenceInDays = Math.floor(
            dateDifference / 1000 / 60 / 60 / 24
        );
        return (
            <span>
                {dateDifferenceInDays}{" "}
                {dateDifferenceInDays != 1 ? (
                    <span>days</span>
                ) : (
                    <span>day</span>
                )}
            </span>
        );
    }
    if (Math.floor(dateDifference / 1000 / 60 / 60 / 24 / 31) < 12) {
        const dateDifferenceInMonths = Math.floor(
            dateDifference / 1000 / 60 / 60 / 24 / 31
        );
        return (
            <span>
                {dateDifferenceInMonths}{" "}
                {dateDifferenceInMonths != 1 ? (
                    <span>months</span>
                ) : (
                    <span>month</span>
                )}
            </span>
        );
    }
    if (Math.floor(dateDifference / 1000 / 60 / 60 / 24 / 31 / 12) < 12) {
        const dateDifferenceInYears = Math.floor(
            dateDifference / 1000 / 60 / 60 / 24 / 31 / 12
        );
        return (
            <span>
                {dateDifferenceInYears}{" "}
                {dateDifferenceInYears != 1 ? (
                    <span>years</span>
                ) : (
                    <span>year</span>
                )}
            </span>
        );
    }
};

export default DateDifference;
