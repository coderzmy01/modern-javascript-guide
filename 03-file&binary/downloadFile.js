// 下载文件base64编码的文本
const fn1 = (file) => {
  const a = document.createElement('a');
  a.download = 'file.txt';
  const blob = new Blob([file]);
  let fileReader = new FileReader();
  fileReader.readAsDataURL(blob);
  fileReader.onload = function () {
    a.href = fileReader.result;
    a.click();
  };
};
fn1('hello world')
