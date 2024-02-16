const fs = require('fs-extra')

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg')

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

// "E:\test\fileUpload\server\uploads\5a9eed.mp4"

const handleVideoCompress = async ({ inputPath, outputPath, options: { crf, videoBitrate, audioBitrate } }) => {

    // wrap this inside a promise

    const promise = new Promise((resolve, reject) => {

        const fileName = inputPath.split('\\').pop()

        const outputFileName = `${fileName.split('.')[0]}_compressed.mp4`

        console.log(inputPath)

        const outputFilePath = `${outputPath}\\${outputFileName}`

        console.log({ crf, videoBitrate, audioBitrate, inputPath, outputPath, outputFileName, outputFilePath })

        fs.ensureDirSync(outputPath)

        // Compression settings
        const defaultCrf = crf || 23; // Constant Rate Factor (lower value means better quality but larger file size)
        const defaultVideoBitrate = videoBitrate || '1M'; // Video bitrate in Mbps
        const defaultAudioBitrate = audioBitrate || '128k'; // Audio bitrate

        // Compress video
        ffmpeg(inputPath)
            .videoCodec('libx264')
            .audioCodec('aac')
            .outputOptions([
                '-crf ' + defaultCrf,
                '-b:v ' + defaultVideoBitrate,
                '-b:a ' + defaultAudioBitrate
            ])
            .on('error', (err) => {
                console.error('Error during compression:', err);
                reject({ error: err, message: "Error during compression" })
            })
            .on('end', () => {
                resolve(outputFileName)
            })
            .save(outputFilePath);

    })

    return promise

}

module.exports = handleVideoCompress