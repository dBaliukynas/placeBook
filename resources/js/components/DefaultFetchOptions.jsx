const defaultFetchOptions = {
    headers: {
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrfToken"]')
            ?.content,
        "Content-Type": "application/json",
    },
};

export default defaultFetchOptions;
