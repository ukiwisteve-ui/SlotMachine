#!/bin/sh
# Trim, peak-normalise to -1 dB and re-encode the sound effects in audio-src/ into www/sfx/.
# Usage: sh tools/sfx.sh   (needs ffmpeg)
set -e
enc() { # name start_seconds max_seconds
  in=audio-src/$1.mp3; out=www/sfx/$1.mp3
  peak=$(ffmpeg -hide_banner -ss $2 -t $3 -i $in -af volumedetect -f null - 2>&1 | sed -n 's/.*max_volume: \(-*[0-9.]*\) dB/\1/p')
  gain=$(python3 -c "print(-1 - ($peak))")
  ffmpeg -v error -y -ss $2 -t $3 -i $in -af "volume=${gain}dB,afade=t=out:st=$(python3 -c "print(max(0,$3-0.15))"):d=0.15" -ar 44100 -b:a 96k $out
  echo "$1 gain ${gain}dB"
}
enc click 0 0.5
enc spin 0 1.9
enc stop 0.27 0.8
enc win 0 1.0
enc big 0.42 5.6
enc count 0 4.0
enc core 0 1.0
enc tease 0.05 1.45
enc bonus 0 4.0
