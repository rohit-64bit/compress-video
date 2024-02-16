# Compress Video

> npm i compress-video


```js
const compressVideo = require('compress-video')
const path = require('path')

const inputPath = './sample.mp4'

const outputPath = './compressed'

const options = {
    crf: 32, // better when set between 30-35 after 40 it will ruin the video
    videoBitrate: '1M', // adjust it according to your video file size
    audioBitrate: '128k' // keep it as it is only change for special use cases
}

compressVideo({ inputPath: path.join(__dirname, inputPath), outputPath, options })
    .then((outputFileName) => {
        console.log('Compression finished successfully:', outputFileName)
    })
    .catch((err) => {
        console.error('Error during compression:', err)
    })
```

### Message from author

Version 1 - hey folks I have started this package for my weekend project. But i will be working upon it very soon.

Version 1.2.0 - I added the basic utility with the code in this package. In the next update I will try to optimize the cpu utilization and also try to implement hardware acceleration for compatible devices.
