class GlobalTimer {
  T1 = 't1G';
  T2 = 't2G';

  constructor() {
    this.t1G = null;
    this.t2G = null;
    this.tClone = null;
    this.tSort = null;
    this.tFile = null;
    this.tMax = null;
    this.tMin = null;
    this.tMed = null;
    this.tAv = null;
    this.tSeqUp = null;
    this.tSeqDown = null;
    this.tSumAll = null;
  }

  get getTimerValue() {
    return (this.t2G - this.t1G).toFixed(4);
  }

  get getTRes() {
    return this.t2G - this.t1G;
  }

  _setTimer(key, time) {
    this[`${key}`] = time;
  }

  _getByKeyValue(key) {
    return this[`${key}`];
  }

  _usePerfomance() {
    return performance.now();
  }

  _calcPerfomance(key) {
    const time = this._usePerfomance();
    this._setTimer(key, time);
  }
}

class MathCalc {
  /* shallow  copy*/
  _cloneArray(arr) {
    const clonedArray = [];
    for (let i = 0; i < arr.length; i++) {
      clonedArray[i] = arr[i];
    }
    return clonedArray;
  }

  _sortArray(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return [...this._sortArray(left), pivot, ...this._sortArray(right)];
  }

  findMax(arr) {
    return arr[arr.length - 1];
  }

  findMin(arr) {
    return arr[0];
  }

  findMediana(arr) {
    const len = arr.length;
    if (len % 2 === 0) {
      const mid1 = arr[len / 2 - 1];
      const mid2 = arr[len / 2];
      return (mid1 + mid2) / 2;
    } else {
      return arr[Math.floor(len / 2)];
    }
  }

  findAverage(arr) {
    if (arr.length === 0) {
      return 0;
    }

    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }

    const average = sum / arr.length;

    return average;
  }

  /**
   * @copyright By ChatGpt
   * @description Find All Sequence
   * @example 
   * // to find All SequenceUp
   * let currentSequence = [arrOfNumbers[0]];
    let maxSequenceLength = 1;
    let allMaxSequences = [];

    for (let i = 1; i < arrOfNumbers.length; i++) {
      if (arrOfNumbers[i] > arrOfNumbers[i - 1]) {
        currentSequence.push(arrOfNumbers[i]);
      } else {
        if (currentSequence.length > maxSequenceLength) {
          maxSequenceLength = currentSequence.length;
          allMaxSequences = [currentSequence.slice()];
        } else if (currentSequence.length === maxSequenceLength) {
          allMaxSequences.push(currentSequence.slice());
        }

        currentSequence = [arrOfNumbers[i]];
      }
    }

    if (currentSequence.length > maxSequenceLength) {
      allMaxSequences = [currentSequence.slice()];
    } else if (currentSequence.length === maxSequenceLength) {
      allMaxSequences.push(currentSequence.slice());
    }

    return allMaxSequences;
   */
  sequenceNumberUp(arrOfNumbers) {
    if (arrOfNumbers.length === 0) {
      return arrOfNumbers;
    }

    let currentSequence = [arrOfNumbers[0]];
    let maxSequence = [arrOfNumbers[0]];

    for (let i = 1; i < arrOfNumbers.length; i++) {
      if (arrOfNumbers[i] > currentSequence[currentSequence.length - 1]) {
        currentSequence.push(arrOfNumbers[i]);
      } else {
        if (currentSequence.length > maxSequence.length) {
          maxSequence = currentSequence.slice();
        }

        currentSequence = [arrOfNumbers[i]];
      }
    }

    if (currentSequence.length >= maxSequence.length) {
      maxSequence = currentSequence.slice();
    }

    return maxSequence;
  }

  /**
   * @copyright By ChatGpt
   * @description Find All Sequence
   * @example 
   * // to find All SequenceDown
   *  let currentSequence = [arrOfNumbers[0]];
    let maxSequenceLength = 1;
    let allMaxSequences = [];

    for (let i = 1; i < arrOfNumbers.length; i++) {
      if (arrOfNumbers[i] < arrOfNumbers[i - 1]) {
        currentSequence.push(arrOfNumbers[i]);
      } else {
        if (currentSequence.length > maxSequenceLength) {
          maxSequenceLength = currentSequence.length;
          allMaxSequences = [currentSequence.slice()];
        } else if (currentSequence.length === maxSequenceLength) {
          allMaxSequences.push(currentSequence.slice());
        }

        currentSequence = [arrOfNumbers[i]];
      }
    }

    if (currentSequence.length > maxSequenceLength) {
      allMaxSequences = [currentSequence.slice()];
    } else if (currentSequence.length === maxSequenceLength) {
      allMaxSequences.push(currentSequence.slice());
    }

    return allMaxSequences;
   */
  sequenceNumberDown(arrOfNumbers) {
    if (arrOfNumbers.length === 0) {
      return arrOfNumbers;
    }

    let currentSequence = [arrOfNumbers[0]];
    let maxSequence = [arrOfNumbers[0]];

    for (let i = 1; i < arrOfNumbers.length; i++) {
      if (arrOfNumbers[i] < currentSequence[currentSequence.length - 1]) {
        currentSequence.push(arrOfNumbers[i]);
      } else {
        if (currentSequence.length > maxSequence.length) {
          maxSequence = currentSequence.slice();
        }

        currentSequence = [arrOfNumbers[i]];
      }
    }

    if (currentSequence.length >= maxSequence.length) {
      maxSequence = currentSequence.slice();
    }

    return maxSequence;
  }
}

