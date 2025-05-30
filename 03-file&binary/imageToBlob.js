const image = document.querySelector('img');

const downloadImage = async (img) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  let blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/png');
  });
  const a = document.createElement('a');
  a.download = 'image.jpg';
  a.href = URL.createObjectURL(blob);
  a.click();
  URL.revokeObjectURL(blob);
};
image.addEventListener('click', () => {
  downloadImage(image);
});
