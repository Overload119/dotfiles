local pasteboard = require("hs.pasteboard") -- http://www.hammerspoon.org/docs/hs.pasteboard.html
local last_change = pasteboard.changeCount() -- displays how many times the pasteboard owner has changed // Indicates a new copy has been made
local copy_sound = hs.sound.getByFile("/System/Library/Sounds/Pop.aiff")

-- show the picture
-- image = hs.image.imageFromPath("/Users/asharifr/Desktop/Diff Shots/Oct-17-01-12PM_snapshot.jpg")
-- -- take another picture

-- drawing = hs.drawing.image( hs.screen.primaryScreen():frame(), image)
-- drawing:setAlpha(0.9)
-- drawing:show()

-- hs.timer.doAfter(3, function() drawing:delete() end)

function storeCopy()
  now = pasteboard.changeCount()
  if (now > last_change) then
    copy_sound:play()
    last_change = now
  end
end

function takePicture()
  hs.task.new("/usr/bin/ruby", nil, (function(task, stdOut, stdErr)
    return false
  end), {'/Users/asharifr/scripts/take_picture.rb'} ):start()
end

function compilePictures()
  hs.task.new("/usr/bin/ruby", nil, (function(task, stdOut, stdErr)
    return false
  end), {'/Users/asharifr/scripts/compile_pictures.rb'} ):start()
end

timer = hs.timer.new(0.6, storeCopy)
timer:start()

picture_timer = hs.timer.new(600, takePicture)
picture_timer:start()

hs.timer.doAt('20:00', '1d', compilePictures)