class ElementBuilder {
  #fileNameText = 'Nothing selected';

  #numericRegexToFindNumbers = /-?\d*\.?\d+/g;

  constructor() {
    this.math = new MathCalc();
    this.timer = new GlobalTimer();

    this.fileReader = new FileReader();

    this.elRoot = document.querySelector('#root');
    this.elLoadFile = document.querySelector('.load__input');

    this.elErrLoad = document.querySelector('.load__error');
    this.elLoadLabelText = document.querySelector('.load__label span');

    this.elLoadName = document.querySelector('.load__name :first-child');
    this.elLoadSize = document.querySelector('.load__name :last-child');

    this.elLoadCancel = document.querySelector('.load__cancel');

    this.elInfo = document.querySelector('.info');
    this.elAreaInfoLoad = document.querySelector('#area__info');

    this.tableRoot = document.querySelector('.table__wrapper');

    this.dialog = document.getElementById('myDialog');
    this.btnOpenModal = document.getElementById('open');
    this.btnCloseModal = document.getElementById('close');
    this.isOpenModal = false;
  }

  get #getFileInfo() {
    const fileList = event.target.files;
    return fileList[0];
  }

  #getFileExtension(filename) {
    const ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? '' : ext[1];
  }

  #renderFileInfo(name, size) {
    const textNode = document.createTextNode(`Name: ${name}`);
    this.elLoadName.appendChild(textNode);

    const fNode = document.createTextNode(`Size: ${size}`);
    this.elLoadSize.appendChild(fNode);
  }

  loadFile(event) {
    /* reset cancel */

    this.elLoadCancel.innerHTML = '';

    const file = this.#getFileInfo;

    /* Reset file value to fire every time even the same file is load. 
    Cause file inside can change */
    event.target.value = '';

    if (file === undefined) {
      return this.cancelLoadFile();
    }

    const { type, name, size } = file;
    const fSize = this.#calcFileSize(size);

    const ext = this.#getFileExtension(name);
    if (ext !== 'txt' && type !== 'text/plain') {
      this.elErrLoad.innerHTML = '';
      this.elLoadName.innerHTML = '';
      this.elLoadSize.innerHTML = '';

      const errText = document.createTextNode(
        `File is not support current extension. Only txt`
      );
      this.elErrLoad.appendChild(errText);

      this.#renderFileInfo(name, fSize);

      throw 'File is not txt';
    }

    /* reset error */
    this.elErrLoad.innerHTML = '';

    this.elLoadName.innerHTML = '';
    this.elLoadSize.innerHTML = '';
    this.#renderFileInfo(name, fSize);

    this.readFile(file);
  }

  #calcFileSize(bytes) {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;

    if (bytes < kilobyte) {
      return bytes + ' B';
    } else if (bytes < megabyte) {
      return (bytes / kilobyte).toFixed(2) + ' KB';
    } else {
      return (bytes / megabyte).toFixed(2) + ' MB';
    }
  }

  onChangeName(fileInfo) {
    const { name, size } = fileInfo;

    const fSize = this.#calcFileSize(size);

    this.elLoadName.innerText = '';
    this.elLoadSize.innerHTML = '';

    this.#renderFileInfo(name, fSize);
  }

  cancelLoadFile(event) {
    this.elLoadCancel.innerText = '';
    this.elErrLoad.innerHTML = '';
    this.elLoadName.innerText = '';
    this.elLoadSize.innerHTML = '';

    const txt = document.createTextNode('Cancel to load file');
    this.elLoadCancel.appendChild(txt);
    const file = this.#getFileInfo;

    if (file instanceof File) {
      this.onChangeName(file);
    } else {
      this.#renderFileInfo('', '');
    }
  }

  readFile(file) {
    this.elAreaInfoLoad.innerText = '';
    this.fileReader.readAsText(file);
  }

  handleEvent(event) {
    this.elAreaInfoLoad.textContent += `${event.type}: ${event.loaded} bytes transferred\n`;
    if (event.type === 'loadstart') {
      this.timer._calcPerfomance('t1G');
    }

    if (event.type === 'loadend') {
      this.timer._calcPerfomance('t2G');
      const value = this.timer.getTimerValue;
      this.timer._setTimer('tFile', value);

      const strFile = this.fileReader.result;

      const matches = strFile.match(this.#numericRegexToFindNumbers);
      const arrNumber = matches.map((x) => Number(x));

      const clonedArr = this.calcValueBuilder(
        'tClone',
        this.math._cloneArray,
        arrNumber
      );

      const seqArr = this.math._cloneArray(arrNumber);

      /* Recursion problems */
      this.timer._calcPerfomance('t1G');
      const sortedArray = this.math._sortArray(clonedArr);
      this.timer._calcPerfomance('t2G');
      const tDif = this.timer.getTimerValue;
      this.timer._setTimer('tSort', tDif);

      const med = this.calcValueBuilder(
        'tMed',
        this.math.findMediana,
        sortedArray
      );

      const max = this.calcValueBuilder('tMax', this.math.findMax, sortedArray);

      const min = this.calcValueBuilder('tMin', this.math.findMin, sortedArray);

      const av = this.calcValueBuilder(
        'tAv',
        this.math.findAverage,
        sortedArray
      );

      const seqUp = this.calcValueBuilder(
        'tSeqUp',
        this.math.sequenceNumberUp,
        seqArr
      );

      const seqDown = this.calcValueBuilder(
        'tSeqDown',
        this.math.sequenceNumberDown,
        seqArr
      );

      const timeArr = [
        this.timer.tMax,
        this.timer.tMin,
        this.timer.tMed,
        this.timer.tAv,
        this.timer.tSeqUp,
        this.timer.tSeqDown,
        this.timer.tFile,
        this.timer.tSort,
        this.timer.tClone,
      ];
      const valueArr = [max, min, med, av, seqUp, seqDown];
      this.tableWrite(timeArr, valueArr);
    }
  }

  calcValueBuilder(setForTimer, funcRef, array) {
    this.timer._calcPerfomance(`${this.timer.T1}`);
    const calcValue = funcRef(array);
    this.timer._calcPerfomance(`${this.timer.T2}`);
    const value = this.timer.getTimerValue;
    this.timer._setTimer(`${setForTimer}`, value);
    return calcValue;
  }

  tableWrite(arrTime, arrValue) {
    const nodeTimer = this.tableRoot.querySelectorAll('tbody td:nth-child(2)');
    nodeTimer.forEach((cell, ind) => {
      const value = arrTime[ind];
      cell.textContent = arrTime[ind] === '' ? '' : `${value} ms`;
    });

    const nodeValue = this.tableRoot.querySelectorAll('tbody td:nth-child(3)');
    nodeValue.forEach((cell, ind) => {
      const value = arrValue[ind];
      cell.textContent = value;
    });

    const nodeResult = this.tableRoot.querySelector('tfoot td');
    const sumTimer = arrTime.reduce((acc, val) => acc + Number(val), 0);
    nodeResult.textContent = `${sumTimer / 1000} seconds`;
  }

  toggleModal() {
    if (this.isOpenModal) {
      this.dialog.close();
      this.isOpenModal = false;
    } else {
      this.dialog.showModal();
      this.isOpenModal = true;
    }
  }

  readerEvent() {
    this.fileReader.addEventListener('loadstart', this.handleEvent.bind(this));
    this.fileReader.addEventListener('load', this.handleEvent.bind(this));
    this.fileReader.addEventListener('loadend', this.handleEvent.bind(this));
    this.fileReader.addEventListener('progress', this.handleEvent.bind(this));
    this.fileReader.addEventListener('error', this.handleEvent.bind(this));
  }

  createEvent() {
    this.readerEvent();
    this.elLoadFile.addEventListener('change', this.loadFile.bind(this));
    this.elLoadFile.addEventListener('cancel', this.cancelLoadFile.bind(this));

    this.btnOpenModal.addEventListener('click', this.toggleModal.bind(this));
    this.btnCloseModal.addEventListener('click', this.toggleModal.bind(this));
  }
}

el = new ElementBuilder();
el.createEvent();
