MapSketcher
===========

MapSketcher is an application to annotate maps in collaborative groups.

It's mainly designed for education but feel free to use it to whatever it suits you.
To check a demo of the application visit [this page](http://mapsketcher.sagmor.com).

Setup
-----

MapSketcher was designed to be easily deployed at Heroku so you can get your own instance of MapSketcher running simply by executing this commands:

    git clone git://github.com/sagmor/mapsketcher.git
    cd mapsketcher
    heroku create
    heroku addons:add mongohq:free
    git push heroku master

Also if you want to take advantage of other advanced features of MapSketcher, I recomend yo to check out the [Configuration](https://github.com/sagmor/mapsketcher/wiki/Configuration) page in the wiki.

Note on Patches/Pull Requests
-----------------------------
 
* Fork the project.
* Make your feature addition or bug fix.
* Add tests for it. This is important so I don't break it in a
  future version unintentionally.
* Commit
* Send me a pull request. Bonus points for topic branches.


Copyright
---------

Copyright (c) 2010 Sebastián Gamboa. See LICENSE for details.
