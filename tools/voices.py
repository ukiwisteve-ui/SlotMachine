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
    'VEX':       ('am_michael', 1.05, 'en-us', 'acompressor=threshold=0.2:ratio=2'),
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

def trim(a, edge=0.02, thresh=0.01):
    win = int(SR * 0.01)
    rms = np.sqrt(np.convolve(a ** 2, np.ones(win) / win, 'same'))
    idx = np.flatnonzero(rms > thresh)
    if not len(idx): return a
    return a[max(0, idx[0] - int(SR * edge)): idx[-1] + int(SR * edge)]

def ffx(a, chain):
    with tempfile.NamedTemporaryFile(suffix='.wav') as i, tempfile.NamedTemporaryFile(suffix='.wav') as o:
        sf.write(i.name, a, SR)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', i.name, '-af', chain, '-ar', str(SR), o.name], check=True)
        return sf.read(o.name, dtype='float32')[0]

def raw(char, text):
    v, sp, lang, _ = CAST[char]
    return trim(k.create(text, voice=v, speed=sp, lang=lang)[0])

PAUSE = {'.': 0.36, '!': 0.36, '?': 0.4, ',': 0.2, ';': 0.25, ':': 0.25}
EMPH = re.compile(r'"([^"]+)"|\b([A-Z]{2,})\b')

def clause(char, text):
    """Speak one clause; stretch, lift and brighten its emphasised words (CAPS or "quoted")."""
    words = [(m.start(), m.end(), m.group(1) or m.group(2)) for m in EMPH.finditer(text)]
    spoken = EMPH.sub(lambda m: (m.group(1) or m.group(2)).lower(), text)
    a = raw(char, spoken)
    if not words: return a
    full = len(a)
    for st, en, w in reversed(words):  # find each word's position from how long the lead-in takes on its own
        before = EMPH.sub(lambda m: (m.group(1) or m.group(2)).lower(), text[:st]).strip()
        upto = (before + ' ' + w.lower()).strip()
        t0 = len(raw(char, before)) if before else 0
        t1 = min(len(raw(char, upto)), full)
        t0 = int(t0 * 0.97); t1 = min(full, int(t1 * 1.02))
        if t1 - t0 < SR * 0.08: continue
        seg = ffx(a[t0:t1], 'rubberband=tempo=0.93:transients=smooth,volume=1.3')
        x = int(SR * 0.015); r = np.linspace(0, 1, x, dtype=np.float32)
        seg[:x] *= r; seg[-x:] *= r[::-1]
        a = np.concatenate([a[:t0], seg, a[t1:]])
        full = len(a)
    return a

def tts(char, text):
    out = []
    for m in re.finditer(r'[^.!?,;:]+[.!?,;:"]*', text):
        piece = m.group(0).strip()
        if not piece.strip('.!?,;:" '): continue
        out.append(clause(char, piece))
        p = re.findall(r'[.!?,;:]', piece)
        out.append(np.zeros(int(SR * PAUSE.get(p[-1], 0.15) if p else SR * 0.15), np.float32))
    return np.concatenate(out[:-1]) if out else np.zeros(1, np.float32)

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
