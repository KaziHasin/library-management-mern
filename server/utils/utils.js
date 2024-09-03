/** this function is for reusable pagination params */
const getPaginationParams = (req) => {
    const perPage = parseInt(req.query.perPage) || 5;
    const page = parseInt(req.query.page) || 1;
    const skipped = (page - 1) * perPage;
    const searchTerm = req.query.searchTerm;
    return { perPage, skipped, searchTerm };
};

module.exports = {
    getPaginationParams,
};
