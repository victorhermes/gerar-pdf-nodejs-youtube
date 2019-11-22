var express = require("express");
var fs = require("fs");
var archiver = require("archiver");
var router = express.Router();

const names = [
  { filename: "Victor" },
  { filename: "Monique" },
  { filename: "Cris" }
];

router.post("/", function(req, res) {
  const archive = archiver("zip", {
    zlib: { level: 9 }
  });

  archive.pipe(res.attachment("certificados.zip"));

  names.map(name => {
    archive.file(`public/certificateID/${name.filename}.pdf`, {
      name: `${name.filename}.pdf`
    });
  });

  archive.finalize();
});

module.exports = router;
