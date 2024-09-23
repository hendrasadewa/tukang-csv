export async function loadCSVFiletoString(file: File) {
  const fileUrl = URL.createObjectURL(file);
  const response = await fetch(fileUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch the file');
  }

  return await response.text();
}

export function copyToClipboard(text: string) {
  if (!navigator) {
    return;
  }

  navigator.clipboard.writeText(text);
}

export function downloadTextFile(blob: Blob, fileName: string = 'download') {
  if (!document) {
    return;
  }

  const element = document.createElement('a');

  element.href = URL.createObjectURL(blob);
  element.download = `${fileName}.txt`;
  document.body.appendChild(element);
  element.click();
}

export function copyOrDownloadFile(
  text: string,
  maxLengthToDownload: number = 10_000
) {
  if (text.length <= maxLengthToDownload) {
    copyToClipboard(text);
    return;
  }
  const blob = new Blob([text], { type: 'text/plain' });
  downloadTextFile(blob);
}
