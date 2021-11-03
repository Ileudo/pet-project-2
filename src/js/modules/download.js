export default class Download {
  constructor(trigger) {
    this.btns = document.querySelectorAll(trigger);
    this.path = 'assets/img/mainbg.jpg';
  }

  downloadItem(path) {
    const link = document.createElement('a');
    link.setAttribute('href', path);
    link.setAttribute('download', 'filename');
    link.style.display = 'none';

    link.click();
    link.remove();
  }

  init() {
    this.btns.forEach((btn) => {
      btn.style.cursor = 'pointer';

      btn.addEventListener('click', (e) => {
        this.downloadItem(this.path);
      });
    });
  }
}
