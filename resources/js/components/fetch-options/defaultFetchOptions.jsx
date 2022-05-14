const defaultFetchOptions = {
    headers: {
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrfToken"]')
            ?.content,
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
};

export default defaultFetchOptions;
