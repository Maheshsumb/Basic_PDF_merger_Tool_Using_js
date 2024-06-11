const express = require('express');
const path = require('path');
const multer = require('multer');
const { mergePDFs } = require('./merge');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'));
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "template/index.html"));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  try {
    console.log(req.files);

    const filePath1 = path.join(__dirname, req.files[0].path).replace(/\\/g, '/');
    const filePath2 = path.join(__dirname, req.files[1].path).replace(/\\/g, '/');//Continue using the .replace(/\\/g, '/') to ensure paths are correctly formatted for the pdf-merger-js library.

    //     await mergePDFs(filePath1, filePath2);
    //     res.redirect(`http://localhost:3000/static/merged.pdf`);
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).send('An error occurred while merging PDFs');
    //   }
    // });
    // Send the merged PDF file as a download
    res.download(path.join(__dirname, 'public/merged.pdf'), 'merged.pdf', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      } else {
        console.log('File downloaded successfully');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while merging PDFs');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
