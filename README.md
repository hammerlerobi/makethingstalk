# makethingstalk

Here we go!

More info to follow:
We use typescript, and if you commit stuff follow https://www.conventionalcommits.org/en/v1.0.0-beta.3/ guidelines

## Player

Start test WS server

```
cd player && npm start
```

To start and stop a video send a JSON object vai WS

```
//play a video
{
    videoSrc: "path/to/video.mp4"
}
//stop playing video
{
    videoStop: true
}
```
