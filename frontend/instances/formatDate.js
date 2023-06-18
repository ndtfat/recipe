export default (iosString, slash = false) => {
    const isoDate = new Date(iosString);

    let formattedDate;

    if (slash) {
        const day = isoDate.getDate().toString().padStart(2, '0');
        const month = (isoDate.getMonth() + 1).toString().padStart(2, '0');
        const year = isoDate.getFullYear().toString();

        formattedDate = `${day}/${month}/${year}`;
    } else {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        formattedDate = isoDate.toLocaleDateString('en-US', options);
    }

    return formattedDate;
};
