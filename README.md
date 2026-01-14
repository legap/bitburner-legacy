# Bitburner legacy

This project is dedicated to the True Recursion achievement in bitburner.

To get the achievement you need to beat BN1 in the legacy version of bitburner.

## The quick solution

- kill BN1
- travel to New Tokyo
- enter the arcade
- start Megabyte burner 2000
- go to Options and select Import Game
- load the game save file bitburnerSave_worldDaemon.json from this project
- run `hack` in the console on w0r1d_d43m0n
- select another BN and after some time you should get the achievement

## The deeper look

The version from the arcade is also deployed [online](https://bitburner-official.github.io/bitburner-legacy/).
I had a look at the [sourcecode](https://github.com/bitburner-official/bitburner-legacy) and found the 
[commit hash](https://github.com/bitburner-official/bitburner-legacy/blob/master/commit) it is based on. 

With the commit hash I then downloaded the 
[project at this state](https://github.com/danielyxie/bitburner/tree/04bfcc0f2049dc5e4a573dd63da249700de0b39d) 
from the [previous repo](https://github.com/danielyxie/bitburner).

With this I had the html and javascript source and the resulting bundle.js in the dist folder.
But I wanted to have some tooling around to build the `bundle.js` from the source.

Bringing today's node tooling to a project from 2017 was an interesting challenge 😊

After a longer evening than expected and some help from copilot I finally had a working package.json and webpack config.
And with some updating here and there I was able to start it locally with `npm run start` - yayy, great success!

To speedup the process of getting to the w0r1d_d43m0n I started fiddling around with the save files.

And in the end I progressed through the game with a mix of playing it and boosting some numbers with the game saves.
If you want to do the same you can use the de- and encoder under `tools`.

That's it - feel free to use the code and have fun with it!
