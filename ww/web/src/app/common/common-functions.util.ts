import { HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';

export function download(res: HttpResponse<ArrayBuffer>, fileName: string) {

  let contentType = res.headers.get('Content-Type');
  let blob = new Blob([new Uint8Array(res.body)], { type: contentType });
  fileName = fileName + ".csv";
  saveAs(blob, fileName);
}

export function downloadXml(content: string, fileName: string) {

  let blob = new Blob([content], { type: 'text/xml' });
  fileName = fileName + ".xml";
  saveAs(blob, fileName);
}