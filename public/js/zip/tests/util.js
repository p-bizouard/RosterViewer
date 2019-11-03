function createTempFile(callback) {
  const TMP_FILENAME = 'file.tmp';
  requestFileSystem(TEMPORARY, 4 * 1024 * 1024 * 1024, filesystem => {
    function create() {
      filesystem.root.getFile(
        TMP_FILENAME,
        {
          create: true,
        },
        entry => {
          callback(entry);
        },
        onerror,
      );
    }

    filesystem.root.getFile(
      TMP_FILENAME,
      null,
      entry => {
        entry.remove(create, create);
      },
      create,
    );
  });
}
