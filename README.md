# Winning-Buy-Box

A chrome extension that works in conjunction with amazon marketplace seller web pages.

This is a chrome extension used to determine if each of an amazon seller's products is winning the amazon buy box.  

This extension only works on his specific seller page, but theoretically it can be used on any seller page.  

  To abstract this extension such that it works for any seller page an adjustment must be made to the manifest.JSON file that makes it applicable to all urls that are amazon marketplace sellers.  Another adjustment must be made in the background.js file which matches the seller’s name.  Currently a static variable dictates this match; alternatively, a second parameter could be passed to the matching function and the seller’s name could (probably) be scraped from the chrome extensions’s content script (script1.js).  An easier less general method would be to manually change this variable for every seller page.

The badge located on the upper right hand corner of the button in popup.html displays the percentage of buy boxes that the amazon seller is winning.
