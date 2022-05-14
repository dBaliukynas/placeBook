const fileFetchOptions = {
    headers: {
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrfToken"]')
            ?.content,
    },
};

export default fileFetchOptions;
