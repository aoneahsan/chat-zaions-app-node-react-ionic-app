module.exports = {
    port: 80,
    retryAfter: 10000,
    secret: 'zaions.com-aoneahsan.website---chat-app',
    // db: 'mongodb://localhost:27017/chat-app',
    db: 'mongodb+srv://chat-zaions-aoneahsan-haha:chat-zaions-aoneahsan-hehe@cluster0.ndvjs.mongodb.net/chat-zaions?retryWrites=true',
    dataFolder: './data',
    admin: {
        username: 'aoneahsan-zaions',
        email: 'aoneahsan@gmail.com',
        password: 'Ahsan6553665201!',
        firstName: 'Ahsan',
        lastName: 'Mahmood',
    },
    sizes: [256, 512, 1024, 2048],
    mediasoup: {
        // Mediasoup worker settings
        worker: {
            rtcMinPort: 10000,
            rtcMaxPort: 65535,
            logLevel: 'warn',
            logTags: [
                'info',
                'ice',
                'dtls',
                'rtp',
                'srtp',
                'rtcp',
                // 'rtx',
                // 'bwe',
                // 'score',
                // 'simulcast',
                // 'svc'
            ],
        },
        // Mediasoup router settings
        router: {
            mediaCodecs:
                [
                    {
                        kind: 'audio',
                        mimeType: 'audio/opus',
                        clockRate: 48000,
                        channels: 2
                    },
                    {
                        kind: 'video',
                        mimeType: 'video/VP8',
                        clockRate: 90000,
                        parameters:
                            {
                                'x-google-start-bitrate': 1000
                            }
                    },
                ]
        },
        // Mediasoup WebRtcTransport settings
        webRtcTransport: {
            listenIps: [
                {
                    ip: '51.178.80.15',
                    announcedIp: null,
                }
            ],
            maxIncomingBitrate: 1500000,
            initialAvailableOutgoingBitrate: 1000000,
        },
    },
};
