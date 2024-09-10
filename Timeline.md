## 8/22/24
Updated GPT Model so that lyric is also tracked, and the model is forced to use a function. Need to make sure I actually add the request and return it to other functions.

Working on adding scraping functionality to the songController, but lowkey confused on if it should be in the controller or a utility function.

## 8/25/24
Figured out songController functionality by using genius-lyrics library for a service instead.
Can now properly add a song to database as well as lyrics.

## 8/26/24
Added full functionality to the geniusService, addSong, and started on fuseService. Considering restructuring geniusService.

## 9/5/24
Added frontend form (I suck at this lol)

## 9/9/24
Went back to work on backend, discovered bug, realized it's really hard to test individual files without changing parameters, gonna add testing software (just like my teachers taught me lmao).
Went with Mocha, Chai, Sinon.