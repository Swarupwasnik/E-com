import formidable from 'formidable';
import fs from 'fs';

const handleFileUpload = (req, res, next) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error parsing form data" });
    }

    req.fields = fields;
    req.files = files;
    next();
  });
};

export default handleFileUpload;
