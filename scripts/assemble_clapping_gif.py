"""
Asset Pipeline: 3x3 Clapping Sprite Sheet to Animated GIF
Splits a 3x3 sprite sheet into 9 chronological frames, trims borders,
and packages into a smooth looping GIF at public/images/firozkhan-clapping.gif.
"""

import os
import sys
import glob
from PIL import Image

def find_sprite_sheet(candidate_path=None):
    if candidate_path and os.path.exists(candidate_path):
        return candidate_path

    # Check common locations
    user_profile = os.environ.get("USERPROFILE", r"C:\Users\FIROZ KHAN")
    search_patterns = [
        os.path.join(user_profile, "Downloads", "*sprite*.*"),
        os.path.join(user_profile, "Downloads", "*clap*.*"),
        os.path.join(user_profile, "Downloads", "*sheet*.*"),
        os.path.join(user_profile, "Desktop", "*sprite*.*"),
        os.path.join(user_profile, "Desktop", "*clap*.*"),
        os.path.join(r"portfolio\public\images", "*sprite*.*"),
        os.path.join(r"portfolio\public\images", "*clap*.*"),
    ]

    for pattern in search_patterns:
        matches = glob.glob(pattern)
        for m in matches:
            if m.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')) and not m.endswith('.gif'):
                return m

    return None

def process_sprite_sheet(
    input_path,
    output_gif_path=r"portfolio\public\images\firozkhan-clapping.gif",
    rows=3,
    cols=3,
    frame_duration_ms=300,
    border_trim_pct=0.02
):
    print(f"Opening sprite sheet: {input_path}")
    sheet = Image.open(input_path).convert("RGBA")
    total_w, total_h = sheet.size
    print(f"Sprite sheet dimensions: {total_w}x{total_h}px")

    cell_w = total_w / cols
    cell_h = total_h / rows

    frames = []
    frame_idx = 1

    for r in range(rows):
        for c in range(cols):
            x0 = int(c * cell_w)
            y0 = int(r * cell_h)
            x1 = int((c + 1) * cell_w)
            y1 = int((r + 1) * cell_h)

            # Optional border trimming to eliminate panel borders/gutters
            trim_x = int(cell_w * border_trim_pct) if border_trim_pct else 0
            trim_y = int(cell_h * border_trim_pct) if border_trim_pct else 0

            crop_box = (x0 + trim_x, y0 + trim_y, x1 - trim_x, y1 - trim_y)
            frame = sheet.crop(crop_box)
            frames.append(frame)
            print(f"Extracted Frame {frame_idx}: bbox {crop_box}, size {frame.size}")
            frame_idx += 1

    os.makedirs(os.path.dirname(output_gif_path), exist_ok=True)

    # Save as animated GIF (loop=0 means infinite loop)
    # Convert RGBA frames to RGB or palette with disposal to prevent ghosting
    gif_frames = []
    for f in frames:
        # Convert RGBA to RGB on a dark cinematic background to match portfolio (#080808)
        bg = Image.new("RGB", f.size, (8, 8, 8))
        if f.mode == "RGBA":
            bg.paste(f, mask=f.split()[3])
        else:
            bg.paste(f)
        gif_frames.append(bg)

    gif_frames[0].save(
        output_gif_path,
        save_all=True,
        append_images=gif_frames[1:],
        duration=frame_duration_ms,
        loop=0,
        optimize=True
    )

    print(f"\n[SUCCESS] Generated animated looping GIF: {output_gif_path}")
    print(f"Total Frames: {len(gif_frames)} | Frame Duration: {frame_duration_ms}ms | File Size: {os.path.getsize(output_gif_path)} bytes")
    return output_gif_path

if __name__ == "__main__":
    arg_path = sys.argv[1] if len(sys.argv) > 1 else None
    sprite_path = find_sprite_sheet(arg_path)

    if not sprite_path:
        print("[ERROR] No 3x3 clapping sprite sheet found.")
        print("Please provide the sprite sheet image path as an argument, or save it to:")
        print(r"  C:\Users\FIROZ KHAN\Downloads\clapping-sprite-sheet.png")
        sys.exit(1)

    process_sprite_sheet(sprite_path)

