{
  const image = new Image(),
    takePhotoButton = document.querySelector('.takePhoto');

  // New Game-Level Variables
  let constraints, imageCapture, mediaStream, video;

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
      .error((error) => console.log('getUserMedia() error:##', error))
      .then(gotStream);
      //.catch(error => {
        //console.log('getMedia error', error);
      //});
  };

  // Displays the getStream from the camera
  // and then creates an ImageCapture object, using that video stream
  const gotStream = (stream) => {
    mediaStream = stream;
    video.srcObject = stream;
    imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
  };

  window.addEventListener('load', () => setTimeout(() => init(), 1000));

  // Take the picture
  const getPicture = () => {

  };
}
