function main() {

  if (app.documents.length) {

    var outputDir = Folder.selectDialog('Select output folder.', '~');

    if (outputDir) {

      for (var i = 0; i < app.documents.length; i++) {
        doc = app.documents[i];
        
        // Activate the current document
        // Without this line, the contents of the document having focus
        // when you execute the script will be the output for all files
        
        doc.activate();

        // Any changes? If not, it'll save it after exporting
        
        var wasSaved = doc.saved;

        try {
          // Export PNG
          doc.exportFile(
            new File(outputDir + '/' + doc.name.split('.')[0] + '.png'),
            ExportType.PNG24,
            new ExportOptionsPNG24()
          );
        }
        catch(e) {
          alert('Export of file "' + doc.name + '" failed.\n' + e.message);
          return;
        }
        try {
          // Save the document, so you can close it directly
          if(wasSaved) {
            doc.save();
          }
        }
        catch(e) {
        }
      }

      alert('Success!\nPNGs saved to ' + outputDir);

    }

  }

}

main();