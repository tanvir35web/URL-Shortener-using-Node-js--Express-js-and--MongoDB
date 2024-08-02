const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "Please provide a valid URL" });
  }
  const shortID = shortid(8);
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  res.json({ id: shortID });
};

async function handleGetRedirectUrlToOriginalUrl(req, res) {
  const shortId = req.params.shortId;
  console.log("shortId: ", shortId);
  const entry = await URL.findOneAndUpdate(
    {
      shortId
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        }
      }
    }
  );
  if (entry) {
    res.redirect(entry.redirectUrl);
  } else {
    res.status(404).json({ error: "Short URL not found" });
  }
};

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  console.log("result: ", result);
  if (!result) {
    return res.status(404).json({ error: "URL not found for analytics" });
  } else {
    return res.json({
      totalNumberOfClick: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  }
};

module.exports = {
  handleGenerateShortUrl,
  handleGetRedirectUrlToOriginalUrl,
  handleGetAnalytics,
};