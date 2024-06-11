const path = require('path');
const fs = require('fs');

const mergePDFs = async (p1, p2) => {
  const { default: PDFMerger } = await import('pdf-merger-js');
  const merger = new PDFMerger();

  // Convert paths to use forward slashes
  const filePath1 = path.resolve(p1).replace(/\\/g, '/');
  const filePath2 = path.resolve(p2).replace(/\\/g, '/'); //Continue using the .replace(/\\/g, '/') to ensure paths are correctly formatted for the pdf-merger-js library.
  await merger.add(filePath1);  // merge all pages. parameter is the path to file and filename.
  await merger.add(filePath2);
  await merger.save(`public/merged.pdf`); // save under given name and reset the internal document
};

module.exports = { mergePDFs };
