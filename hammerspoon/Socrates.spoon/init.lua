--- === SmartSelect ===
---
--- Show a popup window with the translation of the currently selected (or other) text
---
--- Supported language codes are listed at https://cloud.google.com/translate/docs/languages
---
--- Download: TODO

require("hs.uielement")

local obj={}
obj.__index = obj

-- Metadata
obj.name = "Socrates"
obj.version = "0.1"
obj.author = "Amir Sharif <hello@amirsharif.org>"
obj.homepage = "https://github.com/Hammerspoon/Spoons"
obj.license = "MIT - https://opensource.org/licenses/MIT"

-- User-configurable variables

--- Socrates.popup_size
--- Variable
--- `hs.geometry` object representing the size to use for the translation popup window. Defaults to `hs.geometry.size(770, 610)`.
obj.popup_size = hs.geometry.size(600, 400)

--- Socrates.popup_style
--- Variable
--- Value representing the window style to be used for the translation popup window. This value needs to be a valid argument to [`hs.webview.setStyle()`](http://www.hammerspoon.org/docs/hs.webview.html#windowStyle) (i.e. a combination of values from [`hs.webview.windowMasks`](http://www.hammerspoon.org/docs/hs.webview.html#windowMasks[]). Default value: `hs.webview.windowMasks.utility|hs.webview.windowMasks.HUD|hs.webview.windowMasks.titled|hs.webview.windowMasks.closable`
obj.popup_style = hs.webview.windowMasks.texturedBackground

--- Socrates.popup_close_on_escape
--- Variable
--- If true, pressing ESC on the popup window will close it. Defaults to `true`
obj.popup_close_on_escape = true

--- Socrates.logger
--- Variable
--- Logger object used within the Spoon. Can be accessed to set the default log level for the messages coming from the Spoon.
obj.logger = hs.logger.new('Socrates')

--- Socrates.defaultHotkeys
--- Variable
--- Table containing a sample set of hotkeys that can be
--- assigned to the different operations. These are not bound
--- by default - if you want to use them you have to call:
--- `spoon.Socrates:bindHotkeys(spoon.Socrates.defaultHotkeys)`
--- after loading the spoon. Value:
--- ```
---  {
---     show = { {"cmd" }, "j" },
---  }
--- ```
obj.defaultHotkeys = {
  toggle = { {"alt" }, "`" },
}

----------------------------------------------------------------------

-- Internal variable - the hs.webview object for the popup
obj.webview = nil
obj.userContentController = nil

-- hs.uielement seems to be broken
function current_selection_experimental()
  local elem=hs.uielement.focusedElement()
  return elem:selectedText()
end

-- Internal function to get the currently selected text.
-- It tries through hs.uielement, but if that fails it
-- tries issuing a Cmd-c and getting the pasteboard contents
-- afterwards.
function current_selection()
  local status, selection=pcall(current_selection_experimental)
  local sel=nil
  if status and selection ~= nil then
    return selection
  end
  hs.eventtap.keyStroke({"cmd"}, "c")
  hs.timer.usleep(2000)
  sel=hs.pasteboard.getContents()
  hs.alert.show(sel)
  return (sel or "")
end

function obj:handleBrowserCallbackEvent(event)
  local action = event.body.action
  local actionToMap = {
    ['open-web'] = (function()
      hs.urlevent.openURL(event.body.url)
    end),
  }
  if actionToMap[action] then
    self.hide()
    actionToMap[action]()
  end
end

function obj:hide()
  if self.webview:hswindow() ~= nil then
    self.webview:hide()
  end
end

function obj:toggle()
  local text=current_selection()
  local application=hs.application.frontmostApplication()
  local rect = hs.geometry.rect(0, 0, self.popup_size.w, self.popup_size.h)
  rect.center = hs.screen.mainScreen():frame().center
  if spoon.Socrates.webview:hswindow() ~= nil then
    self.webview:hide()
    return self
  end
  self.webview:bringToFront():show()
  self.webview:hswindow():move(rect)
  local chromeVariables = self.getChromeTabVariables()
  local title = chromeVariables[2]
  if title ~= '' then
    title = application:title()
  end
  if text == nil then
    text = ''
  end
  -- Add the variables to the JS page
  local js = string.format([[
    App.run({
      selectedText: '%s',
      focusedApp: {
        name: '%s',
        path: '%s',
        title: '%s',
        url: '%s',
      },
    })
  ]],
    string.gsub(text, "'", "\'"),
    application:name(),
    application:path(),
    title,
    chromeVariables[1]
  )
  self.logger.ef("Injecting js...\n %s", js)
  self.webview:evaluateJavaScript(js)
  return self
end

--- Socrates:bindHotkeys(mapping)
--- Method
--- Binds hotkeys for Socrates
---
--- Parameters:
---  * mapping - A table containing hotkey modifier/key details for the following items:
---   * `translate` - translate the selected text without specifying source/destination languages (source defaults to auto-detect, destination defaults to your last choice or to English)
---   * `translate_to_<lang>` - translate the selected text to the given destination language. Source language will be auto-detected.
---   * `translate_from_<lang>` - translate the selected text from the given destination language. Destination language will default to your last choice, or to English.
---   * `translate_<from>_<to>` - translate the selected text between the given languages.
---
--- Sample value for `mapping`:
--- ```
---  {
---     translate_to_en = { { "ctrl", "alt", "cmd" }, "e" },
---     translate_to_de = { { "ctrl", "alt", "cmd" }, "d" },
---     translate_to_es = { { "ctrl", "alt", "cmd" }, "s" },
---     translate_de_en = { { "shift", "ctrl", "alt", "cmd" }, "e" },
---     translate_en_de = { { "shift", "ctrl", "alt", "cmd" }, "d" },
---  }
--- ```
function obj:bindHotkeys(mapping)
  local hotkeyDefinitions = {
    toggle = hs.fnutils.partial(self.toggle, self),
  }
  hs.spoons.bindHotkeysToSpec(hotkeyDefinitions, mapping)
  obj.mapping = mapping
end

-- Fetches in additional variables such as the current URL and title of the page.
function obj:getChromeTabVariables()
  if hs.application.frontmostApplication():name() ~= 'Google Chrome' then
    return {'', ''} -- 2 empty strings
  end
  ok, result = hs.applescript([[
    tell application "Google Chrome"
  	  set __url to get URL of active tab of first window
  	  set __title to get title of active tab of first window
  	  return {__url, __title}
    end tell
  ]])
  -- print the lines
  return result
end


function obj:handleWatchEvent(name, event, app)
  if event == hs.application.watcher.activated and name ~= "Hammerspoon" and self.webview ~= nil then
    self.webview:hide()
  end
end

function obj:init()
  watcher = hs.application.watcher.new(hs.fnutils.partial(self.handleWatchEvent, self))
  watcher:start()

  -- Create the WebView on startup so it'll be primed and ready for usage.
  local rect = hs.geometry.rect(0, 0, self.popup_size.w, self.popup_size.h)
  rect.center = hs.screen.mainScreen():frame().center
  self.userContentController = hs.webview.usercontent.new("Socrates")
    :setCallback(hs.fnutils.partial(self.handleBrowserCallbackEvent, self))
  self.webview=hs.webview.new(rect, {developerExtrasEnabled = true}, self.userContentController)
    :allowTextEntry(true)
    :windowStyle(self.popup_style)
    :closeOnEscape(true)

  local url = hs.spoons.scriptPath() .. "/popup.html"
  self.webview:url('file:///' .. url)

  hs.alert.show("Socrates!")
end

return obj
