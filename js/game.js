{
  const takePhotoButton = document.querySelector('.takePhoto');
  let video;
  let mediaStream;
  let imageCapture;
  let image = new Image();
  let numCol  3, numRow = 3;
  let pieces = puzzlePieces - 1;
  let imagePieces = new Array(puzzlePieces);
  let puzzle = [...imagePieces.keys()].map(String);
  let markers = document.querySelectorAll('a-marker');

  cost init = () => {
    video = document.querySelector('video');
    navigator.mediaDevices.enumerateDevices()
      .catch(error => console.log('enumerateDevices() error', error))
      .then(getStream);
      takePhotoButton.addEventListener('click', getPicture);
  };

  // Get a video stream from the camera
  const getStream = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
    constraints = {
      video: {
        width: 720,
        height: 720,
      }
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .catch(error => {
        console.log('getUserMedia error', error)
      })
      .then(gotStream);
  };

  // Displays the getStream from the camera
  // and then creates an ImageCapture object, using that video stream
  const gotStream = (stream) => {
    mediaStream = stream;
    video.srcObject = stream;
    imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
  };

  // Take the picture
  const getPicture = () => {
    shuffle(puzzle);
    imageCapture.takePhoto()
      .then((img) => {
        image.src = URL.createObjectURL(img);
        image.addEventListener('load', () => createImagePieces(image));
      })
      .catch((error) => {console.log('takePhoto() error', error)});
  };

  const createImagePieces = (image) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const pieceWidth = image.width / numCol;
    const pieceHeight = image.height / numRow;
    for (lex x = 0; x < numCol; x++) {
      for (let y = 0; y < numRow; y++) {
        ctx.drawImage(image, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight, 0, 0, canvas.width, canvas.height);
        imagePieces[8 - pieces] = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        console.log(imgPieces);
        pieces = pieces - 3;
        if (pieces < 0) {
          pieces = (puzzlePieces - 1) + pieces;
        }
      }
    }
    markers.forEach((marker, index) => {
      const aImg = new document.createElement('a-image');
      aImg.setAttribute('rotation', '-90, 0, 0');
      aImg.setAttribute('position', '0, 0, 0');
      aImg.setAttribute('src', imagePieces[puzzle[index]]);
      marker.appendChild(aImg);
    })
  };

  const shuffle = randomArray => {
    for(let i = randomArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
    }
    return randomArray;
  }

  window.addEventListener(`load`, () => setTimeout(() => init(), 1000));

  const checkDistance = () => {};
}
