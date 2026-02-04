exports.generateImageUrl = (word) => {
  const prompt = encodeURIComponent(
    `cute colorful cartoon illustration of ${word} for kids, cartoon style, bright colors`
  );

  return `https://image.pollinations.ai/prompt/${prompt}`;
};
