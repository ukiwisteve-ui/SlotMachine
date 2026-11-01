"""Generate the character voice lines with Kokoro (Apache-2.0, free for commercial use).
Needs: pip install kokoro-onnx soundfile, ffmpeg, and kokoro-v1.0.onnx + voices-v1.0.bin in $KOKORO_DIR.
Usage: KOKORO_DIR=/tmp/kokoro python3 tools/voices.py   -> www/vo/<char>_<nn>.mp3 (+ <nn>b.mp3 bleeped takes)"""
import os, re, json, subprocess, tempfile
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

KD = os.environ.get('KOKORO_DIR', '/tmp/kokoro')
k = Kokoro(os.path.join(KD, 'kokoro-v1.0.onnx'), os.path.join(KD, 'voices-v1.0.bin'))
SR = 24000
# voice, speed, lang, ffmpeg effect chain (pitch via asetrate keeps the tempo with atempo)
def pitch(r): return 'rubberband=pitch=%.3f:formant=shifted:transients=smooth' % r
CAST = {
    'VEX':       ('am_onyx', 1.12, 'en-us', pitch(0.9) + ',acompressor=threshold=0.1:ratio=3'),
    'DEX':       ('am_puck', 1.18, 'en-us', pitch(1.12)),
    'GLORP':     ('am_echo', 1.08, 'en-us', pitch(1.32) + ',vibrato=f=7:d=0.35'),
    'B12':       ('am_michael', 1.0, 'en-us', 'aecho=0.8:0.85:7:0.45,flanger=delay=1:depth=2:speed=0.4'),
    'FIZZ':      ('bm_daniel', 1.08, 'en-gb', 'highpass=f=280,lowpass=f=3600'),
    'COLLECTOR': ('bm_george', 0.95, 'en-gb', pitch(0.94)),
}
src = open('www/index.html').read()
quips = re.search(r'var QUIPS = (\{.*?\n\});', src, re.S).group(1)
order = []  # (char, text) in file-number order, same as the voice script
for kind, body in re.findall(r"(\w+): \[(.*?)\]\],?\n", quips):
    for c, t in re.findall(r"\['(\w+)', '((?:[^'\\]|\\.)*)'\]", body + ']'):
        order.append((c, t.replace("\\'", "'"), kind))

def tighten(a, max_gap=0.2, edge=0.03, thresh=0.012):
    """Kokoro leaves long pauses at every full stop. Shorten any quiet run to max_gap and trim the ends."""
    win = int(SR * 0.01)
    rms = np.sqrt(np.convolve(a ** 2, np.ones(win) / win, 'same'))
    loud = rms > thresh
    idx = np.flatnonzero(loud)
    if not len(idx): return a
    a, loud = a[max(0, idx[0] - int(SR * edge)): idx[-1] + int(SR * edge)], loud[max(0, idx[0] - int(SR * edge)): idx[-1] + int(SR * edge)]
    out, i, n, keep = [], 0, len(a), int(SR * max_gap)
    while i < n:
        j = i
        while j < n and loud[j] == loud[i]: j += 1
        seg = a[i:j]
        if not loud[i] and len(seg) > keep:  # keep the gap's two ends so words don't get clipped
            h = keep // 2; seg = np.concatenate([seg[:h], seg[-h:]])
        out.append(seg); i = j
    return np.concatenate(out)

def tts(char, text):
    v, sp, lang, _ = CAST[char]
    s, sr = k.create(text, voice=v, speed=sp, lang=lang)
    return tighten(s)

def bleep(sec=0.32):
    t = np.arange(int(SR * sec)) / SR
    env = np.minimum(1, np.minimum(t, sec - t) / 0.01)
    return (0.35 * np.sin(2 * np.pi * 1000 * t) * env).astype(np.float32)

def save(char, audio, out):
    with tempfile.NamedTemporaryFile(suffix='.wav') as f:
        sf.write(f.name, audio, SR)
        fx = CAST[char][3]
        peak = subprocess.run(['ffmpeg', '-hide_banner', '-i', f.name, '-af', fx + ',volumedetect', '-f', 'null', '-'],
                              capture_output=True, text=True).stderr
        mx = float(re.search(r'max_volume: (-?[\d.]+)', peak).group(1))
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f.name, '-af', fx + ',volume=%.1fdB,alimiter=limit=0.95,aformat=sample_fmts=s16' % (-1 - mx),
                        '-ac', '1', '-ar', '24000', '-b:a', '64k', out], check=True)

count, manifest = {}, []
for char, text, kind in order:
    count[char] = count.get(char, 0) + 1
    name = '%s_%02d' % (char.lower(), count[char])
    clean = re.sub(r'\{(\w+)\}', r'\1', text)
    save(char, tts(char, clean), 'www/vo/%s.mp3' % name)
    entry = {'file': name, 'char': char, 'kind': kind, 'text': text}
    if '{' in text:  # bleeped take: speak the parts around each swear word and splice a bleep in between
        parts = re.split(r'\{\w+\}', text)
        gap = np.zeros(int(SR * 0.04), np.float32)
        pieces = []
        for i, p in enumerate(parts):
            if p.strip(' ,.!?'):
                pieces.append(tts(char, p.strip()))
            if i < len(parts) - 1:
                pieces += [gap, bleep(), gap]
        save(char, np.concatenate(pieces), 'www/vo/%sb.mp3' % name)
        entry['bleep'] = True
    manifest.append(entry)
    print(name, clean)
json.dump(manifest, open('www/vo/manifest.json', 'w'), indent=1)
