const TEXT_CONTENT =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.';
const FILENAME = 'lorem.txt';

let blob,
  requestFileSystem =
    this.webkitRequestFileSystem ||
    this.mozRequestFileSystem ||
    this.requestFileSystem;

function onerror(message) {
  console.error(message);
}

function zipBlob(blob, callback) {
  createTempFile(fileEntry => {
    zip.createWriter(
      new zip.FileWriter(fileEntry, 'application/zip'),
      zipWriter => {
        zipWriter.add(FILENAME, new zip.BlobReader(blob), () => {
          zipWriter.close(callback);
        });
      },
      onerror,
    );
  });
}

function unzipBlob(blob, callback) {
  zip.createReader(
    new zip.BlobReader(blob),
    zipReader => {
      zipReader.getEntries(entries => {
        entries[0].getData(new zip.BlobWriter('text/plain'), data => {
          zipReader.close();
          callback(data);
        });
      });
    },
    onerror,
  );
}

function logBlobText(blob) {
  const reader = new FileReader();
  reader.onload = function(e) {
    console.log(e.target.result);
    console.log('--------------');
  };
  reader.readAsText(blob);
}

blob = new Blob([TEXT_CONTENT], {
  type: 'text/plain',
});
logBlobText(blob);
zipBlob(blob, zippedBlob => {
  unzipBlob(zippedBlob, unzippedBlob => {
    logBlobText(unzippedBlob);
  });
});
