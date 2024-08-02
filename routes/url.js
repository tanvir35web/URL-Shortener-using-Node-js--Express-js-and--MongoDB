const express = require("express");
const { handleGenerateShortUrl, handleGetRedirectUrlToOriginalUrl, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateShortUrl);
router.get('/:shortId', handleGetRedirectUrlToOriginalUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;