<a href="http://makethingstalk.io"><img src="./docs/assets/makethingstalklogo.png" title="MakeThingsTalk" alt="MakeThingstalk"></a>


## is a project to build your own rfid trigged mediastation based on a raspberry pi.


[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger) [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)


### this project is in early development but we try to provide a working version on master at any time.


## Installation

### Setup RaspberryPI

- Starting on a blank raspian enable SPI via
```shell
$ sudo raspi-config
```
> Select “Interfacing Options” and enable SPI


### Clone

- Clone this repo to your raspberryPI  `https://github.com/hammerlerobi/makethingstalk`

### Setup

Make sure you have at least __node@10 or later__ installed.

Navigate in the cloned directory and from there navigate in the `backend` directory. 

> install dependencies using npm install

```shell
$ npm install 
```


> now you should be good to go run:

```shell
$ npm run start
```

If you run into issues maybe your user has not the correct rights to access the SPI Interface. We will provide a how to for this issue later for now run in elevated shell using sudo.

```shell
$ sudo npm run start
```

Now the application should start and you should be able to navigate to the frontend aswell as the player.

You can find the Media Player on\
http://localhost:4000/player/

You can find the Backend on\
http://localhost:4000/frontend/

---

## Features
Currently the player is very slow and the backend very basic but you can upload mp4 files via the backend. You can then show a medialist `fetchmedialist` and link rfid tags to the media. 

The player will play the correspoding media when the right rfid chip is placed on the reader.



## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © <a href="makethingstalk.io" target="_blank">The guys from makethingstalk</a>.
