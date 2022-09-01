@ECHO off

set playlist-name="Calm"
set FileDirectory="C:\Program Files (x86)\Steam\steamapps\common\wallpaper_engine\wallpaper32.exe"

%FileDirectory% -control openPlaylist -playlist %playlist-name%
