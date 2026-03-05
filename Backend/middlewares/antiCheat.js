const blockedKeywords = [
  "đáp án",
  "giải hộ",
  "cho kết quả",
  "answer"
];

module.exports = (req, res, next) => {
  const msg = req.body.message?.toLowerCase() || "";

  const isCheating = blockedKeywords.some(k => msg.includes(k));

  if (isCheating) {
    req.body.message =
      "Student is asking for the final answer. Apply pedagogical refusal and give guided hints.";
  }

  next();
};
