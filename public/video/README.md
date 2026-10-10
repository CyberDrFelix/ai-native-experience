# Digital Felix media

The approved production greeting is located at:

`public/video/digital-felix-india-greeting.mp4`

The approved Bratislava V2 opening is located at:

`public/video/AI_Native_Bratislava_Digital_Felix_Opening.mp4`

Bratislava production format: MP4, H.264 Main, 1920×1080 at 25 fps,
AAC-LC stereo 48 kHz, 53.823 seconds, 93,166,744 bytes.

Production format:
- MP4 / H.264 High Profile, Level 4.1
- 1920×1080
- 30 fps
- AAC-LC stereo, 48 kHz, 192 kb/s
- 52.73 seconds
- 65,952,978 bytes (deployment-optimized copy)
- Local asset only
- No external media dependency
- No subtitles or captions in the presentation version

The video contains the complete multilingual opening sequence:

Kannada → Hindi → English reveal

The multilingual sequence and pauses are already edited into the final MP4.
Do not add language labels, subtitles, overlays, music, or additional
transitions in the presentation experience.

Keep the asset local so presentation mode never depends on a media host.

Scene 01 should use this production asset when available and retain a static
fallback for resilience if video playback fails.

Current presentation behavior:
- presenter explicitly starts playback on the Digital Welcome beat
- no autoplay assumption and no native browser controls
- playback pauses when leaving the video beat
- replay is available after the video ends
- the following beat hands directly to live Felix

Do not commit confidential or unlicensed source media.

The untouched 139,661,268-byte production master is retained locally under
`.local-media-backup/`, which is intentionally excluded from Git. The deployed
copy preserves all 1,582 frames and copies the original AAC stream without
re-encoding.
